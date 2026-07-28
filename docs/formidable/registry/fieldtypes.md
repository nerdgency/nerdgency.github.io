---
id: fieldtypes
title: Fieldtypes
sidebar_position: 30
description: Every kind of field you can add to a Formidable form, grouped as they appear in the field picker, with the settings each one offers.
keywords:
  - formidable
  - fieldtypes
  - form fields
  - expressionengine
toc_max_heading_level: 3
---

# Fieldtypes

A **fieldtype** is a kind of field you can add to a form — a text box, a
dropdown, a file upload, a signature pad. It decides three things: what the
field looks like on your site, what settings you're offered when you configure
it, and what happens to the answer when someone submits.

Formidable ships with twenty-one, sorted into four groups. The groups are what
you see when you click **Add Field**, and they're more than a filing system —
fields in a group share behaviour, so a Select and a set of Checkboxes handle
their choices the same way even though they look nothing alike.

:::tip Every field shares a common core
Whatever its type, every field has a **name**, a **handle** (used in your
templates and in submission data), optional **instructions**, and a
**Conditions** tab for showing or hiding it based on other answers. Most also
offer an **Attributes** tab for HTML attributes and a **Rules** tab for
validation. The sections below only describe what's *particular* to each type.
:::

## At a glance

| Group | Fieldtypes |
| --- | --- |
| [Inputs](#inputs) | Text, Email, Number, Telephone, URL, Password, Dates & Times, Color, Range, Hidden, Textarea, File |
| [Options](#options) | Checkboxes, Select, Radio Buttons |
| [Buttons](#buttons) | Submit, Reset |
| [Special](#special) | HTML, Captcha, Turnstile, Signature |

---

## Inputs

Single-value fields that render as one native HTML control. This is the group
you'll reach for most: someone types or picks a value, and that value is stored
against the submission.

All of them offer a default value, an Attributes tab and a Rules tab.

### Text

The general-purpose single-line field. Reach for it when nothing more specific
fits.

**Particular settings:** none beyond the common core.
**Can be encrypted:** yes.

### Email

A single-line field that renders as `<input type="email">`, so browsers and
phone keyboards treat it as an address.

Pair it with the `email` rule on the Rules tab — the input type alone is a
convenience, not a guarantee, and only the rule actually rejects a bad address
on submission.

**Can be encrypted:** yes.

### Number

A numeric field. Its answer is stored as a **decimal number** rather than text,
so it sorts and compares correctly in exports and conditions.

**Useful rules:** `greaterOrEqualThan`, `lessOrEqualThan`, `numeric`.

### Telephone

A phone-number field, rendered as `<input type="tel">` so mobile browsers show a
dialling keypad. Stored as text, because phone numbers aren't really numbers —
leading zeros, spaces and `+` all matter.

**Can be encrypted:** yes.

### URL

A web-address field. As with Email, add the `url` rule if the value genuinely
has to be a valid address.

### Password

A masked single-line field.

:::caution Masking is not protection
The mask only hides the value on screen. If the answer is genuinely sensitive,
turn on **Encrypt** as well — that's what protects it at rest. Encryption can
only be set when the field is first created.
:::

**Can be encrypted:** yes.

### Dates & Times

A date or time field. This one has an extra setting the other inputs don't:

**Input type** — choose how the browser presents it:

| Option | Picks |
| --- | --- |
| `date` | a calendar date |
| `time` | a time of day |
| `datetime-local` | both together |
| `month` | a month and year |
| `week` | a week number and year |

### Color

A colour picker, stored as a hex value.

**Useful rule:** `hexColor`.

### Range

A slider. Like Number, its answer is stored as a **decimal number**.

Set the slider's bounds and step on the **Attributes** tab using `min`, `max`
and `step` — without them a browser defaults to 0–100, which is rarely what
you want.

### Hidden

Carries a value the visitor never sees or edits — a campaign tag, a source
label, a value from the URL.

Because there's nothing to see, this field shows **no label, no instructions
and no required marker** in the form.

:::caution Hidden does not mean trusted
A hidden field is still an ordinary input in the page, and anyone can change it
before submitting. Never use one for anything a visitor shouldn't be able to
alter.
:::

### Textarea

A multi-line text field, for longer answers.

**Can be encrypted:** yes.

### File

An upload field. This one has its own **File** tab:

| Setting | What it does |
| --- | --- |
| **Upload destination** | Which of ExpressionEngine's upload directories files land in |
| **Subfolder** | An optional folder within that destination |
| **Accepted types** | Which kinds of file to allow, chosen from plain-language categories |
| **Maximum size** | In kilobytes. Leave at 0 to inherit the destination's own limit |
| **Allow multiple** | Whether one field can accept several files |

Leaving **Accepted types** and **Maximum size** empty is deliberate and usually
right: the field then follows whatever the upload destination is already
configured to allow, so you set those rules once in **Files** rather than
repeating them on every form.

Uploaded files become real entries in ExpressionEngine's file manager, and the
submission stores a reference to them.

:::note Local destinations only
Files can currently be uploaded only to destinations stored on your own server.
Cloud-backed destinations aren't supported for uploads yet.
:::

---

## Options

Fields whose answer comes from a fixed set of choices you configure. All three
share a single **Options** tab — the difference between them is presentation,
not behaviour.

### Where the choices come from

The Options tab lets you draw the list from any of:

- **Manual** — type the choices yourself
- **List** — reuse a named list from the Registry, so several forms can share
  one set of choices and you update it in one place
- **Channel entries**, **Categories**, **Members**, **Roles** — build the list
  from content already on your site, so it stays current without anyone
  maintaining it

For each source you choose which value is stored and which label is shown.

:::note Answers are checked against the list
When you enter choices manually, Formidable rejects any submitted value that
isn't one of them — so a tampered form can't smuggle in an answer you never
offered. Dynamic sources aren't checked this way, since their contents can
legitimately change between rendering the form and submitting it.
:::

### Checkboxes

A group of checkboxes. The only fieldtype that accepts **more than one answer**,
so its value is stored as a list rather than a single value.

Worth knowing when you build reports or conditions: a Checkboxes answer is
always a list, even when only one box was ticked.

### Select

A dropdown. One answer.

### Radio Buttons

A set of radio buttons. One answer — the same as Select, shown as a visible
list rather than a dropdown. Choose it when the options are few and you want
them all on screen at once.

---

## Buttons

Controls that act on the form rather than collect an answer. They store nothing,
and they're skipped entirely when a submission is processed.

Because a button has no value, it shows no label, no instructions and no
required marker, and it has no Rules tab. Its **name** is the text on the
button.

### Submit

Sends the form.

### Reset

Clears the form back to its starting state. Standard browser behaviour — no
confirmation, and it can't be undone.

---

## Special

Fields that don't fit the ordinary pattern. Their visible part is generated at
render time rather than described as a simple input, and most of them store
nothing at all.

### HTML

Not a field so much as a block of content in the middle of your form — a
heading, an explanatory paragraph, a divider, a link to your privacy policy.

Its one setting is a **Content** box holding the markup to output. Nothing is
collected, validated or stored, and it has no Attributes or Rules tab.

:::caution The content is output as written
Whatever you enter is placed on the page as-is, including any HTML or scripts.
Only give this field to people you'd trust to edit a template.
:::

### Captcha

A challenge that asks a visitor to prove they're human, using **ExpressionEngine's
own CAPTCHA settings** rather than a separate configuration of its own.

That means it follows whatever you've set under **Settings → CAPTCHA** — the
classic word-and-image challenge, or reCAPTCHA if you've configured it — and it
respects your rule about exempting logged-in members. If CAPTCHA is switched off
site-wide, the field renders nothing.

There is nothing to configure on the field itself, which is what its settings
tab tells you. Nothing is ever stored: the answer is checked during submission
and discarded.

### Turnstile

Cloudflare's alternative to a CAPTCHA — usually invisible to the visitor.

Unlike Captcha, this one needs credentials, which live in a **Connection**
(under Configuration → Connections) rather than on the field. Its one setting
picks **which Connection** to use, so a site can run different Turnstile widgets
on different forms, or separate staging and production keys.

:::caution Configure the Connection first
A Turnstile field with no Connection selected rejects every submission. If
you're setting one up, create the Connection before you add the field.
:::

Nothing is stored. As with Captcha, the check happens during submission.

### Signature

A pad the visitor signs with a mouse, trackpad or finger.

Its settings tab has two halves. The first controls **how the pad looks and
behaves**:

| Setting | Default |
| --- | --- |
| Width | `100%` |
| Maximum width | none |
| Height | `200` |
| Pen colour | `#000000` |
| Background colour | `#ffffff` |
| Minimum / maximum pen width | `0.5` / `2.5` |
| Border | on |
| Placeholder text | none |
| Undo button | off |

The second controls **what happens to the signature**:

| Setting | What it does |
| --- | --- |
| **Storage mode** | `base64` keeps the image inside the submission; `file` writes it to an upload destination |
| **Destination** | Which upload directory, when storage mode is `file` |
| **Maximum size** | In kilobytes. 0 for no limit |
| **Record metadata** | Also store the image's dimensions, type and a timestamp |

:::caution Record metadata changes the stored shape
With it off, the field stores a single value like every other field. With it on,
it stores a small bundle of details instead — which means anything expecting a
plain value, such as pre-filling the field from a previous submission, will no
longer find one. Leave it off unless you specifically need the extra detail.
:::

Signing requires JavaScript. Visitors without it see a short message in place of
the pad rather than a broken control.

---

## Which fields store an answer

Useful when you're building exports, conditions or workflows.

| Fieldtype | Stored as | Notes |
| --- | --- | --- |
| Text, Telephone, URL, Password, Textarea, Color, Dates & Times | Text | |
| Number, Range | Decimal number | |
| Checkboxes | List | Always a list, even with one answer |
| Select, Radio Buttons | Text | |
| File | File reference | A list of references when *Allow multiple* is on |
| Signature | Image, or a bundle | Depends on *Record metadata* |
| Submit, Reset, HTML | *nothing* | |
| Captcha, Turnstile | *nothing* | Checked on submission, never kept |

## Which fields can be encrypted

Text, Email, Telephone, Password and Textarea.

Encryption is set when the field is **first created** and can't be switched on
afterwards — an existing field's stored answers would already be in the clear,
and turning the setting on later would give a false impression that they weren't.