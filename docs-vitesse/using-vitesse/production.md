---
title: Production
description: Serve your build from a CDN, add a Content Security Policy nonce, and use subresource integrity.
keywords:
  - vitesse
  - cdn
  - content security policy
  - subresource integrity
---

# Production

## Introduction

Vitesse's output needs no changes for most sites. These settings are for sites that serve files from a CDN or send a Content Security Policy. Each can be a tag parameter or a `config.php` setting. See [Configuration](../reference/configuration.md).

## A CDN

Set a base URL and built files load from it, while development is unaffected:

```php title="system/user/config/config.php"
$config['vitesse_base_url'] = 'https://cdn.example.com';
```

```html
<script type="module" src="https://cdn.example.com/build/assets/app-DwbmcGWY.js"></script>
```

Upload the build directory to the CDN at the same path, and set Vite's `base` to match (`https://cdn.example.com/build/`), so URLs inside your CSS point there too.

## A Content Security Policy

A policy that allows scripts and styles by nonce needs the nonce on every tag. Pass it with `nonce=`:

```html title="templates/default_site/_partials/layout.html"
{exp:vitesse:css files="resources/js/app.js" nonce="{csp_nonce}"}
```

Vitesse puts it on every `<script>`, stylesheet and preload it prints. `{csp_nonce}` stands for however your site makes its nonce: a global variable set by your own add-on, for example. The nonce must be new for each request, so don't set it in `config.php` unless your setup generates it there per request.

In development, also allow your dev server's address in `script-src`, `style-src` and `connect-src` (for its live-update connection), or turn the policy off locally.

## Subresource integrity

If your build adds an `integrity` hash to each manifest entry, for example with [`vite-plugin-manifest-sri`](https://www.npmjs.com/package/vite-plugin-manifest-sri), Vitesse prints it, with `crossorigin="anonymous"`:

```html
<script type="module" src="/build/assets/app-DwbmcGWY.js" integrity="sha384-…" crossorigin="anonymous"></script>
```

Nothing to turn on: the hash is printed whenever the manifest has it.
