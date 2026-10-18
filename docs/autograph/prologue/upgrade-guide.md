---
title: Upgrade guide
description: What happens each time Autograph updates, and where the notes for the next major release will go.
keywords:
  - autograph
  - upgrade
---

# Upgrade guide

## Every update

Replace both folders, then choose **Update** on the **Add-Ons** screen. See [Installation](/docs/autograph/getting-started/installation#updating).

Within 1.x, updates don't change how signatures are stored, the field settings, or the template tags. Signatures saved by an earlier 1.x release keep working.

## From 1.0.0 to 1.0.1

Nothing to change. Two things behave differently:

- **The scripts load from your themes URL** (`theme_folder_url`) instead of always from `/themes/user/autograph/`. If you copied the folder to the domain root only because 1.0.0 required it, make sure it's also where `theme_folder_url` points.
- **Invalid values are refused.** A submitted value that isn't a PNG signature now fails validation. If you had a script writing something else into the field, it will need to write a PNG data URL.

## Upgrading to the next major release

The next major release of Autograph is in progress. Its breaking changes, and the steps to move a 1.x site across, will be listed here before it's released.

Until then, two things in 1.x are worth knowing if you're customising Autograph today, because they're the parts most likely to change:

- **The markup and class names** the pad renders, listed in [Markup](/docs/autograph/reference/markup). If your CSS or JavaScript targets them, expect to update it.
- **The script paths** under `themes/user/autograph/`. Replace that folder as a whole when you update, rather than merging it.
