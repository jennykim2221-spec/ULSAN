import {test, expect, type Page} from '@playwright/test';
test.use({baseURL: 'http://127.0.0.1:3100'});
test('Ending activation',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('/#ending');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');
  console.log('ending activation',await page.locator('#ending').evaluate(el=>({pinned:(el as HTMLElement).dataset.pinned,inner:el.querySelector('[data-scene-inner]')!.getBoundingClientRect().height,style:getComputedStyle(el.querySelector('[data-river-path]')!).transform})));
  await expect(page.locator('#ending')).toHaveAttribute('data-pinned','true');
});
async function go(page: Page, id: string, p: number) {
  await page.locator(`#${id}`).evaluate((el, p) => {const node=el as HTMLElement;scrollTo(0,Number(node.dataset.scrollStart)+p*(Number(node.dataset.scrollEnd)-Number(node.dataset.scrollStart)));},p);
  await page.waitForTimeout(1900);
}
async function cover(page: Page, selector: string) {
  const el=page.locator(selector).first(), box=(await el.boundingBox())!, view=page.viewportSize()!;
  expect(box.x).toBeLessThanOrEqual(.5);expect(box.y).toBeLessThanOrEqual(.5);
  expect(box.x+box.width).toBeGreaterThanOrEqual(view.width-.5);
  expect(box.y+box.height).toBeGreaterThanOrEqual(view.height-.5);
  await expect(el).toHaveCSS('object-fit','cover');
}
async function river(page:Page,id:string) {
  return page.locator(`#${id} [data-river-path]`).evaluate(el=>{const c=getComputedStyle(el);const m=new DOMMatrix(c.transform);return {d:el.getAttribute('d'), x:m.a, y:m.d, clip:c.clipPath, opacity:c.opacity, stroke:c.stroke, width:c.strokeWidth, vector:c.vectorEffect};});
}
for(const width of [1440,1280,1600,1920]) test(`${width} river reversal and continuous Whale/Jangsaengpo/Port`,async({page})=>{
  test.setTimeout(180000);const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.setViewportSize({width,height:width===1280?720:900});await page.goto('/#whale');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');
  const video=page.locator('[data-whale-motion-video]'), text=page.locator('[data-whale-floating-copy]');
  await go(page,'whale',.18);await expect(video).toHaveJSProperty('paused',false);await cover(page,'[data-whale-motion-video]');
  await video.evaluate(el=>{el.setAttribute('data-seeks','0');el.addEventListener('seeking',()=>el.setAttribute('data-seeks',String(Number(el.getAttribute('data-seeks'))+1)));});
  await go(page,'whale',.78);await expect(text).toHaveCSS('opacity','1');
  await page.screenshot({path:`.tools/river-port-refinement/${width}-whale-late.png`});
  await go(page,'jangsaengpo',.12);await expect(text).toBeVisible();
  expect(await text.evaluate(el=>Number(getComputedStyle(el).opacity))).toBeGreaterThan(.8);
  await page.screenshot({path:`.tools/river-port-refinement/${width}-whale-jang.png`});
  await go(page,'jangsaengpo',.36);await expect(text).toBeHidden();await expect(video).toHaveJSProperty('paused',true);
  await cover(page,'#jangsaengpo [data-asset-id="jangsaengpo-1"] img');
  const span=await page.locator('#jangsaengpo').evaluate(el=>Number((el as HTMLElement).dataset.scrollEnd)-Number((el as HTMLElement).dataset.scrollStart));
  expect(span/page.viewportSize()!.height).toBeCloseTo(2.6,1);
  for(const p of [.36,.55,.68]) {
    await go(page,'jangsaengpo',p);
    expect(await page.locator('#jangsaengpo [data-scene-inner]').evaluate(el=>parseFloat(getComputedStyle(el).getPropertyValue('--port-opening')))).toBe(0);
    await expect(page.locator('#jangsaengpo [data-jang-title]')).toHaveCSS('opacity','1');
  }
  await page.screenshot({path:`.tools/river-port-refinement/${width}-jang-hold.png`});
  await go(page,'jangsaengpo',.84);await expect(page.locator('#sea')).toHaveAttribute('data-jang-underlay','');
  expect((await page.locator('#jangsaengpo [data-scene-inner]').boundingBox())!.x).toBe(0);
  await page.screenshot({path:`.tools/river-port-refinement/${width}-depth-handoff.png`});
  await go(page,'sea',.01);await cover(page,'#sea [data-port-image="port-1"] img');
  await page.screenshot({path:`.tools/river-port-refinement/${width}-port-entry.png`});
  for(const p of [.3,.55,.68]) {
    await go(page,'sea',p);await expect(page.locator('[data-port-image="port-1"]')).toHaveCSS('opacity','1');
    await cover(page,'#sea [data-port-image="port-1"] img');
  }
  await expect(page.locator('[data-port-image="port-2"]')).toBeVisible();await expect(page.locator('[data-port-image="port-3"]')).toBeVisible();
  for(const id of ['port-2','port-3']) expect((await page.locator(`[data-port-image="${id}"]`).boundingBox())!.width).toBeLessThan(width*.4);
  await go(page,'sea',.55);await page.screenshot({path:`.tools/river-port-refinement/${width}-port-layers.png`});
  await go(page,'sea',.84);await expect(page.locator('[data-port-image="port-1"]')).toHaveCSS('opacity','1');
  await expect(page.locator('[data-port-image="port-2"]')).toHaveCSS('opacity','0');await expect(page.locator('[data-port-image="port-3"]')).toHaveCSS('opacity','0');
  await go(page,'sea',.99);await page.screenshot({path:`.tools/river-port-refinement/${width}-sea.png`});
  await go(page,'jangsaengpo',.55);await cover(page,'#jangsaengpo [data-asset-id="jangsaengpo-1"] img');
  await go(page,'whale',.7);await expect(video).toHaveJSProperty('paused',false);await expect(text).toHaveCSS('opacity','1');
  await expect(video).toHaveAttribute('data-seeks','0');
  if(width===1440) {
    const before=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,6500);await page.waitForTimeout(1800);expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(before+3000);
    await page.mouse.wheel(0,-6500);await page.waitForTimeout(1800);await go(page,'jangsaengpo',.55);
    const link=page.locator('#jangsaengpo [data-photo-link]'),href=(await link.getAttribute('href'))!;
    await page.context().route(href,r=>r.fulfill({status:200,body:'Preserved official destination'}));
    await page.mouse.move(550,440);await page.mouse.move(750,480,{steps:14});
    await expect(page.locator('[data-global-ripple]')).toHaveAttribute('data-distorting','true');
    const pop=page.waitForEvent('popup');await link.click({position:{x:700,y:450}});const popup=await pop;await popup.waitForLoadState();expect(popup.url()).toBe(href);await popup.close();await page.bringToFront();
    await page.locator('summary').filter({hasText:'CHAPTERS'}).click();await page.locator('details a[href="#whale"]').click();await expect(page.locator('#whale-heading')).toBeFocused();
    await go(page,'garden',.85);await page.locator('nav[aria-label="강 장면 목록"] a[href="#jangsaengpo"]').click();await expect(page.locator('#jangsaengpo-heading')).toBeFocused();
    await page.reload();await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');
  }
  for(const t of (width===1440?[.22,.36,.50,.58]:[.36])) {
    await go(page,'intro',t/1.6);const opening=await river(page,'intro');
    const sampledTime=await page.locator('#intro').evaluate(el=>{const node=el as HTMLElement;return 1.6*(scrollY-Number(node.dataset.scrollStart))/(Number(node.dataset.scrollEnd)-Number(node.dataset.scrollStart));});
    await page.screenshot({path:`.tools/river-port-refinement/${width}-opening-${t}.png`});
    await go(page,'ending',(.40+.58-sampledTime)/1.6);const ending=await river(page,'ending');
    expect(ending.d).toBe(opening.d);expect(ending.x).toBeCloseTo(opening.x,2);expect(ending.y).toBeCloseTo(opening.y,2);
    const openingClip=opening.clip.match(/[\d.]+/g)!.map(Number), endingClip=ending.clip.match(/[\d.]+/g)!.map(Number);
    // Native scroll offsets round to physical pixels; normalized progress differs slightly.
    openingClip.forEach((value,i)=>expect(Math.abs(value-endingClip[i])).toBeLessThan(.3));
    expect(ending.opacity).toBe('1');expect(ending.stroke).toBe(opening.stroke);expect(ending.width).toBe(opening.width);expect(ending.vector).toBe(opening.vector);
    await page.screenshot({path:`.tools/river-port-refinement/${width}-ending-${t}.png`});
  }
  await go(page,'ending',.7);await expect(page.locator('#ending [data-river-drop]')).toHaveCSS('opacity','1');
  await expect(page.locator('#ending [data-river-path]')).toHaveCSS('opacity','1');
  expect((await river(page,'ending')).y).toBeCloseTo(.01,2);
  await page.screenshot({path:`.tools/river-port-refinement/${width}-ending-dot.png`});
  await go(page,'ending',.3);expect((await river(page,'ending')).y).toBeGreaterThan(.7);
  await expect(page.locator('canvas')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
test('refinement reduced-motion reading and cleanup',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/#whale');await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-motion-profile','reduced');
  await expect(page.locator('[data-whale-motion-video]')).toHaveJSProperty('paused',true);await expect(page.locator('[data-whale-floating-copy]')).toHaveCount(0);
  await expect(page.locator('canvas, .pin-spacer')).toHaveCount(0);
  await page.locator('#jangsaengpo-heading').scrollIntoViewIfNeeded();await expect(page.locator('#jangsaengpo-heading')).toBeVisible();
  await page.locator('#ending-heading').scrollIntoViewIfNeeded();await expect(page.locator('#ending-heading')).toBeVisible();expect(errors).toEqual([]);
});
