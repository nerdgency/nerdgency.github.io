# nerdgency.github.io

Documentation site for Nerdgency's ExpressionEngine addons, built with
[Docusaurus](https://docusaurus.io/).

## Local development

```
npm install
npm start
```

This starts a local dev server at `http://localhost:3000` and opens up a
browser window. Most changes are reflected live without restarting the
server.

## Build

```
npm run build
```

Generates a static site into the `build/` directory, servable with any
static hosting service.

## Structure

- `docusaurus.config.js` -- site settings, navbar/footer, brand colors, and
  the Google Fonts (Montserrat) link.
- `sidebars.js` -- the Formidable docs sidebar.
- `src/css/custom.css` -- brand color ramp (`#faaf40` orange / `#374654`
  grey), typography, and homepage card styles.
- `src/pages/index.js` -- the custom React homepage (hero + addon cards).
- `static/img/` -- brand marks (`logo.svg` / `icon.svg`) and the generated
  favicon set.
- `docs/formidable/` -- Formidable addon documentation (one page per topic,
  `docs/formidable/index.md` is the section landing page, ordered via
  `sidebar_position` front matter).

Each future addon gets its own top-level folder under `docs/` the same way
`docs/formidable/` is set up, with its own `_category_.json` and an
`index.md` landing page, then added to `sidebars.js` and the navbar in
`docusaurus.config.js`.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds the
site and deploys it via GitHub Pages. In the repo's **Settings &raquo;
Pages**, the source needs to be set to **GitHub Actions** (rather than
"Deploy from a branch") for this to take effect.

## Swapping in the licensed Proxima Nova font

The site currently loads Montserrat from Google Fonts as a free lookalike.
To switch to the real Proxima Nova once you have a license:

- **Adobe Fonts (Typekit):** replace the Google Fonts `headTags` entries in
  `docusaurus.config.js` with your kit's embed `<link>`, then update
  `--ifm-font-family-base` in `src/css/custom.css` to `'proxima-nova', ...`.
- **Self-hosted files:** drop the licensed `.woff2`/`.woff` files in
  `static/fonts/`, add `@font-face` declarations for them in
  `src/css/custom.css`, and update `--ifm-font-family-base` the same way.
