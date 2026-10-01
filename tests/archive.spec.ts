import { test, expect, type Page } from '@playwright/test';

async function ready(page: Page, path = '/#history') {
  await page.goto(path);
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('[data-loading-overlay]')).toHaveCount(0);
}
async function seek(page: Page, id: string, p: number) {
  await page.locator(`#${id}`).evaluate((node, p) => {
    const el = node as HTMLElement;
    scrollTo(0, Number(el.dataset.scrollStart) + p * (Number(el.dataset.scrollEnd) - Number(el.dataset.scrollStart)));
  }, p);
  await page.waitForTimeout(850);
}
async function moveTrack(page: Page, distance: number) {
  await page.locator('#industry').evaluate((node, distance) => {
    const el = node as HTMLElement;
    const stop = Number(el.dataset.towerStop), hold = Number(el.dataset.towerHold);
    scrollTo(0, Number(el.dataset.scrollStart) + innerHeight * .5 + distance + (distance > stop ? hold : 0));
  }, distance);
  await page.waitForTimeout(850);
}
for (const [width, height] of [[1280,720],[1440,900],[1600,900],[1920,1080]]) {
  test(`Archive exhibition ${width}`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await ready(page);
    for (const id of ['history', 'industry']) await expect(page.locator(`#${id}`)).toHaveAttribute('data-pinned', 'true');
    for (const p of [0,.12,.32,.5,.68,.85,.99]) {
      await seek(page, 'history', p);
      expect(await page.locator('#history [data-pin-stage]').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
      if ([.12,.5,.85].includes(p)) await page.screenshot({ path: `.tools/phase3-qa/history-${width}-${p}.png` });
    }
    await seek(page, 'industry', 0);
    await page.screenshot({ path: `.tools/phase3-qa/entry-${width}.png` });
    const first = await page.locator('[data-archive-item="begin"]').boundingBox();
    expect(first!.x).toBeGreaterThanOrEqual(0);
    expect(first!.x + first!.width).toBeLessThan(width);
    const overflow = Number(await page.locator('#industry').getAttribute('data-archive-overflow'));
    expect(overflow).toBeGreaterThan(width * 3);
    const panels = page.locator('[data-archive-item]');
    for (let i = 0; i < await panels.count(); i++) {
      const distance = await panels.nth(i).evaluate(el => Math.max(0, (el as HTMLElement).offsetLeft + (el as HTMLElement).offsetWidth / 2 - innerWidth / 2));
      await moveTrack(page, Math.min(overflow, distance));
      expect(await page.locator('#industry [data-pin-stage]').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
      if (width === 1440) await page.screenshot({ path: `.tools/phase3-qa/panel-${i}.png` });
      for (const img of await panels.nth(i).locator('img').all()) {
        await expect(img).toHaveJSProperty('complete', true);
        if (await img.evaluate(el => !!el.closest('[data-today-surface], [data-dissolve]'))) continue;
        const shape = await img.evaluate(el => ({ w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height, nw: (el as HTMLImageElement).naturalWidth, nh: (el as HTMLImageElement).naturalHeight }));
        expect(shape.nw).toBeGreaterThan(0);
        expect(shape.w).toBeLessThanOrEqual(shape.nw + 1);
        expect(Math.abs(shape.w / shape.h - shape.nw / shape.nh)).toBeLessThan(.02);
      }
    }
    let frame: {x:number;y:number;width:number;height:number} | null = null;
    for (const p of [0,.3,.5,.7,1,.5,0]) {
      await page.locator('#industry').evaluate((node,p) => {
        const el=node as HTMLElement;
        scrollTo(0,Number(el.dataset.scrollStart)+innerHeight*.5+Number(el.dataset.towerStop)+Number(el.dataset.towerHold)*p);
      },p);
      await page.waitForTimeout(850);
      const old = page.locator('[data-tower-old]'), now = page.locator('[data-tower-new]');
      const oldBox=(await old.boundingBox())!, newBox=(await now.boundingBox())!;
      for(const key of ['x','y','width','height'] as const) {
        expect(Math.abs(oldBox[key]-newBox[key])).toBeLessThan(1);
        if(frame) expect(Math.abs(oldBox[key]-frame[key])).toBeLessThan(1);
      }
      frame=oldBox;
      if(p===0) { await expect(old).toHaveCSS('opacity','1'); await expect(now).toHaveCSS('opacity','0'); }
      if(p===1) { await expect(old).toHaveCSS('opacity','0'); await expect(now).toHaveCSS('opacity','1'); }
      if(width===1440) await page.screenshot({path:`.tools/phase3-qa/dissolve-${p}.png`});
    }
    // Fullscreen climax precedes the deliberate dark handoff.
    await page.locator('#industry').evaluate(node => {
      const el=node as HTMLElement;
      scrollTo(0,Number(el.dataset.scrollStart)+innerHeight*.5+Number(el.dataset.archiveOverflow)+Number(el.dataset.towerHold)+innerHeight*2);
    });
    await page.waitForTimeout(850);
    const full=(await page.locator('[data-today-surface]').boundingBox())!;
    expect(Math.abs(full.x)).toBeLessThan(2);expect(Math.abs(full.y)).toBeLessThan(2);
    expect(full.width).toBeCloseTo(width,0);expect(full.height).toBeCloseTo(height,0);
    await page.screenshot({path:`.tools/phase3-qa/fullscreen-${width}.png`});
    await seek(page, 'industry', .98);
    const last = await panels.last().boundingBox();
    expect(last!.x).toBeGreaterThan(0);
    expect(last!.x + last!.width).toBeLessThan(width);
    const x = await page.locator('[data-archive-track]').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
    await expect(page.locator('[data-today-mono]')).toHaveCSS('clip-path', 'inset(0% 0% 0% 100%)');

    expect(Math.abs(x + overflow)).toBeLessThan(2);
    await page.screenshot({ path: `.tools/phase3-qa/today-${width}.png` });
    await seek(page, 'dead-river', .05);
    await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'dead-river');
    await seek(page, 'industry', .5);
    await page.mouse.wheel(0, 2400);
    await page.waitForTimeout(1000);
    const after = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, -2400);
    await page.waitForTimeout(1000);
    expect(await page.evaluate(() => scrollY)).toBeLessThan(after - 1500);
    await seek(page, 'industry', 0);
    expect(await page.locator('[data-archive-track]').evaluate(el => Math.abs(new DOMMatrix(getComputedStyle(el).transform).m41))).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

for (const [width, height] of [[1440, 900], [1920, 1080]]) {
test(`Archive keyboard, resize, restoration and reduced reading ${width}`, async ({ page }) => {
  await page.setViewportSize({ width, height });
  await ready(page, '/#industry');
  await expect(page.locator('#industry-heading')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#industry a[href="#dead-river"]')).toBeFocused();
  await expect(page.locator('#industry a[href="#dead-river"]')).toBeInViewport();
  expect((await page.locator('#industry a[href="#dead-river"]').boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.keyboard.press('Tab');
  await expect(page.locator('#industry a[target="_blank"]')).toBeFocused();
  await expect(page.locator('#industry a[target="_blank"]')).toBeInViewport();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('#dead-river-heading')).toBeFocused();
  await seek(page, 'industry', .54);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.waitForTimeout(1000);
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'industry');
  const progress = () => page.locator('#industry').evaluate(el => (scrollY - Number((el as HTMLElement).dataset.scrollStart)) / (Number((el as HTMLElement).dataset.scrollEnd) - Number((el as HTMLElement).dataset.scrollStart)));
  expect(Math.abs(await progress() - .54)).toBeLessThan(.025);
  const p = await progress();
  await page.reload();
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  expect(Math.abs(await progress() - p)).toBeLessThan(.025);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  for (const selector of ['[data-history-frame]', '[data-archive-item]']) {
    const boxes = await page.locator(selector).evaluateAll(els => els.map(el => ({ top: el.getBoundingClientRect().top, opacity: getComputedStyle(el).opacity, width: el.getBoundingClientRect().width })));
    expect(boxes.every(b => b.opacity === '1' && b.width > 0)).toBe(true);
    expect(boxes.every((b, i) => i === 0 || b.top > boxes[i-1].top)).toBe(true);
  }
  await expect(page.locator('[data-tower-new]')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-tower-old]')).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
}

