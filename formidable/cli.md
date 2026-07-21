---
title: CLI commands
parent: Formidable
nav_order: 9
permalink: /formidable/cli/
---

# CLI commands

Formidable ships three `eecli` commands. All support `--json` for
machine-readable output.

## `formidable:forms`

Lists every form with its handle, type (builder/captured), drift state, and
submission count.

```
php system/ee/eecli.php formidable:forms [--json]
```

## `formidable:submissions`

Lists recent submissions, optionally scoped to one form.

```
php system/ee/eecli.php formidable:submissions [--form=handle] [--limit=20] [--json]
```

{: .note }
Encrypted field values are not decrypted by this command -- use the control
panel's CSV export for that.

## `formidable:capture-status`

Reports capture/drift state for [captured forms](/formidable/capture-tag/):
last capture time, whether the template has drifted from what's stored, and
the specific fields that were added, removed, or modified.

```
php system/ee/eecli.php formidable:capture-status [--form=handle] [--json]
```
