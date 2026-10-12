---
title: Configuration
description: The site-wide settings every form inherits, and the health checks that say whether Formidable is set up to work.
keywords:
  - formidable
  - configuration
  - health check
  - settings
---

# Configuration

## Introduction

**Formidable › Configuration** holds the site-wide settings every form starts from: what happens after a submission, the theme, spam protection, the JSON API's defaults, storage and the default status. A form's own settings override them, and a tag parameter overrides both. See [Settings and inheritance](/docs/formidable/building-forms/settings). The page needs the **Manage registry** permission.

A few behaviours are set in your site's `config.php` instead. See the [config.php reference](/docs/formidable/reference/configuration).

## The setup wizard

After installing, the dashboard offers to **set Formidable up**, for members with **Manage registry**. The wizard walks through the choices a new site should make, a step at a time:

| Step | What it covers |
| --- | --- |
| **How forms look** | The theme every form starts from, and the grid its fields are laid out on. |
| **Spam protection** | The honeypots and double-submit protection, with a pointer to Turnstile and hCaptcha. |
| **Email** | Who workflow emails come from, with a button that sends you a test. |
| **What is kept** | Whether submissions and their answers are stored, and save and resume. |
| **Background work** | Whether workflows run in the background, with the `config.php` line and cron jobs to copy. |
| **Ready** | Anything the health checks still flag, and a button to build your first form. |

Every step changes the same settings as this page, so you can skip any of them, leave and come back to where you were, or change your mind here later. Choose **Not now** to stop the dashboard offering it. Run it again any time from **Setup wizard** in this page's header.

## Health checks

At the top of the page, Formidable checks whether it's set up to work, and says what to do about anything that isn't:

| Check | What it looks for | The fix it offers |
| --- | --- | --- |
| **Database** | Every table Formidable needs exists. A table goes missing when the add-on is updated and its migrations haven't run. | The command to run them. |
| **Fieldtypes** | Every fieldtype that ships with Formidable is registered, so the builder offers it. | **Add missing fieldtypes** in [Utilities](./utilities.md). |
| **Encryption** | ExpressionEngine's encryption key is set. Encrypted answers and API keys need it. | The `config.php` line to add. |
| **Email** | The site has a valid email address for workflow emails to come from. | ExpressionEngine's email settings. |
| **Queue worker** | With Formidable's own [workflow queue](/docs/formidable/automation/workflow-log#the-workflow-queue) on, its worker has run in the last 15 minutes. | The cron line. |
| **Waiting runs** | No queued workflow run has waited more than 15 minutes. | The workflow log. |
| **Workflow failures** | No workflow failed in the last day. | The workflow log. |
| **Spam checks** | Every Turnstile or hCaptcha field has an enabled connection to verify against. Without one, its form refuses every submission. | **Connections**. |

A check that doesn't apply to your site, such as the queue worker with the queue off, isn't shown. Anything that needs attention also appears on the [dashboard](./dashboard.md) for members with **Manage registry**.

## Finding a setting

Type in **Search settings**, above the tabs, to see every tab's settings at once: only those whose name or description match, each under its tab's name. Clear the box or press Esc to go back to the tabs.

## Settings fixed in config.php

The rate limit, its window and the duplicate window can also be set in `config.php`, which then wins. The page shows such a setting locked, with the value `config.php` gives it, rather than a box whose value would be ignored. When `config.php` switches the JSON API off, the API settings say so.
