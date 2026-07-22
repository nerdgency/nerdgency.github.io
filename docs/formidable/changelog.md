---
title: Changelog
sidebar_position: 11
---

# Changelog

## Unreleased

Current feature set:

- Capture tag: HTML5 form parsing, Registry fieldtype matching, sync
  (report/update), drift detection, and conversion to a builder form.
- Control panel field builder: drag/drop grid, resizable columns,
  attributes/rules/options tabs, all backed by the Registry.
- Field conditions: show if, enforced both server-side and via injected
  front-end JS.
- Workflows: submission created/updated events, condition-gated actions
  (email, webhook, connection), in-page modal management.
- Connections: Mailchimp, Campaign Monitor, Dotdigital, Constant Contact,
  HubSpot, Salesforce, with encrypted settings storage.
- Submissions control panel: list, detail, status changes, CSV export.
- CLI commands: `formidable:forms`, `formidable:submissions`,
  `formidable:capture-status`.

See the addon's `todo.md` for planned work (queued/async workflow dispatch,
file upload handling, submission retention, and more).
