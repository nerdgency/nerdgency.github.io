---
title: Spam and security
description: Honeypots, rate limiting, duplicate detection and CAPTCHA, and the protections every form has without configuration.
keywords:
  - formidable
  - spam
  - honeypot
  - captcha
  - security
---

# Spam and security

## Introduction

Every form is protected from the moment you create it. Most of that protection is invisible to visitors, and none of it needs setting up. This page covers what's on by default, what you can turn up, and how Formidable keeps a submission honest.

## Spam protection

| Protection | On by default | How it works | Settings |
| --- | --- | --- | --- |
| **Honeypot** | Yes | A text input hidden from people. Bots that fill in every field fill it in, and the submission is refused. | **Enable honeypot** on the form or in **Configuration › Spam**. Rename the input with `honeypot=` to make it harder to fingerprint. Its default name is `formidable_hp`. |
| **JavaScript honeypot** | No | An input the browser fills in with a script. A scripted post that never ran the page's JavaScript leaves it empty and is refused. | **Enable JavaScript honeypot**. Rename it with `honeypot_js=`. Its default name is `_formidable_js_ok`. |
| **Rate limit** | Yes: 5 per 60 seconds | Submissions per IP address within a time window. | **Configuration › Spam**, or `$config['formidable_rate_limit']` and `$config['formidable_rate_window']`. `0` turns it off. |
| **Duplicate detection** | Yes: 30 seconds | The same answers from the same IP within the window are accepted once. Later copies get the same success response, but nothing more is stored or sent. | **Configuration › Spam**, or `$config['formidable_duplicate_window']`. `0` turns it off. |
| **CAPTCHA** | Add the field | Three fieldtypes: **Captcha** (ExpressionEngine's own), **Turnstile** (Cloudflare) and **hCaptcha**. They are validated like any required field. | Add the field to the form. Turnstile and hCaptcha need a [connection](/docs/formidable/automation/connections). |

The rate limit is on by default for a reason. A form that can email an address the visitor typed is otherwise a mail relay.

A caught submission gets the same response as a real one, so a bot learns nothing from it. Each form counts the submissions its honeypots and rate limit catch, shown as **Spam Count** on the **Forms** listing. The [`formidable_spam_caught`](/docs/formidable/extending/hooks) hook lets a site keep its own record. Formidable stores no IP addresses for it.

## Built in to every form

These need no configuration.

- **A signed form.** Each rendered form carries a `_formidable_meta` value that is encrypted *and* signed. It says which form this is, where to return the visitor, and any settings or rules the tag changed. A tampered, expired or foreign value is rejected, so a visitor cannot change those settings by editing the page. The value stays valid for 30 days, so a form left open in a tab, or served from a long-lived cache, still submits (`$config['formidable_meta_ttl']`).
- **CSRF protection.** Every submission, including AJAX submissions, must carry the session's single-use CSRF token. `{form_meta}` includes it.
- **Server-side validation.** Required fields, rules, conditions, page flow, closing dates and limits are all decided again on the server. Nothing the browser sends can mark a field hidden or a page skipped.
- **Option values are checked.** An answer that is not one of a field's choices fails validation.
- **Return URLs are checked.** `return=` may only send visitors to your own site, unless you allow other hosts with `$config['formidable_return_hosts']`. Anything else falls back to the site index.
- **Encrypted fields** are encrypted before they are stored, and decrypted only where they are displayed.
- **Failed uploads are held briefly.** When a submission with uploads fails validation, the files are held for 15 minutes so the visitor need not choose them again, then discarded (`$config['formidable_upload_quarantine_ttl']`).
- **Answers are escaped on output.** `{exp:formidable:submissions}` HTML-escapes every answer and encodes `{` and `}`, so a stored `{exp:…}` tag can never run in your template.
- **The workflow log is encrypted at rest**, because it holds copies of answers.
- **API keys are stored as hashes.** A key is shown once, when it is issued.

## Things to be careful with

- **The HTML fieldtype outputs its content exactly as written**, scripts included. Give it only to people you would trust with a template.
- **Hidden fields are not trusted fields.** A visitor can change any input on the page.
- **`submission_handle=` is unguessable, but it is not authorisation.** Anyone holding a submission's handle can see its answers on a page that uses it. Restrict those templates. See [Edit a submission](/docs/formidable/submissions/front-end-editing).
- **`{exp:formidable:submissions}` lists every member's submissions unless you say otherwise.** Use `member_id="{logged_in_member_id}"` on member-facing pages.
- **Allow as Workflow Recipient** lets anyone who submits the form choose an address for your site to email. Turn it on only for fields that should do that, such as "email me a copy".
