import fs from 'node:fs/promises';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';

// Local source only. Contain with transparent padding; never stretch or crop.
const source = new URL('../assets/images/울산 로고.png', import.meta.url);
const sizes = [16, 32, 48, 64, 128, 256];
const frames = await Promise.all(sizes.map(size => sharp(fileURLToPath(source))
  .resize(size, size, {fit: 'contain', withoutEnlargement: true, background: {r: 0, g: 0, b: 0, alpha: 0}})
  .png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (const [i, size] of sizes.entries()) {
  const entry = 6 + i * 16;
  header[entry] = header[entry + 1] = size === 256 ? 0 : size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frames[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frames[i].length;
}
await fs.writeFile(new URL('../src/app/favicon.ico', import.meta.url), Buffer.concat([header, ...frames]));
console.log('src/app/favicon.ico: local Ulsan logo, 6 transparent contained sizes');
