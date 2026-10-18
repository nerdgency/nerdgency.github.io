---
title: Field settings
description: Create an Autograph field and choose its canvas size, pen colour, and whether editors can sign in the control panel.
keywords:
  - autograph
  - field settings
  - canvas
  - pen color
---

# Field settings

## Introduction

An Autograph field is a channel field like any other. Create it under **Developer › Fields**, choose **Autograph** as the type, and assign its field group to the channels that need a signature.

Autograph fields can be used as ordinary channel fields, and as [member fields](./member-fields.mdx). They can't be used inside Grid or Fluid fields.

## Settings

Each Autograph field has four settings, under **Field Options**:

| Setting | Default | What it does |
| --- | --- | --- |
| **Canvas Width** | `400` | The width of the signing pad, in pixels. Required. |
| **Canvas Height** | `200` | The height of the signing pad, in pixels. Required. |
| **Pen Color** | Black | The colour of the ink. Picked with ExpressionEngine's colour picker. |
| **Save in Control Panel** | Off | Whether editors can sign on the publish form. See [Control panel](./control-panel.md). |

The canvas size is also the size of the saved image, and the size [`{field_name}`](../reference/template-tags.mdx#field_name) gives the `<img>` it outputs. If you change it after signatures have been saved, existing signatures are drawn at the new size, stretched if the shape changed.

:::tip Keep the canvas modest
The signature is saved as a PNG image inside the entry. A bigger canvas makes a bigger image, and the column it's saved in holds about 64 KB. 400 × 200 leaves plenty of room. See [Long signatures are cut off](../getting-started/troubleshooting.md#long-signatures-are-cut-off).
:::

## Required fields

Mark the field **Required** in its field settings to make a signature mandatory. An untouched or cleared pad submits an empty value, so ExpressionEngine refuses the entry as it would any other empty required field.

## What gets saved

Every signature is saved as a PNG [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data), a line of text beginning `data:image/png;base64,`, in the field's own column on the entry. Nothing is written to an upload directory. The background is transparent.

Because it's text, the signature travels with the entry: it's copied when the entry is duplicated, included in entry exports, and deleted with the entry.
