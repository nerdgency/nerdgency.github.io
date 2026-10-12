---
title: Roadmap
sidebar_position: 4
description: What is being worked on, what may come next, and what is not planned.
keywords:
  - formidable
  - roadmap
---

# Roadmap

What is being worked on, what may come next, and what has been decided against.

**This is a direction, not a delivery schedule.** Nothing here carries a date. Items move between sections as more is learned, and occasionally move back.

## Available now

Everything in the [1.0.0 release notes](./1-0-0.md).

## Next

- **Pluggable workflow actions**, the way connections are already pluggable, so "do this when a form is submitted" is not limited to email, webhooks and connections.
- **More lifecycle hooks** around submission and workflow execution, beyond `formidable_submission_complete` and `formidable_spam_caught`.

## Exploring

Ideas with no commitment. Some may never ship.

- **Blueprints**: packaging a form, its fields, workflows and theme as something installable, so a contact form or a job application can be a starting point rather than a rebuild.
- **Server-rendered multi-page forms**, with a round trip per page, for visitors without JavaScript and for forms too large to send at once.
- **Performance work**, once there is profiling to guide it.

## Not planned

- **A visual email designer.** Emails are templates in an email theme, with a shared layout.
- **A form-embedding script for non-ExpressionEngine sites.** Formidable renders through ExpressionEngine's template engine. A standalone embed would be a different product.
- **Payment processing.** Better served by a dedicated add-on that a workflow action can hand off to, which is part of why pluggable workflow actions are next.

## How this gets decided

Roughly in this order: **correctness**, then **things that unblock other people**, then **breadth**.
