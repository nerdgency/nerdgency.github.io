---
title: Changelog
description: Every Autograph release, newest first, with its requirements and what each one added, fixed or changed.
keywords:
  - autograph
  - changelog
  - updates
  - versions
---

# Changelog

Every release and every change a site might notice, newest first. What's still known not to work is under [Known limitations](../getting-started/troubleshooting.md#known-limitations). Autograph follows [semantic versioning](https://semver.org/):

- **Patch releases** (1.0.x) fix things.
- **Minor releases** (1.x.0) add things without breaking anything.
- **Nothing breaking** ships before 2.0.0, so any 1.x update is a matter of replacing the two folders and running ExpressionEngine's update. See the [upgrade guide](./upgrade-guide.md).

## 2.0.0 — 18 October 2026

Needs **ExpressionEngine 7.0** or later and **PHP 8.1** or later. Read the [upgrade guide](./upgrade-guide.md#from-1x-to-20) before updating from 1.x: nothing in your templates needs to change, but a few things look or behave differently.

### Added

- **Signatures as files.** A **Storage Method** setting: in the entry, as before, or as a PNG in an upload directory or one of its subfolders, including S3 and other adapters. Changing it leaves saved signatures where they are. See [Storage](../using-autograph/storage.md).
- **A responsive pad.** **Display Width** and **Max Width** settings. The pad fills its space, keeps the canvas's shape, and stays sharp on high-resolution screens. The saved image is always the canvas size.
- **More pad settings:** **Pen Width**, **Background Color**, **Show Border**, **Placeholder** and **Allow Undo**.
- **Grid and Fluid.** Autograph can be a Grid column or a Fluid field. See [Grid and Fluid](../using-autograph/grid-and-fluid.md).
- **When it was signed.** A record of when each signature was signed, and by whom, shown with `{field:signed_at}`.
- **Template tags:** `alt=`, `class=`, `width=` and `height=` on `{field}`, and `:signed_at`, `:is_file`, `:file_id` and `:mime`. See [Template tags](../reference/template-tags.mdx).
- **A JavaScript API and events,** on each pad's element, and `Autograph.initAll()` for forms added later. See [JavaScript](../reference/javascript.mdx).
- **A required-field message** before a form with an empty required pad is sent, and a message for visitors without JavaScript.
- **Max Size (KB)** refuses unusually large signatures.
- **The `autograph_storage_providers` hook,** for add-ons to add storage methods. See [Hooks](../reference/hooks.md).
- **A control panel card** for saved signatures, with when it was signed, **Open** for files, and **Remove**.

### Changed

- `{field}` outputs nothing for an unsigned entry, instead of an `<img>` with an empty `src`.
- Existing Autograph columns are widened from BLOB to MEDIUMTEXT, so long signatures aren't cut off.
- SignaturePad 5 is bundled into `autograph.js`, and a small `autograph.css` is added.
- The pad is focusable, labelled for screen readers, and shows a focus ring.
- "Save in Control Panel" is renamed "Sign in the Control Panel".
- Autograph is now by Nerdgency.

## 1.0.1

A fix release. No template, stylesheet or entry needs to change.

### Security

- **Signatures are checked on the server.** A submitted value must be an intact PNG image, or the entry is refused with "The signature could not be read." What's saved is re-encoded from the checked image, never the text that was posted.
- **Stored values are checked before they're printed.** `{field}`, `{field:url}` and the control panel print a saved value only if it's a PNG data URL, so a value saved before 1.0.1 can't break out of the image's `src` attribute.

### Fixed

- **Undo** now updates the saved signature. Before, the undone stroke was still submitted. See [The pad](../using-autograph/channel-forms.mdx#the-pad).
- **Undo over a saved signature** no longer wipes it. When an entry is edited, undoing a new stroke keeps the signature that was already there.
- **Scripts** load from your themes URL (`theme_folder_url`) instead of always from `/themes/user/autograph/`, so subfolder installs and moved themes folders work. The file names haven't changed. See [The themes folder](../getting-started/installation.mdx#the-themes-folder).
- **Labels:** the buttons read **Undo** and **Clear**, and an unsigned field in the control panel reads **Not signed yet.**, instead of the raw keys `undo`, `clear` and `no_autograph`. The field settings' labels no longer depend on another part of ExpressionEngine having loaded its language file.
- **Control panel:** the saved signature's image has alt text.
- **Member fields work.** Autograph was offered as a member field type, but signatures never saved there. They now save from a member's profile in the control panel, from `{exp:member:registration_form}` and from `{exp:member:edit_profile}`, where Autograph prints the pad's scripts itself. See [Member fields](../using-autograph/member-fields.mdx).

### Changed

- **Markup:** in Channel Forms, the canvas's second `class` attribute is merged into the first, so `autograph-manager-canvas` now applies alongside `ft-autograph`. See [Markup](../reference/markup.mdx).
- **Add-on icon** redrawn to match Nerdgency's other add-ons.
- Removed unused code that could have written a stray `test2.png` to an upload directory.

## 1.0.0

The first release of Autograph, a signature fieldtype for ExpressionEngine.

### Requirements

**ExpressionEngine 6.0** or later and **PHP 8.1** or later. See [Installation](../getting-started/installation.mdx).

### Added

- **An Autograph fieldtype** for channel fields, with a signing pad built on [Signature Pad](https://github.com/szimek/signature_pad).
- **Channel Form support** with no extra template work. See [Channel Forms](../using-autograph/channel-forms.mdx).
- **Per-field settings** for canvas width, canvas height and pen colour. See [Field settings](../using-autograph/field-settings.md).
- **A control panel switch**: let editors sign on the publish form, or show the signature read-only. See [Control panel](../using-autograph/control-panel.md).
- **Template tags** for the signature as an `<img>`, its data URL, and the canvas dimensions. See [Template tags](../reference/template-tags.mdx).
- **Undo and Clear** buttons beside every pad.
