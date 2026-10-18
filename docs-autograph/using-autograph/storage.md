---
title: Storage
description: Keep signatures in the entry or save them as PNG files in an upload directory, and what happens when you switch.
keywords:
  - autograph
  - storage
  - upload directory
  - files
---

# Storage

## Introduction

Each Autograph field chooses where new signatures are kept with its **Storage Method** setting. There are two methods, and an add-on can [add its own](../reference/hooks.md).

| Method | What the field saves | Good for |
| --- | --- | --- |
| **In the entry** (the default) | The image itself, as a PNG data URL | Most forms. Nothing to set up, and the signature travels with the entry. |
| **As a file** | The id of a PNG in an upload directory | Large or many signatures, signatures you want in the file manager, or storage such as S3. |

## Saving signatures as files

Set **Storage Method** to **As a file in an upload directory**, then choose **Save To**: an upload directory, or one of its subfolders, listed beneath it. Each new signature becomes a PNG named `signature_{field}_{random}.png`, added to ExpressionEngine's file manager like any upload. It's written through the upload directory's own filesystem, so a directory on S3 or another adapter works as local disk does.

If the upload directory is missing, or a file can't be written, the entry still saves, without the signature, and the reason is in the **Developer Log** (**Tools › Logs › Developer**).

### Editing an entry

When an entry with a file-saved signature is edited, the pad draws the saved signature back. If it's left alone, the entry keeps the same file: nothing is uploaded again. A new signature makes a new file. The old file stays in the upload directory, as any replaced upload does.

The form doesn't post the file's id directly. It posts a token signed with your site's key, so nobody can attach another file from your library to their entry by typing its number.

## Switching methods

Changing **Storage Method** only affects new signatures. Each saved value is read by its shape, not by the field's current setting, so signatures already saved keep displaying wherever they are. An older signature kept in the entry moves to a file the next time that entry is saved with the field set to files.

## When it was signed

Autograph 2 also records when each signature was signed, and who was logged in, in a table of its own, so the field's value stays a plain string. Show it with [`{field:signed_at}`](../reference/template-tags.mdx#signed_at). Saving an entry again with the same signature keeps its first date. Signatures saved before 2.0 have no record.

## Size

Signatures kept in the entry are saved in a column that holds about 16 MB, far more than any signature needs. Use **Max Size (KB)** to refuse unusually large ones.
