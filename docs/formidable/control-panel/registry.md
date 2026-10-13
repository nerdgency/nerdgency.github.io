---
title: Registry
description: The building blocks every form is made of -- fieldtypes and their groups, validation rules, lists, attributes and themes -- and where to change them.
keywords:
  - formidable
  - registry
  - fieldtypes
  - validation rules
  - lists
---

# Registry

## Introduction

**Formidable › Registry** holds the building blocks every form is made of. Most sites never need to change them. Opening it needs the **Manage registry** permission.

The page is a dashboard: a card for each kind of block, with how many there are and a quick look at them. A short guided tour runs the first time you open it, and **Take the tour** below the cards runs it again.

:::caution Changes reach every form
Everything here is shared by every form on the site. You can adjust the fieldtypes, rules and lists that ship with Formidable, but test your forms afterwards.
:::

## Fieldtypes

Every kind of field in the builder's palette, laid out by group as tiles. Each tile says how many fields use it; click one to edit it.

- **Manage** lists every fieldtype. Edit one to rename it, change its defaults and settings, or decide what its markup looks like.
- **New** adds a fieldtype. A fieldtype with its own behaviour also needs a PHP class: see [Custom fieldtypes](/docs/formidable/extending/custom-fieldtypes).
- **Groups** arranges the palette's groups and their order.

## Validation rules

The checks a field's answer can be given, such as required, an email address or a minimum length. You can add any rule ExpressionEngine knows. See [Validation](/docs/formidable/building-forms/validation).

## Lists

Named sets of choices that any choice field can use as its source, so several forms share one list and a change reaches them all. The built-in lists (countries, languages, states and provinces, days, weeks and months) are listed here too, read-only. See [Where choices come from](/docs/formidable/building-forms/fieldtypes#where-choices-come-from).

## Attributes

The HTML attributes offered when you add classes and attributes to a form's parts on its **Templating** tab. See [Regions and attributes](/docs/formidable/displaying-forms/regions-and-attributes).

## Themes

The markup forms are rendered with, and your site's own copies of it. **Manage** opens [Themes](/docs/formidable/displaying-forms/themes); **Site settings** opens [Configuration](./configuration.md), where the theme every form uses by default is chosen.
