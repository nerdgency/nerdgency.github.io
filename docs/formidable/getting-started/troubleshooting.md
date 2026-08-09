---
title: Troubleshooting
sidebar_position: 35
slug: /getting-started/troubleshooting
description: What to do when a form renders nothing, a field is missing, or a class you set never appears.
keywords:
  - formidable
  - troubleshooting
  - debug
  - expressionengine
---

# Troubleshooting

Most Formidable problems are **silent** rather than loud: a form renders,
looks fine, and is missing something. This page is about turning that
silence into a sentence.

## Start here: two things to read

### 1. Add `debug="on"` to the tag

```
{exp:formidable:form form_handle="contact" debug="on"}
```

With it on, situations that normally fall back quietly become errors that
name themselves:

- no form matches `form_id=` / `form_handle=`
- the form has no fields
- every field was filtered out — and **which** filter removed each one
- a field's template could not be resolved at any level

Turn it off again before the page goes live. Without it, all of the above
render nothing rather than interrupting a visitor.

### 2. Read the page source

If `{form_fields}` produced nothing, Formidable leaves an HTML comment
saying so:

```html
<!-- formidable: {form_fields} is empty -- 1 field(s) reached the loop,
     all rendering no markup: color (fieldtype=color group=inputs
     stored=0 group_stored=0 shipped=0 group_shipped=207 root=ok). -->
```

**This comment is not behind `debug=`.** It is there whether or not you
thought to ask, because an empty render is otherwise indistinguishable
from a successful one.

Reading it:

| Part | Meaning |
| --- | --- |
| `0 field(s) reached the loop` | The filter removed them all — turn on `debug=` for the reasons |
| `N field(s) … rendering no markup` | The fields ran; their templates produced nothing |
| `fieldtype=` / `group=` | The two handles the template resolver looked up |
| `group=NULL` | The fieldtype's `parent_id` does not point at a fieldtype group |
| `stored=` / `shipped=` … | Bytes each level returned — all zero means nothing was found anywhere |
| `root=MISSING` | The addon's `views/templates/` directory is not where it should be — a broken install |

There is a second comment for the easier-to-miss case: some fields
rendering and others not.

```html
<!-- formidable: no markup for phone -- check the fieldtype template chain. -->
```

## Common causes

### A field renders nothing

Almost always a template level returning empty where inheritance was
expected. The comment above names the levels and what each returned.

Remember that **an empty template means "inherit", not "render
nothing"** — half the fieldtypes ship no template of their own and draw
from their group's. If both come back empty, the field has nowhere to get
markup from.

### The whole form renders nothing

Check whether the `<form>` element is in the source at all.

- **No `<form>`** — the tag aborted. `debug="on"` will say why. If it
  says nothing, suspect template caching serving a stale page.
- **`<form>` present but empty** — read the comment inside it.

### A class or attribute never appears

Work **down** the [attribute layers](/getting-started/concepts) from 7 to
1. The last layer that sets the attribute is the one you are seeing —
something more specific is replacing it.

Remember that `class` **appends** across layers while everything else
**replaces**. To discard what earlier layers contributed, prefix with
`=`:

```
field:attribute:class="=mt-2"
```

### A tag parameter appears to do nothing

Check the spelling against the setting's name. `return`,
`return_on_error`, `template_columns` and `success_message` are also
control panel settings, and the parameter and the setting share one name
deliberately. A parameter Formidable does not recognise is ignored rather
than reported.

### A template edit did not take effect

Templates live in the database and are mirrored to disk. **The database
is what renders.** If you edited the file, **Templates → Sync** will show
`file_changed` and nothing will have changed on the front end until you
apply it.

If Sync reports `conflict`, both copies changed. Formidable will not pick
a winner for you — that would mean silently discarding somebody's work.

### The step indicator never moves

Each step needs `data-formidable-page-step="{page_number}"`. Without it
there is nothing for the stepper to update. See
[the `{form_pages}` loop](../tags/form.md).

### Multi-page: Next does nothing

Next runs the browser's own validation on the current page first. If a
required field on that page is empty, the browser reports it rather than
advancing. Fields hidden by conditions are skipped.

## When to suspect the install rather than the form

Two symptoms point at the addon's files rather than anything you
configured:

- `root=MISSING` in the diagnostic comment
- a control panel page 404ing that should exist

Both suggest the copy of Formidable being executed is not the one you
think. If the addon is a real directory rather than a symlink to your
build output, confirm the copy actually ran.

## Still stuck

Open an issue with:

1. The tag as written, including parameters
2. The HTML comment from the page source, verbatim
3. What `debug="on"` said, or that it said nothing

The comment is usually enough to identify the cause without a
reproduction, which is what it exists for.
