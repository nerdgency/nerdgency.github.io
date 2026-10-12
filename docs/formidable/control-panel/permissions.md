---
title: Permissions
description: The permissions Formidable checks, what each allows, and where they are granted.
keywords:
  - formidable
  - permissions
  - roles
---

# Permissions

## Introduction

Super Admins can do everything in Formidable, straight away. Every other role starts with nothing and is given exactly what it needs, from eight permissions.

## The permissions

| Permission | Allows |
| --- | --- |
| **Manage forms** | Create and edit forms, fields, statuses and workflows. Deleting a form that has submissions also needs **Manage submissions**. |
| **View submissions** | Read submissions, including every answer they hold. |
| **Manage submissions** | Edit, delete and export submissions. |
| **Manage registry** | Edit fieldtypes, rules, lists, attributes, themes and site-wide configuration. These affect every form on the site. |
| **Manage connections** | Create and edit connections to third-party services, which hold their credentials. |
| **View workflow log** | Read the log of workflow runs, including the answers each was given and what it sent. Running a workflow again also needs **Manage forms**. |
| **Manage API keys** | Issue, change and revoke [JSON API](/docs/formidable/headless/json-api) keys, on **Formidable › Utilities**. |
| **Run commands** | Run Formidable's commands from [Utilities](/docs/formidable/control-panel/utilities). Each command also needs the permission for what it touches: deleting drafts needs **Manage submissions**, copying a theme needs **Manage registry** and ExpressionEngine's template permissions. |

## Granting permissions

Open **Formidable › Permissions** and tick the roles that should hold each permission. Assignments are per site. Only Super Admins can open this screen, because granting a permission is granting access.

A member also needs ExpressionEngine's own permission to reach add-ons in the control panel.

<Screenshot
  img={require('@site/static/img/screenshots/formidable/permissions.png')}
  alt="The Permissions screen, with each of Formidable's permissions and the roles that hold it"
  caption="Formidable › Permissions"
  captured="ExpressionEngine 7.5.26, demo data"
/>

## What members see

Formidable's sidebar shows each member only the screens their permissions open, so nobody is shown a link that ends in "not allowed":

| Sidebar | Items | Needs |
| --- | --- | --- |
| (top) | Dashboard | any Formidable permission |
| | Forms, Field Library | Manage forms |
| **Automation** | Connections | Manage connections |
| | Workflow Log | View workflow log |
| **Design** | Themes, Registry | Manage registry |
| **Settings** | Configuration | Manage registry |
| | Permissions | Super Admin |
| | Utilities | Manage API keys or Run commands |

The [dashboard](/docs/formidable/control-panel/dashboard) works the same way, widget by widget. A member who may only read submissions sees the latest submissions and the forms, each linking to its submissions. The Jump Menu offers only the commands a member's permissions allow, too.

## Outside the control panel

- **`{exp:formidable:submissions}`** does what its parameters say. It does not check these permissions, because a template is written by a developer. Restrict who can see the page, and use `member_id=` for a member's own submissions. See [the submissions tag](/docs/formidable/reference/tags/submissions#the-tag-trusts-your-template).
- **The JSON API** lets a logged-in member read submissions when they have **View submissions**. With **Configuration › API › Members Read Their Own Submissions** turned on, any logged-in member may read their own.
- **`{exp:formidable:capture}`** creates and changes forms, so it only does so for a logged-in Super Admin, unless `$config['formidable_capture_public']` is turned on. Everyone else gets the captured form rendered as it stands.
