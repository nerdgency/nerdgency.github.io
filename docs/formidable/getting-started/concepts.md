---
title: Concepts
sidebar_position: 20
slug: /getting-started/concepts
---

# Concepts

**You decide what your form looks like, but how do you decide it?** Two systems answer that question, and they answer different halves of it.
- **Templates** decide the *markup* — the elements, their order, what wraps
what.
- **Region attributes** decide the *attributes on that markup* —
classes, data attributes, ARIA, anything that belongs in a tag rather
than between tags.

They are deliberately separate. Changing a class should not mean
rewriting a template, and rewriting a template should not mean
re-applying every class you had set. Both work by **layering** where several sources contribute to the layers and the most specific wins.

## Templates

Templates can be managed from the Formidable Control Panel.

When creating a template, the `type` is fixed. It decides where the
template is stored, listed and looked up, so changing it would move the
template to a different listing, a different directory and a different
resolution chain while leaving a file behind at the old path. Creating a
new template and deleting the old one is the same operation without the
ambiguity.

| Type | What it renders |
|---|---|
| `form` | A whole form including the wrapper, the field loop, the buttons |
| `fieldtype` | One kind of field, for every field of that kind |
| `fieldtype_group` | A family of fieldtypes, for any that has no template of its own |
| `notification` | An email a workflow sends |
| `notification_header` | A fragment above a notification body |
| `notification_footer` | A fragment below a notification body |

### Where templates come from

Three places, and knowing which is which explains most surprises:

- **Shipped templates** are files inside the addon. They update when you
  update Formidable. You cannot edit them, and nothing you do can
  destroy them.
- **Your templates** are rows you create in **Templates**. They are
  yours alone; nothing the addon ships will ever overwrite one.
- **Inline templates** are markup saved directly on a fieldtype or
  fieldtype group in the Registry. Older, still supported, still read.

This separation is the point. Shipped markup and your edits used to
occupy the same field, which meant shipping an improved checkbox
template required a migration that silently destroyed anything you had
written there. Because they are now different layers, an upgrade cannot
touch your work and your work cannot pin you to old markup.

### Field template precedence

For any given field, Formidable takes the **first** of these that is not
empty:

1. A **template you created** bound to that field's fieldtype
2. A **template you created** bound to that fieldtype's group
3. The **inline template** saved on the fieldtype
4. The **inline template** saved on the fieldtype group
5. The **shipped file** for that fieldtype
6. The **shipped file** for its group

Half the fieldtypes have no template of their own. Twelve of the
twenty-four ship nothing at level 5 and render from their group's file at
level 6 — Text, Email, Number, Tel, URL, Password, Date, Colour and Range
are all drawn by `fieldtypes/groups/inputs.html`, as are Select from
`options.html` and Captcha and Turnstile from `special.html`. That is
intentional: one file to fix means every plain input is fixed at once.

So the common shape of "customise one field type" is: create a template
bound to that fieldtype, and it takes precedence at level 1 while
everything else keeps inheriting.

**An empty template means "inherit", not "render nothing".** Every level
tests for emptiness, which is exactly how those twelve fieldtypes fall
through to their group. The consequence is that a genuinely empty
template cannot be expressed — to render nothing, hide the field.

### Form template precedence

1. Markup written **between the tags** — if you write your own body, that
   is the template, and nothing below is consulted
2. `template="handle"` on the tag
3. The template chosen in the **form's settings**
4. The **site-wide default**
5. Formidable's built-in default

Levels 2–4 each check your templates first and then the shipped file of
the same name, so `template="bootstrap"` works immediately without
copying anything — and keeps working, reading your version instead, the
moment you create a template called `bootstrap`.

A level that stops resolving falls through rather than failing. Deleting
a template renders the default, not a white screen.

### Creating a template

Creation is two steps, because the first decides what the second
contains.

**Step one** names the template — type, name, handle, description — and
chooses what it starts from. A fieldtype template picks the fieldtype it
is for; a form or notification template picks a shipped template to base
itself on, or starts empty.

**Step two** is the editor, already holding that markup. For a fieldtype
template it holds whatever that field renders *today*, following the
same chain above — so if the fieldtype has no file of its own, you get
its group's markup, which is what you were actually looking at.

