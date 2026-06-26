# Project Summary

## Overview

A personal portfolio website for **Francesca Olarte**, an incoming fourth-year
Creative Writing student. The site presents her writing (fiction, poetry,
essays, screenplays) alongside publications, awards, a blog, and a résumé, with
an editorial, dreamy floral aesthetic.

- **Stack:** React 18 + Vite 5, plain CSS (no framework)
- **Fonts:** Fraunces (display serif) + Inter (sans)
- **Theme:** floral / glassmorphism, warm cream-on-footage hero

## Page Structure

The single-page site (scroll-based) is laid out as:

```
Hero / landing (scroll-scrubbed video)
├── About          #about
├── Portfolio      #portfolio
│   ├── Short Stories
│   ├── Poetry
│   ├── Essays
│   └── Screenplays
├── Publications   #publications
├── Awards         #awards
├── Blog           #blog
├── Resume         #resume
└── Contact        #contact
```

The nav floats over the hero and scrolls away (non-sticky). Portfolio uses a
tabbed filter to switch between the four writing categories.

## Key Files

| File | Purpose |
| --- | --- |
| `src/App.jsx` | Page composition + all content/data (nav links, portfolio pieces, publications, awards, blog posts, résumé highlights) |
| `src/App.css` | Section, nav, portfolio, publications, awards, blog, résumé styles |
| `src/index.css` | Design tokens (colors, fonts, glass utility), body background |
| `src/components/Hero.jsx` / `Hero.css` | Scroll-scrubbed hero video + idle loop, petals, cursor parallax |
| `src/components/Nav.jsx` | Floating editorial nav (flower mark + indexed links) |
| `src/components/Portfolio.jsx` | Tabbed portfolio (4 categories, animated grid) |
| `src/components/Section.jsx` | Reusable reveal-on-scroll section wrapper |
| `src/hooks/useReveal.js` | IntersectionObserver fade/slide-in hook |

## Media Assets (`public/`)

| File | Role |
| --- | --- |
| `hero.mp4` | Scroll-scrubbed hero video (driven by scroll position) |
| `idle.mp4` | Idle autoplay loop shown at the very top |
| `hero-poster.jpg` | Poster frame for the scrub video |
| `idle-poster.jpg` | Poster frame for the idle video |

## Hero Video Behavior

- At the very top of the page, the **idle loop** (`idle.mp4`) autoplays.
- Once you scroll past the top, the **scrub video** (`hero.mp4`) takes over and
  its `currentTime` is mapped to scroll progress (rAF-smoothed).
- Reduced-motion users get the idle loop only (no scrubbing).
- Mobile also scrubs (the clip is all-intra encoded for fast seeking).

## Current Status

- All sections built and styled with **tasteful placeholder content** tailored
  to a creative-writing student.
- `npm run build` passes clean.

## TODO / Follow-ups

- [ ] Replace placeholder writing pieces, publications, awards, and blog posts
      with real content (in `src/App.jsx`).
- [ ] Add `public/resume.pdf` — the Résumé "Download" button links to it but the
      file does not exist yet.
- [ ] Update the contact email (currently `hello@francescaolarte.com`).

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev server
npm run build   # production build to dist/
npm run preview # preview the production build
```
