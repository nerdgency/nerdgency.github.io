---
id: control-panel
title: Control Panel
sidebar_label: Control Panel
description: Configure form HTML attributes using the Control Panel or templates.
keywords:
  - formidable
toc_max_heading_level: 3
---

# Attribute templating: regions, tiers, and levels

Formidable lets you control the HTML attributes generated for each part of a rendered form.

Attributes can be configured in two places:

* **Control Panel** — configure reusable settings for forms, fields, and field types.
* **Templates** — override or extend settings using tag parameters.

Both methods use the same attribute system, so you can build forms entirely through the Control Panel, entirely through templates, or combine both approaches.

The system is based on three concepts:

* **Regions** — the parts of a form that can receive attributes.
* **Tiers** — the amount of markup you want to control yourself.
* **Levels** — the order in which attribute settings are combined.

---

## Regions

A region is a named part of the rendered form output that can receive HTML attributes.

There are three groups of regions:

### Form-level regions

These appear once per form.

| Region         | Applies to                                 |
| -------------- | ------------------------------------------ |
| `form`         | The `<form>` element                       |
| `meta_wrapper` | The hidden form data and security elements |
| `form_content` | The content wrapper inside the form        |
| `page_nav`     | Multi-page form navigation                 |

### Field-level regions

These appear once per field.

| Region            | Applies to                             |
| ----------------- | -------------------------------------- |
| `field_wrapper`   | The outer container around a field     |
| `field`           | The input, select, or textarea element |
| `label`           | The field label                        |
| `instructions`    | The field instructions area            |
| `error`           | Field validation messages              |
| `button`          | Submit and reset buttons               |
| `options_wrapper` | The container around field choices     |

### Option-level regions

These appear once for each choice in fields with options.

| Region         | Applies to                    |
| -------------- | ----------------------------- |
| `option`       | A single option wrapper       |
| `option_label` | The label for a single option |

`options_wrapper` belongs to the field-level group because it wraps all choices for a field rather than an individual choice.

---

## 2. Tiers

Each region can be used at three levels of control.

## Composite tier

The composite tier outputs the complete element for you.

Example:

```
{field_label}
```

This creates the complete label element, including its attributes and contents.

## Attribute bag tier

The attribute bag tier lets Formidable create the element while allowing you to add or modify attributes.

Example:

```
<label {label_attributes}>{field_name}</label>
```

This approach is usually the best choice because Formidable can continue adding required attributes while your theme adds its own styling or behavior.

Attribute bags can also be modified using the `:bag` modifier:

```
<form {form_attributes:bag except="id|class"}>

<input {field_attributes:bag only="required|maxlength"}>

<label {label_attributes:bag class="form-label"}>
```

* `only` keeps only the listed attributes.
* `except` removes the listed attributes.
* Any additional parameters add or modify attributes.

## Parts tier

The parts tier gives you full control over the markup.

Example:

```
<label for="{field_id}">{field_name}</label>
```

Use this when you need complete control over the generated HTML.

---

# 3. Attribute precedence

When multiple sources define attributes, Formidable combines them in order from general settings to more specific settings.

The order is:

1. Formidable defaults
2. Field type group settings
3. Field type settings
4. Site Configuration settings
5. Individual form settings
6. Individual field settings
7. Template tag parameters
8. Field-specific template parameters

Later settings override earlier settings when the same attribute is defined.

For example, a site-wide field class can be overridden by a specific form, field, or template setting.

---

# Attribute sources in the Control Panel

Different parts of Formidable can control different regions.

## Field types and field type groups

Field types control their own markup, so they can configure:

* Field regions
* Option regions

They do not configure form-level regions because those belong to the form itself.

## Configuration and forms

Site configuration and individual forms can configure every region.

## Fields

Individual fields can configure:

* Field regions
* Option regions

This allows a specific field to override the defaults provided by its field type or form.

---

# Pinned regions

Some regions are always shown because they represent the main element being configured.

For example:

* A form always exposes the `form` region.
* A field always exposes the `field` region.

These regions cannot be removed or inherited because they define the primary markup for that item.

---

# Extra Fields

Some field types provide additional settings that automatically create attributes and validation rules together.

For example, a text field's **Maximum Length** setting can:

* Add a `maxlength` attribute to the generated input.
* Add the matching validation rule.

