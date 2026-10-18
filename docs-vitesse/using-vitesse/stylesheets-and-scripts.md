---
title: Stylesheets and scripts
description: Put stylesheets in the head and scripts at the end of the page, include the CSS your scripts import, and print each file once.
keywords:
  - vitesse
  - css
  - javascript
  - head
---

# Stylesheets and scripts

## Introduction

`{exp:vitesse:assets}` prints everything an entry needs in one place. Most layouts want stylesheets in the `<head>`, so the page doesn't flash unstyled, and scripts at the end of the `<body>`. `{exp:vitesse:css}` and `{exp:vitesse:js}` split the same output:

```html title="templates/default_site/_partials/layout.html"
<head>
    {exp:vitesse:css files="resources/js/app.js"}
</head>
<body>
    {layout:contents}
    {exp:vitesse:js files="resources/js/app.js"}
</body>
```

Give both tags the same `files=`.

## CSS your scripts import

Vite lets a script import its stylesheet:

```js title="resources/js/app.js"
import '../css/app.css';
```

After a build, that CSS is a separate file, and the manifest records it against the script. Vitesse includes it: `{exp:vitesse:css files="resources/js/app.js"}` prints the script's stylesheets, and those of every chunk the script imports. In development, Vite adds imported CSS itself, so `:css` prints only the Vite client and any stylesheet entries.

## Preloads

A script entry that imports shared chunks gets a `<link rel="modulepreload">` for each, so the browser fetches them in parallel instead of one after another. They're printed by `:js` and `:assets`. Turn them off with `preload="no"`.

## Each file once

Vitesse remembers what it has printed on the page. Two tags asking for the same file, or for entries that share a chunk, print it once, and `@vite/client` appears once however many tags there are. So a partial can include what it needs without checking what the layout already has:

```html title="templates/default_site/_partials/map.html"
{exp:vitesse:assets files="resources/js/map.js"}
<div id="map"></div>
```

## Entry types

Vitesse decides each tag by the file type:

| Entry | Prints |
| --- | --- |
| `.js`, `.mjs`, `.ts`, `.jsx`, `.tsx`, `.vue`, `.svelte` and other scripts | `<script type="module">` |
| `.css`, `.scss`, `.sass`, `.less`, `.styl`, `.pcss` | `<link rel="stylesheet">` |

After a build, it goes by the built file the manifest names, so a `.scss` entry becomes a stylesheet and a `.ts` entry a script.
