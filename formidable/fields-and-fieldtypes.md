---
title: Fields & fieldtypes
parent: Formidable
nav_order: 4
permalink: /formidable/fields-and-fieldtypes/
---

# Fields & fieldtypes

## The field builder

Each form's **Builder** tab lists its fields as a drag-and-drop, resizable
grid. Adding a field opens a modal (no page navigation) grouped into tabs:

- **General** -- name, handle, instructions, default value, required/hidden
  toggles.
- **Attributes** -- HTML attributes sourced from the Registry's field
  attribute vocabulary, plus any custom `name="value"` pairs.
- **Rules** -- validation rules, same Registry-backed pattern as attributes.
- **Options** *(options-engine fieldtypes only)* -- source a select/radio/
  checkbox field's choices from manual entries, a Formidable list, channel
  entries, categories, members, or roles.
- **Conditions** -- show if, see [Conditions](/formidable/conditions/).

Reordering and column width (1--4 columns wide) are drag/resize interactions
on the grid itself and save immediately.

## Fieldtypes are Registry rows

Formidable doesn't hardcode its fieldtype list. Fieldtypes are rows in the
**Registry** (`object = fieldtype`), grouped under fieldtype groups
(`object = fieldtype_group`, e.g. Inputs / Options / Buttons). Each
fieldtype's metadata describes:

- Which HTML input type(s) it renders (`storage.input` / `storage.inputs`).
- Its storage engine -- plain `inputs` or an `options` engine for
  select/radio/checkbox-style fields.
- Which settings tabs apply (`settings.allow_attributes`,
  `settings.allow_validation`, `settings.show_required`, ...).
- Its builder display template and icon.
- Search/condition metadata used to build the operator choices it offers in
  the [conditions](/formidable/conditions/) builder.

Because this is just Registry data, you can add a new fieldtype (or an
entirely new fieldtype group) without touching addon code -- it shows up in
the field builder's "add field" dropdown immediately.

## Field attributes and validation rules

Attributes and rules are Registry rows too (`object = field_attribute` and
`object = rule`), each declaring what kind of value it accepts (plain text,
a fixed set of choices, and so on). The Attributes and Rules tabs on a field
are both built from the same generic key/value list builder, seeded with
whatever the fieldtype's `extraFields` require and backed by these Registry
vocabularies for everything else.
