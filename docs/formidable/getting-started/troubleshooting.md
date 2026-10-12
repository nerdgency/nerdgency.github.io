---
title: Troubleshooting
description: What to do when a form renders nothing, a field is missing, a class never appears, or a submission does not arrive.
keywords:
  - formidable
  - troubleshooting
  - debug
---

# Troubleshooting

Most Formidable problems are quiet rather than loud: the page renders, looks fine, and is missing something. That's deliberate. A misconfigured form should never take a live page down. The trade-off is that sometimes you have to ask Formidable what went wrong. Here's how.

## Start here

### 1. Add `debug="on"` to the tag

```ee title="templates/default_site/contact.group/index.html"
{exp:formidable:form form_handle="contact_us" debug="on"}
```

`debug=` accepts `on`, `yes`, `y`, `true` or `1`. With it on, problems that normally fall back quietly halt the page with a message that names them:

| Message | Meaning |
| --- | --- |
| The "form_id" or "form_handle" parameter is required. | The tag names no form. |
| No form was found with either the id or handle. | The handle is misspelled, or the form belongs to another site. |
| This form does not have any fields. | The form exists but is empty. |

Without `debug=`, the same situations render the tag's `{if no_results}` block, or nothing. Turn it off before the page goes live.

### 2. Read the page source

When the fields render no markup, Formidable leaves an HTML comment in the page. **It does not need `debug=`**: an empty render would otherwise look exactly like a successful one.

```html title="In the page source"
<!-- formidable: {form_fields} is empty -- 0 field(s) reached the loop (the filter removed them all; add debug="on" for the reasons). -->
```

| The comment says | Look at |
| --- | --- |
| `0 field(s) reached the loop` | `only=`, `exclude=` or `page=` removed every field. |
| `N field(s) reached the loop, all rendering no markup: …` | The theme parts for those fields are empty. The comment names each field and the parts that were looked for. |

A second comment covers the easier case to miss, where some fields render and others do not:

```html title="In the page source"
<!-- formidable: no markup for phone -- check the fieldtype template chain. -->
```

## Common causes

### A field renders nothing

A field is a **shell** (`_field`) around a **control** (`_control`). Each is looked up by fieldtype, then fieldtype group, then the generic part, first in your theme's template group, then in the theme it was copied from, then in Default. A part that exists but is empty in your template group still wins the lookup. Delete the empty template to fall back to the shipped one. See [Themes](/docs/formidable/displaying-forms/themes#fields-a-shell-around-a-control).

### The whole form renders nothing

Check whether a `<form>` element is in the page source.

- **No `<form>`:** the tag stopped early. `debug="on"` says why. If it says nothing, suspect a cached page.
- **A `<form>` with nothing inside:** read the comment inside it.
- **A closed form:** a form past its closing date or submission limit, or a members-only form shown to a guest, renders its message instead of its fields. See [Limits and access](/docs/formidable/building-forms/forms#limits-and-access).

### A class or attribute never appears

Attributes are layered, and a more specific layer replaces a more general one: fieldtype group, fieldtype, site, form, field, then tag parameters. `class` is the exception and **appends** across layers. Work from the most specific layer down. The last layer that sets the attribute is the one you see. See [Regions and attributes](/docs/formidable/displaying-forms/regions-and-attributes).

A theme can also add classes inside its own markup, with the `:bag` modifier: `{field_wrapper_attributes:bag class="…"}`. Those are applied after every layer, so `=` on a tag parameter does not remove them. Copy the theme part and edit it instead.

### A tag parameter seems to do nothing

Formidable ignores a parameter it does not recognise rather than reporting it. Check the spelling against the [form tag reference](/docs/formidable/reference/tags/form). Settings such as `return`, `return_on_error`, `template_columns` and `success_message` use the same name as a tag parameter and as the setting in the control panel.

### A command in Utilities stops part-way

[Utilities](/docs/formidable/control-panel/utilities) runs a command inside a browser request. A long job on a large site, such as recalculating thousands of submissions, can outlast your server's time limits. Run it from the command line instead, or use the form's **Recalculate** page, which works in chunks.

### Uploads arrive empty

A form with a file field needs `enctype="multipart/form-data"`. `{form_attributes}` adds it for you. A hand-written `<form action="…" method="post">` without `{form_attributes}` loses it, and the files are silently dropped. Keep `{form_attributes}` on your `<form>`.

### Next does nothing on a multi-page form

**Next** checks the current page first, using the browser's own validation. If a required field on that page is empty, the browser points at it instead of moving on. Fields hidden by conditions are skipped. If the page has no navigation at all, keep `{page_nav}` in your page markup. See [Multi-page forms](/docs/formidable/building-forms/multi-page-forms).

### The step indicator never changes

Each step needs `data-formidable-page-step="{page_number}"`. Without it the script has nothing to update.

### Add another does nothing

Adding and removing rows in a [repeating section](/docs/formidable/building-forms/repeating-sections) needs `formidable.js`, which Formidable adds to any form with a repeating section. Check that the page outputs a `<head>` for ExpressionEngine to put the script in, and that `include_js="no"` isn't set. If you wrote your own `repeat` theme part, keep `{repeat_add_attributes}` on the button: it carries the `data-formidable-repeat-add` hook the script looks for.

### Conditions do not work on the page

Conditions run in `formidable.js`, which Formidable adds to the page only when the form needs it. The page template must output a `<head>` for EE to put the script in, and `include_js="no"` must not be set. The server checks conditions again on every submission, so a form submitted with scripts disabled is still validated correctly.

### A submission was accepted but nothing was sent

Open **Formidable › Workflow Log**. Every workflow run is recorded there: whether it succeeded, failed, or had nothing to do (no recipient, no URL), what it sent and what came back. After fixing the workflow, **Run again** replays the run with the original answers. See [The workflow log](/docs/formidable/automation/workflow-log).

### An email workflow succeeded but the email never arrived

**Succeeded** means ExpressionEngine handed the email over, and the run's message says to what: sendmail, PHP `mail()` or an SMTP server, chosen in ExpressionEngine's **Settings › Outgoing Email**. Sendmail and PHP `mail()` pass the email to the server's own mail system, which accepts it even when it cannot deliver it. A local development machine often has no mail system running, so every email disappears. Point ExpressionEngine at an SMTP server or a local mail catcher, or check that mail system's log.

### Visitors are sent to the site index after submitting

A `return=` URL on a host other than your site's is refused, and the visitor falls back to the site index. Allow the host in `config.php`:

```php title="system/user/config/config.php"
$config['formidable_return_hosts'] = ['checkout.example.com'];
```

## Reporting a problem

Include:

1. The tag as written, with every parameter.
2. Any `<!-- formidable: … -->` comment from the page source, verbatim.
3. What `debug="on"` said, or that it said nothing.
4. Your Formidable, ExpressionEngine and PHP versions.
