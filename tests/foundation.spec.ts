import { test, expect } from '@playwright/test';
import { scenes } from '../src/data/scenes';
import { assets } from '../src/data/assets';

for (const viewport of [{ width: 1280, height: 720 }, { width: 1440, height: 900 }, { width: 320, height: 720 }, { width: 640, height: 360 }]) {
  test(`Static reading without JS at ${viewport.width}x${viewport.height}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3100');
    await expect(page.locator('[data-scene]')).toHaveCount(14);
    expect(await page.locator('[data-scene]').evaluateAll(nodes => nodes.map(n => n.id))).toEqual(scenes.map(s => s.id));
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('[data-asset-status="hold"], [data-asset-status="reserve"], canvas')).toHaveCount(0);
    for (const heading of await page.locator('h1,h2').all()) await expect(heading).toBeVisible();
    for (const detail of await page.locator('#explore details').all()) {
      await detail.locator('summary').click();
      await expect(detail.locator('dl')).toBeVisible();
      await expect(detail.locator('a[target="_blank"]')).toBeVisible();
    }
    const overflow = await page.locator('main').evaluate(root => {
      const width = document.documentElement.clientWidth;
      return [...root.querySelectorAll<HTMLElement>('h1,h2,p,figure,summary,dd,a')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width && (r.left < -1 || r.right > width+1 || el.scrollWidth > el.clientWidth+1);
      }).map(el => `${el.tagName}: ${el.textContent?.slice(0,70)}`);
    });
    expect(overflow).toEqual([]);
    for (const figure of await page.locator('figure[data-asset-id]').all()) {
      // Phase 3 TODAY has a decorative mono duplicate, hidden in reading mode.
      if (await figure.evaluate(el => !!el.closest('[aria-hidden="true"]'))) continue;
      const id = await figure.getAttribute('data-asset-id');
      const asset = assets.find(a=>a.id===id)!;
      const box = await figure.boundingBox();
      expect(box!.width).toBeLessThanOrEqual(Math.min(asset.width, asset.maxCssWidth)+1);
      expect(Math.abs(box!.width/box!.height-asset.width/asset.height)).toBeLessThan(.02);
    }
    await page.locator('#intro').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/foundation-${viewport.width}.png` });
    await context.close();
  });
}

test('Served assets match manifest paths; hydrated page has no errors', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready', 'true');
  await expect(page.locator('[data-loading-overlay]')).toHaveCount(0);
  for (const asset of assets) {
    const response = await request.get(`/assets/images/${encodeURIComponent(asset.filename)}`);
    expect(response.status(), asset.filename).toBe(200);
    expect((await response.body()).length).toBe(asset.bytes);
  }
  await page.keyboard.press('Tab');
  await expect(page.locator('.skipLink')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('#intro a[href="#source"]')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#ending')).toContainText('AND SO DOES ULSAN.');
  await expect(page.locator('#dead-river figure')).not.toContainText('1996');
  expect(errors).toEqual([]);
});
