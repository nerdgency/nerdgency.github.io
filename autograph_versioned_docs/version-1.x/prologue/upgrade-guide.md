---
title: Upgrade guide
description: What happens each time Autograph 1.x updates, and where to read about upgrading to 2.0.
keywords:
  - autograph
  - upgrade
---

# Upgrade guide

## Every update

Replace both folders, then choose **Update** on the **Add-Ons** screen. See [Installation](../getting-started/installation.mdx#updating).

Within 1.x, updates don't change how signatures are stored, the field settings, or the template tags. Signatures saved by an earlier 1.x release keep working.

## From 1.0.0 to 1.0.1

Nothing to change. Two things behave differently:

- **The scripts load from your themes URL** (`theme_folder_url`) instead of always from `/themes/user/autograph/`. If you copied the folder to the domain root only because 1.0.0 required it, make sure it's also where `theme_folder_url` points.
- **Invalid values are refused.** A submitted value that isn't a PNG signature now fails validation. If you had a script writing something else into the field, it will need to write a PNG data URL.

## Upgrading to 2.0

Autograph 2 is out. A 1.x site updates without changing a template, a stylesheet or an entry, and the 1.x markup and class names are all kept. Its [upgrade guide](/docs/autograph/prologue/upgrade-guide#from-1x-to-20) lists the few things that look or behave differently, and what the update changes in the database.
