import { test, expect, type Page } from '@playwright/test';
import { createRequire } from 'node:module';
import path from 'node:path';
const requireLocal=createRequire(path.join(process.cwd(),'package.json'));
const {PNG}=requireLocal(path.join(path.dirname(requireLocal.resolve('playwright-core/package.json')),'lib/utilsBundle.js')) as {PNG:{sync:{read:(b:Buffer)=>{data:Buffer;width:number;height:number}}}};
test.use({baseURL:'http://127.0.0.1:3000'});
async function go(page:Page,id:string,p:number){
 await page.locator(`#${id}`).evaluate((node,p)=>{const el=node as HTMLElement;scrollTo(0,Number(el.dataset.scrollStart)+p*(Number(el.dataset.scrollEnd)-Number(el.dataset.scrollStart)));},p);
 await page.waitForTimeout(1800);
}
function difference(a:Buffer,b:Buffer){
 const x=PNG.sync.read(a),y=PNG.sync.read(b);let pixels=0,edges=0;
 for(let i=0;i<x.data.length;i+=4){
   if(Math.abs(x.data[i]-y.data[i])+Math.abs(x.data[i+1]-y.data[i+1])+Math.abs(x.data[i+2]-y.data[i+2])>30)pixels++;
   const white=(v:Buffer)=>v[i]>160&&v[i+1]>160&&v[i+2]>160;
   if(white(x.data)!==white(y.data))edges++;
 }
 return {pixels,edges};
}
async function bend(page:Page,selector:string,name:string,text=true){
 const el=page.locator(selector).first();await expect(el).toBeVisible();
 const box=(await el.boundingBox())!;
 const clip={x:Math.max(0,box.x),y:Math.max(0,box.y),width:Math.min(box.width,page.viewportSize()!.width-Math.max(0,box.x)),height:Math.min(box.height,page.viewportSize()!.height-Math.max(0,box.y))};
 expect(clip.height).toBeGreaterThan(4);
 const before=await page.screenshot({clip,path:`.tools/content-distortion-qa/${name}-before.png`});
 const x=clip.x+Math.min(clip.width*.6,160), y=clip.y+clip.height*.5;
 await page.mouse.move(x-35,y-5);await page.mouse.move(x+50,y+8,{steps:12});
 await expect(page.locator('[data-global-ripple]')).toHaveAttribute('data-distorting','true');await page.waitForTimeout(90);
 const after=await page.screenshot({clip,path:`.tools/content-distortion-qa/${name}-after.png`});
 const diff=difference(before,after);
 console.log(name,diff);
 expect(diff.pixels).toBeGreaterThan(text?8:25);
 if(text)expect(diff.edges).toBeGreaterThan(5);
 const afterBox=(await el.boundingBox())!;expect(afterBox.x).toBeCloseTo(box.x,1);expect(afterBox.y).toBeCloseTo(box.y,1);
 await page.waitForTimeout(4000);
 await expect(page.locator('[data-distortion-surface]')).toHaveCSS('backdrop-filter','none');
 const recovered=await page.screenshot({clip,path:`.tools/content-distortion-qa/${name}-recovered.png`});
 if(text)expect(difference(before,recovered).pixels).toBeLessThan(10);
}
test('1440 actual typography/photo/video distortion, recovery and clickable UI',async({page})=>{
 test.setTimeout(180000);const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.setViewportSize({width:1440,height:900});await page.goto('/#intro');
 await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');
 await go(page,'intro',.59);
 const plain={x:50,y:180,width:240,height:180};
 const plainBefore=await page.screenshot({clip:plain,path:'.tools/content-distortion-qa/plain-before.png'});
 await page.mouse.move(80,240);await page.mouse.move(220,250,{steps:12});await page.waitForTimeout(90);
 const plainAfter=await page.screenshot({clip:plain,path:'.tools/content-distortion-qa/plain-after.png'});
 expect(plainAfter.equals(plainBefore)).toBe(false);
 await page.waitForTimeout(4000);
 await bend(page,'#intro [data-title-en]','ULSAN');
 await bend(page,'summary:has-text("CHAPTERS")','CHAPTERS');
 await go(page,'dead-river',.25);await bend(page,'#dead-river [data-chapter-label]','DEAD-RIVER');
 await go(page,'dead-river',.66);await bend(page,'[data-bod-value]','BOD-11.3');
 await go(page,'recovery',.08);await bend(page,'#recovery [data-title-en]','FLOWING-AGAIN');
 await go(page,'jangsaengpo',.5);await bend(page,'#jangsaengpo [data-photo-link]','large-photo',false);
 await page.mouse.move(800,450);await page.mouse.move(850,470,{steps:10});
 await expect(page.locator('[aria-hidden="true"] span').filter({hasText:'+ MORE'}).last()).toBeVisible();
 const link=page.locator('#jangsaengpo [data-photo-link]').first();const href=(await link.getAttribute('href'))!;
 await page.context().route(href,route=>route.fulfill({status:200,body:'Preserved official link'}));
 const popupPromise=page.waitForEvent('popup');await page.mouse.click(850,470);const popup=await popupPromise;await popup.waitForLoadState();expect(popup.url()).toBe(href);await popup.close();
 await go(page,'whale',.3);const video=page.locator('[data-whale-motion-video]');await expect(video).toHaveJSProperty('paused',false);
 await video.evaluate(v=>(v as HTMLVideoElement).pause());
 await bend(page,'[data-whale-motion-video]','whale-video-pixels',false);
 await video.evaluate(v=>(v as HTMLVideoElement).play());
 const time=await video.evaluate(v=>(v as HTMLVideoElement).currentTime);await page.waitForTimeout(500);
 expect(await video.evaluate(v=>(v as HTMLVideoElement).currentTime)).toBeGreaterThan(time);
 await page.mouse.move(500,400);await page.mouse.move(760,470,{steps:16});
 await expect(page.locator('[data-global-ripple]')).toHaveAttribute('data-distorting','true');
 await page.screenshot({path:'.tools/content-distortion-qa/whale-video.png'});
 await go(page,'intro',.8);await expect(page.locator('[data-intro-video] video')).toHaveJSProperty('paused',false);
 // The existing Taehwa ticker resumes paused media; hold its native rate at zero only for this pixel comparison.
 await page.locator('[data-intro-video] video').evaluate(v=>(v as HTMLVideoElement).playbackRate=0);
 await bend(page,'[data-intro-video] video','taehwa-video-pixels',false);
 await page.locator('[data-intro-video] video').evaluate(v=>(v as HTMLVideoElement).playbackRate=1);
 await page.mouse.move(500,430);await page.mouse.move(790,475,{steps:14});await page.screenshot({path:'.tools/content-distortion-qa/taehwa-video.png'});
 await go(page,'explore',.35);await bend(page,'#explore [data-title-en]','EXPLORE-ULSAN');
 const img=page.locator('#explore [data-selected="true"] img').first();await page.waitForTimeout(1600);
 await img.evaluate(el=>scrollTo(0,scrollY+el.getBoundingClientRect().top-150));await page.waitForTimeout(1600);
 await bend(page,'#explore [data-selected="true"] [data-photo-link]','explore-photo',false);
 await page.locator('summary').filter({hasText:'CHAPTERS'}).click();await page.locator('details a[href="#recovery"]').click();await expect(page.locator('#recovery-heading')).toBeFocused();
 await expect(page.locator('canvas')).toHaveCount(1);expect(await page.locator('[data-global-ripple-canvas]').evaluate(el=>(el as HTMLCanvasElement).width)).toBeLessThanOrEqual(512);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('canvas,[data-distortion-surface]')).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(page.locator('[data-distortion-surface]')).toHaveCount(1);
 expect(errors).toEqual([]);
});
for(const width of [1280,1600,1920])test(`${width} distortion layout/performance regression`,async({page})=>{
 test.setTimeout(60000);await page.setViewportSize({width,height:width===1280?720:900});await page.goto('/#intro');
 await expect(page.locator('#__ulsan-story')).toHaveAttribute('data-scroll-ready','true');await go(page,'intro',.59);
 await bend(page,'#intro [data-title-en]',`${width}-ULSAN`);
 const samples=page.evaluate(async()=>{
   const intervals:number[]=[];let previous=performance.now();
   for(let i=0;i<45;i++){await new Promise(requestAnimationFrame);const now=performance.now();intervals.push(now-previous);previous=now;}
   intervals.sort((a,b)=>a-b);return{mean:intervals.reduce((a,b)=>a+b,0)/intervals.length,p95:intervals[Math.floor(intervals.length*.95)]};
 });
 await page.mouse.move(450,350);await page.mouse.move(950,450,{steps:40});
 const perf=await samples;console.log(width,'active frame intervals ms',perf);
 expect(perf.mean).toBeLessThan(65);
 await expect(page.locator('canvas')).toHaveCount(1);
 expect(await page.locator('[data-global-ripple-canvas]').evaluate(el=>(el as HTMLCanvasElement).width)).toBeLessThanOrEqual(512);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
