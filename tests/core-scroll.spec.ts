import { test, expect, type Page } from '@playwright/test';
import { sceneOrder, riverNavDestinations } from '../src/data/scenes';

async function ready(page: Page, path = '/') {
  await page.goto(path);
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('[data-loading-overlay]')).toHaveCount(0);
}
async function seek(page: Page, id: string, p = .5) {
  await page.locator(`#${id}`).evaluate((el, p) => {
    const section = el as HTMLElement;
    const start = Number(section.dataset.scrollStart);
    const end = Number(section.dataset.scrollEnd);
    scrollTo(0, start + (end - start) * p);
  }, p);
  await page.waitForTimeout(180);
}

for (const viewport of [{ width: 1280, height: 720 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 2560, height: 1440 }]) {
  test(`All scenes forward/reverse and fast jumps ${viewport.width}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await ready(page);
    for (const id of sceneOrder) {
      for (const p of [0, .25, .5, .75, .99]) {
        await seek(page, id, p);
        await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', id);
      }
      if (viewport.width === 1440) {
        await seek(page, id, id === 'intro' ? .92 : id === 'ending' ? .98 : .25);
        await page.waitForTimeout(650);
        await page.screenshot({ path: `test-results/core-${id}.png` });
      }
    }
    for (const id of [...sceneOrder].reverse()) {
      await seek(page, id);
      await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', id);
    }
    for (const id of ['sea', 'source', 'night', 'history']) {
      await seek(page, id);
      await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', id);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('Keyboard navigation, history, resize, reduced motion and replay', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page, '/#source');
  await expect(page.locator('#source-heading')).toBeFocused();
  for (const id of riverNavDestinations) {
    const menu = page.getByRole('navigation', { name: '장면 이동', exact: true });
    await menu.locator('summary').focus();
    await page.keyboard.press('Enter');
    await menu.locator(`a[href="#${id}"]`).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(`#${id}-heading`)).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
  }
  await page.goBack();
  await expect(page.locator('#explore-heading')).toBeFocused();
  await page.goForward();
  await expect(page.locator('#night-heading')).toBeFocused();
  await seek(page, 'garden', .5);
  const position = await page.evaluate(() => {
    const el = document.getElementById('garden')!;
    const next = document.getElementById('whale')!;
    return (scrollY - Number(el.dataset.scrollStart)) / (Number(next.dataset.scrollStart) - Number(el.dataset.scrollStart));
  });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(700);
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'garden');
  const resizedPosition = await page.evaluate(() => (scrollY - Number(document.getElementById('garden')!.dataset.scrollStart)) / (Number(document.getElementById('whale')!.dataset.scrollStart) - Number(document.getElementById('garden')!.dataset.scrollStart)));
  expect(Math.abs(resizedPosition - position)).toBeLessThan(.02);
  await page.reload();
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene', 'garden');
  expect(position).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'reduced');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('#ending [data-title-en]')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'desktop');
  await seek(page, 'ending', .99);
  await page.waitForTimeout(700);
  await page.locator('#ending a[href="#intro"]').click();
  await expect(page).toHaveURL(/#intro$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
  await page.setViewportSize({ width: 320, height: 720 });
  await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'compact');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('Wheel scrolling, cursor keyboard fallback, jump cancellation and ending actions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page, '/#upper-stream');
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(400, 400);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-custom-cursor', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('#__ulsan-story')).not.toHaveAttribute('data-custom-cursor', 'true');
  const menu = page.getByRole('navigation', { name: '장면 이동', exact: true });
  await menu.locator('summary').click();
  await menu.locator('a[href="#night"]').click();
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(900);
  await expect(page.locator('#night-heading')).not.toBeFocused();
  await seek(page, 'ending', .999);
  await page.waitForTimeout(800);
  const actions = page.locator('[data-ending-actions]');
  await expect(actions.locator('a').first()).toBeVisible();
  const boxes = await actions.locator('a').evaluateAll(els => els.map(el => ({ x: el.getBoundingClientRect().x, right: el.getBoundingClientRect().right, y: el.getBoundingClientRect().y })));
  expect(boxes[1].y > boxes[0].y || boxes[1].x - boxes[0].right >= 16).toBe(true);
  await page.screenshot({ path: 'test-results/core-ending-actions.png' });
});

test('Loading timeout escape and critical image failure retain readable content', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.addInitScript(() => { HTMLImageElement.prototype.decode = () => new Promise(() => {}); });
  await page.goto('/');
  const button = page.getByRole('button', { name: /계속 보기/ });
  await expect(button).toBeVisible({ timeout: 8000 });
  await button.click();
  await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'reduced');
  await expect(page.locator('[data-loading-overlay]')).toHaveCount(0);
  expect(await page.locator('#__ulsan-story').evaluate(el => (el as HTMLElement).inert)).toBe(false);
  await ready(page, '/#recovery');
  await expect(page.locator('#recovery-heading')).toBeFocused();
  await context.close();
  const failed = await browser.newPage();
  await failed.addInitScript(() => { HTMLImageElement.prototype.decode = () => Promise.reject(new Error('test decode failure')); });
  await ready(failed);
  await expect(failed.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'reduced');
  await failed.close();
});
