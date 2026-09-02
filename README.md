# Baked Up — website setup (for the developer)

Static front end for **bakedupcreations.com**. Content is pulled live from the
existing WordPress site, so the person managing the site only ever uses WordPress.
No build step, no framework, no npm. One HTML file.

```
handoff/
  index.html            the whole site
  README.md             this file
  WORDPRESS-GUIDE.md    hand this to whoever posts the events
```

---

## 1. Put it on GitHub

```bash
git init
git add .
git commit -m "Baked Up site"
git branch -M main
git remote add origin https://github.com/<your-account>/bakedup-site.git
git push -u origin main
```

Or: create the repo on github.com → "uploading an existing file" → drag `index.html`,
`README.md`, `WORDPRESS-GUIDE.md` in. That works fine, no terminal needed.

## 2. Host it on Cloudflare Pages (free)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the repo.
3. Build settings: **Framework preset: None**, **Build command: (leave empty)**,
   **Build output directory: `/`**.
4. Save and Deploy. You get `bakedup-site.pages.dev` in about a minute.

Every `git push` redeploys automatically. Nobody needs to touch this again.

## 3. Custom domain (do this when you're ready to switch off WordPress hosting)

Pages project → **Custom domains** → **Set up a domain** → `bakedupcreations.com`.
Cloudflare gives you the DNS records. Until then, the `.pages.dev` URL is a fine
place to preview and share.

> The domain currently points at WordPress. Nothing breaks by deploying first and
> switching DNS later — WordPress keeps serving the live site the whole time.

---

## How the WordPress connection works

`index.html` reads the public WordPress.com REST API. **Read-only, no API key, works
on every WordPress.com plan including free:**

```
https://public-api.wordpress.com/wp/v2/sites/bakedupcreations.com/posts
https://public-api.wordpress.com/wp/v2/sites/bakedupcreations.com/media
```

- Posts tagged `event` become upcoming shows; once the date passes they move to the
  Archive automatically. Posts tagged `past-event` are forced into the Archive.
- The post's **featured image** becomes the flyer.
- Date / venue / ticket link are read from lines in the post body — the exact format
  is in `WORDPRESS-GUIDE.md`.
- Results are cached in the visitor's browser for 5 minutes, then re-read. A new
  WordPress post appears within 5 minutes with no deploy.
- If WordPress is unreachable, the site shows the built-in `fallbackEvents` list
  instead of an empty page.

### Everything configurable is at the top of the `<script>` block

```js
const CONFIG = {
  wpSite: 'bakedupcreations.com',
  eventTag: 'event',
  pastTag: 'past-event',
  cacheMinutes: 5,
  videos: ['', '', '', ''],   // paste YouTube watch URLs
  weirdWubz: {                // the Weird Wubz tab — all of this can also come from WordPress
    tag: 'weird-wubz',        // posts with this tag OR "Weird Wubz" in the title
    instagram: 'https://www.instagram.com/weirdwubz/',
    photos: [],               // up to 5 image URLs or Instagram post links; empty = WordPress media mentioning "wubz"
    playlistUrl: '',          // Spotify / SoundCloud / YouTube / Apple Music / Mixcloud
    playlistTitle: '...', playlistBlurb: '...',
    featured: { name:'', blurb:'', image:'', mixUrl:'', link:'' }
  },
  fallbackEvents: [...],      // shown only if WordPress is down
  fallbackPast: [...],
  fallbackPhotos: [...]
};
```

### The Weird Wubz tab

`#weirdwubz` is a filtered view of the same WordPress data: upcoming shows, a *Past Wubz*
archive, a playlist card, a featured-artist card with an embedded mix, and a 5-picture
strip. WordPress posts tagged `wubz-playlist` / `wubz-featured` override the `CONFIG`
values (newest post wins); media items whose title/caption/alt mention "wubz" or "wobble"
feed the picture strip. `WORDPRESS-GUIDE.md` has the posting format.

Instagram itself is not read — Meta's API requires an approved app. The strip links out to
the profile instead. If you ever want true Instagram content, paste post links
(`https://www.instagram.com/p/XXXX/`) into `weirdWubz.photos`; those render as Instagram embeds.

---

## Two things still to wire up

**1. The DJ application form.** It currently posts to a placeholder.
Sign up at [formspree.io](https://formspree.io) (free tier is plenty), then replace
in `index.html`:

```html
<form class="dj" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**2. Photos.** The gallery and carousel read the WordPress media library, so anything
uploaded in WordPress shows up. Facebook and Instagram **cannot** be scraped — their
APIs require an approved Meta app and periodic re-review. If a real IG feed is wanted
later, a paid widget service (Curator, EmbedSocial, SnapWidget) is the low-effort route.

---

## Admin page — `/admin/`

The "Squaad Admin" link at the bottom of **About & Contact** goes to `/admin/`, a
separate page locked behind **Cloudflare Access**. Admins sign in with Google or with a
one-time code emailed to them. The page has:

- **Refresh the site now / Clear cache** — for when WordPress changes aren't showing.
- **Who can open this page** — the admin list. Add or remove emails right there; every
  change has its own "Are you sure?" step, and the last admin can't be removed.

```
admin/index.html               the admin page (static)
functions/admin/api/users.js   Pages Function: reads/edits the Access allow-list
```

### How the pieces fit

1. **Cloudflare Access** (Zero Trust → Access → Applications) has a self-hosted app for
   `bakedupcreations.pages.dev/admin` with one *Allow* policy listing admin emails.
   Login methods on the app: Google + One-time PIN.
2. `/admin/` is only reachable after that login. Cloudflare adds a signed token
   (`Cf-Access-Jwt-Assertion`) to every request.
3. `/admin/api/users` checks that token's signature against the team's public keys, then
   uses the Cloudflare API to read or rewrite the policy's email list.

### Settings the function needs (Pages project → Settings → Variables and secrets)

| Name | Type | Value |
|---|---|---|
| `CF_API_TOKEN` | secret | API token: *Account → Access: Apps and Policies → Edit* (nothing else) |
| `CF_ACCOUNT_ID` | text | the Cloudflare account ID |
| `ACCESS_TEAM_DOMAIN` | text | `https://<team>.cloudflareaccess.com` |
| `ACCESS_AUD` | text | the Access application's *Application Audience (AUD) Tag* |

Until these exist the admin page still opens (behind login) but shows a "not set up yet"
note instead of the list. If the token is ever leaked, roll it in Cloudflare → My Profile
→ API Tokens; nothing else needs to change.

Pages Functions are free (100k requests/day) and only run when someone uses the admin
page — they don't affect the build count.

---

## Notes / gotchas

- Fonts load from Google Fonts; brand images currently hotlink from the WordPress
  media library. That's intentional (the manager uploads there), but if the WordPress
  site is ever deleted, download the logo and roster art into an `/images` folder first.
- The roster page is hand-written HTML, not WordPress-driven — three artists change
  rarely. Edit it directly if the roster changes.
- The About copy, Get Involved lanes, and DJ form fields are hand-written too.
- No cookies, no analytics, no tracking. Add Cloudflare Web Analytics if you want
  numbers — one snippet, privacy-friendly, free.
