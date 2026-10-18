---
title: Troubleshooting
description: Fixes for a pad that doesn't appear, signatures that don't save, and Autograph's known limitations.
keywords:
  - autograph
  - troubleshooting
  - known issues
---

# Troubleshooting

## The pad doesn't appear

The field renders a blank space, or a canvas you can't draw on. The scripts haven't loaded. Open your browser's developer tools and check, in order:

1. **Do the scripts load?** `signature_pad.min.js` and `autograph.js` load from `user/autograph/` in your themes URL, usually `/themes/user/autograph/`. If either returns a 404, the `themes/user/autograph` folder is missing or isn't where `theme_folder_url` points. See [The themes folder](./installation.mdx#the-themes-folder).
2. **Does the page print them?** View the page source and look for those two `<script>` tags. In a Channel Form they're missing when the tag has `include_assets="no"` and no `{channel_form_assets}`. See [Scripts](/docs/autograph/using-autograph/channel-forms#scripts).
3. **Is there a JavaScript error?** An error from another script earlier on the page can stop Autograph's from running.

## The signature isn't saved

- **"The signature could not be read."** The value posted wasn't a PNG signature. This happens when a script on the page changes the hidden field, or when the request was tampered with. **Clear** the pad and sign again.
- **Is the field in the form?** The pad must be output with `{field:your_field}` inside `{exp:channel:form}`, so its hidden textarea is posted with the form.
- **In the control panel,** **Save in Control Panel** must be on for editors to sign. With it off, the field is read-only. See [Control panel](/docs/autograph/using-autograph/control-panel).

## Known limitations

These are known in Autograph 1.0.1. Each is planned for the next major release.

### Long signatures are cut off

Signatures are saved in a database column that holds about 64 KB. A very large canvas, or a signature with a great many strokes, can make a PNG bigger than that, and the saved image is cut short or refused, depending on your MySQL settings.

**Workaround:** keep the canvas at the default 400 × 200 or close to it.

### Not available in Grid or Fluid fields

Autograph fields work as ordinary channel fields and as [member fields](/docs/autograph/using-autograph/member-fields). They aren't offered inside Grid or Fluid fields.

### Signatures are always PNGs in the entry

There's no option to save signatures as files in an upload directory, or in another image format.

### Signatures look soft on high-resolution screens

The canvas is drawn at its set size in CSS pixels, so on a high-resolution screen the strokes can look slightly soft. The saved image is the canvas size either way.
