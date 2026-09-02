/* =========================================================================
   Squaad Admin — who is allowed in.
   Runs on Cloudflare (Pages Function) at /admin/api/users.
   Reads and edits the allow-list of the Cloudflare Access application that
   protects /admin, so admins can add / remove other admins from the site.

   Needs these settings on the Pages project (Settings → Variables and secrets):
     CF_API_TOKEN        secret   API token with  Account → Access: Apps and Policies → Edit
     CF_ACCOUNT_ID       text     the Cloudflare account ID
     ACCESS_TEAM_DOMAIN  text     https://<team>.cloudflareaccess.com
     ACCESS_AUD          text     the Access application's "Application Audience (AUD) Tag"
   ========================================================================= */

const API = 'https://api.cloudflare.com/client/v4';
let jwksCache = { at: 0, keys: [] };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const b64url = (s) => {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Uint8Array.from(atob(s), c => c.charCodeAt(0));
};

/* ---- 1. prove the visitor came through Cloudflare Access ---- */
async function verifyAccessJWT(request, env) {
  const token = request.headers.get('cf-access-jwt-assertion') ||
    ((request.headers.get('cookie') || '').match(/CF_Authorization=([^;]+)/) || [])[1];
  if (!token) throw new Error('No Access token — open this page through /admin/');
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) throw new Error('Malformed token');
  const header = JSON.parse(new TextDecoder().decode(b64url(h)));
  const payload = JSON.parse(new TextDecoder().decode(b64url(p)));

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('Session expired — sign in again');
  if (payload.iss !== env.ACCESS_TEAM_DOMAIN) throw new Error('Token is not from this team');
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(env.ACCESS_AUD)) throw new Error('Token is for a different application');

  if (Date.now() - jwksCache.at > 10 * 60 * 1000 || !jwksCache.keys.length) {
    const r = await fetch(env.ACCESS_TEAM_DOMAIN + '/cdn-cgi/access/certs', { cf: { cacheTtl: 600 } });
    if (!r.ok) throw new Error('Could not fetch Access signing keys');
    jwksCache = { at: Date.now(), keys: (await r.json()).keys || [] };
  }
  const jwk = jwksCache.keys.find(k => k.kid === header.kid);
  if (!jwk) throw new Error('Unknown signing key');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(s), new TextEncoder().encode(h + '.' + p));
  if (!ok) throw new Error('Token signature is invalid');
  return payload; // { email, exp, iss, aud, ... }
}

/* ---- 2. talk to the Cloudflare API ---- */
async function cf(env, method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { authorization: 'Bearer ' + env.CF_API_TOKEN, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || data.success === false) {
    const msg = (data.errors && data.errors.map(e => e.message).join('; ')) || ('HTTP ' + r.status);
    throw new Error('Cloudflare API: ' + msg);
  }
  return data.result;
}

async function findPolicy(env) {
  const apps = await cf(env, 'GET', `/accounts/${env.CF_ACCOUNT_ID}/access/apps?per_page=100`);
  const app = (apps || []).find(a => a.aud === env.ACCESS_AUD);
  if (!app) throw new Error('Access application not found for this AUD');
  const ref = (app.policies || []).find(p => p.decision === 'allow') || (app.policies || [])[0];
  if (!ref) throw new Error('The Access application has no policy');
  // Reusable (account-level) policies live at /access/policies; legacy ones under the app.
  const path = ref.reusable === false
    ? `/accounts/${env.CF_ACCOUNT_ID}/access/apps/${app.id}/policies/${ref.id}`
    : `/accounts/${env.CF_ACCOUNT_ID}/access/policies/${ref.id}`;
  let policy;
  try { policy = await cf(env, 'GET', path); }
  catch (e) {
    // fall back to the other location if the first guess was wrong
    const alt = path.includes('/apps/') ? `/accounts/${env.CF_ACCOUNT_ID}/access/policies/${ref.id}`
                                        : `/accounts/${env.CF_ACCOUNT_ID}/access/apps/${app.id}/policies/${ref.id}`;
    policy = await cf(env, 'GET', alt);
    return { app, policy, path: alt };
  }
  return { app, policy, path };
}

const emailsOf = (policy) => (policy.include || []).filter(r => r.email && r.email.email).map(r => r.email.email.toLowerCase());

async function savePolicy(env, found, emails) {
  const others = (found.policy.include || []).filter(r => !(r.email && r.email.email));
  const body = {
    name: found.policy.name,
    decision: found.policy.decision,
    include: others.concat(emails.map(e => ({ email: { email: e } }))),
    exclude: found.policy.exclude || [],
    require: found.policy.require || []
  };
  if (found.policy.session_duration) body.session_duration = found.policy.session_duration;
  if (found.path.includes('/apps/') && found.policy.precedence != null) body.precedence = found.policy.precedence;
  const updated = await cf(env, 'PUT', found.path, body);
  return emailsOf(updated);
}

/* ---- 3. the endpoints ---- */
function configured(env) {
  return ['CF_API_TOKEN', 'CF_ACCOUNT_ID', 'ACCESS_TEAM_DOMAIN', 'ACCESS_AUD'].filter(k => !env[k]);
}

async function guard(context) {
  const missing = configured(context.env);
  if (missing.length) return { error: json({ error: 'Not set up yet. Missing settings: ' + missing.join(', '), notConfigured: true }, 503) };
  try { return { me: await verifyAccessJWT(context.request, context.env) }; }
  catch (e) { return { error: json({ error: e.message }, 403) }; }
}

const validEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || '');

export async function onRequestGet(context) {
  const g = await guard(context); if (g.error) return g.error;
  try {
    const found = await findPolicy(context.env);
    return json({ me: g.me.email, emails: emailsOf(found.policy), app: found.app.name });
  } catch (e) { return json({ error: e.message }, 500); }
}

export async function onRequestPost(context) {
  const g = await guard(context); if (g.error) return g.error;
  try {
    const { email } = await context.request.json().catch(() => ({}));
    const addr = String(email || '').trim().toLowerCase();
    if (!validEmail(addr)) return json({ error: 'That does not look like an email address' }, 400);
    const found = await findPolicy(context.env);
    const emails = emailsOf(found.policy);
    if (emails.includes(addr)) return json({ me: g.me.email, emails, note: addr + ' is already an admin' });
    const saved = await savePolicy(context.env, found, emails.concat(addr));
    return json({ me: g.me.email, emails: saved, added: addr });
  } catch (e) { return json({ error: e.message }, 500); }
}

export async function onRequestDelete(context) {
  const g = await guard(context); if (g.error) return g.error;
  try {
    const { email } = await context.request.json().catch(() => ({}));
    const addr = String(email || '').trim().toLowerCase();
    const found = await findPolicy(context.env);
    const emails = emailsOf(found.policy);
    if (!emails.includes(addr)) return json({ error: addr + ' is not on the list' }, 404);
    if (emails.length === 1) return json({ error: 'You cannot remove the last admin — add someone else first' }, 400);
    const saved = await savePolicy(context.env, found, emails.filter(e => e !== addr));
    return json({ me: g.me.email, emails: saved, removed: addr });
  } catch (e) { return json({ error: e.message }, 500); }
}
