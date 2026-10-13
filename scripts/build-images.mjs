#!/usr/bin/env node
/**
 * Builds the site's responsive WebP images into public/images/.
 *
 *   npm run images            build from whatever originals are available
 *
 * For each entry in src/data/image-manifest.json:
 *   1. If assets-src/images/<name>.png is missing, try to download it from the
 *      manifest URL (Figma-generated assets — these links expire 7 days after
 *      generation, so commit assets-src/images/ once downloaded).
 *   2. Encode WebP variants at every width in `widths` from the full-res original,
 *      or — if no original is available — from the low-res preview in
 *      assets-src/previews/ so the site still renders.
 *
 * Never fails the install: problems are reported and the script exits 0.
 */
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src/data/image-manifest.json'), 'utf8'));
const originalsDir = path.join(root, 'assets-src/images');
const previewsDir = path.join(root, 'assets-src/previews');
const outDir = path.join(root, 'public/images');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[images] sharp is not installed — run `npm install` first. Skipping.');
  process.exit(0);
}

await fs.mkdir(originalsDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

const summary = { full: [], preview: [], missing: [] };

for (const [name, entry] of Object.entries(manifest)) {
  const original = path.join(originalsDir, `${name}.png`);

  if (!existsSync(original) && entry.url) {
    try {
      const res = await fetch(entry.url, { signal: AbortSignal.timeout(30_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf).metadata(); // validate it's an image
      await fs.writeFile(original, buf);
      console.log(`[images] downloaded ${name}.png`);
    } catch (err) {
      console.warn(`[images] could not download ${name} (${err.message}). The link may have expired.`);
    }
  }

  const source = existsSync(original) ? original : path.join(previewsDir, `${name}.jpg`);
  if (!existsSync(source)) {
    summary.missing.push(name);
    continue;
  }
  const isPreview = source !== original;
  (isPreview ? summary.preview : summary.full).push(name);

  for (const w of entry.widths) {
    const h = Math.round((w * entry.height) / entry.width);
    await sharp(source)
      .resize(w, h, { fit: 'cover', kernel: 'lanczos3' })
      .webp({ quality: isPreview ? 70 : 78, effort: 5 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }
}

console.log(`[images] full-resolution: ${summary.full.length}, preview-quality: ${summary.preview.length}, missing: ${summary.missing.length}`);
if (summary.preview.length) {
  console.warn(
    `[images] Using low-res previews for: ${summary.preview.join(', ')}.\n` +
      '         Put the full-size PNGs in assets-src/images/<name>.png and run `npm run images` again.',
  );
}
