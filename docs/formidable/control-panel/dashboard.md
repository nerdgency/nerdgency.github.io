---
title: Dashboard
description: Formidable's front page in the control panel -- your forms, the latest submissions, a fourteen-day chart, workflow health and what needs attention.
keywords:
  - formidable
  - dashboard
  - control panel
---

# Dashboard

## Introduction

The dashboard is Formidable's front page in the control panel. It answers the questions you open Formidable with: what came in, what needs a look, and where to go next.

It opens for anyone with any of Formidable's [permissions](./permissions.md), and each part of it appears only for those who may open the screen it summarises.

<Screenshot
  img={require('@site/static/img/screenshots/formidable/dashboard.png')}
  alt="The Formidable dashboard: totals across the top, a fourteen-day chart, workflow results, the latest submissions and links to the documentation"
  caption="Formidable › Dashboard"
  captured="ExpressionEngine 7.5.26, demo data"
/>

## At a glance

Across the top: how many forms you have, how many submissions they've collected, how many arrived in the last seven days (with the change on the week before), and how many save-and-resume drafts are still in progress. The submission figures need **View submissions**.

## Submissions, last 14 days

A bar for each day, counted on your site's own midnights. Hover a bar for its date and count. The chart follows the form filter below, so you can see one form's activity on its own.

## Latest submissions

The eight newest submissions, with their status, form and when they arrived. Drafts aren't shown until they're sent. Click one to open it.

Choose a form from **Show submissions of** to narrow the list and the chart to that form, then follow **All submissions to…** for its full listing.

Both need **View submissions**.

## Forms

The six forms submitted to most recently, each with its total submissions, this week's count and when it last received one. **Edit** opens the builder (with **Manage forms**) and **Submissions** opens its listing (with **View submissions**). **New form** and **All forms** sit at the top.

With **Manage forms** and no forms yet, this becomes a card that helps you build your first.

## Needs attention

Appears only when something does, for members with **Manage forms**:

- **A captured form whose template markup has changed** since it was captured. Open the form to see what changed. See [Capturing forms](/docs/formidable/displaying-forms/capturing-forms).
- **A form whose computed answers are out of date**, because a calculation changed after submissions were stored. The link opens its **Recalculate** page, which needs **Manage submissions**. See [Computed fields](/docs/formidable/building-forms/computed-fields#when-the-calculation-changes).

## Set-up needs attention

For members with **Manage registry**, any [health check](./configuration.md#health-checks) that isn't passing appears here, such as a missing table, an unregistered fieldtype or a queue worker that has stopped. Each links to **Configuration**, where the check says how to fix it.

## Workflows, last 7 days

For members with **View workflow log**: how many runs succeeded, failed or had nothing to do, what's waiting in the [workflow queue](/docs/formidable/automation/workflow-log#the-workflow-queue) when it's on, and the three latest failures, each linking to its run in the log.

## Documentation

Links into these docs for the things people most often look up. The address comes from the `FORMIDABLE_DOCS_URL` constant in the add-on's `addon.setup.php`.

## Guided tours

The dashboard, a form's builder, its **Workflows** tab, its submissions, **Blueprints**, **Utilities**, the **Registry**, **Themes** and each theme's page have a short guided tour. It points at one part of the screen at a time and says what it's for. Each tour starts by itself the first time you open its screen, once, and on any browser. The dashboard's waits until the [setup wizard](./configuration.md#the-setup-wizard) is finished or set aside.

**Take the tour**, below the page's panels, runs it again whenever you like, with **Docs for this page** beside it. Step through with **Next** and **Back** or the arrow keys, and close it with Esc or **Skip the tour**. A step about something you can't see, such as a card your permissions don't open, is skipped.
