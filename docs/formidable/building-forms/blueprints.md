---
title: Blueprints, export and import
description: Start a form from a blueprint, save your own forms as blueprints, and move a form between sites as a file.
keywords:
  - formidable
  - blueprints
  - form templates
  - export form
  - import form
---

# Blueprints, export and import

## Introduction

A **blueprint** is a form to start from. Using one makes an ordinary new form you can change however you like; the blueprint stays as it was, and the form keeps no link to it.

Formidable ships these:

| Blueprint | What it holds |
| --- | --- |
| **Contact Us** | Name, email, subject and message, emailed to your team with a copy to the visitor |
| **Newsletter Signup** | Email, first name and consent to be emailed |
| **Support Request** | Topic, urgency, details and screenshots, with New, In progress and Resolved statuses and buttons to move a request along |
| **Quote Request** | Contact details, the services needed, budget and timeline |
| **Appointment Request** | A preferred date and time with a second choice, and Confirm and Decline buttons |
| **Event Registration** | Name, ticket type, guests, dietary and accessibility needs, with a confirmation email |
| **Feedback Survey** | An overall rating, an agree-or-disagree grid, a 0–10 "would you recommend us" scale and suggestions |
| **Job Application** | Three pages: the applicant, the role with a CV upload, and past employers as "Add another" rows, with statuses and buttons from Shortlist to Hire or Reject |
| **Volunteer Sign-up** | Contact details, availability, interests and experience |

Every email to your own team arrives switched off, with no recipient, until you choose who it goes to. Copies to the visitor go to the form's Email field and work straight away. You can save any of your own forms as a blueprint too, and every site in a Multiple Site Manager install can use it.

Behind both is the **form document**: a form's settings, fields, statuses, workflows and submission actions as one JSON file. Export one from a form, import it on another site, and you have the same form there.

Blueprints, export and import all need the **Manage forms** permission.

## Starting from a blueprint

1. Open **Formidable › Blueprints**, or choose **New › From a blueprint** on the Forms listing.
2. Choose **Use** on a blueprint. You'll see its fields page by page, each workflow (when it runs, what it does, who it goes to, and whether it's ready or waiting to be set up), its statuses and buttons, and anything that won't come across as it was.
3. Change the name and handle if you like, and choose **Create the form**. It opens in the builder.

## Saving a form as a blueprint

Open the form and choose **Save as blueprint** in its title bar. Give it a name, a handle and a description. It appears on the Blueprints screen, where it can be used, downloaded or deleted. Deleting a blueprint doesn't touch the forms made from it. The shipped blueprints can't be deleted.

A blueprint is a snapshot of the form when it was saved. Changing the form afterwards doesn't change the blueprint; save it again under a new name for that.

## Moving a form to another site

1. On the form's page, choose **Export**. A `.formidable.json` file downloads.
2. On the other site, choose **New › Import a form** on the Forms listing. Upload the file, or paste its contents, and choose **Check it**.
3. Review what it holds and what won't come across, then choose **Create the form**.

The command line does the same: `formidable:form:export --form=handle > file.json` and `formidable:form:import --file=file.json`. See [Command line](/docs/formidable/reference/command-line).

## What comes across

| Comes across | Doesn't |
| --- | --- |
| The form's settings, pages and sections | Submissions, drafts and counts |
| Every field and its settings, including conditions and computed fields | A captured form's link to its template: an imported form is a builder form |
| Statuses and submission actions | Email addresses typed into workflows, member and role recipients |
| Workflows: when they run, their conditions and their email wording | Webhook URLs and secrets, and attached files |
| A connection workflow's list and field mapping, and its connection by name | |
| Field recipients ("email the address in the Email field") | Connection keys, ever |

A field linked to your [field library](/docs/formidable/building-forms/fields) is exported with its settings as they read. On import it's linked again if the site has a library field with the same handle and fieldtype, and arrives as an ordinary field otherwise.

## What is matched on the new site

Some settings point at things on the site itself. They're carried by name and matched on the site the form lands on:

