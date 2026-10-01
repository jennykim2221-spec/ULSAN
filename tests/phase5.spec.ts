import { test, expect, type Page } from '@playwright/test';

async function seek(page: Page, id: string, progress: number) {
  await page.locator(`#${id}`).evaluate((node, p) => {
    const el = node as HTMLElement;
    scrollTo(0, Number(el.dataset.scrollStart) + p * (Number(el.dataset.scrollEnd) - Number(el.dataset.scrollStart)));
  }, progress);
  await page.waitForTimeout(800);
}

test('Phase 5 1440 continuous garden-to-sea journey, whale motion, reverse and navigation', async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('/#garden');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready', 'true');
  for (const id of ['garden', 'whale', 'jangsaengpo', 'sea']) await expect(page.locator(`#${id}`)).toHaveAttribute('data-pinned', 'true');
  await expect(page.locator('#garden [data-asset-id="garden-4"] img')).toHaveJSProperty('naturalWidth', 812);
  await seek(page, 'garden', .9);
  await expect(page.locator('[data-bamboo-title]')).toHaveCSS('opacity', '1');
  await page.screenshot({ path: '.tools/phase5-qa/1440-bamboo-to-whale.png' });
  await page.mouse.wheel(0, 1400); await page.waitForTimeout(1100);
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'whale');
  await seek(page, 'whale', .08);
  await expect(page.locator('[data-whale-video]')).toBeVisible();
  await seek(page, 'whale', .32);
  await expect(page.locator('#whale canvas, #whale svg')).toHaveCount(0);
  await seek(page, 'whale', .53);
  const whale = page.locator('[data-whale-video]');
  await expect(whale).toBeVisible();
  await expect(whale).toHaveCSS('transform', 'none');
  await expect(page.locator('[data-whale-motion-video]')).toHaveJSProperty('paused', false);
  await page.screenshot({ path: '.tools/phase5-qa/1440-whale-formation.png' });
  await seek(page, 'whale', .75);
  await expect(whale).toHaveCSS('transform', 'none');
  await page.screenshot({ path: '.tools/phase5-qa/1440-whale-swim.png' });
  await expect(page.locator('#whale')).toContainText("THE WHALE SWIMS THROUGH ULSAN'S TIME.");
  await seek(page, 'jangsaengpo', .65);
  await expect(page.locator('#jangsaengpo [data-asset-id="jangsaengpo-1"] img')).toHaveJSProperty('naturalWidth', 710);
  await expect(page.locator('#jangsaengpo [data-jang-title]')).toBeVisible();
  await page.screenshot({ path: '.tools/phase5-qa/1440-jangsaengpo.png' });
  await seek(page, 'sea', .35);
  await page.screenshot({ path: '.tools/phase5-qa/1440-port.png' });
  for (const [id, width] of [['port-1',800],['port-2',536],['port-3',455]]) {
    await expect(page.locator(`#sea [data-asset-id="${id}"] img`)).toHaveJSProperty('naturalWidth', width);
  }
  await seek(page, 'sea', .56);
  for (const id of ['port-2', 'port-3']) {
    expect(Number(await page.locator(`#sea [data-port-image="${id}"]`).evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(.5);
  }
  await page.screenshot({ path: '.tools/phase5-qa/1440-port-structure.png' });
  await seek(page, 'sea', .98);
  await expect(page.locator('#sea [data-sea-title]')).toHaveCSS('opacity', '1');
  await page.screenshot({ path: '.tools/phase5-qa/1440-sea.png' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.body.scrollWidth <= innerWidth)).toBe(true);

  // Native wheel input checks that the existing smooth scroll and Phase 5 scrub stay in sync.
  await seek(page, 'garden', .88);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 1600); await page.waitForTimeout(900);
  const forward = await page.evaluate(() => scrollY);
  expect(forward).toBeGreaterThan(before + 600);
  await page.mouse.wheel(0, -1600); await page.waitForTimeout(1000);
  expect(await page.evaluate(() => scrollY)).toBeLessThan(forward - 600);

  await page.locator('summary').filter({ hasText: 'CHAPTERS' }).click();
  await page.locator('details a[href="#whale"]').click();
  await expect(page.locator('#whale-heading')).toBeFocused();
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'whale');
  await expect(page.locator('#sea [data-asset-id="port-1"] img')).toHaveJSProperty('naturalWidth', 800);
  await expect(whale).toHaveCSS('pointer-events', 'none');
  expect(errors).toEqual([]);
});

for (const width of [1280, 1600, 1920]) {
  test(`Phase 5 responsive composition ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#whale');
    await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready', 'true');
    await page.locator('#sea').evaluate(el => scrollTo(0, Number((el as HTMLElement).dataset.readingY)));
    await page.waitForTimeout(800);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('#sea [data-asset-id="port-1"] img')).toHaveJSProperty('naturalWidth', 800);
    await expect(page.locator('#sea [data-port-image="port-1"]')).toBeVisible();
  });
}

test('Phase 5 reduced motion keeps whale and story content without WebGL', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#whale');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('#whale [data-whale-motion-video]')).toBeVisible();
  await expect(page.locator('#whale canvas')).toHaveCount(0);
  await expect(page.locator('#jangsaengpo [data-asset-id="jangsaengpo-1"] img')).toHaveJSProperty('naturalWidth', 710);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('[data-whale-viewport]')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('#whale canvas')).toHaveCount(0);
});
