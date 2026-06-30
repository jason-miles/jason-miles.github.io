# jason-miles.github.io

Personal homepage for Jason Miles, Solutions Architect at Databricks.

Live site: **https://jason-miles.github.io**

## Stack

Plain HTML + Bootstrap 5.3.2 + Bootstrap Icons. No build step. All page content
(skills, work history, certifications, contact links) is driven by
`userConfig.json` — edit the JSON, push, and the page updates.

## Files

| File                       | What it does                                          |
| -------------------------- | ----------------------------------------------------- |
| `index.html`               | Page skeleton + static About/Education sections       |
| `userConfig.json`          | All dynamic content (skills, work, badges, navbar)    |
| `site.js`                  | Loads `userConfig.json` and renders dynamic sections  |
| `site.css`                 | Site styles (root copy; full source in `css/`)        |
| `responsive.min.css`       | Mobile breakpoints                                    |
| `images/Badges/`           | Certification badge PNGs                              |
| `images/Company/`          | Company / school logos for work experience            |
| `favicon-*.png`, `*.ico`   | Browser tab icons                                     |

## How to update content

1. Edit `userConfig.json` (skills, experience, badges, etc.)
2. Drop matching images into `images/Badges/` or `images/Company/`
3. `git push` — GitHub Pages redeploys in ~30 seconds.

For changes that aren't in the JSON (page title, About paragraphs, footer),
edit `index.html` directly.

## Credits

Template structure derived from [kuldeep-in/kuldeep-in.github.io](https://github.com/kuldeep-in/kuldeep-in.github.io)
by Kuldeep Singh. Personalized content and modifications by Jason Miles.

## License

[MIT](LICENSE.txt) for the personalized content. See LICENSE.txt for details.
