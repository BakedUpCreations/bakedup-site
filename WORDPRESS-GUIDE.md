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
   ```

   - `Date:` is required. Always **year-month-day** (`2026-10-30`).
   - `End:` only for multi-day events. Leave it out for a one-nighter.
   - `Venue:` and `Tickets:` are optional but look better filled in.
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

## The Weird Wubz page

Weird Wubz has its own tab. It fills itself from WordPress the same way Events does.

### Putting a show on the Weird Wubz page

Post it exactly like any other show (see *Adding a show*). It lands on the Weird Wubz
page automatically if **either** of these is true:

- the title contains **Weird Wubz** (e.g. "Weird Wubz ft. Spoone"), or
- the post has the tag **`weird-wubz`** (add it next to `event`).

The show also appears on the main Events page and calendar — you don't post it twice.
Once the date passes it moves to *Past Wubz* on its own.

### The playlist

**WordPress → Posts → Add New**

1. **Title** = the playlist name, e.g. `Weird Wubz Vol. 12`
2. **Body**, first line: `Link: ` followed by the playlist link
   (Spotify, SoundCloud, YouTube, Apple Music or Mixcloud all work — the site shows a player).
   Write a sentence or two underneath if you like; it shows under the title.
3. **Tag** it `wubz-playlist`. Do **not** tag it `event`.
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
4. **Tag** it `wubz-featured`. Do **not** tag it `event`.
5. Publish.

To feature someone new, publish a new post with the same tag — the newest one wins.

### The 5 pictures at the bottom

Instagram can't be read by the website directly (Meta doesn't allow it), so the strip
works like this:

- Upload the photos to **WordPress → Media**, and put the word **wubz** or **wobble**
  in the photo's **Title** or **Caption**. The 5 newest matching photos show up.
- If no photo matches, the strip falls back to the Weird Wubz show flyers.
- The **Follow @weirdwubz** button next to the strip goes straight to the Instagram page.

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
| Put a show on Weird Wubz | "Weird Wubz" in the title, or tag `weird-wubz` |
| Change the Weird Wubz playlist | Post with `Link:` line, tag `wubz-playlist` |
| Feature an artist's mix | Post titled with their name, `Mix:` line, photo, tag `wubz-featured` |
| Weird Wubz photo strip | Upload to Media with "wubz" in the title or caption |
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
