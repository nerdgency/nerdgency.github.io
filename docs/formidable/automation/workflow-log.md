---
title: The workflow log and queue
description: Every workflow run, recorded and replayable, and how to run workflows in the background with retries.
keywords:
  - formidable
  - workflow log
  - queue
  - retries
---

# The workflow log and queue

## Introduction

Every time a [workflow](/docs/formidable/automation/workflows) runs, Formidable records what happened: whether it worked, what it sent, and what came back. When something goes wrong, the log tells you why, and **Run again** sends it once you've fixed it.

By default, workflows run inside the visitor's request. A queue moves them into the background and retries the ones that fail.

## The workflow log

Every run is recorded on **Formidable › Workflow Log**, with its result, action, time, duration and message. The same runs appear on each form's **Workflows** tab under **Recent runs**, and on each submission's page, opening on that submission's runs.

<Screenshot
  img={require('@site/static/img/screenshots/formidable/workflow-log.png')}
  alt="The workflow log listing runs with their result, workflow, form and time"
  caption="Formidable › Workflow Log"
  captured="ExpressionEngine 7.5.26, demo data"
/>

| A run records | |
| --- | --- |
| **Result** | **Succeeded**, **Failed** (the mail server, API or URL refused), **Nothing to do** (it ran, but there was no recipient, no URL or no mapped field), or **Queued**. |
| **Message** | Why it failed or had nothing to do. For a sent email, where it was handed over: sendmail, PHP `mail()` or the SMTP server. |
| **Conditions** | The workflow's conditions at the time, each marked as held or not for the answers given. |
| **Answers** | The values the conditions were checked against. |
| **What was sent** | Email: recipients, from, reply-to, subject, attachments and the plain-text body. Webhook: the URL, whether it was signed, the body, and the response. Connection: the mapped payload and the provider's request and response. Credentials are never recorded. |

<Screenshot
  img={require('@site/static/img/screenshots/formidable/workflow-run.png')}
  alt="One workflow run in the log: a failed webhook with its conditions, the answers it was given and what it sent"
  caption="One run in the log"
  captured="ExpressionEngine 7.5.26, demo data"
/>

Run data is visitor data, so it is **encrypted at rest**.

**Run again** replays a run through the workflow **as it is configured now**, with the answers the original run was given. Correct a mapping or a recipient, then run it again. Conditions are not checked, because the person pressing the button decided it should run. The new run records which run it replayed and who pressed the button. It sends real email and calls real services.

The log needs the **View workflow log** permission. **Run again** also needs **Manage forms**. Runs older than 30 days are pruned as new ones are written. Change that, or turn the log off, in `config.php`:

```php title="system/user/config/config.php"
$config['formidable_workflow_log_days'] = 90; // 0 keeps every run
$config['formidable_workflow_log'] = 'n';     // record nothing
```

A failure to write the log never fails the visitor's submission. It goes to ExpressionEngine's developer log instead.

## The workflow queue

By default, each workflow runs inside the visitor's request, once. A slow mail server or CRM then slows the submission down, and a service that is down for a minute loses that run until someone presses **Run again**.

With a queue, workflows run in the background instead, with retries. Formidable uses the first of these that applies:

1. **BoldMinded's [Queue](https://github.com/litzinger/queue) add-on**, whenever it is installed. There is nothing to turn on in Formidable. Queue's worker (`php system/ee/eecli.php queue:work`) runs the workflows, and Queue's settings decide how often a failure is retried: `$config['queue']['max_tries']` and `backoff`. Queue tries a job once unless you raise `max_tries`. Queue is only handed the run's number; the answers stay in Formidable, encrypted.
2. **Formidable's own queue**, when you turn it on:

   ```php title="system/user/config/config.php"
   $config['formidable_workflow_queue'] = 'y';
   $config['formidable_workflow_queue_attempts'] = 3; // tries in all (default 3)
   ```

   Then run its worker every minute from cron. See [Command line](/docs/formidable/reference/command-line#running-the-workflow-queue).

To keep Queue installed but not use it for workflows, set `$config['formidable_workflow_queue_boldminded'] = 'n'`. To send workflows to a named Queue queue, set `$config['formidable_workflow_queue_name']`, and give that queue its own worker (`queue:work --name=…`).

- **Conditions are checked when the submission is made**, against the answers as they were then. Each workflow that matches is queued, and shows in the log and on **Recent runs** as **Queued** straight away.
- **A failed run is tried again.** On Formidable's queue: after a minute, then 5 minutes, then 30, then every 2 hours, until it has had its attempts. On Queue: as Queue's settings say. Its message says which attempt failed. A run that fails every attempt stays **Failed**, and **Run again** still works on it.
- **If Queue is uninstalled**, runs still waiting for it are picked up by Formidable's worker.
- **The workflow is read when the run happens.** A workflow switched off or deleted while its run waited is not sent.
- **Run again** is not offered on a run that is still queued, so nothing is sent twice.
- If a run cannot be queued, for example before the add-on update has run, it runs straight away as before.

Without a worker nothing is sent. Install Queue, or turn on Formidable's queue, only once its cron job is in place. `formidable:workflows:work --status` counts what is waiting for Formidable's worker.
