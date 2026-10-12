---
title: Settings
description: Where Formidable's settings live (site-wide, per form, per tag and in config.php) and which one wins.
keywords:
  - formidable
  - settings
  - configuration
  - inheritance
---

# Settings

## Introduction

Most of a form's behaviour can be set in more than one place: for the whole site, on each form, and on the tag for a single render. The rule is the same everywhere:

> **The most specific setting wins, and a blank setting means "inherit".**

That's what lets a tag stay as short as `{exp:formidable:form form_handle="contact_us"}` while still sending visitors somewhere sensible, on your site's grid, with the success message you wrote once in Configuration.

## The four layers

| Layer | Where | Applies to |
| --- | --- | --- |
| 1. Tag parameter | `return="thanks"` or `form:setting:return="thanks"` on `{exp:formidable:form}` | This one render |
| 2. The form | The form's own settings | Every render of this form |
| 3. The site | **Formidable › Configuration** | Every form on the site |
| 4. The shipped default | Built into Formidable | When nothing else is set |

Clearing a box in the control panel sends that setting back to the layer above it, rather than setting it to nothing. For these settings, a blank value has no useful meaning of its own: a blank return URL or a blank column count.

## What inherits

These are the form settings that follow the chain. The tag parameter has the **same name** as the setting, so `return=` and `form:setting:return=` mean the same thing.

| Setting | What it does | Shipped default |
| --- | --- | --- |
| `return` | Where to send the visitor after a successful submission | The page they submitted from |
| `return_on_error` | Where to send them when validation fails | The page they submitted from |
| `success_message` | The message shown after a successful submission | "Thank you — your submission has been received." |
| `members_only`, `members_only_message` | Only logged-in members may submit, and what guests see instead | Open to everyone |
| `theme` | The theme forms render with | Default |
| `email_theme` | The theme workflow emails use | Email |
| `template_columns` | The width of your site's grid. A field's width is scaled to it as `{field_columns}` | 12 |
| `show_instructions` | Instructions above (`t`) or below (`b`) the input | Above |

Other form settings are set on the form, or on the tag with `form:setting:NAME=` for one render:

| Setting | What it does |
| --- | --- |
| `enable_storage` | Store submissions at all. Off means **workflows only**: emails and connections still run, but nothing is kept. |
| `store_submission_data` | Keep the answers on the stored submission. Workflows always receive the answers either way. |
| `submission_name` | How each stored submission is named in the listing. |
| `enable_honeypot`, `enable_honeypot_js` | The two honeypots. See [Spam protection and security](/docs/formidable/submissions/spam-and-security). |
| `disable_submit_on_process` | Disable the submit button while the form is sending, to stop double submissions. |

Settings changed on the tag that affect what is stored (`enable_storage`, `store_submission_data`, `submission_name`) travel to the server inside the signed form meta, so a visitor cannot change them.

## The Configuration screen

**Formidable › Configuration** holds the site layer, in these groups:

| Group | Holds |
| --- | --- |
| **Forms** | `return`, `return_on_error`, `success_message`, members only and its message, and the email theme. |
| **Templating** | The site theme, the grid width, where instructions go, and site-wide classes and attributes for every part of a form. See [Regions and attributes](/docs/formidable/displaying-forms/regions-and-attributes). |
| **Spam** | The honeypots, disabling the submit button while sending, the per-IP rate limit and the duplicate window. |
| **API** | Whether this site's own pages may use the JSON API without a key, and whether members may read their own submissions. See [JSON API](/docs/formidable/headless/json-api). |
| **Submissions** | Storage defaults and how submissions are named. |
| **Statuses** | The statuses submissions can have. |

## config.php

A few behaviours are set in `system/user/config/config.php`, with keys prefixed `formidable_`. These survive add-on updates. The spam tunables (`formidable_rate_limit`, `formidable_rate_window`, `formidable_duplicate_window`) can also be set in **Configuration › Spam**. When both are set, `config.php` wins.

```php title="system/user/config/config.php"
$config['formidable_rate_limit'] = 20;     // submissions per IP per window; 0 turns the limit off
$config['formidable_workflow_log_days'] = 90;
```

Every key is listed in [Configuration](/docs/formidable/reference/configuration).
