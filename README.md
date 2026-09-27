# jason-miles.github.io

Personal homepage for **Jason Miles** — Senior Solutions Architect at Databricks.
Live at **https://jason-miles.github.io**.

A single, self-contained static page in an "engineered editorial" design
language: Space Grotesk, a near-black / warm-paper canvas that adapts to the
visitor's light/dark preference, and one Databricks-red accent. No build step
and no framework — just `index.html` and static assets, served by GitHub Pages
from `main`.

## Structure

```
index.html            # the entire page (inline CSS + a little JS)
favicon.ico, *-16/32  # favicons
robots.txt, sitemap.xml
assets/
  og-card.png         # social share image
  projects/           # project "spec card" SVGs (theme-adaptive, embedded font)
  badges/             # certification badge images
  logos/              # employer logos (experience section)
```

The project spec cards in `assets/projects/` are generated from the profile
repo ([`jason-miles/jason-miles`](https://github.com/jason-miles/jason-miles),
`scripts/generate_projects.py`) and share its brand kit, so both surfaces stay
visually identical. To refresh them, regenerate there and copy the SVGs across.

## Editing

Everything is in `index.html` — edit the relevant `<section>` and commit.
Content adapts to light and dark automatically via `prefers-color-scheme`.
