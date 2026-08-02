---
id: form
title: Form
sidebar_label: Form
description: Render a Formidable form — its wrapper, fields, attributes and values — with as much or as little markup of your own as you want.
keywords:
  - formidable
  - form tag
  - expressionengine
toc_max_heading_level: 3
---

# Form

The Form tag renders a form built in the Formidable control panel, together with its fields, their saved attributes, their current values, and everything needed to submit them.

By default the tag is self-contained: given nothing but a form handle it outputs a complete, working `<form>` element — the wrapper, its attributes, the hidden processing inputs, and each field rendered from its fieldtype's display template. Nothing else is required in the template.

```html
{exp:formidable:form form_handle="contact_us"}
	{fields}{field_template}{/fields}
{/exp:formidable:form}
```

Every layer of that can be taken over individually. A template can keep the automatic wrapper but render fields itself, build the `<form>` tag by hand from `{form_attributes}` while still letting each field render itself, or compose everything down to individual attribute values. The tag is designed so that opting out of one layer never forces you to opt out of the others.

Values are repopulated automatically. If a submission fails validation, each field redisplays what the visitor typed; a form can also be prefilled from a previously stored submission via `submission_handle=`.

## Parameters

### `form_id=`

```html
form_id="3"
```

The id of the form to render.

### `form_handle=`

```html
form_handle="contact_us"
```

The handle of the form to render. Handles are stable across environments, so they are generally preferable to ids.

:::info Required
Either `form_id=` or `form_handle=` must be set. If neither is given, the tag renders `{if no_results}` — or halts with a message when `debug="on"`.
:::

### `debug=`

```html
debug="on"
```

Default: `off`

When `on`, configuration problems halt with an error message instead of failing quietly — a missing form, a form with no fields, or a field whose fieldtype has no display template. When `off`, those conditions fall through to `{if no_results}` (or, for a single unrenderable field, produce an empty string) so one misconfigured field cannot take down a live page.

:::tip
Turn this on in staging when a field or form is not appearing. It names the specific field or condition at fault.
:::

### `return=`

```html
return="thanks"
return="thanks/SUBMISSION_HANDLE"
```

The template path to redirect to after a successful submission. May also be a full URL.

**Two tokens are substituted** if present, so the visitor can be sent straight to the thing they just created:

| Token | Replaced with |
| --- | --- |
| `SUBMISSION_HANDLE` | the new submission's random public token |
| `SUBMISSION_ID` | its sequential id |

Both are case-sensitive, and a path containing neither is used verbatim. Substitution happens before the redirect target is checked against the allowed-host list, so the URL that gets vetted is the one the visitor is actually sent to.

:::tip Prefer the handle
`SUBMISSION_ID` is a sequential integer, so a visitor handed one can trivially guess its neighbours. `SUBMISSION_HANDLE` is random and unguessable, which is why it exists — pair it with `submission_handle=` on the destination template to show someone their own answers back. Note the access-control warning under that parameter: unguessable is not the same as authorised.
:::

If storage is disabled for the form (`enable_storage` off, "workflows only"), there is no submission to reference and the tokens are left in place unsubstituted.

### `return_on_error=`

```html
return_on_error="contact"
```

The template path to return to when a submission fails validation. The form redisplays with `{has_errors}` set, per-field errors populated, and every field repopulated with what was submitted.

### `submission_handle=`

```html
submission_handle="{segment_3}"
```

Prefills every field from a previously stored submission — an "edit your response" or "review your answers" page.

The value is a submission's `handle`, an opaque random token, never its sequential `id`. The submission is also checked against the form being rendered, so a handle belonging to a different form is ignored rather than leaking its answers. An unknown or malformed handle is treated the same as no handle at all.

Submitted (POST) values still take precedence over stored ones, so a failed validation on a prefilled form still shows the visitor's own corrections.

:::warning Access control
The handle is unguessable, but it is not an authorisation check. Any visitor holding the handle can view that submission's answers. Gate the template itself — by member group, a login check, or your own token — if the data is not meant to be public.
:::

### `page=`