This keeps browser behavior and server-side validation synchronized.

Extra Field settings take priority over general attribute settings, but template parameters can still override them.

Blank Extra Field values do not create empty attributes. They simply leave the attribute unset.

---

# 4. Inheritance

Some settings can inherit attributes from another level:

* Field types can inherit from their field type group.
* Forms can inherit from site configuration.

Inheritance is controlled separately for each region.

A region can either:

* **Inherit** — use attributes from the level above.
* **Override** — use its own settings instead.

An empty override is different from inheritance. An empty override removes inherited attributes rather than allowing them through.

---

# 5. Classes append by default

The `class` attribute behaves differently from other attributes.

Classes are combined rather than replaced.

Example:

```
Configuration:
class="field"

Form:
class="mb-4"

Result:
class="field mb-4"
```

This allows themes and forms to add styling without accidentally removing existing classes.

To replace classes completely, add `=` before the value:

```
class="=mb-4"
```

Result:

```
class="mb-4"
```

This works the same way in the Control Panel and template parameters.

# 6. Template parameters

Template parameters use the same region system as the Control Panel.

The general format is:

```text
REGION:attribute:NAME="value"
field:HANDLE:REGION:attribute:NAME="value"
```

Examples:

```text
form:attribute:novalidate="novalidate"

label:attribute:class="form-label"

field:email:label:attribute:class="=email-label"
```

The first example adds an attribute to the form element.

The second adds a class to all labels.

The third targets only the label for the field with the handle `email`.

Template parameters are applied after Control Panel settings, making them the most specific way to adjust a form.

---

# 7. Dynamic attribute values

Attributes configured in the Control Panel can include field variables.

Example:

```text
class="col-{field_columns} field--{field_handle}"
```

When the form renders, these values are replaced with the corresponding field data.

Attribute values are automatically prepared for use in HTML attributes.

---

# 8. Attribute suggestions

The Control Panel provides suggested attributes based on the region being edited.

Different HTML elements support different attributes, so Formidable groups suggestions by region type.

| Region type    | Suggested attributes | Examples                                    |
| -------------- | -------------------- | ------------------------------------------- |
| Form           | Form attributes      | `novalidate`, `target`, `accept-charset`    |
| Field          | Input attributes     | `placeholder`, `maxlength`, `pattern`       |
| Other elements | General attributes   | `class`, `id`, `role`, `aria-*`, `tabindex` |

Suggestions help make common options easier to find, but they do not limit what you can add.

You can always add custom attributes using the **Other** option.

For example, custom JavaScript or frontend frameworks may require attributes such as:

```text
hx-post="/contact/submit"
```

---

# 9. Common usage examples

## Adding a CSS class to all fields

Use the `field_wrapper` region:

```text
field_wrapper:attribute:class="form-group"
```

Every field wrapper will receive the class.

---

## Adding a class to one field

Target the field by its handle:

```text
field:email:attribute:class="email-field"
```

Only the `email` field receives the class.

---

## Adding HTML attributes to inputs

Use the `field` region:

```text
field:attribute:placeholder="Enter your email"
field:attribute:autocomplete="email"
```

The generated input receives those attributes.

---

## Replacing generated classes

To remove existing classes and provide your own:

```text
field:attribute:class="=custom-field"
```

---

# 10. Choosing the right approach

Most projects should use the attribute bag tier:

```text
<label {label_attributes}>{field_name}</label>
```

This keeps Formidable's built-in behavior while allowing your theme to customize the output.

Use the Control Panel when:

* Multiple forms share the same design system.
* Editors need to manage form presentation.
* A site has consistent frontend conventions.

Use template parameters when:

* A single template needs a special variation.
* A form requires page-specific customization.
* You need the most specific override.

Use the parts tier when:

* You need complete control over the generated HTML.
* You are building a custom markup system.

---

# 11. Summary

Formidable's attribute system provides a single way to manage HTML attributes across the Control Panel and templates.

The key concepts are:

* **Regions** define where attributes apply.
* **Tiers** determine how much markup you control.
* **Levels** determine which settings take priority.
* **Inheritance** lets forms and field types reuse shared settings.
* **Attribute bags** provide a balance between flexibility and built-in functionality.
* **Template parameters** provide precise, last-minute overrides.

Whether you configure attributes globally, per form, per field, or directly in templates, all settings use the same system.
