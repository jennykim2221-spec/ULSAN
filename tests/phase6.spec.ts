import {test, expect, type Page} from '@playwright/test';
import {createRequire} from 'node:module';
import path from 'node:path';
const local = createRequire(path.join(process.cwd(), 'package.json'));
const {PNG} = local(path.join(path.dirname(local.resolve('playwright-core/package.json')), 'lib/utilsBundle.js'));
test.use({baseURL: 'http://127.0.0.1:3100'});
async function go(page: Page, id: string, p: number) {
  await page.locator(`#${id}`).evaluate((el, p) => {const node = el as HTMLElement; scrollTo(0, Number(node.dataset.scrollStart) + p * (Number(node.dataset.scrollEnd) - Number(node.dataset.scrollStart)));}, p);
  await page.waitForTimeout(1700);
}
async function distortion(page: Page, selector: string, name: string, text: boolean) {
  const box = (await page.locator(selector).first().boundingBox())!;
  const clip = {x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.min(box.width, 1440 - Math.max(0, box.x)), height: Math.min(box.height, 900 - Math.max(0, box.y))};
  const before = PNG.sync.read(await page.screenshot({clip, path: `.tools/phase6-qa/${name}-before.png`}));
  const x = clip.x + clip.width * .45, y = clip.y + clip.height * .5;
  await page.mouse.move(x - 40, y - 5); await page.mouse.move(x + 60, y + 5, {steps: 12});
  await expect(page.locator('[data-global-ripple]')).toHaveAttribute('data-distorting', 'true');
  await page.waitForTimeout(90);
  const after = PNG.sync.read(await page.screenshot({clip, path: `.tools/phase6-qa/${name}-after.png`}));
  let pixels = 0, edges = 0;
  for(let i = 0; i < before.data.length; i += 4) {
    if(Math.abs(before.data[i] - after.data[i]) + Math.abs(before.data[i+1] - after.data[i+1]) + Math.abs(before.data[i+2] - after.data[i+2]) > 30) pixels++;
    if((before.data[i]>160 && before.data[i+1]>160 && before.data[i+2]>160) !== (after.data[i]>160 && after.data[i+1]>160 && after.data[i+2]>160)) edges++;
  }
  console.log(name, {pixels, edges}); expect(pixels).toBeGreaterThan(20); if(text) expect(edges).toBeGreaterThan(5);
  await page.waitForTimeout(4000);
  await expect(page.locator('[data-distortion-surface]')).toHaveCSS('backdrop-filter', 'none');
}
for(const width of [1440,1280,1600,1920]) test(`${width} Phase 6 connected composition and collection`, async({page}) => {
  test.setTimeout(180000);
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => {if(e.type()==='error') errors.push(e.text());});
  page.on('response', r => {if(r.status()>=400) errors.push(`${r.status()} ${r.url()}`);});
  const height = width===1280 ? 720 : 900;
  await page.setViewportSize({width,height}); await page.goto('/#garden');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready', 'true');
  for(const p of [.5,.65,.85,.65]) {
    await go(page, 'garden', p);
    await page.screenshot({path: `.tools/phase6-qa/${width}-bamboo-${p}.png`});
  }
  await go(page, 'whale', .06);
  const early = await page.locator('[data-whale-video]').evaluate(el => Number(getComputedStyle(el).opacity));
  expect(early).toBeGreaterThan(0); expect(early).toBeLessThan(.7);
  await go(page, 'whale', .25);
  const video = page.locator('[data-whale-motion-video]');
  await expect(video).toHaveJSProperty('paused', false); await expect(video).toHaveCount(1);
  expect((await video.boundingBox())!.width).toBe(width);
  await video.evaluate(el => {el.setAttribute('data-seeks', '0'); el.addEventListener('seeking', () => el.setAttribute('data-seeks', String(Number(el.getAttribute('data-seeks')) + 1)));});
  await go(page, 'whale', .65); await expect(video).toHaveAttribute('data-seeks', '0');
  await page.screenshot({path: `.tools/phase6-qa/${width}-whale.png`});
  for(const p of [.5,.76,.99]) {
    await go(page, 'jangsaengpo', p);
    expect((await page.locator('#jangsaengpo [data-scene-inner]').boundingBox())!.x).toBe(0);
    if(p>.6) {await expect(page.locator('#sea')).toHaveAttribute('data-jang-underlay', ''); expect(Math.abs((await page.locator('#sea [data-scene-inner]').boundingBox())!.y)).toBeLessThan(1);}
    await page.screenshot({path: `.tools/phase6-qa/${width}-jang-${p}.png`});
  }
  await go(page, 'sea', .01); await page.screenshot({path: `.tools/phase6-qa/${width}-port-entry.png`});
  await expect(page.locator('#sea [data-port-image="port-1"]')).toHaveCSS('opacity', '1');
  await go(page, 'sea', .9); await page.screenshot({path: `.tools/phase6-qa/${width}-sea.png`});
  await go(page, 'explore', .35);
  await expect(page.locator('[data-collection-surfer]')).toHaveAttribute('data-collection-surfer', 'centered');
  await expect(page.locator('[data-collection-item]')).toHaveCount(7);
  await expect(page.locator('#explore')).toHaveAttribute('data-pinned', 'true');
  await page.screenshot({path: `.tools/phase6-qa/${width}-explore.png`});
  const main = page.locator('[data-selected="true"] img'); const box = (await main.boundingBox())!;
  expect(Math.abs(box.x + box.width/2 - width/2)).toBeLessThan(2);
  const info = (await page.locator('[data-destination-info]').boundingBox())!;
  expect(info.y + info.height).toBeLessThan(height - 40);
  if(width===1440) {
    await distortion(page, '#explore [data-title-en]', 'explore-type', true);
    await distortion(page, '[data-selected="true"] img', 'explore-image', false);
    const ids = ['daewangam','ganjeolgot','seongnamsa','ganwoljae','bangucheon','taehwa','jangsaengpo'];
    for(let i=0; i<7; i++) {
      await page.locator('[aria-label="울산 장소 컬렉션"] button').nth(i+1).click(); await page.waitForTimeout(1200);
      await expect(page.locator('[data-explore-collection]')).toHaveAttribute('data-destination', ids[i]);
      await expect(page.locator('[data-selected="true"] [data-photo-link]')).toHaveCount(1);
    }
    await page.getByRole('button', {name:'다음 장소',exact:true}).focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1200);
    await expect(page.locator('[data-explore-collection]')).toHaveAttribute('data-destination','daewangam');
    const link=page.locator('[data-selected="true"] [data-photo-link]'); const href=(await link.getAttribute('href'))!;
    await page.context().route(href, route=>route.fulfill({status:200,body:'Official link retained'}));
    await link.hover(); await page.mouse.move(width/2+15, height*.38+10);
    const popupPromise=page.waitForEvent('popup'); await link.click(); const popup=await popupPromise; await popup.waitForLoadState(); expect(popup.url()).toBe(href); await popup.close();
    await go(page,'jangsaengpo',.5); await go(page,'whale',.4); await expect(video).toHaveJSProperty('paused',false);
    await go(page,'explore',.3); const y=await page.evaluate(()=>scrollY);
    await page.mouse.wheel(0,6000); await page.waitForTimeout(1800); expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(y+2000);
    await page.mouse.wheel(0,-6000); await page.waitForTimeout(1800); await go(page,'explore',.3);
    await page.reload(); await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true'); await go(page,'explore',.35);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('canvas')).toHaveCount(1); expect(errors).toEqual([]);
});
test('Phase 6 reduced motion preserves collection and native reading order', async({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/#explore');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-motion-profile','reduced');
  await expect(page.locator('canvas, .pin-spacer')).toHaveCount(0);
  await page.locator('[aria-label="울산 장소 컬렉션"] button').nth(3).click();
  await expect(page.locator('[data-explore-collection]')).toHaveAttribute('data-destination','seongnamsa');
  await expect(page.locator('[data-selected="true"] [data-photo-link]')).toBeVisible();
  await page.screenshot({path:'.tools/phase6-qa/reduced.png'});
});
