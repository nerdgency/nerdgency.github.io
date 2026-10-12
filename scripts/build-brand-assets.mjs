#!/usr/bin/env node
/**
 * Derives the small brand assets the site serves from the large source
 * logos in static/img/logos (4500px squares, ~110 KB each):
 *
 *   static/img/logos/n-logo-{grey,white}.png   navbar marks, 96px
 *   static/img/favicon.png, apple-touch-icon.png
 *   static/img/social/nerdgency-docs.png       1200x630 social card
 *
 * Run after changing a source logo: `node scripts/build-brand-assets.mjs`.
 * The outputs are committed; nothing here runs during the build.
 */
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const img = (...p) => path.join(root, 'static/img', ...p);

for (const tone of ['grey', 'white']) {
  // The source squares have wide transparent margins; trim them so the
  // mark fills the navbar's logo box.
  const trimmed = await sharp(img('logos', `${tone}-n-logo.png`)).trim().toBuffer();
  await sharp(trimmed)
    .resize(96, 96, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
    .png({compressionLevel: 9, palette: true})
    .toFile(img('logos', `n-logo-${tone}.png`));
}

const greyMark = await sharp(img('logos', 'grey-n-logo.png')).trim().toBuffer();
await sharp(greyMark)
  .resize(48, 48, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
  .png({palette: true})
  .toFile(img('favicon.png'));
await sharp(greyMark)
  .resize(160, 160, {fit: 'contain', background: '#ffffff'})
  .extend({top: 10, bottom: 10, left: 10, right: 10, background: '#ffffff'})
  .flatten({background: '#ffffff'})
  .png()
  .toFile(img('apple-touch-icon.png'));

// Social card: the wordmark and the docs' purpose, on the brand's dark
// navy. Text only -- no product claims, no screenshots.
const logo = await sharp(await sharp(img('logos', 'white-n-logo.png')).trim().toBuffer())
  .resize(120, 120, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
  .png()
  .toBuffer();
const card = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b1120"/>
  <rect x="0" y="602" width="1200" height="28" fill="#faaf40"/>
  <text x="96" y="352" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="92" fill="#ffffff">
    <tspan fill="#faaf40">{</tspan>nerdgency<tspan fill="#faaf40">}</tspan>
  </text>
  <text x="100" y="430" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="38" fill="#9aa8bd">
    Documentation for ExpressionEngine add-ons
  </text>
</svg>`);
await sharp(card)
  .composite([{input: logo, left: 100, top: 120}])
  .png({compressionLevel: 9})
  .toFile(img('social', 'nerdgency-docs.png'));

console.log('Brand assets written.');
