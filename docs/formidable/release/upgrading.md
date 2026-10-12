---
title: Upgrade notes
sidebar_position: 3
description: What changes when you update Formidable, and what to check when moving from a pre-release build to 1.0.
keywords:
  - formidable
  - upgrade
  - breaking changes
---

# Upgrade notes

## Every update

The update steps are in [Installation and updates](/docs/formidable/getting-started/installation#update). Each time the update runs, Formidable:

- refuses to continue on PHP older than 8.2, before anything changes;
- runs any new database migrations;
- adds fieldtypes and fieldtype groups a new release ships that your site does not have. Existing fieldtypes are never changed, because they can be edited in the control panel;
- installs the **Formidable Form** channel fieldtype if the site does not have it yet.

## From a pre-release build to 1.0

Sites that ran a pre-1.0 build should check the following after updating. Each item is a deliberate change in behaviour, not a bug.

### Dates and times are separate fieldtypes

There used to be one **Dates & Times** fieldtype with an input-type dropdown. It is now a **Dates & Times** group of five fieldtypes: Date, Date & Time, Time, Month and Week. The update moves each existing field to the fieldtype matching its input type, keeping its answers and settings, so time and month fields get the right condition operators and filters. If the old fieldtype had been renamed or reconfigured in the control panel, it is left alone and reported instead.

You can run the same step again from the command line:

```bash
php system/ee/eecli.php formidable:sync-fieldtypes
```

### A form field is a workflow recipient only when allowed

A workflow email's **Form Field** recipient used to send to whatever the field contained, which let anyone who could submit the form choose an address for the site to email. Now it sends only to:

- the addresses behind a **Recipients** option list;
- members chosen from a **Members** option list;
- a field with **Allow as Workflow Recipient** turned on.

A workflow that pointed at a plain email field sends nothing to it until that setting is turned on for the field. See [Dynamic recipients](/docs/formidable/guides/email-notifications#let-visitors-choose-the-recipient).

### Rule Method is now part of the tag

The form-level **Rule Method** setting is gone. Per-field rule overrides on the tag merge with the field's saved rules by default. Prefix the value with `=` to replace them:

```ee title="templates/default_site/contact.group/index.html"
{exp:formidable:form form_handle="contact_us" field:email_address:rules="=required|email"}
```

### URL tags replaced by the JSON API

The signed-URL tags `submissions_url` and `form_json_url` were removed. The [JSON API](/docs/formidable/developer/json-api) decides per request who may read what, so there is nothing to sign into a URL. Use [`{exp:formidable:api_url}`](/docs/formidable/developer/tags/api-url) to print an API address:

```ee title="templates/default_site/contact.group/index.html"
{exp:formidable:api_url form_handle="contact_us" submissions="yes"}
```

### Field Library columns

Linking fields to the [Field Library](/docs/formidable/core-concepts/forms-and-fields#the-field-library) needs two columns on the fields table, added by the update. Existing fields stay ordinary, unlinked fields.
