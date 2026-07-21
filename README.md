# nerdgency.github.io

Documentation site for Nerdgency's ExpressionEngine addons, built with
[Jekyll](https://jekyllrb.com/) and the
[Just the Docs](https://just-the-docs.com/) theme.

## Local development

```
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Structure

- `_config.yml` -- site settings, nav, and Just the Docs configuration.
- `_sass/color_schemes/nerdgency.scss` -- brand colors and font
  (`#faaf40` orange / `#374654` grey / Montserrat as a free stand-in for
  Proxima Nova).
- `_sass/custom/custom.scss` -- everything else (homepage cards, nav accent,
  logo sizing) that isn't a plain color-scheme variable.
- `_includes/head_custom.html` -- favicons, Google Fonts, social preview
  meta.
- `assets/images/logo.svg` / `icon.svg` -- brand marks; the favicon set in
  `assets/images/` and `favicon.ico` at the repo root are generated from
  `icon.svg`.
- `formidable/` -- Formidable addon documentation (one page per topic,
  `formidable/index.md` is the section landing page).

Each future addon gets its own top-level folder the same way `formidable/`
is set up, with its own `index.md` (`has_children: true`) and child pages.

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds the
site and deploys it via GitHub Pages. In the repo's **Settings &raquo;
Pages**, the source needs to be set to **GitHub Actions** (rather than
"Deploy from a branch") for this to take effect.

## Swapping in the licensed Proxima Nova font

The site currently loads Montserrat from Google Fonts as a free lookalike.
To switch to the real Proxima Nova once you have a license:

- **Adobe Fonts (Typekit):** replace the Google Fonts `<link>` tags in
  `_includes/head_custom.html` with your kit's embed `<link>`, then update
  `$body-font-family` in `_sass/color_schemes/nerdgency.scss` to
  `"proxima-nova", ...`.
- **Self-hosted files:** drop the licensed `.woff2`/`.woff` files in
  `assets/fonts/`, add `@font-face` declarations for them in
  `_sass/custom/custom.scss`, and update `$body-font-family` the same way.
