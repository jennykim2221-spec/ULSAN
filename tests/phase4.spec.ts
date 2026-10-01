import { test, expect, type Page } from '@playwright/test';

async function seek(page: Page, id: string, p: number) {
  await page.locator(`#${id}`).evaluate((el, p) => {
    const { scrollStart, scrollEnd } = (el as HTMLElement).dataset;
    scrollTo(0, Number(scrollStart) + p * (Number(scrollEnd) - Number(scrollStart)));
  }, p);
  await page.waitForTimeout(850);
}
for (const [width, height] of [[1280,720],[1440,900],[1600,900],[1920,1080]]) {
  test(`Phase 4 continuous river journey ${width}`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if(r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.goto('/#industry');
    await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready','true');
    const shot = async (name: string) => page.screenshot({path:`.tools/phase4-qa/${width}-${name}.png`});
    await page.locator('#industry').evaluate(el => {
      const d=(el as HTMLElement).dataset;
      scrollTo(0,Number(d.scrollStart)+innerHeight*.5+Number(d.archiveOverflow)+Number(d.towerHold)+innerHeight*2);
    });
    await page.waitForTimeout(850);
    await expect(page.locator('[data-today-surface]')).toHaveCSS('filter','saturate(1) brightness(1)');
    await shot('today');
    await seek(page,'industry',.99);
    expect(await page.locator('[data-today-surface]').evaluate(el => parseFloat(getComputedStyle(el).filter.match(/saturate\((.*?)\)/)![1]))).toBeLessThan(.2);
    await shot('today-dark');
    for(const id of ['dead-river','recovery','garden']) await expect(page.locator(`#${id}`)).toHaveAttribute('data-pinned','true');
    await seek(page,'dead-river',.30);
    await expect(page.locator('[data-dead-archive]')).toHaveCSS('opacity','1');
    await shot('dead');
    expect(await page.locator('[data-dead-archive] img').getAttribute('alt')).toBe('수면에 떠 있는 죽은 물고기');
    await expect(page.locator('[data-dead-archive]')).not.toContainText('1996');
    await seek(page,'dead-river',.73);
    await expect(page.locator('[data-bod-value]')).toHaveText('11.3');
    expect((await page.locator('[data-bod-value]').boundingBox())!.width).toBeGreaterThan(width*.85);
    await shot('bod');
    await seek(page,'dead-river',.97);
    await shot('line-born');
    await seek(page,'recovery',.77);
    await expect(page.locator('[data-recovery-transition] [data-asset-id="taehwa-now-3"]')).toBeVisible();
    await shot('current3-transition');
    await seek(page,'recovery',.87);
    await expect(page.locator('[data-recovery-image] [data-asset-id="taehwa-now-2"]')).toBeVisible();
    await shot('current2-close');
    const nodes=page.locator('[data-recovery-milestone]');
    const samples=[.12,.28,.42,.56,.70,.88];
    for(let i=0;i<samples.length;i++) {
      await seek(page,'recovery',samples[i]);
      await expect(nodes.nth(i)).toHaveCSS('opacity','1');
      const visible=await nodes.evaluateAll(els=>els.filter(el=>Number(getComputedStyle(el).opacity)>.5).length);
      expect(visible).toBe(1);
      await shot(`year-${i}`);
    }
    const mint=await page.locator('#recovery [data-recovery-river]').evaluate(el=>getComputedStyle(el).color);
    expect(mint).toBe('rgb(142, 216, 198)');
    for (const [p, index] of [[.28,0],[.52,1],[.90,2]]) {
      await seek(page,'garden',p);
      await expect(page.locator('[data-garden-frame]').nth(index)).toHaveCSS('opacity','1');
      await shot(`garden-${index}`);
    }
    const bamboo = page.locator('[data-garden-frame="garden-4"]');
    const bambooBox = (await bamboo.boundingBox())!;
    await page.mouse.move(bambooBox.x + bambooBox.width / 2, bambooBox.y + bambooBox.height / 2);
    await page.mouse.move(bambooBox.x + bambooBox.width * .95, bambooBox.y + bambooBox.height * .95);
    const frontLayer = bamboo.locator('[data-depth-layer="front"]');
    await expect.poll(() => frontLayer.evaluate(el => parseFloat(getComputedStyle(el).getPropertyValue('--pointer-x')))).toBeGreaterThan(8.5);
    await expect.poll(() => frontLayer.evaluate(el => parseFloat(getComputedStyle(el).getPropertyValue('--pointer-y')))).toBeGreaterThan(13.5);
    await shot('bamboo-depth');
    await page.mouse.move(4, 4);
    await expect.poll(() => frontLayer.evaluate(el => getComputedStyle(el).getPropertyValue('--pointer-x').trim())).toBe('0px');
    await expect(frontLayer).toHaveCSS('transition-duration', '0.25s');
    for(const img of await page.locator('#dead-river img, #recovery img, #garden img').all()) {
      expect(await img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    // Same river milestone and scene geometry after reversing from Bamboo.
    await seek(page,'recovery',.42);
    await expect(nodes.nth(2)).toHaveCSS('opacity','1');
    await seek(page,'dead-river',.30);
    await expect(page.locator('[data-dead-archive]')).toHaveCSS('opacity','1');
    await seek(page,'recovery',.5);
    await page.mouse.wheel(0,2400); await page.waitForTimeout(1000);
    const after=await page.evaluate(()=>scrollY);
    await page.mouse.wheel(0,-2400); await page.waitForTimeout(1000);
    expect(await page.evaluate(()=>scrollY)).toBeLessThan(after-1500);
    for(const id of ['garden','dead-river','recovery']) {
      await page.locator('summary').filter({hasText:'CHAPTERS'}).click();
      await page.locator(`nav[aria-label="장면 이동"] a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}-heading`)).toBeFocused();
      await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene',id);
      await page.keyboard.press('Tab');
      await expect(page.locator(`#${id} a[target="_blank"]`)).toBeFocused();
      await expect(page.locator(`#${id} a[target="_blank"]`)).toBeInViewport();
    }
    await seek(page,'recovery',.7);
    await page.reload();
    await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready','true');
    await page.waitForTimeout(900);
    await expect(nodes.nth(4)).toHaveCSS('opacity','1');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.emulateMedia({reducedMotion:'reduce'});
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    for(const selector of ['[data-recovery-milestone]','[data-garden-frame]']) {
      const rows=await page.locator(selector).evaluateAll(els=>els.map(el=>({top:el.getBoundingClientRect().top,opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform})));
      expect(rows.every((r,i)=>r.opacity==='1' && r.transform==='none' && (i===0 || r.top>rows[i-1].top))).toBe(true);
    }
    await expect(page.locator('[data-bod-value]')).toHaveText('11.3');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('Phase 4 continuous forward and reverse scroll sweep', async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');

  const bounds = await page.evaluate(() => {
    const industry = document.querySelector<HTMLElement>('#industry')!;
    const garden = document.querySelector<HTMLElement>('#garden')!;
    return {
      start: Number(industry.dataset.scrollStart) + innerHeight * .5 + Number(industry.dataset.archiveOverflow) + Number(industry.dataset.towerHold) + innerHeight * 2,
      end: Number(garden.dataset.scrollStart) + .9 * (Number(garden.dataset.scrollEnd) - Number(garden.dataset.scrollStart)),
    };
  });
  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), bounds.start);
  await page.waitForTimeout(500);

  const forward: string[] = [];
  const milestones = new Set<number>();
  const captures = new Set<string>();
  let sawDarkToday = false;
  let sawDeadArchive = false;
  let sawBod = false;
  let sawCurrent3 = false;
  let sawCurrent2 = false;
  let sawGardenReveal = false;
  let sawBamboo = false;
  const sample = async () => page.evaluate(() => {
    const visible = (el: Element | null | undefined) => !!el && parseFloat(getComputedStyle(el).opacity) > .65;
    const scene = document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene ?? '';
    const today = document.querySelector('[data-today-surface]');
    const saturation = today ? parseFloat(getComputedStyle(today).filter.match(/saturate\((.*?)\)/)?.[1] ?? '1') : 1;
    const recovery = document.querySelector('#recovery');
    const garden = document.querySelector('#garden');
    return {
      scene,
      saturation,
      deadArchive: visible(document.querySelector('[data-dead-archive]')),
      bod: visible(document.querySelector('[data-bod-value]')) && document.querySelector('[data-bod-value]')?.textContent?.trim() === '11.3',
      milestones: [...(recovery?.querySelectorAll('[data-recovery-milestone]') ?? [])].flatMap((el, i) => visible(el) ? [i] : []),
      current3: visible(recovery?.querySelector('[data-recovery-transition]')),
      current2: visible(recovery?.querySelector('[data-recovery-image]')),
      gardenReveal: visible(garden?.querySelector('[data-garden-frame="garden-4"]')),
      bamboo: visible(garden?.querySelector('[data-bamboo-title]')),
    };
  });
  const step = 90;
  for (let y = bounds.start; y <= bounds.end; y += step) {
    await page.evaluate(next => scrollTo({ top: next, behavior: 'instant' }), y);
    await page.waitForTimeout(50);
    const state = await sample();
    if (state.scene && forward.at(-1) !== state.scene) {
      forward.push(state.scene);
    }
    const visibleCapture = state.scene === 'industry'
      ? 'continuous-industry'
      : state.scene === 'dead-river' && state.deadArchive
        ? 'continuous-dead-river'
        : state.scene === 'recovery' && state.milestones.length > 0
          ? 'continuous-recovery'
            : '';
    if (visibleCapture && !captures.has(visibleCapture)) {
      captures.add(visibleCapture);
      await page.screenshot({ path: `.tools/phase4-qa/1440-${visibleCapture}.png` });
    }
    for (const i of state.milestones) milestones.add(i);
    sawDarkToday ||= state.scene === 'industry' && state.saturation < .2;
    sawDeadArchive ||= state.scene === 'dead-river' && state.deadArchive;
    sawBod ||= state.scene === 'dead-river' && state.bod;
    sawCurrent3 ||= state.scene === 'recovery' && state.current3;
    sawCurrent2 ||= state.scene === 'recovery' && state.current2;
    sawGardenReveal ||= state.scene === 'garden' && state.gardenReveal;
    sawBamboo ||= state.scene === 'garden' && state.bamboo;
  }

  expect(forward).toEqual(['industry', 'dead-river', 'recovery', 'garden']);
  expect(sawDarkToday).toBe(true);
  expect(sawDeadArchive).toBe(true);
  expect(sawBod).toBe(true);
  expect([...milestones].sort((a,b) => a-b)).toEqual([0,1,2,3,4,5]);
  expect(sawCurrent3 && sawCurrent2).toBe(true);
  expect(sawGardenReveal && sawBamboo).toBe(true);

  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), bounds.end);
  await page.waitForTimeout(250);
  const fullBamboo = page.locator('#garden [data-garden-frame="garden-4"]');
  await expect(fullBamboo).toHaveCSS('opacity', '1');
  await expect.poll(() => fullBamboo.evaluate(el => {
    const inset = getComputedStyle(el).clipPath.match(/inset\((.*?)\)/)?.[1];
    return !!inset && inset.split(/\s+/).every(value => parseFloat(value) === 0);
  })).toBe(true);
  await expect.poll(() => page.locator('[data-bamboo-title]').evaluate(el => parseFloat(getComputedStyle(el).opacity))).toBeGreaterThan(.65);
  await page.screenshot({ path: '.tools/phase4-qa/1440-continuous-garden.png' });

  const reverse: string[] = [];
  const reverseMilestones: number[] = [];
  let lastReverseMilestone = 6;
  let sawReverseCurrent3 = false;
  let sawReverseCurrent2 = false;
  let sawReverseBod = false;
  let sawReverseArchive = false;
  let sawTodayRestore = false;
  for (let y = bounds.end; y >= bounds.start; y -= step) {
    await page.evaluate(next => scrollTo({ top: next, behavior: 'instant' }), y);
    await page.waitForTimeout(50);
    const state = await sample();
    if (state.scene && reverse.at(-1) !== state.scene) reverse.push(state.scene);
    if (state.milestones.length) {
      const index = Math.max(...state.milestones);
      if (index < lastReverseMilestone) {
        reverseMilestones.push(index);
        lastReverseMilestone = index;
      }
    }
    sawReverseCurrent3 ||= state.scene === 'recovery' && state.current3;
    sawReverseCurrent2 ||= state.scene === 'recovery' && state.current2;
    sawReverseBod ||= state.scene === 'dead-river' && state.bod;
    sawReverseArchive ||= state.scene === 'dead-river' && state.deadArchive;
    sawTodayRestore ||= state.scene === 'industry' && state.saturation > .9;
  }
  expect(reverse).toEqual(['garden', 'recovery', 'dead-river', 'industry']);
  expect(reverseMilestones).toEqual([5,4,3,2,1,0]);
  expect(sawReverseCurrent3 && sawReverseCurrent2).toBe(true);
  expect(sawReverseBod && sawReverseArchive && sawTodayRestore).toBe(true);
  expect(errors).toEqual([]);
});

