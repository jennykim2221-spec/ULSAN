/**
 * sync-assets.mjs
 * Copies original images from assets/images/ → public/assets/images/
 * Verifies SHA-256 hashes match and writes a manifest.
 * Does NOT move, rename, or delete originals.
 */
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'assets', 'images');
const destDir = path.join(root, 'public', 'assets', 'images');
const manifestPath = path.join(root, 'public', 'assets', 'manifest.json');

async function sha256(filePath) {
  const buf = await readFile(filePath);
  return createHash('sha256').update(buf).digest('hex');
}

async function main() {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(sourceDir);
  const jpgs = entries.filter((n) => n.toLowerCase().endsWith('.jpg')).sort((a, b) => a.localeCompare(b, 'ko'));

  if (jpgs.length !== 66) {
    console.warn(`[sync-assets] Expected 66 JPEGs, found ${jpgs.length}`);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDir: 'assets/images/',
    publicDir: 'public/assets/images/',
    count: jpgs.length,
    files: [],
  };

  let mismatches = 0;

  for (const filename of jpgs) {
    const src = path.join(sourceDir, filename);
    const dest = path.join(destDir, filename);
    const srcHash = await sha256(src);
    const srcStat = await stat(src);

    await copyFile(src, dest);
    const destHash = await sha256(dest);

    if (srcHash !== destHash) {
      mismatches += 1;
      console.error(`[sync-assets] HASH MISMATCH: ${filename}`);
    }

    manifest.files.push({
      filename,
      bytes: srcStat.size,
      sha256: srcHash,
      url: `/assets/images/${encodeURIComponent(filename)}`,
    });
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`[sync-assets] Copied ${jpgs.length} files → public/assets/images/`);
  console.log(`[sync-assets] Manifest → public/assets/manifest.json`);
  if (mismatches > 0) {
    console.error(`[sync-assets] FAILED: ${mismatches} hash mismatches`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
