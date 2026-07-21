---
title: Installation
parent: Formidable
nav_order: 1
permalink: /formidable/installation/
---

# Installation

## Requirements

- ExpressionEngine 7
- PHP 8.1+

## Install

1. Copy the addon into `system/user/addons/formidable`.
2. In the control panel, go to **Addons** and install Formidable. This runs
   the addon's migrations, which create Formidable's own tables
   (`formidable_forms`, `formidable_fields`, `formidable_statuses`,
   `formidable_submissions`, `formidable_workflows`,
   `formidable_connections`) and seed the Registry with default field
   attributes, fieldtype groups/fieldtypes, and validation rules.
3. Formidable adds itself to the control panel sidebar. From there you can
   create a form in the builder, or use the [Capture tag](/formidable/capture-tag/)
   against an existing template.

## Seeded defaults

The install migration seeds a starting set of Registry components so the
field builder is usable immediately:

- HTML5 field attributes (`required`, `placeholder`, `min`/`max`, `pattern`,
  `autocomplete`, and so on).
- Fieldtype groups: **Inputs**, **Options**, **Buttons** (submit/reset), each
  with a sensible set of fieldtypes underneath.
- Validation rules matching each fieldtype's expected input.

These are ordinary Registry rows, so they can be renamed, reordered, or
extended from **Formidable &raquo; Registry** in the control panel -- nothing
about them is hardcoded into the field builder itself.
