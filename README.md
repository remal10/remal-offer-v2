# Remal Hotel & Villas — guest offers app

Where Al Dhannah Lives. A mobile-first, installable web app (PWA) that presents the hotel's
restaurant, bar, pool, spa and service offers to guests, with a staff dashboard to manage
everything.

## What it does
- **Guest site** (`/`): cinematic opening, rotating home images (new one each visit, then every
  15 s), section covers, promotional offer cards (badges, struck-through prices, countdown,
  featured highlights), 5 languages (EN default, FR, AR, HI, ZH), "Install app" banner,
  one-tap reservation via WhatsApp or phone.
- **Staff dashboard** (`/#staff`, not linked from the guest site): sign in, then manage
  *Home images*, *Sections*, *Offers* and *Settings* (reservation contacts).

## Files
| File | Role |
|---|---|
| `index.html` | page structure (guest site + staff dashboard) |
| `styles.css` | all styling |
| `app.js` | all behaviour; talks to Supabase |
| `manifest.json`, `sw.js`, `icon.svg` | installable-app files |
| `schema.sql` | database, security policies and storage rules for Supabase |

## Setup
1. Create a Supabase project, open the SQL editor and run `schema.sql`.
2. Create a **public** Storage bucket named `offers`.
3. In `app.js`, replace `U` (project URL) and `K` (the *anon / publishable* key).
   Never commit a `service_role` key.
4. Add your staff email (lowercase) to `public.staff_emails`, then create that account on `/#staff`.
5. In Supabase > Authentication > URL Configuration, set the Site URL to your deployed address.
6. Deploy the folder as a static site (e.g. Vercel, framework "Other", no build step).

No build step and no dependencies to install: it is plain HTML, CSS and JavaScript
(`@supabase/supabase-js` is loaded from a CDN).
