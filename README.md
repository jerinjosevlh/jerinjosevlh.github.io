# jerinjosevlh.github.io

Personal portfolio, built with plain HTML, CSS and JavaScript (no framework, no build step).

- `index.html` – page shell
- `js/data/` – content (edit `profile.js` to change what the page shows)
- `js/components/` – one function per piece of the page, each returning HTML
- `js/behaviors/` – interactivity (menus, mobile layout switch, …)
- `css/` – styles; `css/portfolio.css` holds site-specific tweaks

To preview locally: `python3 -m http.server 3000` and open http://localhost:3000.

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`.
The previous Next.js version of the site is on the `nextjs-site` branch.
