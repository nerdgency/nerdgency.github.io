---
title: Installation
description: Vitesse's requirements, how to install it, how to update, and how to uninstall.
keywords:
  - vitesse
  - install
---

# Installation

Vitesse installs like any other ExpressionEngine add-on: copy one folder onto your site, then choose **Install** in the control panel.

## Requirements

| | |
| --- | --- |
| **ExpressionEngine** | 7 or later |
| **PHP** | 8.1 or later |
| **Vite** | 3 or later, in your project. Vite 5's `.vite/manifest.json` and older `manifest.json` both work. |

## Getting Vitesse

Vitesse is free. Download it from the ExpressionEngine add-on store: **[Vitesse on expressionengine.com](https://expressionengine.com/add-ons/vitesse)**. Updates are downloaded from the same place.

## Installing Vitesse

The release zip mirrors the root of an ExpressionEngine site:

```text title="Vitesse-v1.0.0.zip"
system/user/addons/vitesse/   →  your-site/system/user/addons/vitesse/
```

1. Copy `system/user/addons/vitesse` into your site's `system/user/addons/` folder.
2. Open **Developer › Add-Ons**, find **Vitesse** and choose **Install**.
3. [Set up Vite](./setting-up-vite.mdx), then add a [template tag](../reference/template-tags.mdx).

Vitesse has no control panel screens and no database tables. Everything is set in templates, or in [`config.php`](../reference/configuration.md).

## Updating

Replace `system/user/addons/vitesse` with the new one, rather than merging the folders, then choose **Update** on the **Add-Ons** screen.

## Uninstalling

Remove Vitesse's tags from your templates, choose **Uninstall** on the **Add-Ons** screen, and delete the folder. Your Vite project and its builds aren't touched.
