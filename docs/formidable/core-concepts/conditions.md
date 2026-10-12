---
title: Conditions
sidebar_position: 7
description: Show, hide or require fields, skip pages and hide sections based on other answers. The same conditions run on the page and on the server.
keywords:
  - formidable
  - conditional logic
  - conditions
---

# Conditions

A condition is a rule about other answers: "**Country** is any of Canada, United States", "**Age** is less than 18". Formidable uses one condition builder for all of these:

- a field's **Conditions** tab: show or hide the field, and make it required;
- page and section settings: skip a page, hide a section;
- a workflow's conditions: run the workflow only when they hold;
- the **Submissions** filter, and the filters on other control panel listings.

## Fields

A field's **Conditions** tab has two parts:

- **Show if** or **Hide if** (the mode), with a set of rules. While the rules decide the field is hidden, it is not shown, not validated, and its answer is blanked before the submission is stored.
- **Require if**, with its own rules. While they hold, the field is required, even if it is not normally.

Rules combine with **and** and **or**, and can be grouped.

## Pages and sections

A page can be skipped and a section hidden by the same kind of rules. To keep the order of the form well defined, a **page** condition can only use fields on earlier pages, and a **section** condition can only use fields on earlier pages or in earlier sections of its own page. The builder only offers those fields, and the server refuses to save anything else, so circular conditions are impossible.

On a multi-page form, a skipped page is skipped by **Next**, **Back** and the step indicator alike. Its answers are blanked, so an answer on a skipped page can never switch on a later page. The last page that applies shows **Submit** in place of **Next**.

## Operators

What a rule offers depends on the field it reads:

| The field is | Operators |
| --- | --- |
| Text | equals, not equals, contains, does not contain, starts with, ends with, is empty, is not empty |
| A number (Number, Range, or a field cast to a number) | equals, not equals, greater than, greater than or equal, less than, less than or equal, between |
| A date (Dates & Times fieldtypes) | on, not on, after, on or after, before, on or before, between |
| True or false (a field cast to true/false) | is, is not |
| Has choices (Select, Radio Buttons, Checkboxes, …) | is any of, is none of |

- Date operators work **by the day**. "On or after the 3rd" includes 3 pm on the 3rd.
- **Between** takes two numbers or two dates and includes both ends.
- A **Computed** field compares as what it produces: a number for arithmetic and lengths of time, a date for "date plus days", text for joined text.
- Fields that hold several answers (Checkboxes, multiple files) compare each answer in turn, so "is any of" works. In the **Submissions** filter, where the answers are searched in the database, these fields use "contains".

## Where conditions run

Conditions run in two places: in the browser, by `formidable.js`, so fields appear and disappear as the visitor types, and on the server when the form is submitted. The server does not trust the browser. It works out what is visible and required from the submitted answers, whatever the page claimed. Turning scripts off, editing the page or posting by hand cannot get around a condition. Both use one shared set of test cases, so a condition cannot hold on the page and fail on the server.

`formidable.js` is added to the page only when the form needs it. See [Troubleshooting](/docs/formidable/getting-started/troubleshooting#conditions-do-not-work-on-the-page) if conditions do not respond.
