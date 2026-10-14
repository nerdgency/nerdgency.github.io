# Formidable docs: maintainer notes

Internal notes for the v1.0.0 documentation. Not published (outside `docs/` and `blog/`).

## Structure and design (October 2026 rewrite)

- **Organisation** follows Laravel's docs: `sidebars.js` lists every page by hand, in sections that run Prologue → Getting started → Building forms → Displaying forms → Submissions → Automation → Control panel → Headless → Reference → Extending. Each section is a folder under `docs/formidable/`, and the folder name is the URL segment. Add a page to `sidebars.js` or it will not appear.
- **Pages open with `## Introduction`** after the title, then task-shaped sections. Titles are short nouns ("Validation", "Workflows").
- **Design**: tokens in `src/css/theme/tokens.css` (paper and ink, amber accents, Fraunces / Inter / JetBrains Mono), element styling in `base.css`, code colours in `src/theme/prism-nerdgency.js` (one dark theme for both modes). The navbar logo (`src/theme/Navbar/Logo`) and footer (`src/theme/Footer`) are ejected components. Marketing pages build from `src/components/Marketing`.
- **Code blocks** name their file with `title=`. Tags with three or more parameters are broken one parameter per line.

## Source of truth

The add-on source (`ee/packages/formidable/dist/system/user/addons/formidable`) is the source of truth. The add-on's own `docs/` folder was used as a starting point, but checked against code. Where they disagreed, the code won.

| What | Where it comes from | How it stays in sync |
| --- | --- | --- |
| Tag parameters (4 tags) | `fetch_param()`, `SettingFallback`, `TagParamScanner` calls in `Tags/*` and the `Library/Tags/*` they import | `src/data/formidable-source.json` (`npm run sync:source`); `<Param>` fails the build on an unknown name; `scripts/check-docs.mjs` checks every `{exp:formidable:*}` tag in docs, blog and examples, and every `` `name=` `` on pages with `formidable_tag:` front matter |
| `form:setting:NAME` names | `ConfigurationFormObject` properties | Same |
| Regions | `Library/Tags/Regions.php` constants | `<RegionList>` |
| Fieldtypes, groups, storage, encryption, default rules | `database/seeds/FormidableFieldtypeSeeder.php` | `<FieldtypeTable>` |
| Validation rules | `FormidableRuleSeeder::RULES` | `<RuleTable>` |
| CLI commands | `addon.setup.php` | `<CommandTable>` (fails on unknown command); check-docs checks `eecli.php formidable:*` |
| config.php keys | `Library/Config::DEFAULTS` plus direct `config->item('formidable_*')` | `<ConfigTable>`; check-docs checks `$config['formidable_*']` |
| Hooks | `extensions->call()` anywhere in the add-on | `<HookList>` |
| API routes and scopes | `Service/Api/ApiRoutes.php` | `<ApiRoutesTable>` |
| Shipped theme parts | `themes/*/` | `<ThemePartsTable>` |
| Rendered HTML and JSON | A real EE 7.5.26 install running the add-on source | `npm run capture:examples` writes `src/data/examples.json`; `<CapturedExample>`/`<CapturedResponse>` show template and output from the same capture |

Everything else (CP labels, behaviour) was checked by reading the relevant route, service or lang string. The add-on's own docs folder was not changed.

### Workflow when the add-on changes

```bash
npm run sync:source        # needs the add-on checkout beside this repo, or FORMIDABLE_SRC
npm run capture:examples   # needs the local EE site (EE_URL, EE_TEMPLATES); writes docs_examples.group templates there
npm run check:docs         # also runs as prebuild, so CI fails on drift
```

PHP examples (custom fieldtype, custom connection, webhook receiver) were linted with `php -l` and the two classes were loaded against the real add-on interfaces, and the connection was exercised with `Connection::fake()`. The JavaScript recipe (guides/headless-forms) was run in jsdom against the captured form JSON. Those checks are not automated yet.

## Add-on findings (not fixed: the add-on was out of scope)

