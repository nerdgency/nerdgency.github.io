---
title: Getting help
description: Where to report a bug or ask for a feature in Vitesse, what to include, and how to report a security vulnerability privately.
keywords:
  - vitesse
  - support
  - issues
---

# Getting help

Vitesse's issues are tracked in public on GitHub, at [nerdgency/ee-addon-issues](https://github.com/nerdgency/ee-addon-issues), shared with Nerdgency's other add-ons and labelled `vitesse`. That's the place for bug reports and feature requests.

Security vulnerabilities are the one exception. **Never report one in a public issue.** Email it instead (see [below](#reporting-a-security-vulnerability)).

## Before you report

1. **Check [Troubleshooting](./troubleshooting.md),** and what the template debugger says.
2. **Update** to the latest Vitesse release. The [changelog](../prologue/changelog.md) says what's been fixed.
3. **Search the [open and closed issues](https://github.com/nerdgency/ee-addon-issues/issues?q=is%3Aissue+label%3Avitesse).**

## Reporting a bug

[Open an issue](https://github.com/nerdgency/ee-addon-issues/issues/new/choose) and include:

1. **Versions:** Vitesse, ExpressionEngine, PHP and Vite.
2. **The tag as written,** with every parameter.
3. **Your `vite.config.js`,** and whether the problem is in development or after a build.
4. **What you expected,** and **what was printed instead.**
5. **What the template debugger said.**

## Reporting a security vulnerability

If you think you've found a security problem in Vitesse, **email [security@nerdgency.ca](mailto:security@nerdgency.ca)**. Don't open a public issue or share it anywhere else until a fix is released. The [security policy](https://github.com/nerdgency/ee-addon-issues/security/policy) says what happens next.
