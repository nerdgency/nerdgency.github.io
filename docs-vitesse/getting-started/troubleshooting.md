---
title: Troubleshooting
description: What to check when Vitesse prints nothing, prints the wrong files, or the dev server's files don't load.
keywords:
  - vitesse
  - troubleshooting
---

# Troubleshooting

## Start with the template debugger

Turn on **Template Debugging** (**Settings › Debugging & Output**) and load the page. Vitesse explains anything it couldn't do:

| Message | What to do |
| --- | --- |
| *No manifest found. Looked for …* | Run `vite build` with `build.manifest: true`, and check `build_directory` matches Vite's `build.outDir`. |
| *"…" isn't in the manifest* | Check the name in `files=` matches an entry in `rollupOptions.input` exactly, then build again. |
| *"…" isn't in the manifest* (from `{exp:vitesse:url}`) | Vite didn't process that file. See [Images and fonts](../using-vitesse/images-and-fonts.md#getting-a-file-into-the-build). |
| *… isn't valid JSON* | The manifest is damaged, often from a build that was interrupted. Build again. |

## A tag prints nothing

- **No `files=`**, or a typo in it. Paths are your source paths, such as `resources/js/app.js`, not the built files.
- **No build yet.** Run `vite build`.

## Pages load the dev server's files, but Vite isn't running

The hot file was left behind. Delete it (`public/hot` in the example configuration). The [plugin](./setting-up-vite.mdx) removes it when Vite stops normally, but not if Vite is killed outright.

On a live site, **never deploy the hot file**.

## The dev server's files are blocked

- **A CORS error** in the browser's console: allow your site's address in `server.cors` in `vite.config.js`.
- **A mixed-content error** (your site is `https`, the dev server `http`): serve the dev server over https too, or work on your site over http locally.
- **A Content Security Policy error**: allow the dev server in your policy while developing. See [Production](../using-vitesse/production.md#a-content-security-policy).

## Images in CSS are broken

- **In development:** set `server.origin` to the dev server's address, so CSS asset URLs point there.
- **After a build:** set Vite's `base` to `/build/` (or your CDN's URL), matching where the build is served.

## Old files after a build

Template caching keeps what Vitesse printed when the template was cached. Clear the cache after each build. See [Development and builds](../using-vitesse/development-and-builds.md#template-caching).