1. **Dangling `aria-describedby`.** `FieldRenderer` adds `{handle}-instructions` to `{field_attributes}` whenever the field has instructions, even when the template never prints them. Custom markup that omits instructions references a missing id. The docs tell authors to print the instructions with that id.
2. **API error wording.** `Actions/Api.php:65` builds "This caller may not submissions read." from the scope string. Shown as-is in the JSON API doc with a note.
3. **`fields[].attributes` is `[]` when empty** in Form JSON (PHP empty array), while `templating.attributes` is `{}`. Clients should handle both.
4. **Reply-to is not interpolated** in workflow emails (`WorkflowRunner::sendEmail`), unlike the subject. A "reply to the visitor" setup is not possible. Documented as a limitation.
5. **Lang string drift:** `permissions.formidable_manage_registry_desc` says "templates"; the permission guards Themes.
6. **The add-on's own docs have drifted** from the code. Examples: `tags/form.md` documents `js_honeypot=` (code reads `honeypot_js=`), `columns=` (code reads `template_columns=`, default 12 not 16), `{has_errors}`/`{errors}` (code: `{form_has_errors}`/`{form_errors}`), `{field_has_conditions}`, `{field_conditions}`, `{field_condition_attributes}` (code: `_show`/`_require` variants), `{form_uses_captcha}` (not published), `form:setting:submission_prefix` (code: `submission_name`). `templating-regions.md` uses `form="contact"` and "thirteen regions". `concepts.md` uses `label_attribute`. `channel-field.md` uses `columns=` and `template=`. `fieldtypes.mdx` lists the wrong encryptable fieldtypes. Run `node scripts/check-docs.mjs <path>` against that folder to find more.
7. **Version.** `FORMIDABLE_VERSION` is still below 1.0.0, while the docs and launch post describe 1.0. The per-page "Verified against Formidable x.y.z" notice was removed, so no pre-release number is published; bump the constant before release so `sync:source` records 1.0.0.

## Unresolved questions

- **Where is Formidable sold or downloaded?** No distribution channel is named anywhere in the source. The launch post and installation page link only to the docs. Add the real link before publishing.
- **Repository and issue tracker.** `github.com/nerdgency/ee-formidable` returns 404 publicly, so no repo or issues link is published. Troubleshooting says "Reporting a problem" without a destination.
- **Launch date.** The blog post is dated 2026-10-14 (folder name and implied date), with a matching Changelog entry. If it goes out on another day, rename the folder and update the entry.
- **`page=` storage.** The add-on docs say `page=` renders each page as its own submission. That was carried over but not traced end to end in `Actions/Submit`.
- **Pre-release forms with Group / Submit / Next / Previous fields.** No migration was found. Upgrade notes do not mention it. Is there an upgrade path?
- **Roadmap.** Items now built (permissions, fieldtype registration, fieldtype contract) were moved to Available. "Richer Jump Menu integration" remains in Next, because a minimal `jump.formidable.php` exists. Confirm the remaining Next/Exploring/Not planned items still reflect intent.
- **The Autograph card** on the site homepage was not reviewed (not Formidable).

## Screenshots

Control panel and front-end screenshots are captured, not drawn, by
`npm run capture:screens` (`scripts/capture-screens.mjs`, Playwright):

- **Login**: a dedicated test Super Admin on the local site (`docs_capture`),
  credentials in the gitignored `.env` (`EE_URL`, `EE_CP_PATH`,
  `EE_CAPTURE_USERNAME`, `EE_CAPTURE_PASSWORD`). Never a real account.
- **Content**: the demo forms, workflows and submissions from
  `scripts/demo-content/` (see its README), and the site's
  `formidable_demo` template group for the visitor-side pages. All names
  and addresses are fictional (`example.com`).
- **Output**: 2x PNGs in `static/img/screenshots/formidable/`, mostly cropped
  to Formidable's content panel so text stays legible in the docs column.
  `src/data/screenshots.json` records the capture date.
- **Use**: `<Screenshot img={require('@site/static/img/screenshots/formidable/NAME.png')} alt="…" caption="…" captured="…" />`.
- **Recapture** after any CP change: `npm run capture:screens` (or name the
  screens: `npm run capture:screens -- dashboard utilities`).
- The dashboard's Documentation card prints `FORMIDABLE_VERSION`; bump it to
  1.0.0 before the final capture so no pre-release number appears.

## Local side effects

- A `docs_examples` template group was created in the local EE sandbox (`system/user/templates/default_site/docs_examples.group/`, synced by EE into `exp_template_groups`). It holds the captured example templates.
- `.backup/pre-rewrite-docs-src-static-config.tgz` holds the docs, src, static and config as they were before the rewrite, including uncommitted edits and stray `.fuse_hidden*` files. Delete it when no longer needed.
