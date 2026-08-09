---
title: Roadmap
sidebar_position: 30
slug: /getting-started/roadmap
description: What we're working on, what's coming, and what we've decided against.
keywords:
  - formidable
  - roadmap
  - expressionengine
---

# Roadmap

What we're working on, what's coming, and what we've decided against.

**This is a direction, not a delivery schedule.** Nothing here carries a
date. Items move between sections as we learn more, and things
occasionally move *back* — an item in Next that turns out to depend on
something unbuilt returns to Exploring rather than sitting in Next
looking imminent.

Formidable is pre-1.0. Until 1.0, breaking changes are possible between
releases and will be listed in the changelog with an upgrade note.

---

## Available now

The parts that exist, work, and are documented.

**Building forms** — Drag-and-drop builder, 24 fieldtypes, field groups,
multi-page forms, conditional visibility and conditional requirement,
validation rules, spam controls and CAPTCHA.

**Rendering** — One tag with composable parts, so a template can place
the whole form or hand-write any piece of it. Five shipped starter
templates. Region attributes for setting classes and data attributes
without touching markup.

**Templates** — Six template types with a documented inheritance chain,
an in-browser editor, and two-way synchronisation to files on disk so
templates can be committed and reviewed alongside the rest of a site.

**Submissions** — Listing with saved views, filtering, a front-end tag
and a JSON endpoint. Per-field storage, casting and encryption.

**Workflows** — Email notifications with reusable headers and footers,
webhooks, and third-party connections. Conditional execution.

**Tooling** — CLI commands for listing forms and submissions.

---

## Now

Getting to a 1.0 we'd be comfortable telling people to build on.

- **Verification across a full matrix of real installs.** Every
  fieldtype, both template routes, failed submissions, multi-page,
  groups, uploads. This is deliberately first: it will reorder
  everything below it.
- **Role-based permissions.** Deciding and implementing what a role can
  be granted separately — building forms, viewing submissions, managing
  templates — rather than one all-or-nothing switch.
- **Release engineering.** Continuous integration on every change,
  proper packaging, and a documented supported-version floor.
- **The documentation site itself**, of which this page is part.

## Next

Making the addon extensible by people who aren't us.

- **A registration hook for third-party fieldtypes**, so an addon can
  add one without patching Formidable.
- **A documented fieldtype contract** — what you must implement, with a
  worked example.
- **Pluggable workflow actions**, the same way connections are already
  pluggable, so "do this when a form is submitted" isn't limited to the
  actions we shipped.
- **Lifecycle hooks** around submission and workflow execution.
- **Jump Menu integration** for the control panel.

## Exploring

Real ideas, no commitment, and some may never ship.

- **Blueprints** — packaging a form, its fields, workflows and templates
  as something installable, so a contact form or a job application can
  be a starting point rather than a rebuild. Substantial, and several
  design questions are genuinely open.
- **Server-rendered multi-page forms.** Multi-page works in the browser
  today; a round-trip variant would serve visitors without JavaScript
  and forms too large to send at once.
- **Performance work.** Named deliberately vaguely, because nothing has
  been profiled yet and optimising before measuring is how you make
  code worse and slower.

## Not planned

Saying no is part of a roadmap.

- **A visual email designer.** Notification templates are markup with an
  editor, and reusable headers and footers cover the shared parts.
- **A form-embedding script for non-EE sites.** Formidable renders
  through EE's template engine; a standalone embed would be a different
  product.
- **Payment processing.** Better served by a dedicated addon that a
  workflow action can hand off to — which is part of why pluggable
  workflow actions is in Next.

---

## How this gets decided

Roughly in this order: **correctness**, then **things that unblock other
people**, then **breadth**.

That ordering explains the shape above. Verification and permissions sit
in Now not because they're exciting but because everything else is worth
less if the foundation is unproven. Extensibility sits in Next because
one hook lets other people build the long tail of fieldtypes and
integrations faster than we could.

## Suggesting something

Open an issue describing **the problem**, not the feature. "I need to
route submissions to three departments based on a dropdown" tells us far
more than "add a router action" — the first has several possible
answers, and one of them may already exist.

Existing customers hitting a genuine blocker should say so plainly; that
moves things.
