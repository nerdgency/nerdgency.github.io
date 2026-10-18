---
title: Changelog
description: Every Formidable release, newest first, with its requirements and what each one added or fixed.
keywords:
  - formidable
  - changelog
  - updates
  - versions
---

# Changelog

Every release and every change a site might notice, newest first. Formidable follows [semantic versioning](https://semver.org/):

- **Patch releases** (1.0.x) fix things.
- **Minor releases** (1.x.0) add things without breaking anything.
- **Nothing breaking** ships before 2.0.0, so any 1.x update is a matter of copying the files and running ExpressionEngine's update. See the [upgrade guide](./upgrade-guide.md).

## 1.1.0 — 18 October 2026

Adds capture-tag success messages and forms kept in code, and fixes the command line on ExpressionEngine 7.5. Copy the new files over the old ones and run ExpressionEngine's update. Nothing in your templates needs to change.

### Added

- **Capture tag:** the same success variables as the form tag, `{form_success}`, `{form_success_message}` and the rest, so a hand-written form can show its thank-you message. See [Saying thank you](/docs/formidable/displaying-forms/capturing-forms#saying-thank-you).
- **Keeping forms in code:** `formidable:form:import --update` updates an existing form from its document instead of making a new one, keeping its submissions. Removed fields are kept unless you ask, a field with answers is never removed, a changed fieldtype is refused, and anything changed in the control panel since the last update is refused rather than silently replaced. See [Keeping forms in code](/docs/formidable/building-forms/blueprints#keeping-forms-in-code).
- **Blueprints:** a connection workflow (Mailchimp, HubSpot and the rest) now travels with its connection, list and field mapping, and arrives switched on when the site has a connection of that name.

### Fixed

- **Condition builder:** in a condition on a field with several options (checkboxes or a multi-select), the options list had no space between each checkbox and its label. The same list in the Submissions columns picker is fixed too.
- **Command line:** every `formidable:*` command, and `php eecli.php list` itself, stopped with a fatal error on ExpressionEngine 7.5.
- **Hand-written markup:** `{value:HANDLE}` and `{error:HANDLE}` printed as literal text until a submission failed. They're now empty on a first visit, in the [capture tag](/docs/formidable/reference/tags/capture) and the [form tag](/docs/formidable/reference/tags/form).
- **Capture tag:** markup with ExpressionEngine conditionals inside an input's tag (`required{if "{error:name}" != ""} aria-invalid="true"{/if}`) was misread, so the field lost "required" and the form was reported as changed on every visit. A Turnstile or hCaptcha field is no longer reported as removed from the markup, a form already captured is read again after updating, and a form rendered with `sync="off"` is no longer shown as changed from an old capture.
- **Control panel:** conditions saved from a field, workflow or action editor were stored as text instead of the list the builder stores. Both still work; new saves store the list.
- **`return=`:** a full URL such as `{page_url}` was doubled into `https://host/https://host/…`, and hosts listed in `formidable_return_hosts` could never be reached. A full URL on the site or an allowed host is now used as written.
- **Capture tag:** with the form's JavaScript honeypot on, every submission was counted as spam and nothing was stored or sent, while the visitor still saw the success page. The tag now loads `formidable.js`. `include_js="no"` leaves it out, as on the form tag.

### Documentation

- `{if error:email}` never matches, because ExpressionEngine reads the part after the colon as a modifier. The examples now use the quoted form, `{if "{error:email}" != ""}`, which works.

## 1.0.0 — 14 October 2026

The first public release. Needs **ExpressionEngine 7.5** or later and **PHP 8.2** or later; the installer refuses anything older. If you ran a pre-release build, read the [upgrade guide](./upgrade-guide.md). See [Installation](/docs/formidable/getting-started/installation).

### Building forms

- **A visual builder** with pages, sections and a twelve-column grid, keyboard equivalents for every drag, and an **Overview** that reads the form's conditions as sentences. See [Forms](/docs/formidable/building-forms/forms).
- **38 fieldtypes**, among them names and addresses in parts, consent, ratings, scales, image choices, a Likert matrix, file uploads, signatures, computed values, CAPTCHA, Turnstile and hCaptcha. See [Fieldtypes](/docs/formidable/building-forms/fieldtypes).
- **Conditions** that show, hide or require fields, skip pages and hide sections, in the browser and on the server. See [Conditions](/docs/formidable/building-forms/conditions).
- **Repeating sections** with conditions inside and across rows, and `sum()`, `count()` and `average()`. See [Repeating sections](/docs/formidable/building-forms/repeating-sections).
- **Computed fields**, worked out as the visitor types and again on the server. See [Computed fields](/docs/formidable/building-forms/computed-fields).
- **Default values with variables** (the member, the page, today, your Template Variables), **built-in option lists**, a **Field Library**, **Duplicate**, and **limits** (a closing date, a maximum number of submissions, members only). See [Fields](/docs/formidable/building-forms/fields#default-values).
- **The Formidable Form channel field**, including inside Grid, Fluid, Bloqs and Pro Variables.

### Displaying forms

- **One tag**, `{exp:formidable:form}`, with every layer replaceable by your own markup. See [Rendering a form](/docs/formidable/displaying-forms/rendering).
- **Default, Tailwind and Bootstrap 5 themes**, plus an Email theme, each copyable and changeable part by part. See [Themes](/docs/formidable/displaying-forms/themes).
- **Regions**: classes and attributes for every part of a form. See [Regions and attributes](/docs/formidable/displaying-forms/regions-and-attributes).
- **Capture** a form from hand-written markup with `{exp:formidable:capture}`. See [Capturing forms](/docs/formidable/displaying-forms/capturing-forms).
- **Accessible by default**: instructions and errors linked with `aria-describedby`, and `aria-invalid` on fields with errors.

### Submissions

- **A submissions listing** with filters, columns, saved views, statuses, editing and bulk deletion. See [Managing submissions](/docs/formidable/submissions/managing-submissions).
- **Exports** to CSV, JSON, XML and plain text, and **encryption at rest** per field.
- **Save and resume**, with autosave, resume links and reminders. See [Save and resume](/docs/formidable/submissions/save-and-resume).
- **Front-end editing** with `submission_handle=`. See [Front-end editing](/docs/formidable/submissions/front-end-editing).

### Automation

- **Workflows** that email, call a signed webhook or push to a connection, each with its own conditions, on create, update, status change and drafts. See [Workflows](/docs/formidable/automation/workflows).
- **Connections** for Mailchimp, Campaign Monitor, Constant Contact, Dotdigital, HubSpot, Salesforce and Mailjet. See [Connections](/docs/formidable/automation/connections).
- **A queue** with retries (using BoldMinded's Queue when installed), and **a workflow log**, encrypted at rest, with **Run again**. See [The workflow log and queue](/docs/formidable/automation/workflow-log).
- **Dynamic recipients** whose addresses never reach the page.

### The control panel

- **A dashboard** with forms, recent submissions, a fourteen-day chart and what needs attention. See [Dashboard](/docs/formidable/control-panel/dashboard).
- **Health checks**, each with its fix, on Configuration and the dashboard. See [Configuration](/docs/formidable/control-panel/configuration#health-checks).
- **Utilities** for API keys and running commands, **eight permissions**, and **Jump Menu** commands. See [Utilities](/docs/formidable/control-panel/utilities) and [Permissions](/docs/formidable/control-panel/permissions).

### For developers

- **A JSON API** with keyless access from your own pages and scoped, hashed keys. See [JSON API](/docs/formidable/headless/json-api).
- **Forms as JSON** with `output="json"`. See [Form JSON](/docs/formidable/headless/form-json).
- **20 extension hooks**, plus your own **fieldtypes** and **connection providers**. See [Extension hooks](/docs/formidable/extending/hooks).
- **Fifteen commands**, also runnable from Utilities. See [Command line](/docs/formidable/reference/command-line).

### Security

Signed and encrypted form meta, CSRF protection (AJAX included), two honeypots, a per-IP rate limit, duplicate detection, a return-URL allow list, and escaped output throughout. See [Spam and security](/docs/formidable/submissions/spam-and-security).

### Known limitations

- **Multi-page forms submit once.** Pages step in the browser and the whole form is submitted at the end. With `page=`, each page renders in its own request as its own submission.
- **One level of repeating.** A repeating section can't contain another, and can't span pages.
