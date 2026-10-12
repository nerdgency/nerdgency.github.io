---
title: Roadmap
# Hidden from the sidebar, search and the sitemap; the URL still works.
unlisted: true
description: What's being worked on, what may come next, and what isn't planned.
keywords:
  - formidable
  - roadmap
---

# Roadmap

Where Formidable is heading, and what's been decided against.

:::note A direction, not a schedule
Nothing here carries a date. Items move between sections as more is learned, and now and then they move back.
:::

## Available now

Everything in the [release notes](./release-notes.md), including the dashboard, Utilities, repeating sections, save and resume, the workflow queue and eighteen extension hooks.

## Next

- **Pluggable workflow actions.** Connections are already pluggable. Workflow actions should be too, so "do this when a form is submitted" isn't limited to email, webhooks and connections.

## Exploring

Ideas with no commitment. Some may never ship.

- **Blueprints.** Package a form with its fields, workflows and theme as something installable, so a contact form or a job application is a starting point rather than a rebuild.
- **Server-rendered multi-page forms**, with a round trip per page, for visitors without JavaScript and for forms too large to send at once.
- **Performance work**, once there's profiling to guide it.

## Not planned

- **A visual email designer.** Emails are templates in an email theme, sharing one layout.
- **An embed script for sites that aren't ExpressionEngine.** Formidable renders through ExpressionEngine's template engine. A standalone embed would be a different product.
- **Payment processing.** That's better served by a dedicated add-on a workflow action can hand off to, which is part of why pluggable actions come next.

## How this gets decided

Roughly in this order: **correctness**, then **things that unblock other people**, then **breadth**.
