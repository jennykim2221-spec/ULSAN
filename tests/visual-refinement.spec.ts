import { test, expect } from '@playwright/test';

for (const [width,height] of [[1280,720],[1440,900],[1600,900],[1920,1080]]) {
  test(`Intro visual sequence and chapter jumps ${width}`,async({page})=>{
    await page.setViewportSize({width,height});
    const errors:string[]=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    await page.goto('/');
    await expect(page.locator('[data-scroll-ready]')).toHaveAttribute('data-scroll-ready','true');
    await expect(page.locator('[data-loading-overlay]')).toHaveCount(0);
    const seek=async(p:number)=>{
      await page.locator('#intro').evaluate((el,p)=>scrollTo(0,Number((el as HTMLElement).dataset.scrollStart)+p*(Number((el as HTMLElement).dataset.scrollEnd)-Number((el as HTMLElement).dataset.scrollStart))),p);
      await page.waitForTimeout(900);
    };
    await seek(0);
    const dot=(await page.locator('#intro [data-river-drop]').boundingBox())!;
    expect(Math.abs(dot.x+dot.width/2-width/2)).toBeLessThan(2);
    expect(Math.abs(dot.y+dot.height/2-height/2)).toBeLessThan(2);
    expect(dot.width).toBeGreaterThanOrEqual(18);
    await expect(page.locator('#intro [data-title-en]')).toHaveCSS('opacity','0');
    await page.screenshot({path:`.tools/phase3-qa/intro-dot-${width}.png`});
    await seek(.58);
    const river=(await page.locator('#intro [data-river-path]').boundingBox())!;
    expect(river.height).toBeGreaterThan(height*.75);
    expect(river.width).toBeGreaterThan(width*.2);
    await page.screenshot({path:`.tools/phase3-qa/intro-river-${width}.png`});
    await seek(.95);
    await expect(page.locator('#intro [data-title-en]')).toHaveCSS('opacity','1');
    await page.screenshot({path:`.tools/phase3-qa/intro-title-${width}.png`});
    await seek(0);
    await expect(page.locator('#intro [data-river-drop]')).toHaveCSS('opacity','1');
    for(const id of ['industry','history','dead-river','industry']){
      await page.locator('summary').filter({hasText:'CHAPTERS'}).click();
      await page.locator(`nav[aria-label="장면 이동"] a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}-heading`)).toBeFocused();
      await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-active-scene',id);
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    for(const selector of ['#intro [data-title-en]','[data-tower-old]','[data-tower-new]','[data-today-title]']) await expect(page.locator(selector)).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
