---
title: The Form tag
parent: Formidable
nav_order: 3
permalink: /formidable/form-tag/
---

# The Form tag

`{exp:formidable:form}` renders and processes a form that was either built in
the control panel or captured from a template. It handles validation,
storage, anti-spam, and (on success) triggers the form's workflows.

## Basic usage

```
{exp:formidable:form form="contact"}
```

## Parameters

| Parameter | Description |
| --- | --- |
| `form` | The form handle to render/process. |
| `load_js` | `yes` (default) or `no`. Set to `no` if you want to load the [conditions JavaScript](#conditional-fields-on-the-front-end) yourself instead of having it injected into `<head>`. |

## Variables

Within the tag pair, form-level variables (`{form_name}`, `{form_handle}`),
per-field variables (`{field_name}`, `{field_handle}`, `{field_is_required}`,
`{field_attributes}`, ...), and error/repopulation variables for a failed
submission are available. Field loops give you access to each field's
current value after a failed submission, so re-rendering the form
preserves what the visitor already typed.

## Conditional fields on the front end

If any field has [conditions](/formidable/conditions/) configured, the form
tag injects a small vanilla-JS file into the page `<head>` (via a
`template_post_parse` hook) that watches the relevant inputs and
shows/hides/requires fields exactly as configured -- mirroring the same
evaluation logic enforced server-side, so what the visitor sees always
matches what's actually validated on submit. Set `load_js="no"` on the tag
if you'd rather include `themes/user/formidable/js/formidable.min.js`
yourself (for bundling, CSP, or timing reasons).

## Anti-spam

Submissions are protected by a honeypot field, a rate limit, duplicate
submission detection, and an optional CAPTCHA -- all applied before
validation runs, so spam doesn't get as far as touching your validation
rules or workflows.

## What happens on a valid submission

1. The submission is validated against each field's rules (including any
   `require if` conditions that are currently active).
2. If **Store Submissions** is enabled for the form, the submission and its
   values are saved (per-field encryption is honored where configured).
3. Any workflow whose event and conditions match runs its action --
   sending an email, calling a webhook, or pushing to a connection. See
   [Workflows](/formidable/workflows/).
