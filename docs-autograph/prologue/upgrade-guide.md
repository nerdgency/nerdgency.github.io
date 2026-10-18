---
title: Upgrade guide
description: What happens each time Autograph updates, and how a 1.x site moves to 2.0.
keywords:
  - autograph
  - upgrade
---

# Upgrade guide

## Every update

Replace both folders, then choose **Update** on the **Add-Ons** screen. See [Installation](../getting-started/installation.mdx#updating).

Within a major version, updates don't change how signatures are stored, the field settings, or the template tags. Signatures saved by an earlier release keep working.

## From 1.0.0 to 1.0.1

Nothing to change. Two things behave differently:

- **The scripts load from your themes URL** (`theme_folder_url`) instead of always from `/themes/user/autograph/`. If you copied the folder to the domain root only because 1.0.0 required it, make sure it's also where `theme_folder_url` points.
- **Invalid values are refused.** A submitted value that isn't a PNG signature now fails validation. If you had a script writing something else into the field, it will need to write a PNG data URL.

## From 1.x to 2.0

Autograph 2.0 is built so a 1.x site updates without changing a template, a stylesheet or an entry. Fields keep behaving as they did until you edit their settings, and every saved signature keeps displaying.

### Before you update

- **ExpressionEngine 7.0 or later.** Autograph 2 won't install or update on ExpressionEngine 6, and says so on the **Add-Ons** screen without changing anything.
- **Replace both folders whole,** rather than merging them. `themes/user/autograph/` now holds `autograph.js` and `autograph.css`.

### What the update does

- **Widens existing Autograph columns** from BLOB (64 KB) to MEDIUMTEXT, so long signatures aren't cut off. No saved value changes.
- **Adds a table** recording when each new signature was signed, for [`{field:signed_at}`](../reference/template-tags.mdx#signed_at). Signatures saved before 2.0 have no date.

### What changes

- **`{field}` outputs nothing for an unsigned entry.** 1.x output an `<img>` with an empty `src`. It also adds `alt=""` to the `<img>`, and takes `alt=`, `class=`, `width=` and `height=` parameters. See [Template tags](../reference/template-tags.mdx#field_name).
- **A small default stylesheet.** `autograph.css` lays out the pad and its buttons. Its rules have no specificity, so your own CSS still wins. See [Styling the pad](../using-autograph/channel-forms.mdx#styling-the-pad).
- **The markup gains classes,** `autograph__*`, beside the 1.x ones, which all stay. The canvas's `tabindex` is now `0` rather than `1`. See [Markup](../reference/markup.mdx#from-1x).
- **`signature_pad.min.js` is no longer loaded.** SignaturePad 5 is bundled into `autograph.js`. The file is still there, empty, so a template that adds it by hand doesn't get a 404, and `window.SignaturePad` is still set. Both go in Autograph 3.
- **"Save in Control Panel" is now "Sign in the Control Panel"**, and with it off the control panel shows a card with **Open** and **Remove** instead of a bare image. See [Control panel](../using-autograph/control-panel.md).
- **The pad never overflows its container.** A 1.x field keeps its fixed width, but on a screen narrower than that width it shrinks to fit, keeping its shape.

### After updating

Edit a field's settings to use what's new in 2.0: a responsive **Display Width**, **Show Border**, a **Placeholder**, a **Background Color**, saving [as files](../using-autograph/storage.md), and Grid and Fluid.
