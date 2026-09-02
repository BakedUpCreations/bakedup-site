# Posting to the Baked Up website

You only use **WordPress**. Nothing else. Post it there and it shows up on the
website within about 5 minutes — no publishing, no deploying, no code.

---

## Adding a show

**WordPress → Posts → Add New**

1. **Title** = the show name, nothing else.

   > Freaky Deaky

2. **Body** — first few lines exactly like this, one per line:

   ```
   Date: 2026-10-30
   End: 2026-10-31
   Venue: Travis County Expo Center, Austin
   Tickets: https://freakydeaky.com/
   Promo: BAKEDUP
   ```

   - `Date:` is required. Always **year-month-day** (`2026-10-30`).
   - `End:` only for multi-day events. Leave it out for a one-nighter.
   - `Venue:` and `Tickets:` are optional but look better filled in.
   - `Promo:` is optional. If present, the scrolling bar on the home page adds
     "Promo Code: …" after the venue, and the big "next one up" box shows it too.
   - Anything you write **after** those lines is ignored by the site, so feel free
     to write a normal post underneath.

3. **Featured image** = the flyer. (Right sidebar → Featured image → Set featured image.)
   Square flyers look best.

4. **Tag** the post `event`. Type it in the Tags box and hit enter.

5. **Publish.**

That's it. It appears on the home page and the Events calendar.

---

## When a show is over

**Do nothing.** Once the date passes, the site moves it into The Archive on its own.

If you want to push something into the Archive early, change its tag from
`event` to `past-event`.

---

## Adding photos

**WordPress → Media → Add New** → upload.

Anything you upload to the Media library shows up in the photo carousel and gallery
on the Media page, newest first. No tagging needed.

- Upload the **good** ones. The newest 12 show in the carousel, newest 6 in the grid.
- Facebook and Instagram photos don't come over automatically — save the photo to
  your computer, then upload it to WordPress.

---

## The Weird Wubz and ABELFEST pages

Weird Wubz and ABELFEST each have their own tab. Both work exactly the same way and
fill themselves from WordPress like Events does.

### Putting a show on one of these pages

Post it exactly like any other show (see *Adding a show*). It lands on the page
automatically if **either** of these is true:

| Page | Title contains | or tag |
|---|---|---|
| Weird Wubz | **Weird Wubz** | `weird-wubz` |
| ABELFEST | **Abelfest** | `abelfest` |

The show also appears on the main Events page and calendar — you don't post it twice.
Once the date passes it moves to that page's *Past* section on its own.

### The playlist

**WordPress → Posts → Add New**

1. **Title** = the playlist name, e.g. `Weird Wubz Vol. 12`
2. **Body**, first line: `Link: ` followed by the playlist link
   (Spotify, SoundCloud, YouTube, Apple Music or Mixcloud all work — the site shows a player).
   Write a sentence or two underneath if you like; it shows under the title.
3. **Tag** it `wubz-playlist` (Weird Wubz) or `abelfest-playlist` (ABELFEST). Do **not** tag it `event`.
4. Publish.

To change the playlist, edit that post. The newest post with the tag wins.

### The featured artist (curated mix)

**WordPress → Posts → Add New**

1. **Title** = the artist's name
2. **Body**, one per line:
   ```
   Mix: https://soundcloud.com/artist/weird-wubz-mix
   Instagram: https://instagram.com/artist
   ```
   `Mix:` is the link to their mix (SoundCloud / Mixcloud / YouTube / Spotify — shows as a player).
   `Instagram:` is optional. Anything written **after** those lines is shown as their bio.
3. **Featured image** = a photo of the artist.
4. **Tag** it `wubz-featured` or `abelfest-featured`. Do **not** tag it `event`.
5. Publish.

To feature someone new, publish a new post with the same tag — the newest one wins.

### The 5 pictures at the bottom

Instagram can't be read by the website directly (Meta doesn't allow it), so the strip
works like this:

