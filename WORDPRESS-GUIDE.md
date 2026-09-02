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

## Fixing a mistake

Edit the post in WordPress and update it. The website catches up within 5 minutes.

If you need it to update **right now**: go to the website → **About & Contact** →
scroll to the bottom → click **Squaad Admin** → **Refresh now**.

Seeing an old flyer that you already replaced? Same panel → **Clear cache**.

---

## Cheat sheet

| I want to… | Do this |
|---|---|
| Add a show | New WordPress post, tag `event`, `Date:` line, featured image |
| Change a date or venue | Edit that post |
| Add photos | Upload to WordPress Media |
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
