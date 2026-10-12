---
title: How Formidable works
sidebar_position: 1
description: The pieces of Formidable (forms, fields, the Registry, themes, submissions, workflows and connections) and the path a submission takes through them.
keywords:
  - formidable
  - architecture
  - concepts
---

# How Formidable works

Formidable has a small number of pieces. Knowing what each one is for makes the rest of the documentation easier to place.

## The pieces

| Piece | What it is | Where you manage it |
| --- | --- | --- |
| **Form** | A named set of fields, laid out in pages and sections, with its own settings: where to send visitors afterwards, spam protection, storage, its theme and its statuses. | **Formidable › Forms** |
| **Field** | One question on one form. It has a fieldtype, a handle, a label, validation rules, attributes and optional conditions. | The form's builder |
| **Fieldtype** | What kind of field it is: Text, Email, Select, File, Signature, Computed and so on. | **Registry › Fieldtypes** |
| **Registry** | The site's shared vocabulary: fieldtypes and their groups, validation rules, attributes offered in the control panel, and reusable option lists. | The **Registry** button on any Formidable screen |
| **Field Library** | Reusable fields. A form field linked to a library field follows it, except for what the form overrides. | **Formidable › Field Library** |
| **Theme** | The markup a form renders with. Three ship with Formidable. You can copy one into a template group and change any part. | **Formidable › Themes** |
| **Submission** | One visitor's answers to one form, with a status. | The form's **Submissions** |
| **Workflow** | Something that happens after a submission: an email, a webhook call, or a push to a connection. It can have conditions. | The form's **Workflows** tab |
| **Connection** | Saved credentials for a third-party service, used by workflows and by the CAPTCHA fieldtypes. | **Formidable › Connections** |

## Two ways to get a form onto a page

**Build it, then render it.** You build the form in the control panel and place [`{exp:formidable:form}`](/docs/formidable/developer/tags/form) in a template. The tag renders the form from its [theme](./themes.mdx), and you can replace any part of that markup with your own.

**Write it, then capture it.** You write an ordinary HTML form and wrap it in [`{exp:formidable:capture}`](/docs/formidable/developer/tags/capture). Formidable reads the markup and creates or updates the form behind it. Your markup is output unchanged.

Both kinds of form submit, validate, store and run workflows in the same way.

## What happens when someone submits

1. **The page is rendered.** The form tag writes a signed, encrypted `_formidable_meta` value into the form. It records which form this is, the page it was rendered on, and any settings the tag overrode. The server does not trust anything in a submission that is not covered by that signature.
2. **The visitor submits.** The browser posts to Formidable's submit action. On a page with conditions or multiple pages, `formidable.js` shows and hides fields and moves between pages first, but the server decides everything again.
3. **Spam checks run.** These are the honeypots, the per-IP rate limit and duplicate-submission detection. CAPTCHA, Turnstile and hCaptcha are fields, so they are checked during validation.
4. **The form must be open.** A form past its closing date or submission limit, or a members-only form submitted by a guest, is refused even if the page was cached before it closed.
5. **Answers are validated.** Required fields and validation rules are checked on the server. Fields hidden by conditions, or on pages and sections that were skipped, are left out and blanked.
6. **On failure,** the visitor goes back to the form with the errors shown and their answers filled in.
7. **On success, the submission is stored,** unless storage is turned off for the form. Encrypted fields are encrypted before they are written.
8. **The `formidable_submission_complete` hook fires,** for other add-ons.
9. **Workflows run,** each only if its conditions hold. Every run is recorded in the [workflow log](./workflows.mdx#the-workflow-log).
10. **The visitor is redirected** to `return=`, or back to the page they came from, where the form shows its success message.

A submission sent to the [JSON API](/docs/formidable/developer/json-api) goes through the same steps and answers with JSON.

## Getting around: the Jump Menu

Formidable adds its screens to ExpressionEngine's Jump Menu (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>J</kbd>). Type what you are after: **forms**, **create form**, **workflow log**, **themes**, **connections**, **configuration**. Several commands then list your forms to pick from: **edit form…**, **submissions…**, **export…** (CSV) and **workflow log for…**. **find submission…** finds one by number (`31` or `#31`) or by words in its name. You only see the commands your Formidable [permissions](./permissions.md) allow.

## Settings are inherited

Most settings can be set in three places: site-wide on **Formidable › Configuration**, on each form, and on the tag for one render. The most specific one wins, and a blank setting means "inherit". See [Settings and inheritance](./settings-and-inheritance.md).
