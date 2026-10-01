import gsap from 'gsap';

export function historyMotion(root: HTMLElement) {
  const frames = [...root.querySelectorAll<HTMLElement>('[data-history-frame]')];
  const timeline = gsap.timeline({ defaults: { ease: 'none' } });
  gsap.set(frames, { opacity: 0, y: 64, clipPath: 'inset(0 0 100% 0)' });
  frames.forEach((frame, i) => {
    const at = i === 0 ? 0 : .08 + i * .16;
    timeline.to(frame, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .09, ease: 'power2.out' }, at);
    timeline.to(frame, { y: -18, duration: .13 }, at + .09);
    if (i < frames.length - 1) {
      timeline.to(frame, { opacity: .18, x: i % 2 ? -28 : 28, duration: .06 }, at + .16);
      timeline.to(frame, { opacity: 0, duration: .045 }, at + .24);
    }
  });
  timeline.fromTo(root.querySelector('[data-title-en]'), { x: 38 }, { x: 0, duration: .2 }, 0);
  timeline.to(root.querySelector('[data-scene-inner]'), { backgroundColor: '#050607', duration: .12 }, .88);
  timeline.to({}, { duration: 1 }, 0);
  return timeline;
}
const ramp = (v: number, a: number, b: number) => gsap.utils.clamp(0, 1, (v-a)/(b-a));
const smooth = (v: number) => v*v*(3-2*v);

/** Existing scene timeline owns all motion. Measurements happen only at refresh. */
export function industryMotion(root: HTMLElement) {
  const get = (s: string) => root.querySelector<HTMLElement>(s)!;
  const track=get('[data-archive-track]'), stage=get('[data-pin-stage]');
  const tower=get('[data-archive-item="monument"]');
  const old=get('[data-tower-old]'), current=get('[data-tower-new]');
  const surface=get('[data-today-surface]'), image=get('[data-today-image]');
  const title=get('[data-today-title]'), shade=get('[data-today-shade]');
  const mono=get('[data-today-mono]'), line=get('[data-exhibition-line]');
  const panels=[...track.querySelectorAll<HTMLElement>('[data-archive-item]')];
  const progress={value:0};
  let overflow=0, lead=0, hold=0, tail=0, total=1, stop=0;
  let w=0,h=0,left=0,top=0,titleY=0;
  gsap.set(track,{x:0});
  gsap.set(old,{opacity:1,filter:'blur(0px)'});
  gsap.set(current,{opacity:0,filter:'grayscale(1)'});
  gsap.set(surface,{x:0,y:0,width:'100%',height:'100%'});
  gsap.set(title,{x:0,y:0,scale:1,letterSpacing:'.02em',opacity:1});
  gsap.set(mono,{clipPath:'inset(0% 0% 0% 0%)'});
  gsap.set(shade,{opacity:0});
  gsap.set(surface,{filter:'saturate(1) brightness(1)'});
  gsap.set(get('[data-archive-grain]'),{opacity:0});
  gsap.set(get('[data-scene-copy]'),{opacity:1,y:0});
  gsap.set(line,{scaleX:0,transformOrigin:'left',color:'#8ed8c6'});
  panels.slice(0,-1).forEach(p=>gsap.set(p,{opacity:1}));
  const set=(el:HTMLElement,prop:string,unit?:string)=>gsap.quickSetter(el,prop,unit);
  const x=set(track,'x','px'),oldAlpha=set(old,'opacity'),newAlpha=set(current,'opacity');
  const blur=set(old,'filter'),gray=set(current,'filter'),grain=set(get('[data-archive-grain]'),'opacity');
  const sx=set(surface,'x','px'),sy=set(surface,'y','px'),sw=set(surface,'width','px'),sh=set(surface,'height','px');
  const ty=set(title,'y','px'),tsX=set(title,'scaleX'),tsY=set(title,'scaleY'),spacing=set(title,'letterSpacing','em');
  const titleAlpha=set(title,'opacity'),overlay=set(shade,'opacity'),clip=set(mono,'clipPath');
  const nightLight=set(surface,'filter');
  const lineScale=set(line,'scaleX'),copyAlpha=set(get('[data-scene-copy]'),'opacity'),copyY=set(get('[data-scene-copy]'),'y','px');
  const panelAlpha=panels.slice(0,-1).map(p=>set(p,'opacity'));
  function render(){
    const local=progress.value*total;
    const travel=local-lead;
    const distance=gsap.utils.clamp(0,overflow,travel-Math.min(hold,Math.max(0,travel-stop)));
    x(-distance);lineScale(progress.value);
    copyAlpha(1-ramp(local,0,lead));copyY(-28*ramp(local,0,lead));
    const p=ramp(travel,stop,stop+hold);
    oldAlpha(1-smooth(ramp(p,.18,.8)));newAlpha(smooth(ramp(p,.18,.8)));
    blur(`blur(${1.3*Math.sin(Math.PI*p)}px)`);
    gray(`grayscale(${1-smooth(ramp(p,.5,1))})`);
    grain(.2*Math.sin(Math.PI*p));
    const reveal=smooth(ramp(local,lead+overflow+hold,lead+overflow+hold+tail));
    const settle=smooth(ramp(local,lead+overflow+hold+tail,total));
    sx(-left*reveal);sy(-top*reveal);
    sw(w+(innerWidth-w)*reveal);sh(h+(innerHeight-h)*reveal);
    clip(`inset(0% 0% 0% ${reveal*100}%)`);
    ty(titleY*reveal);tsX(1+.35*reveal);tsY(1+.35*reveal);spacing(.02+.05*reveal);
    titleAlpha(1-settle);overlay(.24*reveal+.76*settle);
    // Only the existing post-climax tail changes: the city loses color/light
    // before the next black scene receives the historical river photograph.
    nightLight(`saturate(${1-settle}) brightness(${1-.55*settle})`);
    panelAlpha.forEach(setter=>setter(1-ramp(reveal,0,.35)));
  }
  function measure(){
    overflow=Math.max(0,track.scrollWidth-stage.clientWidth);
    lead=innerHeight*.5;hold=innerHeight*1.4;tail=innerHeight*2;
    total=lead+overflow+hold+tail+innerHeight*.8;
    stop=Math.max(0,tower.offsetLeft+tower.offsetWidth/2-stage.clientWidth/2);
    // Surface is absolute: expansion cannot change the track's measured width.
    const box=image.getBoundingClientRect(), stageBox=stage.getBoundingClientRect();
    const trackX=new DOMMatrix(getComputedStyle(track).transform).m41;
    w=image.clientWidth;h=image.clientHeight;
    left=box.left-stageBox.left-trackX-overflow;top=box.top-stageBox.top;
    titleY=innerHeight*.12-(title.offsetTop+top-image.offsetTop);
    root.dataset.archiveOverflow=String(overflow);root.dataset.towerStop=String(stop);root.dataset.towerHold=String(hold);
    render();
  }
  measure();
  const timeline=gsap.timeline().to(progress,{value:1,duration:1,ease:'none',onUpdate:render});
  return {timeline,measure,overflow:()=>overflow,cleanup:()=>{
    delete root.dataset.archiveOverflow;delete root.dataset.towerStop;delete root.dataset.towerHold;
  }};
}