test('Phase 4 fast wheel flings retain scene and scroll state', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  const bounds = await page.evaluate(() => {
    const industry = document.querySelector<HTMLElement>('#industry')!;
    const garden = document.querySelector<HTMLElement>('#garden')!;
    return {
      start: Number(industry.dataset.scrollStart) + innerHeight * .5 + Number(industry.dataset.archiveOverflow) + Number(industry.dataset.towerHold) + innerHeight * 2,
      gardenStart: Number(garden.dataset.scrollStart),
      gardenEnd: Number(garden.dataset.scrollEnd),
    };
  });
  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), bounds.start);
  await page.waitForTimeout(350);
  const forward: string[] = [];
  let previousY = await page.evaluate(() => scrollY);
  for (let i = 0; i < 36; i++) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(55);
    const state = await page.evaluate(() => ({
      y: scrollY,
      scene: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene ?? '',
    }));
    expect(state.y).toBeGreaterThanOrEqual(previousY - 1);
    previousY = state.y;
    if (state.scene && forward.at(-1) !== state.scene) forward.push(state.scene);
    if (state.scene === 'garden' && state.y >= bounds.gardenStart + .72 * (bounds.gardenEnd - bounds.gardenStart)) break;
  }
  await page.waitForTimeout(700);
  const fastEnd = await page.evaluate(() => ({
    y: scrollY,
    scene: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene,
    gardenOpacity: parseFloat(getComputedStyle(document.querySelector('#garden [data-garden-frame="garden-4"]')!).opacity),
    imageWidth: (document.querySelector('#garden [data-garden-frame="garden-4"] img') as HTMLImageElement | null)?.naturalWidth ?? 0,
  }));
  expect(forward).toEqual(['industry', 'dead-river', 'recovery', 'garden']);
  expect(fastEnd.scene).toBe('garden');
  expect(fastEnd.y).toBeGreaterThan(bounds.gardenStart);
  expect(fastEnd.gardenOpacity).toBeGreaterThan(.9);
  expect(fastEnd.imageWidth).toBeGreaterThan(0);

  const reverse: string[] = [];
  previousY = fastEnd.y;
  for (let i = 0; i < 36; i++) {
    await page.mouse.wheel(0, -700);
    await page.waitForTimeout(55);
    const state = await page.evaluate(() => ({
      y: scrollY,
      scene: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene ?? '',
    }));
    expect(state.y).toBeLessThanOrEqual(previousY + 1);
    previousY = state.y;
    if (state.scene && reverse.at(-1) !== state.scene) reverse.push(state.scene);
    if (state.scene === 'industry' && state.y <= bounds.start + 600) break;
  }
  await page.waitForTimeout(700);
  const fastReturn = await page.evaluate(() => ({
    y: scrollY,
    scene: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene,
    saturation: parseFloat(getComputedStyle(document.querySelector('[data-today-surface]')!).filter.match(/saturate\((.*?)\)/)?.[1] ?? '1'),
  }));
  expect(reverse).toEqual(['garden', 'recovery', 'dead-river', 'industry']);
  expect(fastReturn.scene).toBe('industry');
  expect(fastReturn.saturation).toBeGreaterThan(.9);
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  expect(await page.locator('.pin-spacer').count()).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('River Navigation jumps update destination, focus, and river progress', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');

  const jump = async (id: string) => {
    await page.locator('nav[aria-label="장면 이동"] summary').click();
    await page.locator(`nav[aria-label="장면 이동"] a[href="#${id}"]`).click();
    await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', id);
    await expect(page.locator(`#${id}-heading`)).toBeFocused();
    await expect(page.locator('[data-river-navigation]')).toHaveAttribute('data-active', id);
    await expect(page.locator('nav[aria-label="강 장면 목록"]')).toHaveAttribute('data-active', id);
    await expect(page.locator(`nav[aria-label="강 장면 목록"] a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location');
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    return page.locator('[data-nav-fill]').evaluate(el => parseFloat(getComputedStyle(el).strokeDashoffset));
  };

  const recoveryOffset = await jump('recovery');
  const recoveryColor = await page.locator('[data-river-navigation]').evaluate(el => getComputedStyle(el).color);
  const gardenOffset = await jump('garden');
  const deadRiverOffset = await jump('dead-river');
  expect(recoveryColor).toBe('rgb(142, 216, 198)');
  expect(recoveryOffset).toBeGreaterThan(0);
  expect(gardenOffset).toBeLessThan(recoveryOffset);
  expect(deadRiverOffset).toBeGreaterThan(recoveryOffset);
  expect(errors).toEqual([]);
});

test('Phase 4 refresh mid-scroll restores scene progress and visual state', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');

  for (const [id, progress, marker] of [['dead-river', .73, 'bod'], ['recovery', .56, 'milestone']] as const) {
    await seek(page, id, progress);
    if (marker === 'bod') await expect(page.locator('[data-bod-value]')).toHaveCSS('opacity', '1');
    else await expect(page.locator('[data-recovery-milestone]').nth(3)).toHaveCSS('opacity', '1');
    const before = await page.evaluate(sceneId => {
      const scene = document.getElementById(sceneId)! as HTMLElement;
      return {
        y: scrollY,
        id: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene,
        hash: location.hash,
        progress: (scrollY - Number(scene.dataset.scrollStart)) / (Number(scene.dataset.scrollEnd) - Number(scene.dataset.scrollStart)),
      };
    }, id);
    expect(before.id).toBe(id);
    expect(before.hash).toBe(`#${id}`);

    await page.reload();
    await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
    await page.waitForTimeout(250);
    const after = await page.evaluate(sceneId => {
      const scene = document.getElementById(sceneId)! as HTMLElement;
      return {
        y: scrollY,
        id: document.querySelector<HTMLElement>('[data-scroll-ready]')?.dataset.activeScene,
        progress: (scrollY - Number(scene.dataset.scrollStart)) / (Number(scene.dataset.scrollEnd) - Number(scene.dataset.scrollStart)),
        nav: document.querySelector<HTMLElement>('[data-river-navigation]')?.dataset.active,
        savedId: JSON.parse(sessionStorage.getItem('ulsan-scroll') ?? 'null')?.position?.id,
      };
    }, id);
    expect(after.id).toBe(id);
    expect(after.nav).toBe(id);
    expect(after.savedId).toBe(id);
    expect(Math.abs(after.progress - before.progress)).toBeLessThan(.03);
    if (marker === 'bod') await expect(page.locator('[data-bod-value]')).toHaveCSS('opacity', '1');
    else await expect(page.locator('[data-recovery-milestone]').nth(3)).toHaveCSS('opacity', '1');
  }
});

test('Phase 4 scenes do not create body horizontal overflow', async ({ page }) => {
  test.setTimeout(90000);
  for (const [width, height] of [[320,720],[640,360],[1280,720],[1440,900],[1920,1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/#dead-river');
    await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
    for (const id of ['dead-river', 'recovery', 'garden']) {
      await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.waitForTimeout(180);
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth,
        body: document.body.scrollWidth,
        document: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(overflow.body, `${width}x${height} ${id} body overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(width);
      expect(overflow.document, `${width}x${height} ${id} document overflow: ${JSON.stringify(overflow)}`).toBeLessThanOrEqual(width);
      expect(overflow.client).toBeLessThanOrEqual(width);
    }
  }
});

test('Phase 4 image assets decode without HTTP 404 responses', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const badImages: string[] = [];
  const failedImages: string[] = [];
  page.on('response', response => {
    if (response.request().resourceType() === 'image' && response.status() >= 400) badImages.push(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', request => {
    if (request.resourceType() === 'image') failedImages.push(`${request.failure()?.errorText} ${request.url()}`);
  });
  await page.goto('/#dead-river');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');

  const expected: Record<string, string[]> = {
    'dead-river': ['past-taehwa-3'],
    recovery: ['taehwa-now-2', 'taehwa-now-3'],
    garden: ['garden-1', 'garden-2', 'garden-4'],
  };
  for (const [sceneId, assetIds] of Object.entries(expected)) {
    await page.locator(`#${sceneId}`).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    const loaded = await page.locator(`#${sceneId} [data-asset-id]`).evaluateAll(async figures => Promise.all(
      figures.map(async figure => {
        const img = figure.querySelector('img') as HTMLImageElement | null;
        if (!img) return { id: figure.getAttribute('data-asset-id'), src: '', naturalWidth: 0 };
        img.loading = 'eager';
        await img.decode();
        return { id: figure.getAttribute('data-asset-id'), src: img.currentSrc, naturalWidth: img.naturalWidth };
      }),
    ));
    expect(loaded.map(image => image.id).sort()).toEqual([...assetIds].sort());
    expect(loaded.every(image => image.naturalWidth > 0 && !!image.src)).toBe(true);
  }
  expect(badImages).toEqual([]);
  expect(failedImages).toEqual([]);
});

test('Phase 4 scroll, navigation, and refresh produce no console or runtime errors', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(`runtime: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('requestfailed', request => errors.push(`request: ${request.failure()?.errorText} ${request.url()}`));
  page.on('response', response => { if (response.status() >= 400) errors.push(`http: ${response.status()} ${response.url()}`); });

  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await seek(page, 'industry', .99);
  await seek(page, 'dead-river', .73);
  await seek(page, 'recovery', .56);
  await seek(page, 'recovery', .87);
  await seek(page, 'garden', .90);

  await page.locator('nav[aria-label="장면 이동"] summary').click();
  await page.locator('nav[aria-label="장면 이동"] a[href="#dead-river"]').click();
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'dead-river');
  await expect(page.locator('#dead-river-heading')).toBeFocused();
  await seek(page, 'recovery', .56);
  await page.reload();
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await page.waitForTimeout(300);
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'recovery');
  expect(errors).toEqual([]);
});

test('Phase 4 loads in a readable reduced-motion profile', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/#dead-river');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-motion-profile', 'reduced');
  expect(await page.locator('.pin-spacer').count()).toBe(0);
  expect(await page.locator('#__ulsan-story').evaluate(el => el.classList.contains('scroll-enhanced'))).toBe(false);
  await expect(page.locator('[data-dead-archive] img')).toBeVisible();
  await expect(page.locator('[data-bod-value]')).toHaveText('11.3');

  for (const id of ['dead-river', 'recovery', 'garden']) {
    await page.locator(`#${id}`).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    const rows = await page.locator(`#${id} [data-recovery-milestone], #${id} [data-garden-frame]`).evaluateAll(els =>
      els.map(el => ({ opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform })),
    );
    expect(rows.every(row => row.opacity === '1' && row.transform === 'none')).toBe(true);
    expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth && document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator('#garden [data-bamboo-depth]')).toBeHidden();
  await expect(page.locator('#garden [data-bamboo-title]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Phase 4 chapter navigation is operable with keyboard alone', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#industry');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  const navigation = page.getByRole('navigation', { name: '장면 이동', exact: true });
  const summary = navigation.locator('summary');
  const details = navigation.locator('details');
  const tabTo = async (href: string) => {
    for (let i = 0; i < 14; i++) {
      if (await page.evaluate(() => document.activeElement?.getAttribute('href')) === href) return;
      await page.keyboard.press('Tab');
    }
  };

  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await tabTo('#recovery');
  await expect(page.locator('nav[aria-label="장면 이동"] a[href="#recovery"]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#recovery-heading')).toBeFocused();
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'recovery');

  await summary.focus();
  await page.keyboard.press('Enter');
  await tabTo('#garden');
  await expect(page.locator('nav[aria-label="장면 이동"] a[href="#garden"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(details).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
});
