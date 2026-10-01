import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';
import { readContent } from './read-content.mjs';

const root = new URL('../', import.meta.url);
const read = (name) => readFile(new URL(name, root));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const { assets, assetsById, ASSET_COUNTS } = readContent('assets');
const { scenes } = readContent('scenes');
const { places } = readContent('places');
const { sourcesById } = readContent('sources');
const { facts, recoveryMilestones } = readContent('timeline');
const { sceneCopy } = readContent('copy');
const spec = (await read('MASTER_BUILD_SPEC.md')).toString();
const audit = (await read('ASSET_AUDIT.md')).toString();
const manifest = JSON.parse(await read('public/assets/manifest.json'));
assert.equal(assets.length, 66);
assert.equal(new Set(assets.map(a => a.id)).size, 66);
assert.equal(new Set(assets.map(a => a.filename)).size, 66);
assert.equal(JSON.stringify(ASSET_COUNTS), JSON.stringify({total:66,active:41,reserve:21,hold:4}));
assert.equal(manifest.count, 66);
assert.equal(manifest.files.length, 66);
assert.equal((await readdir(new URL('assets/images/', root))).length, 66);
let totalBytes = 0;
for (const a of assets) {
  const original = await read(`assets/images/${encodeURIComponent(a.filename)}`);
  const copy = await read(`public/assets/images/${encodeURIComponent(a.filename)}`);
  const entry = manifest.files.find(f => f.filename === a.filename);
  assert.ok(entry, a.filename);
  assert.equal(digest(original), entry.sha256, `Original changed: ${a.filename}`);
  assert.equal(digest(copy), entry.sha256, `Copy changed: ${a.filename}`);
  assert.equal(original.length, a.bytes);
  assert.equal(entry.bytes, a.bytes);
  assert.equal(entry.url, `/assets/images/${encodeURIComponent(a.filename)}`);
  const meta = await sharp(original).metadata();
  assert.equal(meta.width, a.width);
  assert.equal(meta.height, a.height);
  assert.equal(meta.format, 'jpeg');
  const row = spec.split('\n').find(line => line.startsWith('| `'+a.filename+'` |'));
  assert.ok(row, `Appendix A: ${a.filename}`);
  const cells = row.split('|').map(s=>s.trim());
  assert.equal(cells[2], `${a.width}×${a.height}`);
  assert.equal(Number(cells[3].replaceAll(',','')), a.bytes);
  // Explicit Phase 3/4 and Phase 5 user selections supersede Appendix A reserve status.
  const promoted = ['old-city-3', 'old-city-5', 'taehwa-now-3', 'port-2', 'port-3'].includes(a.id);
  assert.equal(promoted ? 'active' : cells[4], a.status);
  assert.equal(Number(cells[7]), a.maxCssWidth);
  assert.ok(a.maxCssWidth <= a.width);
  assert.equal(a.capturedAt, null);
  assert.equal(a.allowCover, false);
  if (a.status === 'active') assert.ok(a.alt.ko && a.alt.en);
  totalBytes += a.bytes;
}
assert.equal(totalBytes, 20686753);
assert.equal(spec.split('<!-- BEGIN VERBATIM ASSET AUDIT -->')[1].split('<!-- END VERBATIM ASSET AUDIT -->')[0].trim(), audit.trim());
assert.equal(scenes.length, 14);
assert.equal(places.length, 7);
assert.equal(recoveryMilestones.length, 6);
for (const [index, s] of scenes.entries()) {
  assert.equal(s.order, index+1);
  assert.ok(sceneCopy.find(c => c.id === s.id));
  for (const id of s.assetIds) {
    assert.equal(assetsById[id]?.status, 'active', `${s.id}/${id}`);
    assert.ok(assetsById[id].sceneIds.includes(s.id), `${s.id}/${id} mapping`);
  }
  for (const id of s.sourceIds) assert.ok(sourcesById[id]);
}
for (const p of places) {
  for (const id of p.assetIds) {
    assert.equal(assetsById[id]?.status, 'active');
    assert.ok(assetsById[id].sceneIds.includes('explore'));
  }
  assert.ok(sourcesById[p.sourceId]);
}
for (const a of assets.filter(a=>a.status==='active')) {
  assert.ok(scenes.some(s=>s.assetIds.includes(a.id)), `Unused active asset: ${a.id}`);
}
for (const f of facts) for (const id of f.sourceIds) assert.ok(sourcesById[id]);
const dead = assetsById['past-taehwa-3'];
assert.equal(dead.alt.ko, '수면에 떠 있는 죽은 물고기');
assert.equal(dead.visibleCredit, null);
assert.ok(dead.uncertaintyIds.includes('U04'));
for (const copy of sceneCopy) for (const field of ['title','body']) for (const lang of ['ko','en']) {
  // Explicit Visual Refinement copy supersedes the original Intro sentence only.
  if (copy.id === 'intro' && field === 'body' && lang === 'ko') {
    assert.equal(copy[field][lang], '강을 따라, 시간을 따라, 울산을 만나다.');
    continue;
  }
  if(copy[field][lang]) assert.ok(spec.includes(copy[field][lang]), `Copy differs: ${copy.id}/${field}/${lang}`);
}
console.log('PASS: 66 originals/copies/manifest hashes, JPEG dimensions, Appendix A statuses; 14 scenes, 7 places, 6 milestones, bilingual copy, sources, U04 restrictions.');