```html
page="2"
```

Default: unset (all fields)

Limits `{fields}` to the fields assigned to that step of a multi-page form. When omitted, every field is rendered. `{form_page}` and `{form_page_count}` are available for building the navigation between steps.

### `template_columns=`

```html
template_columns="12"
```

Default: `16`

The width of the grid the form's layout was designed against. Each field's own column span is scaled to this number and exposed as `{field_columns}` (and as `data-formidable-columns` on `{field_wrapper_attributes}`), so a theme can map fields onto whatever grid system it already uses.

With the default of `16`, a field occupying one column of the CP builder's four-column grid reports `4`; against `columns="12"` the same field reports `3`.

### `template=`

```html
template="forms/contact_layout"
```

Renders the form through a full-custom template instead of the tag's own inline tagdata — a `group/name` path to an EE Template whose body is parsed against the exact same variable set documented on this page.

Only consulted when the tag has no inline tagdata between `{exp:formidable:form}` and `{/exp:formidable:form}`; inline tagdata always wins. When neither is present, resolution falls back to the form's own configured default Template (set in the control panel), then to a minimal built-in render.

### `only=` / `exclude=`

```html
only="first_name|last_name|email"
exclude="first_name|last_name"
```

Pipe-separated field handles limiting which fields the `{fields}` loop renders.

`only=` renders just the fields named; `exclude=` renders everything except them. If both are given, `only=` wins — it is the more explicit statement of intent.

The usual reason to reach for `exclude=` is placing a few fields by hand with `{field:HANDLE:...}` and letting the loop handle the rest, without those fields appearing twice.

:::note Skipped, not removed
A field left out of the loop is still part of the form. It is not rendered, so nothing is submitted for it, and its saved validation rules still apply on submission — a required field excluded from the markup will fail validation with no visible input to correct. Use `field:HANDLE:rules=` if you need to relax that.
:::

### `prefix=`

```html
prefix="signup_"
```

Default: none

Prefixes every variable this tag publishes, so two copies of the tag on one page do not collide. With `prefix="signup_"`, `{form_attributes}` becomes `{signup_form_attributes}`, `{field_label}` becomes `{signup_field_label}`, and so on throughout.

### `include_form_wrapper=`

```html
include_form_wrapper="no"
```

Default: `yes`

Whether the tag outputs its own `<form>` element around the tag data.

With `yes`, the wrapper and its attributes are generated for you, and the hidden processing inputs (`{form_meta}`) are included automatically just inside it.

With `no`, the wrapper becomes the template's responsibility. Build it from `{form_attributes}` and place `{form_meta}` yourself:

```html
{exp:formidable:form form_handle="contact_us" include_form_wrapper="no"}
	<form {form_attributes}>
		{form_meta}
		{fields}{field_template}{/fields}
	</form>
{/exp:formidable:form}
```

:::caution
When `include_form_wrapper="no"`, `{form_meta}` must be placed inside your `<form>` element. Without it the submission cannot be processed.
:::

### `include_meta_wrapper=`

```html
include_meta_wrapper="no"
```

Default: `yes`

Whether `{form_meta}`'s hidden inputs are wrapped in their own hidden `<div>`. The wrapper guarantees the inputs cannot affect layout regardless of theme CSS. Turn it off to take the bare `<input>` tags instead.

### `include_content_wrapper=`

```html
include_content_wrapper="no"
```

Default: `yes`

Whether the tag outputs its content wrapper — the `<div>` inside `<form>`, after the hidden meta block, that the fields are rendered into. Style it with `{form_content_attributes}`, or turn it off to place your own.

### `include_js=`

```html
include_js="no"
```

Default: `yes`

Whether Formidable's own frontend script is loaded when this form needs it. The script is only queued at all when the form actually uses conditional fields, the JavaScript honeypot, or disable-submit-on-process.

This does not affect assets declared by individual fieldtypes (a date picker, a signature pad); those are always loaded for the fieldtypes in use.

### `honeypot=`

```html
honeypot="your_website"
```

Default: `formidable_hp`

