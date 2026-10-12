---
title: Connections
sidebar_position: 10
description: Saved credentials for third-party services, used by workflows to push submissions to mailing lists and CRMs, and by the Turnstile and hCaptcha fieldtypes.
keywords:
  - formidable
  - connections
  - mailchimp
  - hubspot
  - salesforce
---

# Connections

A **connection** is a saved set of credentials for a third-party service, set up once on **Formidable › Connections** and then chosen wherever it is needed. Connections need the **Manage connections** permission, because they hold credentials.

## Providers

| Provider | Used by | Asks for |
| --- | --- | --- |
| Mailchimp | Workflows | API key; optional double opt-in |
| Campaign Monitor | Workflows | API key; consent to track |
| Constant Contact | Workflows | Access token |
| Dotdigital | Workflows | API user, API password, region |
| HubSpot | Workflows | Access token |
| Salesforce | Workflows | Instance URL, access token, API version |
| Mailjet | Workflows | API key, secret key; optional force subscribe |
| Turnstile | The Turnstile fieldtype | Site key and secret key |
| hCaptcha | The hCaptcha fieldtype | Site key and secret key |

The shipped providers, as listed in the add-on's configuration: <ProviderList />.

Every shipped provider can **test** its saved credentials from the connections screen, before any form depends on them.

## Using a connection

- **In a workflow:** choose **Send to a connection**, pick the connection, the target (a list or audience, where the provider has one), and map form fields to the provider's fields. See [Workflows](./workflows.mdx#send-to-a-connection).
- **In a CAPTCHA field:** on a Turnstile or hCaptcha field's settings, choose the connection. Different forms can use different keys, such as separate staging and production widgets.

## When a provider fails

Connections run during the visitor's submission, so each request has a tight time limit: 8 seconds in total, 4 seconds to connect. A provider having a bad day becomes a logged failure within seconds, rather than a visitor waiting on a spinning button. The failure is recorded in the [workflow log](./workflows.mdx#the-workflow-log), with what was sent and what the provider answered, and the submission itself is unaffected. Fix the cause, then use **Run again**.

Developers can add providers. See [Custom connections](/docs/formidable/developer/custom-connections).
