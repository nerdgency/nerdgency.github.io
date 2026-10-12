---
title: How it works
description: The pieces of Formidable (forms, fields, the Registry, themes, submissions, workflows and connections) and the path a submission takes through them.
keywords:
  - formidable
  - architecture
  - concepts
---

# How it works

Formidable is made of a small number of pieces. Once you know what each one is for, the rest of the documentation falls into place.

## The pieces

| Piece | What it is | Where it lives |
| --- | --- | --- |
| **Form** | A named set of fields laid out in pages and sections, with its own settings: where visitors go afterwards, spam protection, storage, theme and statuses. | **Formidable › Forms** |
| **Field** | One question on a form, with a fieldtype, a handle, a label, validation, attributes and optional conditions. | The form's builder |
| **Fieldtype** | What kind of field it is: Text, Email, Select, File, Signature, Computed… | **Registry › Fieldtypes** |
| **Registry** | Your site's shared vocabulary: fieldtypes, validation rules, attributes and reusable option lists. | **Formidable › Registry** |
| **Field Library** | Reusable fields. A field linked to the library follows it, except for what the form overrides. | **Formidable › Field Library** |
| **Theme** | The markup a form renders with. Three ship with Formidable; copy one into a template group to change it. | **Formidable › Themes** |
| **Submission** | One visitor's answers to one form, with a status. | The form's **Submissions** |
| **Workflow** | Something that happens after a submission: an email, a webhook, or a push to a connection. | The form's **Workflows** tab |
| **Connection** | Saved credentials for a third-party service, used by workflows and the CAPTCHA fieldtypes. | **Formidable › Connections** |

## Two ways to put a form on a page

**Build it, then render it.** Build the form in the control panel, then place [`{exp:formidable:form}`](/docs/formidable/reference/tags/form) in a template. The tag renders the form from its [theme](/docs/formidable/displaying-forms/themes), and you can replace any part of that markup with your own.

**Write it, then capture it.** Write an ordinary HTML form and wrap it in [`{exp:formidable:capture}`](/docs/formidable/reference/tags/capture). Formidable reads your markup and creates or updates the form behind it. Your markup is output exactly as you wrote it.

Either way, the form submits, validates, stores and runs workflows the same way.

## The life of a submission

Here's everything that happens between a visitor pressing **Submit** and seeing your thank-you message.

1. **The page is rendered.** The form tag writes a signed, encrypted `_formidable_meta` value into the form. It records which form this is, where it was rendered, and any settings the tag overrode. The server trusts nothing in a submission that this signature doesn't cover.
2. **The visitor submits.** On a page with conditions, pages or repeating sections, `formidable.js` shows and hides fields and moves between pages first. The server will decide all of that again.
3. **Spam checks run:** the honeypots, the per-IP rate limit and duplicate detection. CAPTCHA, Turnstile and hCaptcha are fields, so they're checked with the rest of the answers.
4. **The form must still be open.** A form past its closing date or submission limit, or a members-only form submitted by a guest, is refused, even from a page cached before it closed.
5. **Answers are validated** on the server. Fields hidden by conditions, or on pages and sections that were skipped, are left out and blanked.
6. **If anything fails,** the visitor goes back to the form with the errors shown and their answers filled in.
7. **Otherwise the submission is stored,** unless the form is set not to store submissions. Encrypted fields are encrypted before they're written.
8. **Other add-ons hear about it** through the [`formidable_submission_complete`](/docs/formidable/extending/hooks) hook.
9. **Workflows run,** each only if its conditions hold, straight away or through a queue. Every run is recorded in the [workflow log](/docs/formidable/automation/workflow-log).
10. **The visitor is redirected** to `return=`, or back to the page they came from, where the form shows its success message.

A submission sent to the [JSON API](/docs/formidable/headless/json-api) takes the same path and answers with JSON instead.

## Settings are inherited

Most settings can be made in three places: for the whole site on **Formidable › Configuration**, on each form, and on the tag for a single render. The most specific wins, and a blank setting means "inherit". See [Settings](/docs/formidable/building-forms/settings).

## Getting around

Formidable's sidebar shows the screens your permissions open, grouped into forms, automation, design and settings. The [dashboard](/docs/formidable/control-panel/dashboard) is the front page.

Formidable also adds itself to ExpressionEngine's **Jump Menu** (<kbd>Cmd</kbd> / <kbd>Ctrl</kbd> + <kbd>J</kbd>). Type what you're after, like **forms**, **workflow log**, **themes** or **utilities**. Several commands then list your forms to pick from: **edit form…**, **submissions…**, **export…** and **workflow log for…**. **find submission…** finds one by number (`31` or `#31`) or by words in its name.