That starting point is a copy for you to change, not a link. It is shown
rather than stored until you save, so a template you create and abandon
leaves nothing behind.

### Templates on disk

Every template is written to a file as well as the database:

```
system/user/templates/formidable/
├── forms/<handle>.html
├── fieldtypes/<handle>.html
├── fieldtypes/groups/<handle>.html
└── notifications/<handle>.html
	├── headers/<handle>.html
	└── footers/<handle>.html
```

The handle becomes the filename, which is why handles are restricted to
letters, numbers, underscores and hyphens.

**The database is what renders.** The files exist so templates can be
committed, diffed and reviewed alongside the rest of a site. **Templates
→ Sync** reports where the two have diverged:

| State | Meaning |
|---|---|
| `same` | The file and the template match |
| `database_changed` | Edited in the control panel, not yet written out |
| `file_changed` | The file was edited outside the control panel |
| `conflict` | Both changed — neither can be applied without losing the other |
| `missing` | No file yet; the next save writes one |
| `never_exported` | Created before sync existed |

Conflicts are reported rather than resolved, deliberately: picking a
winner automatically means silently discarding somebody's work.

> **Note:** if your site's short name is `formidable`, sync is disabled —
> the site's own template directory would collide with Formidable's.
> Rename the site or nothing is exported.

---

## Region attributes

A **region** is a named part of a form. Rather than hard-coding classes
into templates, you set attributes on regions and any template that uses
the standard markup picks them up.

The vocabulary covers the form (`form`, `form_content`, `meta_wrapper`,
`page_nav`, `page_progress`), each field (`field_wrapper`, `field`,
`label`, `instructions`, `error`, `button`), groups (`group`,
`group_heading`), options (`options_wrapper`, `option`, `option_label`)
and the error summary (`error_wrapper`, `error_heading`, `error_list`,
`error_item`).

### Attribute precedence

For every region on every field, seven layers apply in order — **later
wins**:

1. **Computed** — what the fieldtype needs to function, such as `type`
2. **Fieldtype group** — set on the group in the Registry
3. **Fieldtype** — set on the fieldtype
4. **Site-wide** — set in Formidable's configuration
5. **Form** — set on the form's Templating tab
6. **Field** — set on the individual field
7. **Tag parameters** — written on the tag for this render only

Tag parameters split into two of their own, general first and specific
last:

```
label:attribute:class="font-semibold"              every label
field:email:label_attribute:class="text-red-600"   only the email field's
```

The ordering is the same idea throughout: the closer a setting is to the
one thing it affects, the later it applies. A class set on a fieldtype
reaches every field of that type; the same class set on one field beats
it for that field alone.

### `class` appends; everything else replaces

`class` is the exception, because it is the attribute people compose
rather than set:

```
class="mt-2"     adds mt-2 to whatever earlier layers contributed
class="=mt-2"    discards them and uses mt-2 alone
```

Every other attribute is replaced outright by a later layer. This is
what lets a site-wide `class` establish a baseline that individual forms
extend rather than fight.

### Substitution

Attribute values may reference the field they belong to:

```
field_wrapper:attribute:class="col-span-{field_columns}"
```

`{field_columns}` becomes the field's column width from the builder. The
same substitution runs on values saved in the control panel, so a value
means the same thing whether it was typed into a form or into a tag.

### Rules follow the same convention

Validation rules merge by default and replace with `=`, matching
attributes:

```
field:email:rules="email"     adds to the field's saved rules
field:email:rules="=email"    replaces them
```

---

## When a form renders wrong

**Add `debug="on"` to the tag.** It turns silent fallbacks into errors —
a form with no fields, or a field whose template resolves to nothing.

**Then read the page source.** If `{form_fields}` produced nothing,
Formidable leaves an HTML comment saying how many fields reached the
render loop and, for any that rendered no markup, which they were and
what each template level offered. That comment is not behind `debug`, so
it is there whether or not you thought to ask.

Two mistakes to rule out first:

- **A field rendering nothing** is usually a template level returning
  empty where you expected inheritance. The comment names the levels.
- **An attribute not appearing** is usually a later layer replacing it.
  Work down the list above from 7 to 1; the last layer that sets the
  attribute is the one you are seeing.