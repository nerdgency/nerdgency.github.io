---
title: Connections
sidebar_position: 8
---

# Connections

A connection is a configured link to a third-party mailing list or CRM.
Once set up under **Formidable &raquo; Connections**, it becomes available
as a **Send to a connection** action on any form's [workflows](./workflows.md).

## Supported providers

| Provider | Target |
| --- | --- |
| Mailchimp | Audience (list) ID |
| Campaign Monitor | Subscriber list ID |
| Dotdigital | Address book ID |
| Constant Contact | List ID (UUID) |
| HubSpot | Not used -- contacts are created directly |
| Salesforce | sObject API name (defaults to `Lead`) |

Each provider declares its own settings form (API key/token, region,
double opt-in, and so on), so the settings screen only asks for what that
provider actually needs.

## Secrets

Sensitive settings (API keys, tokens, passwords) are encrypted at rest.

## Adding a connection

1. **Formidable &raquo; Connections &raquo; New** and choose a provider.
2. Fill in the provider's settings (API credentials, target list/object).
3. On any form, add a workflow with the **Send to a connection** action,
   pick this connection, and map the provider's expected fields to this
   form's field handles.

## Extending with a new provider

Providers implement a small `ProviderInterface` (shared HTTP/JSON plumbing
via `AbstractProvider`) and register through `ProviderRegistry`, which reads
the core provider list plus a `$config['formidable_connection_providers']`
override -- so a project (or another addon) can register additional
providers without modifying Formidable itself.

:::note
OAuth token refresh (Constant Contact, Salesforce) and a "test connection"
button aren't implemented yet -- tracked alongside queued/async dispatch in
the addon's `todo.md`.
:::
