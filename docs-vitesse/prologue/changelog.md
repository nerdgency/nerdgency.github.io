---
title: Changelog
description: Every Vitesse release, newest first, with its requirements and what each one added or fixed.
keywords:
  - vitesse
  - changelog
---

# Changelog

Every release and every change a site might notice, newest first. Vitesse follows [semantic versioning](https://semver.org/): patch releases (1.0.x) fix things, minor releases (1.x.0) add things without breaking anything, and nothing breaking ships before 2.0.0.

## 1.0.0 — 18 October 2026

The first release, free from the [ExpressionEngine add-on store](https://expressionengine.com/add-ons/vitesse). Needs **ExpressionEngine 7** or later, **PHP 8.1** or later and **Vite 3** or later.

- **`{exp:vitesse:assets}`** prints the stylesheets, preloads and scripts for Vite entry points: from the dev server while it runs, with `@vite/client`, and from the build's manifest otherwise. See [Template tags](../reference/template-tags.mdx).
- **`{exp:vitesse:css}` and `{exp:vitesse:js}`** split stylesheets into the head and scripts into the footer. Each file is printed once per page.
- **`{exp:vitesse:url}`** gives the URL of one processed file, such as an image or font.
- **Stylesheets your scripts import** are included, with those of the chunks they import, plus `modulepreload` for those chunks.
- **Any entry type**: `.js`, `.ts`, `.tsx`, `.vue`, `.css`, `.scss`, `.less` and the rest.
- **Vite 5's `.vite/manifest.json`** and older `manifest.json` are both found, from your web root.
- **Settings** as tag parameters or in `config.php`: build directory, base URL for a CDN, hot file, manifest, nonce and preloads. See [Configuration](../reference/configuration.md).
- **Subresource integrity** from the manifest, and a **CSP nonce** on every tag.
- **Problems reported** in the template debugger.
