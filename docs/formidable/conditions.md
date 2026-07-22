---
title: Conditions
sidebar_position: 6
---

# Conditions

Fields and workflows can both be gated behind conditions: a tree of AND/OR/
NOT rules evaluated against the current submission's values.

## Field conditions

Every field has a **Conditions** tab with a single **Show if** condition
tree: the field is only displayed when these conditions match against the
submitted/live values (empty = always shown).

This tree is built with the same condition-builder component used for
control panel table search, so the interaction (adding rows, grouping with
AND/OR, negating a group) is consistent everywhere it appears in Formidable.

## Workflow conditions

A workflow's **Conditions** tab uses the same builder, but the available
fields are the base submission columns (status, member, created date) *plus*
the form's own fields -- so a workflow can run only for submissions in a
particular status, from a logged-in member, or where a specific field
matches a value.

## How conditions are evaluated

Both field and workflow conditions are stored as the same JSON payload
shape (nested groups of `{ field, operator, value }` leaves with `boolean`/
`not` grouping). One evaluator enforces them everywhere:

- **Server-side**, on submission: determines which fields were actually
  visible (and therefore validated), and which workflows fire.
- **Client-side**, via the JS the [Form tag](./form-tag.md) injects
  into `<head>`: mirrors the same payload contract to show/hide fields live
  as the visitor fills out the form.

Because both sides evaluate the exact same payload the same way, what a
visitor sees in the browser always matches what's enforced when the
submission is validated -- there's no separate client-only ruleset that can
drift out of sync with the server.
