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
  fallbackEvents: [...],      // shown only if WordPress is down
  fallbackPast: [...],
  fallbackPhotos: [...]
};
```

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

## Admin panel

The "Squaad Admin" link at the bottom of **About & Contact** opens a small panel with
**Refresh now** and **Clear cache**. Both are real and run in the browser — no login,
nothing to break, nothing destructive.

If you ever want it locked down, put the page behind **Cloudflare Access** (Zero Trust →
Access → Applications) and allow specific Google accounts. Not required — the panel
can't change any content.

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
