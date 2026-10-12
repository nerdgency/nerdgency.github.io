---
title: Permissions
sidebar_position: 11
description: The permissions Formidable checks, what each allows, and where they are granted.
keywords:
  - formidable
  - permissions
  - roles
---

# Permissions

Super Admins can do everything in Formidable. Other roles need Formidable's own permissions, granted on **Formidable › Permissions**. Only Super Admins can open that screen, because granting a permission is granting access. Assignments are per site.

| Permission | Allows |
| --- | --- |
| **Manage forms** | Create and edit forms, fields, statuses and workflows. Deleting a form that has submissions also needs **Manage submissions**. |
| **View submissions** | Read submissions, including every answer they hold. |
| **Manage submissions** | Edit, delete and export submissions. |
| **Manage registry** | Edit fieldtypes, rules, lists, attributes, themes and site-wide configuration. These affect every form on the site. |
| **Manage connections** | Create and edit connections to third-party services, which hold their credentials. |
| **View workflow log** | Read the log of workflow runs, including the answers each was given and what it sent. Running a workflow again also needs **Manage forms**. |
| **Manage API keys** | Issue, change and revoke [JSON API](/docs/formidable/developer/json-api) keys. |

A member also needs ExpressionEngine's own permission to reach the add-on in the control panel.

## Outside the control panel

- **`{exp:formidable:submissions}`** does what its parameters say. It does not check these permissions, because a template is written by a developer. Restrict who can see the page, and use `member_id=` for a member's own submissions. See [the submissions tag](/docs/formidable/developer/tags/submissions#the-tag-trusts-your-template).
- **The JSON API** lets a logged-in member read submissions when they have **View submissions**. With **Configuration › API › Members Read Their Own Submissions** turned on, any logged-in member may read their own.
- **`{exp:formidable:capture}`** creates and changes forms, so it only does so for a logged-in Super Admin, unless `$config['formidable_capture_public']` is turned on. Everyone else gets the captured form rendered as it stands.
