---
title: The Capture tag
sidebar_position: 3
---

# The Capture tag

`{exp:formidable:capture}` reads the HTML5 form markup inside its tag pair,
matches each control to the best fieldtype in the Registry, and creates (or
syncs) a Formidable form and its fields to match -- without you touching the
control panel.

## Basic usage

```
{exp:formidable:capture form="contact"}
<form>
  <input type="text" name="full_name" required>
  <input type="email" name="email" required>
  <textarea name="message"></textarea>
  <input type="checkbox" name="newsletter" value="yes"> Subscribe
  <button type="submit">Send</button>
</form>
{/exp:formidable:capture}
```

On first parse, this creates a form with handle `contact` and one field per
control, matched to the closest fieldtype by tag name, `type` attribute, and
other attributes present (`required`, `pattern`, `min`/`max`, `multiple`, and
so on). Radio and checkbox groups sharing a `name` collapse into a single
options field rather than one field per input.

## Parameters

| Parameter | Description |
| --- | --- |
| `form` | The form handle. Created if it doesn't exist. |
| `sync` | `report` (default) or `update`. `report` flags drift (fields added/removed/changed in the template) without touching the database; `update` writes the drift back automatically. |
| `fallback_fieldtype` | Which fieldtype to use when a control doesn't match anything in the Registry above the matching threshold. |

## Change detection

Every parse computes a checksum of the tagdata. If it hasn't changed since
the last parse, Formidable skips the matching/diff work entirely -- capture
has no meaningful performance cost on a template that isn't actively being
edited. When the checksum *has* changed, Formidable diffs the parsed fields
against what's stored and records what was added, removed, or modified.

## Captured vs. builder forms

A form created by Capture is marked **captured**: its fields are locked in
the control panel, because the template markup is the source of truth. The
Forms list and edit screen show a notice explaining this, with a link to
**Convert to builder form** if you want to take over field management in the
control panel instead (for example, if you're migrating off the template and
want to use the drag-and-drop field builder going forward). Converting is
one-way -- the form keeps its fields and submissions, but future template
changes to the markup are no longer synced.

If a captured form's fields drift out of sync with its template, the notice
lists what changed and offers a **Recapture** link to force a full re-sync on
the next parse.
