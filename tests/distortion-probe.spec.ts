import { test, expect } from '@playwright/test';
test('browser backdrop displacement probe',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.setContent(`<body style="margin:0;background:#071a2b;color:white;font:100px sans-serif"><p style="margin:100px">ULSAN CHAPTERS 11.3</p><div style="width:100%;height:400px;background:repeating-linear-gradient(90deg,#fff 0 10px,#071a2b 10px 40px)"></div><svg width="0" height="0" style="position:absolute"><filter id="warp" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence baseFrequency=".014" numOctaves="1" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="55" xChannelSelector="R" yChannelSelector="G"/></filter></svg><div id="surface" style="position:fixed;inset:0;pointer-events:none"></div></body>`);
 const before=await page.screenshot({path:'.tools/backdrop-before.png'});
 await page.locator('#surface').evaluate(el=>(el as HTMLElement).style.backdropFilter='url(#warp)');
 const after=await page.screenshot({path:'.tools/backdrop-after.png'});
 expect(after.equals(before)).toBe(false);
});