The field name used for the classic honeypot input — a field hidden from humans that bots tend to fill in. Only rendered when the form's Spam settings enable it. Changing the name per site makes it harder to fingerprint.

### `honeypot_js=`

```html
honeypot_js="_ok"
```

Default: `_formidable_js_ok`

The field name used for the JavaScript-only honeypot, which is populated by the browser and therefore stays empty on a scripted POST. Only rendered when the form's Spam settings enable it.

### `form:attribute:NAME=`

```html
form:attribute:class="contact-form stacked"
form:attribute:method="get"
```

Sets or overrides a single attribute on the `<form>` element.

Overrides always merge. Setting one attribute replaces only that attribute — the form's other computed defaults and everything saved on its Attributes tab stay in place. This works whether the wrapper is generated (`include_form_wrapper="yes"`) or built by hand from `{form_attributes}`.

### `field:HANDLE:attribute:NAME=`

```html
field:email:attribute:placeholder="you@example.com"
field:message:attribute:rows="10"
```

Sets or overrides a single attribute on one field, addressed by its handle. Merges the same way as `form:attribute:` — only the named attribute is affected.

### `form:setting:NAME=`

```html
form:setting:enable_storage="no"
form:setting:submission_prefix="Contact —"
form:setting:show_instructions="b"
```

Overrides one of the form's own **Configuration** settings for this render/submission only — nothing is written back to the saved form. Unknown setting names are ignored rather than raising an error.

| `NAME` | Type | Notes |
| --- | --- | --- |
| `show_instructions` | `t` \| `b` | Where field instructions are placed |
| `enable_storage` | boolean | Whether a submission is stored at all ("workflows only" when off) |
| `store_submission_data` | boolean | Whether the stored submission's field data is populated |
| `submission_prefix` | string | Prefix used to build a stored submission's display name |
| `enable_honeypot` | boolean | Classic hidden-field honeypot |
| `enable_honeypot_js` | boolean | JavaScript-only honeypot |
| `disable_submit_on_process` | boolean | Disables the submit button(s) for the duration of a request |
| `template_id` | integer | The Template id used by `template=`'s fallback chain |

Boolean settings accept `yes`/`no`, `1`/`0`, `true`/`false`, or `on`/`off`.

Only `enable_storage`, `store_submission_data`, and `submission_prefix` affect anything past this render — they're threaded through to submission processing along with the encrypted `{form_meta}` payload, so overriding them here genuinely changes what gets stored, not just what's displayed. Every other setting only ever affects this one render (instructions placement, honeypot markup, the submit-disable attribute, and so on).

### `field:HANDLE:rules=`

```html
field:email:rules="required|email"
field:message:rules="required|maxLength[500]"
field:role:rules="enum[editor|author|guest]"
```

Overrides or adds validation rules on one field, addressed by its handle, for this render/submission only.

The value is a pipe-separated list in the syntax EE validation already uses: a rule handle on its own for a rule that takes no argument, or `handle[argument]` for one that does. A pipe *inside* brackets belongs to the argument, so `enum[editor|author|guest]` is one rule with three alternatives rather than three rules.

**Rules merge by default; prefix `=` to replace.** This is the same convention `class` follows in every attribute bag:

```html
field:email:rules="email"      <!-- adds to the field's saved rules -->
field:email:rules="=email"     <!-- replaces them outright -->
field:email:rules="="          <!-- drops the field's saved rules -->
```

Merging is keyed by rule name: a rule the tag names wins, and every other saved rule stays in effect. A field with no `field:HANDLE:rules=` param is unaffected either way.

:::note Replaced a form-level setting
This used to be governed by a **Rule Method** setting on the form. That setting answered the same question once per form and stored the answer in the database, so a template could not add a single rule to one field without knowing how the form happened to be configured — and the answer lived nowhere near the template depending on it. The `=` prefix is per-field, per-call, and visible in the markup.
:::

This is threaded through to `Actions/Submit` via `{form_meta}`, so it changes real server-side validation, not just this render.

### `REGION:attribute:NAME=`

