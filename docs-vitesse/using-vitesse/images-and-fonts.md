---
title: Images and fonts
description: Use the URL of an image, font or other file Vite processed in your own markup.
keywords:
  - vitesse
  - images
  - fonts
  - asset url
---

# Images and fonts

## Introduction

Images and fonts your CSS refers to need nothing from you: Vite rewrites those URLs itself. For a file your template uses directly, `{exp:vitesse:url}` gives its URL:

```html title="templates/default_site/_partials/header.html"
<img src="{exp:vitesse:url src="resources/images/logo.svg"}" alt="Acme" width="120" height="40">
```

In development it's the file on the dev server. After a build, it's the hashed file from the manifest, such as `/build/assets/logo-2222.svg`.

## Getting a file into the build

The manifest lists only files Vite processed. A file is processed when:

- **your code imports it**, as in `import logo from '../images/logo.svg'`; or
- **it's an input**, listed in `build.rollupOptions.input`.

To include a whole folder, import it with a glob from an entry:

```js title="resources/js/app.js"
import.meta.glob('../images/**', { eager: true, query: '?url' });
```

A file Vite didn't process gives an empty URL, with a message in the template debugger.

Vite inlines small files into the code that imports them, as `data:` URLs, rather than writing them to the build (see [`build.assetsInlineLimit`](https://vite.dev/config/build-options.html#build-assetsinlinelimit)). An inlined file has no URL to give, so for files templates use, set the limit to `0` or import them with `?url`.
