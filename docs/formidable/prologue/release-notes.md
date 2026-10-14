---
title: Release notes
description: What's new in Formidable 1.0, its requirements, and what's known not to work yet.
keywords:
  - formidable
  - release notes
  - changelog
  - 1.0.0
---

# Release notes

Formidable 1.0 is the first public release of Formidable, a forms add-on for ExpressionEngine. This page covers what's in it. If you ran a pre-release build, read the [upgrade guide](./upgrade-guide.md) too.

## Requirements

Formidable 1.0 needs **ExpressionEngine 7.5** or later and **PHP 8.2** or later. The installer checks your PHP version and refuses to install on anything older. See [Installation](/docs/formidable/getting-started/installation).

## Building forms

- **A visual builder** with pages, sections and a twelve-column grid. Every drag has a keyboard equivalent, and an **Overview** draws the form's conditions as sentences, with lines to the fields they read. See [Forms](/docs/formidable/building-forms/forms).
- **38 fieldtypes** in four groups: inputs, dates and times, options, and special fields. Among them: name and address fields in parts, consent with a record of what was agreed, ratings, scales, image choices and a Likert matrix, a toggle, attribution, file uploads, a signature pad, computed values, ExpressionEngine's CAPTCHA, Cloudflare Turnstile and hCaptcha. See [Fieldtypes](/docs/formidable/building-forms/fieldtypes).
- **Conditions** that show, hide or require fields, skip pages and hide sections, evaluated the same way in the browser and on the server. See [Conditions](/docs/formidable/building-forms/conditions).
- **Repeating sections**: "Add another" rows, conditions within a row or across rows, and `sum()`, `count()` and `average()` for totals. See [Repeating sections](/docs/formidable/building-forms/repeating-sections).
- **Computed fields** that work out a value from other answers as the visitor types, and again on the server. See [Computed fields](/docs/formidable/building-forms/computed-fields).
- **Default values with variables**: the logged-in member, the current page, today's date, the site, and your own Template Variables. **Insert variable** lists them. See [Fields](/docs/formidable/building-forms/fields#default-values).
- **Built-in option lists**: countries, languages, U.S. states, Canadian provinces and territories, days, weeks and months.
- **A Field Library** of reusable fields that forms link to and override, and **Duplicate** for whole forms.
- **Limits and access**: a closing date, a maximum number of submissions, and members-only forms.
- **The Formidable Form channel field**, so editors can put a form on an entry, including inside Grid, Fluid, Bloqs and Pro Variables.

## Displaying forms

- **One tag**, `{exp:formidable:form}`, renders a complete form from a theme, and every layer of it can be replaced with your own markup. See [Rendering a form](/docs/formidable/displaying-forms/rendering).
- **Three themes**, Default, Tailwind and Bootstrap 5, plus an Email theme. Copy any of them into a template group and change it part by part. See [Themes](/docs/formidable/displaying-forms/themes).
- **Regions**: classes and attributes for every part of a form, set in the control panel or on the tag. See [Regions and attributes](/docs/formidable/displaying-forms/regions-and-attributes).
- **Capture**: build a form from existing hand-written markup with `{exp:formidable:capture}`. See [Capturing forms](/docs/formidable/displaying-forms/capturing-forms).
- **Accessible by default**: instructions and errors are linked to their inputs with `aria-describedby`, and fields with errors get `aria-invalid`.

## Submissions

- **A submissions listing** with filters, chosen columns, saved views, statuses, editing and bulk deletion. Repeating sections are edited row by row. See [Managing submissions](/docs/formidable/submissions/managing-submissions).
- **Exports** to CSV, JSON, XML and plain text, matching the current filter and columns, with an option for one line per repeated row.
- **Encryption at rest**, per field.
- **Save and resume**: a **Save and continue later** button, autosave on each page, resume links, and reminders for people who didn't finish. See [Save and resume](/docs/formidable/submissions/save-and-resume).
- **Front-end editing**: let a visitor change their own answers with `submission_handle=`. See [Front-end editing](/docs/formidable/submissions/front-end-editing).

## Automation

- **Workflows** that send email, call a signed webhook or push to a connection, each with its own conditions. They run when a submission is created, updated or moved to another status, and when a draft is saved or due a reminder. See [Workflows](/docs/formidable/automation/workflows).
- **A workflow queue** that runs workflows in the background with retries, using BoldMinded's Queue add-on when it's installed. See [The workflow log and queue](/docs/formidable/automation/workflow-log).
- **Connections** for Mailchimp, Campaign Monitor, Constant Contact, Dotdigital, HubSpot, Salesforce and Mailjet. See [Connections](/docs/formidable/automation/connections).
- **A workflow log** recording each run, what it sent and what came back, encrypted at rest, with **Run again**.
- **Dynamic recipients**: visitors choose who receives their message, and the addresses never reach the page.

## The control panel

- **A dashboard** with your forms, the latest submissions, a fourteen-day chart, workflow health and what needs attention. See [Dashboard](/docs/formidable/control-panel/dashboard).
- **Utilities**: manage API keys, and run any of Formidable's commands from the browser. See [Utilities](/docs/formidable/control-panel/utilities).
- **Health checks** on Configuration and the dashboard: missing tables or fieldtypes, the encryption key, the queue worker, failing workflows, CAPTCHA fields without a connection, and connections whose credentials stopped working. Each comes with its fix. See [Configuration](/docs/formidable/control-panel/configuration#health-checks).
- **Eight permissions** to grant roles separately, with a sidebar that shows each member only the screens they can open. See [Permissions](/docs/formidable/control-panel/permissions).
- **Jump Menu** commands for every Formidable screen, picking a form to edit, view or export, and finding a submission by number.

## For developers

- **A JSON API** for forms and submissions, with keyless access from your own pages and scoped, hashed keys for everything else. See [JSON API](/docs/formidable/headless/json-api).
- **Forms as JSON** with `output="json"`, for headless front ends. See [Form JSON](/docs/formidable/headless/form-json).
- **20 extension hooks** through submitting, workflows, exports, rendering and the API, plus ExpressionEngine's model hooks for every Formidable model. See [Extension hooks](/docs/formidable/extending/hooks).
- **Your own fieldtypes and connection providers**, registered from your add-on. See [Custom fieldtypes](/docs/formidable/extending/custom-fieldtypes) and [Custom connections](/docs/formidable/extending/custom-connections).
- **Fifteen commands** for the command line, also runnable from Utilities. See [Command line](/docs/formidable/reference/command-line).

## Security

Signed and encrypted form meta, CSRF protection on every submission (AJAX included), two honeypots, a per-IP rate limit, duplicate detection, a return-URL allow list, and escaped output throughout. See [Spam and security](/docs/formidable/submissions/spam-and-security).

## Known limitations

- **Multi-page forms submit once.** Pages step in the browser and the whole form is submitted at the end. With `page=`, each page renders in its own request as its own submission.
- **One level of repeating.** A repeating section can't contain another, and can't span pages.
