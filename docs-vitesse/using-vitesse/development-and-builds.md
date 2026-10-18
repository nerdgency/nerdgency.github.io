---
title: Development and builds
description: How Vitesse switches between Vite's dev server and your build, what it prints in each, and what to deploy.
keywords:
  - vitesse
  - development
  - build
  - deploy
---

# Development and builds

## Introduction

Every Vitesse tag looks for the **hot file** first. The same template works in both cases, so there's nothing to change between working and publishing.

| | Hot file exists | No hot file |
| --- | --- | --- |
| **Mode** | Development | Build |
| **Files come from** | Vite's dev server | Your build, through its manifest |
| **Scripts** | Your source files, plus `@vite/client` | The hashed files |
| **Stylesheets** | Your source files, updated live | The hashed files, including those your scripts import |

## In development

With `npx vite` running, the [hot file](../getting-started/setting-up-vite.mdx) holds the dev server's address, such as `http://localhost:5173`, and Vitesse prints:

```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<link rel="stylesheet" href="http://localhost:5173/resources/css/app.css">
<script type="module" src="http://localhost:5173/resources/js/app.js"></script>
```

`@vite/client` comes first, once per page, whichever Vitesse tag runs first. It's what updates the page as you save.

## After a build

With no hot file, Vitesse reads the manifest from your build directory (`.vite/manifest.json`, or `manifest.json` before Vite 5) and prints the files it lists:

```html
<link rel="stylesheet" href="/build/assets/app-BxiUCzOx.css">
<link rel="stylesheet" href="/build/assets/app-K08chnnp.css">
<link rel="modulepreload" href="/build/assets/vendor-3c4d.js">
<script type="module" src="/build/assets/app-DwbmcGWY.js"></script>
```

URLs start with `/`, so they work on every page of your site, however deep. To serve them from a CDN, set a [base URL](./production.md#a-cdn).

## Deploying

Deploy the build directory (`public/build/` in the example configuration) with your site, and **not** the hot file. A hot file on a live site sends every visitor's browser to a dev server that isn't there.

Build on your machine and deploy the files, or build on the server or in CI. Either way, run `vite build` before the site serves pages with the new templates.

## Template caching

A cached template keeps whatever Vitesse printed when it was cached. If you cache templates, clear the cache after switching between the dev server and a build, and after each build.
