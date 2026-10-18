---
title: Field settings
description: Create an Autograph field and set its size, how the pad looks, where signatures are kept, and whether editors can sign in the control panel.
keywords:
  - autograph
  - field settings
  - canvas
  - responsive
---

# Field settings

## Introduction

An Autograph field is created like any other field. Under **Developer › Fields**, choose **Autograph** as the type and assign its field group to the channels that need a signature. It also works as a [member field](./member-fields.mdx), and as a column in a [Grid or a field in Fluid](./grid-and-fluid.md).

## Size

| Setting | New fields | What it does |
| --- | --- | --- |
| **Canvas Width** | `400` | Width of the saved signature image, in pixels. Required. |
| **Canvas Height** | `200` | Height of the saved signature image, in pixels. Required. |
| **Display Width** | `100%` | How wide the pad is on the page: `100%` to fill the space, or a length such as `400px`, `30em` or `80vw`. |
| **Max Width** | Empty | Optional. Stops a responsive pad growing past this, for example `600px`. |

The pad always keeps the canvas's shape, so a 400 × 200 canvas shown 300 pixels wide is 150 pixels high. Whatever size the pad is on screen, the saved image is exactly **Canvas Width** × **Canvas Height**, and those are the sizes [`{field:width}`](../reference/template-tags.mdx#width) and [`{field:height}`](../reference/template-tags.mdx#height) return.

On a high-resolution screen the pad draws at the screen's full resolution, so strokes stay sharp.

## The pad

| Setting | New fields | What it does |
| --- | --- | --- |
| **Pen Color** | Black | The ink, picked with ExpressionEngine's color picker. |
| **Pen Width** | `0.5` to `2.5` | Thinnest and thickest stroke, in pixels. The line gets thinner as the pen moves faster, as real ink does. |
| **Background Color** | Empty | A hex color such as `#ffffff`, painted into the saved image. Empty keeps the signature transparent, so it sits on whatever is behind it. |
| **Show Border** | On | A light border round the pad, so visitors can see where to sign. |
| **Placeholder** | Empty | Text on the pad until someone starts signing, such as *Sign here*. |
| **Allow Undo** | On | Shows the **Undo** button. |
| **Sign in the Control Panel** | Off | Shows the pad on the publish form, for signing in person. See [Control panel](./control-panel.md). |

## Storage

| Setting | New fields | What it does |
| --- | --- | --- |
| **Storage Method** | In the entry | Where new signatures are kept: in the entry, or as a file. See [Storage](./storage.md). |
| **Save To** | None | Where signature files go: an upload directory, or a subfolder in it, from one searchable list. Shown, and required, when **Storage Method** is a file. |
| **Max Size (KB)** | `0` | Refuses a signature larger than this. `0` for no limit. |

## Fields from 1.x

A field created in Autograph 1.x keeps working as it did until you edit it. The settings it doesn't have yet behave as 1.x did: a fixed width at the canvas width, no border on the front end, a transparent background, Undo shown, and signatures saved in the entry. Opening the field's settings shows those values, so saving it changes nothing unless you change them.

## Required fields

Mark the field **Required** in its settings to make a signature mandatory. On the front end, an empty pad stops the form with a short message before it's sent, and the server refuses an empty value either way.

## What gets saved

Every signature is checked on the server before it's kept: the PNG is decoded and must really be an image, and it's saved re-encoded from the checked image rather than as the text that was posted. Anything else is refused with *The signature could not be read*.

What the field stores is always a plain string: the image itself as a PNG [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data), or the id of the file it was saved as. See [Storage](./storage.md).