```html
form:attribute:class="contact-form"
label:attribute:class="form-label"
field_wrapper:attribute:class="col-span-6"
option_label:attribute:class="checkbox-label"
```

Sets or overrides a single attribute on every instance of one region — the named parts of a rendered form. See regions for the full model.

| Region | Element |
| --- | --- |
| `form` | the `<form>` element itself |
| `form_content` | the content wrapper inside `<form>` |
| `meta_wrapper` | the hidden processing inputs block |
| `page_nav` | multi-page navigation |
| `field_wrapper` | a field's outer wrapper |
| `field` | the input itself |
| `label` | a field's `<label>` |
| `instructions` | a field's instructions element |
| `error` | a field's error element |
| `button` | submit / reset controls |
| `options_wrapper` | the list around all of a field's options |
| `option` | one option's own wrapper |
| `option_label` | one option's `<label>` |

`class` **appends** rather than replacing, so adding a class never silently drops the ones a fieldtype or your form configuration already set. Prefix the value with `=` to replace outright:

```html
label:attribute:class="mt-2"     <!-- appended -->
label:attribute:class="=mt-2"    <!-- replaces everything below -->
```

:::note One grammar, no exceptions
`form:attribute:` is not a separate parameter family — the `<form>` element is simply the `form` region. Every attribute parameter reads `REGION:attribute:NAME`, at both levels.

Tag **parameters** use colons throughout. Template **variables** keep underscores — `{label_attributes}`, not `{label:attributes}` — because `:` is EE's modifier separator, so `{label:attributes}` would parse as variable `label` with modifier `attributes`.
:::

### `field:HANDLE:REGION:attribute:NAME=`

```html
field:email:label:attribute:class="sr-only"
field:message:field_wrapper:attribute:class="col-span-12"
```

The same regions as above, applied to one field only. Takes precedence over the unqualified `REGION:attribute:` form.

Only the field-level and option-level regions accept this — `form`, `form_content`, `meta_wrapper` and `page_nav` are rendered once per form, so there is no per-field axis for them.

`field:HANDLE:attribute:NAME=` (documented above) is shorthand for `field:HANDLE:field:attribute:NAME=`; both set attributes on that field's input.

## Single Variables

### Form

