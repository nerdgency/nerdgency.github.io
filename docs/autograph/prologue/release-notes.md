---
title: Release notes
description: What's in Autograph 1.0 and 1.0.1, the requirements, and what's known not to work yet.
keywords:
  - autograph
  - release notes
  - 1.0.0
---

# Release notes

## Autograph 1.0.1

A fix release. No template, stylesheet or entry needs to change. Replace both folders and run **Update**.

- **Signatures are checked on the server.** Anything that isn't an intact PNG image is refused, and stored values are checked again before templates and the control panel print them.
- **Undo saves.** Before, the undone stroke was still submitted. Undo also keeps a signature that was saved earlier.
- **Scripts follow your themes URL** (`theme_folder_url`), so subfolder installs and moved themes folders work.
- **Proper button labels:** **Undo**, **Clear** and **Not signed yet.**, instead of the raw language keys.
- Autograph is **no longer offered as a member field type**, because it never saved there.

## Autograph 1.0

Autograph 1.0 is the first release of Autograph, a signature fieldtype for ExpressionEngine.

### Requirements

Autograph 1.0 needs **ExpressionEngine 6.0** or later and **PHP 8.1** or later. See [Installation](/docs/autograph/getting-started/installation).

### What's in it

- **An Autograph fieldtype** for channel fields, with a signing pad built on [Signature Pad](https://github.com/szimek/signature_pad).
- **Channel Form support** with no extra template work. See [Channel Forms](/docs/autograph/using-autograph/channel-forms).
- **Per-field settings** for canvas width, canvas height and pen colour. See [Field settings](/docs/autograph/using-autograph/field-settings).
- **A control panel switch**: let editors sign on the publish form, or show the signature read-only. See [Control panel](/docs/autograph/using-autograph/control-panel).
- **Template tags** for the signature as an `<img>`, its data URL, and the canvas dimensions. See [Template tags](/docs/autograph/reference/template-tags).
- **Undo and Clear** buttons beside every pad.

### Known limitations

Still open in 1.0.1, and listed in [Troubleshooting](/docs/autograph/getting-started/troubleshooting#known-limitations):

- Signatures are stored as PNG images, in the entry itself. Saving to an upload directory isn't available yet.
- Autograph fields can't be used inside Grid or Fluid fields, or as member fields.
