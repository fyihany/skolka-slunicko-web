/**
 * Post-build script: prefixes all absolute internal hrefs and srcs with the
 * GitHub Pages base path. Run after `astro build`.
 *
 * Astro rewrites Vite-managed assets (CSS/JS) automatically, but leaves
 * href/src attributes in templates unchanged — this script fills that gap.
 *
 * Remove this script (and the build command) before deploying to production
 * at the root domain (skolka-slunicko.cz).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = '/skolka-slunicko-web';
const DIST = fileURLToPath(new URL('../dist', import.meta.url));

// Matches href="/ or src="/ but NOT href="// (protocol-relative)
// and NOT href="/skolka-slunicko-web/ (already prefixed)
const patterns = [
  [/href="\/(?![/]|skolka-slunicko-web\/)/g, `href="${BASE}/`],
  [/src="\/(?![/]|skolka-slunicko-web\/)/g,  `src="${BASE}/`],
  [/action="\/(?![/]|skolka-slunicko-web\/)/g, `action="${BASE}/`],
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith('.html')) {
      let html = await readFile(full, 'utf-8');
      for (const [pattern, replacement] of patterns) {
        html = html.replace(pattern, replacement);
      }
      await writeFile(full, html, 'utf-8');
    }
  }
}

await walk(DIST);
console.log(`[fix-paths] Done — absolute paths prefixed with ${BASE}`);
