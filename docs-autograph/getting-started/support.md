---
title: Getting help
description: Where to report a bug or ask for a feature in Autograph, what to include, and how to report a security vulnerability privately.
keywords:
  - autograph
  - support
  - bug report
  - issues
---

# Getting help

Autograph's issues are tracked in public on GitHub, at [nerdgency/ee-addon-issues](https://github.com/nerdgency/ee-addon-issues), shared with Nerdgency's other add-ons and labelled `autograph`. That's the place for bug reports and feature requests.

Security vulnerabilities are the one exception. **Never report one in a public issue.** Email it instead (see [below](#reporting-a-security-vulnerability)).

## Before you report

1. **Check [Troubleshooting](./troubleshooting.md),** including the [known limitations](./troubleshooting.md#known-limitations).
2. **Update** to the latest Autograph 2.x release. The [changelog](../prologue/changelog.md) says what's been fixed.
3. **Search the [open and closed issues](https://github.com/nerdgency/ee-addon-issues/issues?q=is%3Aissue+label%3Aautograph).** If someone has already reported it, add a 👍 or a comment with your details rather than opening a new issue.

## Reporting a bug

[Open a bug report](https://github.com/nerdgency/ee-addon-issues/issues/new?template=autograph-bug-report.yml) and include:

1. **Versions:** Autograph, ExpressionEngine and PHP. Autograph's version is on the **Add-Ons** screen.
2. **Where it happens:** a Channel Form, a member form, the control panel, Grid or Fluid, or a template.
3. **What you did,** what you expected, and what happened instead.
4. **The template,** if the problem is on the front end, with the tag as written.
5. **The field's Storage Method,** in the entry or as a file.
6. **Anything in the browser's console,** whether `autograph.js` loads, and anything in the **Developer Log** (**Tools › Logs › Developer**).

:::warning Leave out anything private
Issues are public. Signatures are personal data, so don't post real ones: sign a test entry instead. Leave out credentials and your `config.php` too.
:::

## Requesting a feature

[Open a feature request](https://github.com/nerdgency/ee-addon-issues/issues/new?template=autograph-feature-request.yml). Say what you're collecting signatures for, and where Autograph gets in the way. There's often more than one way to solve it, and knowing why helps find the best one.

## Reporting a security vulnerability

If you think you've found a security problem in Autograph, **email [security@nerdgency.ca](mailto:security@nerdgency.ca)**. Don't open a public issue or share it anywhere else until a fix is released. Include the steps to reproduce it and the Autograph, ExpressionEngine and PHP versions you tested. The [security policy](https://github.com/nerdgency/ee-addon-issues/security/policy) says what happens next.

Please test only against your own installations, and never against a site you don't own or have permission to test.
