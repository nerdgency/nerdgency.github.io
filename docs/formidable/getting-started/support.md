---
title: Getting help
description: How to report a bug, ask for a feature or a new fieldtype, and report a security vulnerability privately.
keywords:
  - formidable
  - support
  - issues
  - bug report
  - feature request
  - security
---

# Getting help

Formidable's issues are tracked in public on GitHub, at [nerdgency/ee-addon-issues](https://github.com/nerdgency/ee-addon-issues), shared with Nerdgency's other add-ons and labelled `formidable`. That's the place for bug reports, feature requests and ideas for new fieldtypes. The **Support** card on Formidable's dashboard links straight to it.

Security vulnerabilities are the one exception. **Never report one in a public issue.** Email it instead (see [below](#reporting-a-security-vulnerability)).

## Before you report

1. **Check [Troubleshooting](./troubleshooting.md).** Most problems are quiet rather than broken: a field that renders nothing, a script that never loads, an email that was handed to a mail server that never delivered it. Adding `debug="on"` to the tag usually says why.
2. **Update.** Make sure you're on the latest Formidable 1.x release. The [changelog](/docs/formidable/prologue/changelog) says what's been fixed.
3. **Search the [open and closed issues](https://github.com/nerdgency/ee-addon-issues/issues?q=is%3Aissue+label%3Aformidable).** If someone has already reported it, add a 👍 or a comment with your details rather than opening a new issue. Upvotes help decide what gets done first.

## Reporting a bug

[Open a bug report](https://github.com/nerdgency/ee-addon-issues/issues/new?template=formidable-bug-report.yml) and include:

1. **Versions:** Formidable, ExpressionEngine and PHP. Formidable's version is at the bottom of its dashboard.
2. **What you did,** step by step, so someone else can make it happen again.
3. **What you expected,** and **what happened instead.**
4. **The template tag as written,** with every parameter, if the problem is on the front end.
5. **Anything Formidable told you:** what `debug="on"` said, any `<!-- formidable: … -->` comment in the page source, and anything from the **Developer Log** (**Tools › Logs › Developer**) or the **Workflow Log**.
6. **Screenshots** of the control panel or the page, if it helps.

:::warning Leave out anything private
Issues are public. Don't paste submissions, visitors' answers, API keys, Connection credentials, passwords or your `config.php`. Replace them with made-up values. If the problem only happens with real data, say so in the issue and we'll arrange a private way to look at it.
:::

## Requesting a feature

[Open a feature request](https://github.com/nerdgency/ee-addon-issues/issues/new?template=formidable-feature-request.yml). The most useful requests describe **the problem you're trying to solve**, not only the solution you have in mind: what the form is for, what you tried, and where Formidable got in the way. There's often more than one way to solve it, and knowing the why helps find the best one.

## Requesting a fieldtype

New fieldtypes are welcome as requests too. Tell us:

- **What a visitor sees and does:** the control, and what they pick, type or upload.
- **What gets stored,** and how it should look in the control panel, exports, emails and the API.
- **Any service it depends on,** such as an address lookup or a payment provider.
- **An example** of the field on another site, if you have one.

If you'd rather build it yourself, see [Custom fieldtypes](/docs/formidable/extending/custom-fieldtypes).

## Reporting a security vulnerability

If you think you've found a security problem in Formidable, such as a way to bypass validation or spam protection, read submissions you shouldn't, run code, or reach the API without permission, **email [security@nerdgency.ca](mailto:security@nerdgency.ca)**. Don't open a public issue, post in a forum or share it anywhere else until a fix is released.

Include:

1. **What the problem is** and what an attacker could do with it.
2. **How to reproduce it:** the steps, the requests, and the form or settings involved.
3. **The versions** of Formidable, ExpressionEngine and PHP you tested.
4. **Anything you've found that limits it,** such as a setting that has to be on or a permission the attacker needs.

What happens next:

- We'll confirm we've received your report and keep you updated while we look into it.
- Once it's confirmed, we'll work on a fix and release it as soon as we can. The release notes will say that a security issue was fixed.
- We're glad to credit you in the release notes. Tell us the name you'd like used, or that you'd rather stay anonymous.

Please test only against your own installations, and never against a site you don't own or have permission to test.
