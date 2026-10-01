import { test, expect, type Page } from '@playwright/test';
test.use({ baseURL: 'http://127.0.0.1:3000' });
async function go(page: Page, id: string, p: number) {
  await page.locator(`#${id}`).evaluate((node, progress) => {
    const el = node as HTMLElement;
    scrollTo(0, Number(el.dataset.scrollStart) + progress * (Number(el.dataset.scrollEnd) - Number(el.dataset.scrollStart)));
  }, p);
  await page.waitForTimeout(1600);
}
async function fixedFrame(page: Page) {
  const video = page.locator('[data-whale-motion-video]');
  const box = (await video.boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(box.x).toBe(0); expect(box.y).toBe(0);
  expect(box.width).toBe(viewport.width); expect(box.height).toBe(viewport.height);
  await expect(page.locator('[data-whale-video]')).toHaveCSS('transform', 'none');
  await expect(video).toHaveCSS('object-fit', 'cover');
  expect(await video.evaluate(v => getComputedStyle(v.parentElement!).maskImage)).toBe('none');
}
for (const width of [1440,1280,1600,1920]) test(`${width} fullscreen native playback and depth-mask handoff`, async ({ page }) => {
  test.setTimeout(150000);
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => { if(e.type()==='error') errors.push(e.text()); });
  page.on('response', r => { if(r.status()>=400) errors.push(`${r.status()} ${r.url()}`); });
  const height = width===1280?720:900;
  await page.setViewportSize({width,height}); await page.goto('/#whale');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');
  await go(page,'whale',.12);
  const video=page.locator('[data-whale-motion-video]');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveJSProperty('paused',false);
  await expect(video).toHaveJSProperty('videoWidth',1280);
  await expect(video).toHaveJSProperty('playbackRate',.8);
  await fixedFrame(page);
  await video.evaluate(v=>{(window as unknown as {whaleElement:Element}).whaleElement=v; (window as unknown as {seekCount:number}).seekCount=0; v.addEventListener('seeking',()=>{(window as unknown as {seekCount:number}).seekCount++;});});
  const time=await video.evaluate(v=>(v as HTMLVideoElement).currentTime);
  await page.waitForTimeout(1000);
  const later=await video.evaluate(v=>(v as HTMLVideoElement).currentTime);
  expect(later-time).toBeGreaterThan(.6);
  await go(page,'whale',.7); await fixedFrame(page);
  expect(await page.evaluate(()=>(window as unknown as {seekCount:number}).seekCount)).toBe(0);
  await page.screenshot({path:`.tools/whale-native-qa/${width}-whale.png`});
  await go(page,'jangsaengpo',.18);
  const reveal=await page.locator('[data-whale-video]').evaluate(el=>Number((el as HTMLElement).dataset.reveal));
  expect(reveal).toBeGreaterThan(.1);expect(reveal).toBeLessThan(.9);
  await fixedFrame(page);
  await page.screenshot({path:`.tools/whale-native-qa/${width}-reveal.png`});
  await go(page,'jangsaengpo',.5);
  await expect(page.locator('[data-whale-video]')).toBeHidden();
  for(const selector of ['[data-jang-title]','[data-title-ko]','[data-body-ko]','[data-body-en]']) {
    const box=(await page.locator(`#jangsaengpo ${selector}`).boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width);
    expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(height);
  }
  await page.screenshot({path:`.tools/whale-native-qa/${width}-jang.png`});
  await go(page,'jangsaengpo',.86);
  await expect(page.locator('#sea')).toHaveAttribute('data-jang-underlay','');
  const portBox=(await page.locator('#sea [data-scene-inner]').boundingBox())!;
  expect(Math.abs(portBox.y)).toBeLessThan(1);
  await page.screenshot({path:`.tools/whale-native-qa/${width}-exit.png`});
  await go(page,'jangsaengpo',.99);
  const exitBox=(await page.locator('#jangsaengpo [data-scene-inner]').boundingBox())!;
  expect(exitBox.x).toBe(0);
  expect(await page.locator('#jangsaengpo [data-scene-inner]').evaluate(el => parseFloat(getComputedStyle(el).getPropertyValue('--port-opening')))).toBeGreaterThanOrEqual(149);
  await page.screenshot({path:`.tools/whale-native-qa/${width}-exit-complete.png`});
  await go(page,'sea',.35);
  await expect(video).toHaveJSProperty('paused',true);
  await page.screenshot({path:`.tools/whale-native-qa/${width}-port.png`});
  await go(page,'jangsaengpo',.5);
  expect((await page.locator('#jangsaengpo [data-scene-inner]').boundingBox())!.x).toBe(0);
  await go(page,'whale',.5);await expect(video).toHaveJSProperty('paused',false);await fixedFrame(page);
  expect(await video.evaluate(v=>v===(window as unknown as {whaleElement:Element}).whaleElement)).toBe(true);
  if(width===1440) {
    const before=await page.evaluate(()=>scrollY);
    await page.mouse.wheel(0,4500);await page.waitForTimeout(1800);
    expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(before+2000);
    await page.mouse.wheel(0,-4500);await page.waitForTimeout(1800);
    await go(page,'whale',.4);await fixedFrame(page);
    await page.mouse.move(400,350);await page.mouse.move(580,420);
    await expect(page.locator('[data-global-ripple]')).toBeVisible();
    await expect(page.locator('[data-whale-viewport]')).toHaveCSS('pointer-events','none');
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('#whale canvas, #whale svg, canvas:not([data-global-ripple-canvas])')).toHaveCount(0);
  expect(errors).toEqual([]);
});
test('reduced motion uses source poster and preserves reading content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/#whale');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-motion-profile','reduced');
  await expect(page.locator('#whale [data-whale-motion-video]')).toHaveJSProperty('paused',true);
  await expect(page.locator('[data-whale-motion-video]')).toHaveCount(1);
  await expect(page.locator('[data-whale-video]')).toHaveCSS('transform','none');
  await expect(page.locator('canvas, .pin-spacer')).toHaveCount(0);
  await page.screenshot({path:'.tools/whale-native-qa/reduced.png'});
});
