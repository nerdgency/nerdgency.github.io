---
title: Submissions and statuses
sidebar_label: Submissions
sidebar_position: 8
description: Reviewing, filtering, editing and exporting submissions in the control panel, with saved views and statuses.
keywords:
  - formidable
  - submissions
  - export
  - saved views
---

# Submissions and statuses

Every stored submission belongs to one form and has a status. Open a form's **Submissions** from the **Forms** listing.

## The listing

- **Filter** with the same condition builder used everywhere in Formidable. A field's operators match its kind of answer. See [Conditions](./conditions.md#operators).
- **Choose columns**: the submission's own details (name, status, member, dates) and any of the form's fields.
- **Save a view.** A saved view is a named filter, set of columns, page size and sort, stored for one form and one member. Switch between views from the listing. A view can also be used from a template: `view=` on [`{exp:formidable:submissions}`](/docs/formidable/developer/tags/submissions) applies its filter, page size and sort.
- **Delete** submissions in bulk.

Answers are shown the way they read, with an option's label rather than its stored value, and a file's name. Encrypted answers are not decrypted in the listing, so a glance at the list never discloses them in bulk.

## One submission

Opening a submission shows every answer, decrypted, and lets you change its status and edit its answers. Saving an edit works out its [Computed](/docs/formidable/guides/computed-fields) answers again, and raises the **submission updated** event for [workflows](./workflows.mdx).

The submission's page also shows the form's workflows, read-only, as **Simple**, **Detailed** and **Recent runs**. It opens on the runs for this submission: what each workflow did, whether it succeeded, and a link to this submission in the full log.

## Export

**Export** downloads exactly what the listing shows: the rows that match the current filter, all of them rather than one page, with the columns of the current view. Formats:

| Format | Shape |
| --- | --- |
| CSV | One row per submission, one column per chosen column. |
| JSON | An object with `columns` (each key's label), `submissions` (one object per submission, keyed by field handle) and `count`. |
| XML | One element per submission, one child element per column. |
| TXT | A plain-text record per submission, with aligned labels. |

Exports decrypt encrypted answers, because they are a file someone with the **Manage submissions** permission deliberately asked for. Large forms export in batches, so memory use stays flat however many submissions match.

## Statuses

A status has a name, a handle and a colour. Define the site's statuses on **Configuration › Statuses**, and a form's own on its **Statuses** tab. New submissions get the default status. Statuses can be reordered.

Use them to track progress ("New", "In progress", "Done") and to filter the listing. Templates can filter by status with `status="new|read"` on `{exp:formidable:submissions}`, and the JSON API accepts the same with `status=`.

## Storage choices

Two form settings decide what is kept:

- **Enable storage** off means **workflows only**. Emails and connections still run, but no submission is stored.
- **Store submission data** off keeps the submission row (its name, status, member and dates) but not the answers. Workflows still receive every answer.

Fields marked **Encrypted** are encrypted before they are written. See [Fieldtypes](./fieldtypes.mdx#which-fields-can-be-encrypted).

## In templates and through the API

- [`{exp:formidable:submissions}`](/docs/formidable/developer/tags/submissions) lists submissions in a template, or one submission by its public handle.
- [`submission_handle=`](/docs/formidable/developer/tags/form#submission-handle) on the form tag pre-fills a form from a stored submission, so a visitor can [edit their answers](/docs/formidable/guides/edit-a-submission).
- The [JSON API](/docs/formidable/developer/json-api) lists and reads submissions, and creates new ones.
