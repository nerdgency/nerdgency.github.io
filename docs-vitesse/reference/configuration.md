---
title: Configuration
description: Every Vitesse setting, as a tag parameter or in config.php.
keywords:
  - vitesse
  - configuration
  - config.php
---

# Configuration

## Introduction

Each setting can be set once for the whole site in `config.php`, or for one tag as a parameter. A parameter wins over `config.php`, which wins over the default.

```php title="system/user/config/config.php"
$config['vitesse_build_directory'] = 'build';
$config['vitesse_base_url'] = 'https://cdn.example.com';
```

## Settings

| Parameter | `config.php` | Default | |
| --- | --- | --- | --- |
| `build_directory=` | `vitesse_build_directory` | `build` | The folder, under the web root, your build goes to. Matches Vite's `build.outDir`. |
| `base_url=` | `vitesse_base_url` | The site root | Where built files are served from, such as a CDN. See [Production](../using-vitesse/production.md#a-cdn). |
| `hot_file=` | `vitesse_hot_file` | `hot` | The hot file: relative to the web root, or an absolute path. |
| `manifest=` | `vitesse_manifest` | `.vite/manifest.json`, then `manifest.json` | The manifest, relative to the build directory, or an absolute path. |
| `nonce=` | `vitesse_nonce` | None | A Content Security Policy nonce for every tag. See [Production](../using-vitesse/production.md#a-content-security-policy). |
| `preload=` | `vitesse_preload` | `yes` | `no` leaves out `<link rel="modulepreload">`. |
| | `vitesse_public_path` | The folder `index.php` is in | Your web root on disk. Set it when `index.php` isn't in the web root. |

## Where files are found

The hot file and the manifest are found from your **web root**: the folder `index.php` is in, or `vitesse_public_path`. With the defaults, that's:

```text
your-web-root/
├── index.php
├── hot                          ← while `vite` runs
└── build/
    ├── .vite/manifest.json      ← Vite 5 and later
    └── assets/…
```

Built files are served from `/build/…`, or from `base_url` when it's set.