- Upload the photos to **WordPress → Media**, and put the word **wubz** or **wobble**
  (Weird Wubz) or **abelfest** (ABELFEST) in the photo's **Title** or **Caption**.
  The 5 newest matching photos show up.
- If no photo matches, the strip falls back to that page's show flyers.
- The **Follow** button next to the strip goes to Instagram.

---

## Hot Out The Oven Records

The label tab has four parts: **New releases**, **Recent releases**, **Meet the artists**,
and a **Submit your music** box. The first three come from WordPress.

### Adding a release (song, EP or album)

**WordPress → Posts → Add New**

1. **Title** = the release name, e.g. `Oven Heat EP`
2. **Body**, one per line:
   ```
   Artist: Saratonin
   Date: 2026-08-25
   Type: EP
   Listen: https://open.spotify.com/album/...
   Buy: https://bandcamp.com/...
   ```
   - `Artist:` and `Date:` (year-month-day) are the important ones.
   - `Type:` is a label like Single / EP / Album / Remix. Optional.
   - `Listen:` and `Buy:` become buttons. Either can be left out.
   - Anything written **after** those lines shows as a short description on new releases.
3. **Featured image** = the cover art. Square.
4. **Tag** it `release`. Do **not** tag it `event`.
5. Publish.

Releases from the last **45 days** show under *New releases*; older ones move to
*Recent releases* on their own (newest first, up to 12). If nothing is that fresh, the
single newest release stays under *New*.

### Adding an artist to "Meet the artists"

**WordPress → Posts → Add New**

1. **Title** = the artist's name
2. **Body**, one per line, all optional — each one you add becomes a button:
   ```
   Instagram: https://instagram.com/...
   SoundCloud: https://soundcloud.com/...
   Spotify: https://open.spotify.com/artist/...
   Bandcamp: https://...
   YouTube: https://...
   ```
   Anything written **after** those lines is the bio.
3. **Featured image** = a photo (shown as a round portrait).
4. **Tag** it `label-artist`. Do **not** tag it `event`.
5. Publish.

### Submissions

The **Submit your music** box shows "Submission form coming soon" until the developer
pastes the web-form link into the site settings (`CONFIG.hoto.submitUrl`).

---

## Fixing a mistake

Edit the post in WordPress and update it. The website catches up within 5 minutes.

If you need it to update **right now**: go to the website → **About & Contact** →
scroll to the bottom → click **Squaad Admin** → sign in → **Refresh the site now**.

Seeing an old flyer that you already replaced? Same panel → **Clear cache**.

---

## Cheat sheet

| I want to… | Do this |
|---|---|
| Add a show | New WordPress post, tag `event`, `Date:` line, featured image |
| Change a date or venue | Edit that post |
| Add photos | Upload to WordPress Media |
| Show a promo code | Add a `Promo:` line to the show post |
| Put a show on Weird Wubz / ABELFEST | "Weird Wubz" / "Abelfest" in the title, or tag `weird-wubz` / `abelfest` |
| Change a page's playlist | Post with `Link:` line, tag `wubz-playlist` / `abelfest-playlist` |
| Feature an artist's mix | Post titled with their name, `Mix:` line, photo, tag `wubz-featured` / `abelfest-featured` |
| Photo strip on those pages | Upload to Media with "wubz" / "abelfest" in the title or caption |
| Add a label release | Post with `Artist:` `Date:` `Listen:` lines, cover as featured image, tag `release` |
| Add a label artist | Post titled with their name, social links as lines, photo, tag `label-artist` |
| Cancel a show | Delete the post (or move it to Draft) |
| Archive early | Change tag to `past-event` |
| See a change immediately | Squaad Admin → Refresh now |

---

## What you can't do from WordPress

These are hand-built on the website. Ask the developer to change them:

- The artist roster page
- The About text and the "Get Involved" lanes
- The DJ application form
- The videos on the Media page (they're YouTube links in the site's settings)