- **Choices from channel entries, categories or members**: the channel, entry statuses, category group and roles, by name.
- **File fields**: the upload destination and folder, by name.
- **Turnstile and hCaptcha, and connection workflows** (Mailchimp, HubSpot and the rest): the connection, by its name. Its keys are never exported; the new site needs a connection of the same name.
- **Submission actions**: who may run them, by role.
- **The theme**: by name. A theme the site doesn't have falls back to the site's own theme.

Anything that can't be matched is listed before the form is made, and again once it's created:

- A field whose fieldtype the site doesn't have is left out.
- A setting with nothing to match is left empty, to choose in the field's settings.
- A workflow that lost its recipients or URL, or whose connection the site doesn't have, arrives **switched off**, until you set it up. One whose connection is found arrives switched on.
- A submission action whose roles aren't all on the site arrives switched off, so it never opens up to more people than it did.
- A File field arrives without an upload destination: choose one on its **File** tab before the form takes uploads.
- A handle already taken gets a number added.

A file exported by an older version of Formidable is brought up to date as it's imported.

## For developers

Blueprints can also be written in PHP, with the same builder the shipped ones use:

```php
use Nerdgency\Formidable\Library\Blueprint\BlueprintBuilder;

$document = BlueprintBuilder::make('Event RSVP', 'event_rsvp')
    ->description('Who is coming, and how many.')
    ->field('name', 'Name', 'text', ['required' => true], columns: 2)
    ->field('guests', 'Guests', 'number', [], columns: 2)
    ->workflow('Tell the organiser', 'submission_created', 'email', [
        'email_notification_subject' => 'New RSVP from {field:name}',
    ], needsSetup: true)
    ->document();
```

The document can be imported with `formidable:form:import`, or written to a file and imported in the control panel. A document from a newer version of Formidable is refused, so update the site first.

Connections are named by their handle, or as `provider:name`, never by id, so the same code works on every site that has a connection of that name. A workflow's `key` lets an update find it again after it's renamed:

```php
$document = BlueprintBuilder::make('Newsletter', 'newsletter')
    ->field('email', 'Email', 'email', ['required' => true])
    ->field('captcha', 'Spam check', 'turnstile', connection: 'cloudflare_turnstile')
    ->workflow('Add to Mailjet', 'submission_created', 'connection', [
        'connection_target' => '12345',
        'connection_mapping' => [['name' => 'Email', 'value' => 'email']],
    ], connection: 'mailjet', key: 'mailjet')
    ->document();
```

## Keeping forms in code

To keep a form defined in code or in version control, update it from its document instead of making a new one each time:

```bash
php system/ee/eecli.php formidable:form:import --file=forms/newsletter.json --update --check
php system/ee/eecli.php formidable:form:import --file=forms/newsletter.json --update
```

From PHP, `FormImporter::sync($document)` does the same, and `FormImporter::checkSync($document)` returns the plan without changing anything.

The form with the document's handle is updated in place, or created if it isn't there yet. Fields, statuses and actions are matched by handle, workflows by their key or name, and everything matched keeps its id, so **submissions, links and saved views are untouched**. The form's builder then shows that it's managed in code, since the next update replaces changes made there.

An update is careful by default:

| Change | What happens |
| --- | --- |
| A new field, status, workflow or action | Added |
| A changed label, setting, option, condition or layout | Updated |
| A field, status, workflow or action the document leaves out | Kept, and listed. `--prune` removes it. |
| `--prune` on a field with answers, or a status submissions are in | Refused |
| A field whose fieldtype changed | Refused, since its answers have the old shape. `--allow-type-changes` changes it anyway. |
| An option removed that answers use | Updated, with a note: those answers keep their value |
| Recipients, a webhook or a connection the document leaves blank | The site's own are kept, so updating from an exported file never wipes them |
| Something **changed in the control panel since the last update**, which the document would change again | Refused, naming it, so the change isn't lost. Copy it into the document, or use `--overwrite-site-changes` to replace it. |

Only what actually differs is listed and written: running an update twice in a row changes nothing the second time. Each update records what it wrote, which is how a later one notices edits made in between (the first update after upgrading has nothing to compare with, and says so).

Anything refused stops the whole update, and nothing is changed. A form setting the document doesn't mention stays as the site has it. A captured form can't be updated this way, since its fields come from its template.
