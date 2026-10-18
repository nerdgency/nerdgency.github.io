---
title: Grid and Fluid
description: Use Autograph as a Grid column or a Fluid field, in the control panel and in Channel Forms.
keywords:
  - autograph
  - grid
  - fluid
---

# Grid and Fluid

## Introduction

An Autograph field can be a **Grid** column, for a signature on each row (each attendee, each witness), or a field inside **Fluid**. Choose **Autograph** as the column's or the field's type, and it has the same [settings](./field-settings.md) as an ordinary Autograph field.

Each row or Fluid field gets its own pad. Rows and fields added on the page start their pad straight away, in the control panel and in Channel Forms.

## Displaying them

Inside a Grid's variable pair, or a Fluid field's, the column or field works with the same [template tags](../reference/template-tags.mdx):

```html title="templates/default_site/events.group/attendees.html"
{exp:channel:entries channel="events" limit="1"}
    {attendees}
        <div class="attendee">
            <p>{attendees:name}</p>
            {if attendees:signature}
                {attendees:signature alt="Signature"}
            {/if}
        </div>
    {/attendees}
{/exp:channel:entries}
```
