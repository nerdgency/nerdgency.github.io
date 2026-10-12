---
title: Upgrade guide
description: What happens each time Formidable updates, and what changes when you move from a pre-release build to 1.0.
keywords:
  - formidable
  - upgrade
  - breaking changes
---

# Upgrade guide

## Every update

The steps themselves are short: replace two folders, then choose **Update** on the **Add-Ons** screen. See [Installation](/docs/formidable/getting-started/installation#updating). Each time the update runs, Formidable:

- stops before anything changes if PHP is older than 8.2;
- runs any new database migrations;
- adds any fieldtypes and fieldtype groups the new release ships that your site doesn't have yet. Fieldtypes you already have are never changed, because they can be edited in the control panel;
- clears each member's cached Jump Menu, so new commands appear straight away.

The fieldtype step can also be run on its own, from the command line or from [Utilities](/docs/formidable/control-panel/utilities):

```bash
php system/ee/eecli.php formidable:sync-fieldtypes
```

## From a pre-release build to 1.0

### Reinstall, rather than update

Formidable's database tables were rebuilt for 1.0: each table is now created whole by a single migration. A site running a pre-release build can't update in place.

1. **Export what you want to keep.** Open each form's **Submissions** and export them.
2. **Uninstall** Formidable on the **Add-Ons** screen. This deletes every form and submission.
3. **Replace both folders** with the 1.0 release, then **Install**.

Once you're on 1.0, every later release updates in place as described above.

### A form field is a workflow recipient only when you allow it

A workflow email's **form field** recipient used to send to whatever the field contained, which let anyone who could submit the form choose an address for your site to email. Now it sends only to:

- the addresses behind a **Recipients** option list;
- members chosen from a **Members** option list;
- a field with **Allow as Workflow Recipient** turned on.

See [Let visitors choose the recipient](/docs/formidable/automation/email-notifications#let-visitors-choose-the-recipient).

### Rule Method is now part of the tag

The form-level **Rule Method** setting is gone. Rules set on the tag merge with the field's saved rules. Start the value with `=` to replace them instead:

```ee title="templates/default_site/contact.group/index.html"
{exp:formidable:form
    form_handle="contact_us"
    field:email_address:rules="=required|email"
}
```

### URL tags were replaced by the JSON API

The signed-URL tags `submissions_url` and `form_json_url` were removed. The [JSON API](/docs/formidable/headless/json-api) decides on each request who may read what, so there's nothing to sign into a URL. Print an API address with [`{exp:formidable:api_url}`](/docs/formidable/reference/tags/api-url):

```ee title="templates/default_site/contact.group/index.html"
{exp:formidable:api_url form_handle="contact_us" submissions="yes"}
```

### Dates and times are separate fieldtypes

The single **Dates & Times** fieldtype with an input-type dropdown is now a group of five fieldtypes: **Date**, **Date & Time**, **Time**, **Month** and **Week**. Each compares its own kind of value in conditions and in the submissions filter. Choose the matching fieldtype when you rebuild a form.
