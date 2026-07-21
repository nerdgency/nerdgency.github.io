---
title: Workflows
parent: Formidable
nav_order: 6
permalink: /formidable/workflows/
---

# Workflows

A workflow is an action a form runs automatically when a submission is
created or updated. Manage a form's workflows from its **Workflows** tab --
adding or editing one opens a modal, the same in-page flow as adding a
field.

## Events

- **Submission Created** -- fires on a new front-end submission.
- **Submission Updated** -- fires on a status change or a control panel edit.
- **Submission Created or Updated** -- fires on both.

## Conditions

Every workflow has a [conditions](/formidable/conditions/) tree, evaluated
against the base submission columns plus the form's fields. No conditions
means the workflow always runs for its configured event.

## Actions

### Send an email

Recipient lists (**To**, **Cc**, **Bcc**) are built from any mix of:

- A form field's submitted value (email fields work naturally here; any
  field's value is accepted).
- One or more specific members.
- Every member holding a given role.
- A manually typed address.

The subject and message body both accept submission values via
`{field:HANDLE}`, plus `{form_name}`, `{form_handle}`, `{status}`, and
`{submission_id}`.

### Call a webhook

Posts a JSON payload (form, submission metadata, and field values) to a URL.
Set a signing secret to have Formidable include an
`X-Formidable-Signature` header (HMAC-SHA256 of the JSON body) so the
receiving endpoint can verify the request came from your site.

### Send to a connection

Pushes the submission to a configured [connection](/formidable/connections/)
-- a mailing list or CRM. Map the provider's fields to this form's field
handles (plus a few common built-ins: email, name, first/last name, phone,
company); custom provider-specific keys can be added as their own mapping
row.

## Failure handling

Workflow actions run inline as part of the submission request. A failing
webhook or send doesn't fail the visitor's submission -- errors are caught
and written to the developer log so they don't take down form processing.

{: .note }
Workflow/connection sends currently run synchronously during the request.
Queued/async dispatch (with retry and backoff) is a planned addition -- see
the addon's `todo.md`.