| Variable | Description |
| --- | --- |
| `{form_id}` | The form's id |
| `{form_handle}` | The form's handle |
| `{form_name}` | The form's name as entered in the control panel |
| `{form_attributes}` | Every `<form>` attribute as a ready-to-use string — see [Attributes](#attributes) |
| `{form_attribute:NAME}` | One attribute's bare value, e.g. `{form_attribute:action}` |
| `{form_meta}` | The hidden inputs required to process a submission |
| `{form_page}` | The current page number, or `1` on a single-page form |
| `{form_page_count}` | The total number of pages |
| `{form_uses_captcha}` | Whether CAPTCHA is enabled — conditional |
| `{form_is_captured}` | Whether the form was captured from existing markup — conditional |
| `{form_stores_submissions}` | Whether submissions are stored at all — conditional |
| `{form_stores_submission_data}` | Whether submitted field data is stored — conditional |
| `{form_shows_instructions}` | `t` or `b` — where field instructions are placed |
| `{form_shows_instructions_on_top}` | Conditional form of the above |
| `{form_shows_instructions_on_bottom}` | Conditional form of the above |

### Errors

| Variable | Description |
| --- | --- |
| `{has_errors}` | Whether the last submission failed validation — conditional |
| `{error:HANDLE}` | The error message for one field, e.g. `{error:email}` |
| `{value:HANDLE}` | The submitted value for one field, e.g. `{value:email}` |

### Field

Available inside [`{fields}`](#fields).

| Variable | Description |
| --- | --- |
| `{field_template}` | The field rendered in full from its display template — see [Field templates](#field-templates) |
| `{field_id}` | The field's id |
| `{field_name}` | The field's label as entered in the control panel |
| `{field_handle}` | The field's handle, also its default `id` and `name` attribute |
| `{field_type}` | The fieldtype's handle, e.g. `text`, `select`, `file` |
| `{field_group}` | The fieldtype group's handle, e.g. `inputs`, `options` |
| `{field_label}` | A ready-made `<label>` element bound to the field's id |
| `{field_instructions}` | The field's instructions as plain text |
| `{field_instructions_top}` | Instructions markup, populated only when the form places them above |
| `{field_instructions_bottom}` | Instructions markup, populated only when the form places them below |
| `{field_attributes}` | Every attribute for the field's own tag — see [Attributes](#attributes) |
| `{field_attribute:NAME}` | One attribute's bare value, e.g. `{field_attribute:value}` |
| `{field_wrapper_attributes}` | Attributes for the field's containing element — see [Attributes](#attributes) |
| `{field_wrapper_attribute:NAME}` | One wrapper attribute's bare value |
| `{field_value}` | The field's current value — see [Value resolution](#value-resolution) |
| `{field_submitted_value}` | Only what was submitted, ignoring stored and default values |
| `{field_content}` | Admin-authored markup for content fieldtypes such as `html` |
| `{field_columns}` | The field's column span, scaled to `template_columns=` |
| `{field_page}` | Which page of a multi-page form the field belongs to |
| `{field_error}` | The validation error for this field, if any |
| `{field_has_error}` | Whether this field failed validation — conditional |
| `{field_is_required}` | Whether the field is required — conditional |
| `{field_is_hidden}` | Whether the field is hidden — conditional |
| `{field_has_conditions}` | Whether the field has show-if rules — conditional |
| `{field_conditions}` | The field's show-if rules as JSON |
| `{field_condition_attributes}` | Just the conditional-fields data attributes |

:::note
Hidden fields are excluded from `{fields}` entirely.
:::

## Variable Pairs

### `{fields}`

Loops over every visible field on the form, in the order set in the builder, limited to the current `page=` when one is given.

```html
{fields}
	<div {field_wrapper_attributes}>
		{field_label}
		<input {field_attributes}>
		{if field_has_error}<p class="error">{field_error}</p>{/if}
	</div>
{/fields}
```

### `{field_options}`

Available inside `{fields}`. Loops over the resolved choices for an options-based field — select, checkbox, radio — regardless of where those choices come from (entered manually, a list, channel entries, categories, members, or roles).

| Variable | Description |
| --- | --- |
| `{value}` | The option's value |
| `{label}` | The option's label |
| `{selected}` | Whether this option is currently chosen — conditional |

The pair is empty rather than absent for fields with no options, so no `{if}` guard is needed around it.

```html
<select {field_attributes}>
	{field_options}
		<option value="{value}"{if selected} selected{/if}>{label}</option>
	{/field_options}
</select>
```

### `{statuses}`

Loops over the form's submission statuses.

| Variable | Description |
| --- | --- |
| `{status_id}` | The status id |
| `{status_name}` | The status name |
| `{status_handle}` | The status handle |
| `{status_color}` | The status colour |

### `{errors}`

Loops over the validation errors from the last submission.

| Variable | Description |
| --- | --- |
| `{error_handle}` | The handle of the field that failed |
| `{error_message}` | The error message |

### `{if no_results}`

Rendered when no form matches `form_id=`/`form_handle=`, or the form has no fields, and `debug=` is off.

## Attributes

Three variables output a complete, ready-to-use attribute string: `{form_attributes}`, `{field_attributes}`, and `{field_wrapper_attributes}`. Each is assembled from three layers, merged low to high:

1. **Computed defaults.** For a form: `method`, `action`, `enctype` when the form has file fields, and `id`/`name` from the form handle. For a field: `id`/`name` from the field handle, `required`, and `value`. For a wrapper: `data-formidable-columns`, plus the conditional-fields data attributes when the field has show-if rules.
2. **Saved attributes.** Whatever was added on the form's or field's Attributes tab in the control panel.
3. **Tag parameters.** Any `form:attribute:NAME=` or `field:HANDLE:attribute:NAME=`.

:::note Overrides always merge
Overriding one attribute never discards the others, at any layer. `form:attribute:method="get"` changes only `method`, leaving the saved bag and every other computed default intact.
:::

### Individual values

Every attribute is also available on its own, using the singular form of the variable name:

```html
{form_attribute:action}
{field_attribute:value}
{field_wrapper_attribute:data-formidable-columns}
```

### The `bag` modifier

Any of the three attribute strings can be narrowed inline with the `bag` modifier, using pipe-delimited attribute names. `only=` keeps just the named attributes; `except=` keeps everything but them.

```html
<form {form_attributes:bag except="id|class"}>
<input {field_attributes:bag only="required|value"}>
```

## Value resolution

`{field_value}`, and the `value` attribute inside `{field_attributes}`, resolve in this order:

1. **Submitted data** — what the visitor typed, when a submission failed validation and the form is being redisplayed.
2. **Stored submission data** — when `submission_handle=` is prefilling the form from a saved submission.
3. **The field's default value** — as configured on the field in the control panel.

A field's configured default may itself contain ExpressionEngine variables, such as `{segment_3}` or a global variable, and these are parsed normally. Submitted and stored values are escaped, since they originate with the visitor.

:::note
Options-based fields carry no `value` attribute, as each option has its own value and selected state — use [`{field_options}`](#field_options) instead.
:::

## Field templates

`{field_template}` renders a field completely, using the display template defined for its fieldtype in the control panel (falling back to the fieldtype group's template when the fieldtype has none). This is what makes the tag work with no field markup in the theme at all.

Display templates are written with the same variables documented above:

```html title="Fieldtype display template"
<div {field_wrapper_attributes}>
	{field_label}
	{field_instructions_top}
	<input {field_attributes}>
	{field_instructions_bottom}
</div>
```

Because they are parsed by ExpressionEngine's own template engine, variable pairs work inside them exactly as they do in a theme template:

```html title="Display template with options"
<div {field_wrapper_attributes}>
	{field_label}
	<select {field_attributes}>
		{field_options}
			<option value="{value}"{if selected} selected{/if}>{label}</option>
		{/field_options}
	</select>
</div>
```

:::caution
A field whose fieldtype and fieldtype group both have an empty display template renders as nothing. Set `debug="on"` to be told which field is affected.
:::

## Examples

### Basic Example

The whole form, wrapper included, with no markup of its own:

```html title="contact.html"
{exp:formidable:form form_handle="contact_us" return="thanks"}
	{if has_errors}
		<div class="errors">
			{errors}<p>{error_message}</p>{/errors}
		</div>
	{/if}

	{fields}{field_template}{/fields}
{/exp:formidable:form}
```

### Custom Example

The same form with the theme in control of every element — its own `<form>` tag, its own field markup, per-field attribute overrides, and errors rendered beside each field:

```expressionengine title="contact.html"
{exp:formidable:form
	form_handle="contact_us"
	include_form_wrapper="no"
	return="thanks"
	return_on_error="contact"
	field:email:attribute:placeholder="you@example.com"
	field:message:attribute:rows="8"
}
	<form {form_attributes:bag except="id"} class="contact-form">
		{form_meta}

		{fields}
			<div {field_wrapper_attributes} class="field field--{field_type} col-{field_columns}">
				{if field_type == "html"}
					{field_content}
				{if:else}
					<label for="{field_attribute:id}">
						{field_name}{if field_is_required} <span aria-hidden="true">*</span>{/if}
					</label>

					{if field_instructions}
						<p class="hint" id="{field_handle}-hint">{field_instructions}</p>
					{/if}

					{if field_group == "options"}
						<select {field_attributes}>
							{field_options}
								<option value="{value}"{if selected} selected{/if}>{label}</option>
							{/field_options}
						</select>
					{if:else}
						<input {field_attributes} aria-describedby="{field_handle}-hint">
					{/if}

					{if field_has_error}
						<p class="error" role="alert">{field_error}</p>
					{/if}
				{/if}
			</div>
		{/fields}

		<button type="submit">Send</button>
	</form>
{/exp:formidable:form}
```
