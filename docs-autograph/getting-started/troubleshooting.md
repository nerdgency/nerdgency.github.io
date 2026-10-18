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

The field renders a blank space, or a canvas you can't draw on. The script hasn't loaded. Open your browser's developer tools and check, in order:

1. **Does it load?** `autograph.js` and `autograph.css` load from `user/autograph/` in your themes URL, usually `/themes/user/autograph/`. If either returns a 404, the `themes/user/autograph` folder is missing or isn't where `theme_folder_url` points. See [The themes folder](./installation.mdx#the-themes-folder).
2. **Does the page print it?** View the page source and look for the `autograph.js` `<script>` tag. In a Channel Form it's missing when the tag has `include_assets="no"` and no `{channel_form_assets}`. See [Scripts](../using-autograph/channel-forms.mdx#scripts).
3. **Is there a JavaScript error?** An error from another script earlier on the page can stop Autograph's from running.

## The signature isn't saved

- **"The signature could not be read."** The value posted wasn't a PNG signature. This happens when a script on the page changes the hidden field, or when the request was tampered with. **Clear** the pad and sign again.
- **Is the field in the form?** The pad must be output with `{field:your_field}` inside `{exp:channel:form}`, so its hidden textarea is posted with the form.
- **In the control panel,** **Sign in the Control Panel** must be on for editors to sign. With it off, the field is read-only. See [Control panel](../using-autograph/control-panel.md).
- **"The signature is too large."** It's over the field's **Max Size (KB)**. Raise the limit, or make the canvas smaller.
- **Saved as a file, but the field is empty.** The upload directory is missing, or the file couldn't be written. The reason is in the **Developer Log** (**Tools › Logs › Developer**). See [Storage](../using-autograph/storage.md).

## Known limitations

- **PNG only.** Signatures are always saved as PNG images.
- **Undo history and resizing.** Undo works on the strokes drawn this visit, and they're kept when the pad resizes. A signature saved before the page loaded can be cleared but not undone stroke by stroke.
