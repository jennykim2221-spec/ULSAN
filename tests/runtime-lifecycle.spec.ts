import { test, expect } from '@playwright/test';

test('StrictMode and repeated rebuilds own one runtime/ticker and dispose all triggers', async ({ page }) => {
  test.skip(!process.env.ULSAN_TEST_DEV, 'Development-only lifecycle diagnostics');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#source');
  await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready', 'true');
  const snapshot = () => page.evaluate(() => {
    const debug = (window as unknown as { __ulsanScroll: { snapshot: () => { liveRuntimes: number; liveTickers: number; triggers: string[] } } }).__ulsanScroll;
    return debug.snapshot();
  });
  for (let i = 0; i < 3; i++) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'reduced');
    expect((await snapshot()).liveTickers).toBe(0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(page.locator('[data-motion-profile]')).toHaveAttribute('data-motion-profile', 'desktop');
    const state = await snapshot();
    expect(state.liveRuntimes).toBe(1);
    expect(state.liveTickers).toBe(1);
    expect(state.triggers).toHaveLength(14);
    expect(new Set(state.triggers).size).toBe(14);
  }
  await page.evaluate(() => (window as unknown as { __ulsanScroll: { dispose: () => void } }).__ulsanScroll.dispose());
  const state = await snapshot();
  expect(state.liveRuntimes).toBe(0);
  expect(state.liveTickers).toBe(0);
  expect(state.triggers).toHaveLength(0);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});
