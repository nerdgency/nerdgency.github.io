# Demo content for the screenshots

Recreates the forms, fields, workflows and submissions the docs' screenshots
show, on a fresh install of Formidable on the local EE site (`.env`).

```bash
node scripts/demo-content/forms.mjs      # Contact Us, Job Application, Event Waiver
node scripts/demo-content/fields.mjs     # fields, pages and the repeating section
node scripts/demo-content/widths.mjs     # field widths (reads fieldrows.tsv -- see below)
node scripts/demo-content/workflows.mjs  # two workflows per form (example.com addresses)
node scripts/demo-content/submit.mjs     # visitor submissions, as a guest
npm run capture:screens
```

Notes:

- The scripts assume a fresh install: registry ids (`R` in fields.mjs) and form
  ids 1–3 are what a new install creates. Check them if the site has history.
- `widths.mjs` reads `fieldrows.tsv`: `form_id, field id, handle, section,
  sort_order`, one per line, exported from `exp_formidable_fields`.
- The submit script waits between posts so the per-IP rate limit (5 a minute)
  doesn't catch them. Caught posts count as spam on the Forms listing.
- The demo pages live in the site's `formidable_demo` template group.
