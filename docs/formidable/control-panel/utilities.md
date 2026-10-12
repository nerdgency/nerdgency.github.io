---
title: Utilities
description: Manage the JSON API's keys, and run any of Formidable's commands from the control panel when the command line is out of reach.
keywords:
  - formidable
  - utilities
  - api keys
  - commands
---

# Utilities

## Introduction

**Formidable › Utilities** holds two things: the keys other sites and apps use to reach your [JSON API](/docs/formidable/headless/json-api), and Formidable's commands, for when you can't get to the command line.

Each half has its own permission. The page opens for **Manage API keys** or **Run commands**, and shows only what you may use.

<Screenshot
  img={require('@site/static/img/screenshots/formidable/utilities.png')}
  alt="The Utilities page, with the output of List every form at the top, the API keys card and the commands below"
  caption="Formidable › Utilities"
  captured="ExpressionEngine 7.5.26, demo data"
/>

## API keys

The **API Keys** card lists your site's latest keys: each one's name, the first characters of the key (so you can recognise it), what it's allowed to do, which forms it reaches, when it was last used, and whether it's on.

- **New key** issues a key. It's shown **once**, when you save. Only a hash is stored, so a lost key is replaced, never recovered.
- **Manage** opens the full list, where keys are edited, switched off and revoked.
- **API settings** opens the API group on **Formidable › Configuration**, with **Manage registry**.

Your site's own pages don't need a key at all. See [Authentication](/docs/formidable/headless/json-api#who-may-call-it).

## Commands

Every one of Formidable's [command-line commands](/docs/formidable/reference/command-line) can run here, with a plain-English name and its options as form fields:

| Section | Command | Does the same as |
| --- | --- | --- |
| **Forms** | List every form | `formidable:forms` |
| | Check captured forms for changes | `formidable:capture-status` |
| | Recalculate computed answers | `formidable:recalculate` |
| **Submissions and drafts** | List the latest submissions | `formidable:submissions` |
| | Delete expired drafts | `formidable:drafts:prune` |
| | Send draft reminders | `formidable:drafts:remind` |
| | Upgrade encrypted answers | `formidable:seal-encrypted` |
| **Workflows** | Run queued workflows | `formidable:workflows:work` |
| **Themes** | Show where theme parts come from | `formidable:theme:status` |
| | Copy a theme into a template group | `formidable:theme:copy` |
| | Write classes for a CSS build | `formidable:theme:classes` |
| **Registry** | Add missing fieldtypes | `formidable:sync-fieldtypes` |

Fill in any options and choose **Run**. The output appears at the top of the page, exactly as the command line would print it. Each card shows its command-line equivalent, so you can move a job to cron later.

- **Same code, same rules.** A command runs identically from here and from the terminal: the same checks, the same limits, the same messages.
- **Commands that change things ask first.** Recalculating, pruning, sending reminders and copying themes all confirm before they run.
- **No questions.** A command that would ask something on the command line, such as which template group to copy into, needs that field filled in instead.
- **Long jobs suit the command line.** A browser request has time limits a terminal doesn't. On a large site, run long recalculations from the command line, or use the form's **Recalculate** page, which works in chunks.

### Who may run what

**Run commands** opens the door, and each command also needs the permission for what it touches:

| Commands | Also need |
| --- | --- |
| List every form, Check captured forms, Run queued workflows | Manage forms |
| List the latest submissions | View submissions |
| Recalculate, Delete expired drafts, Send draft reminders, Upgrade encrypted answers | Manage submissions |
| Show where theme parts come from, Add missing fieldtypes | Manage registry |
| Copy a theme, Write classes for a CSS build | Manage registry, and ExpressionEngine's template permissions |

A member sees only the commands they may run.
