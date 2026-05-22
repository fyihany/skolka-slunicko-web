import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CSS třída js-anim (přidána synchronně v <head>) nastavila opacity:0 na vše co bude
// animováno. Pokud uživatel preferuje reduced motion, třída nebyla přidána a nic nespouštíme.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  initHeroAnimations();
  initStaggerGrids();
  initTimeline();
  initFadeUps();
}

function initHeroAnimations() {
  // CSS .js-anim nastavilo opacity:0. Používáme gsap.set() pro Y/scale,
  // pak gsap.to() animuje DO přirozeného stavu (opacity:1, y:0 atd.)

  const heroContent = document.querySelector<HTMLElement>('[data-hero-content]');
  if (heroContent) {
    const label  = heroContent.querySelector<HTMLElement>('p:first-child');
    const h1     = heroContent.querySelector<HTMLElement>('h1');
    const desc   = heroContent.querySelector<HTMLElement>('.hero-desc');
    const btns   = Array.from(heroContent.querySelectorAll<HTMLElement>('.hero-btns > a'));
    const badges = Array.from(heroContent.querySelectorAll<HTMLElement>('.hero-badges > div'));

    if (label)         gsap.set(label,  { y: -12 });
    if (h1)            gsap.set(h1,     { y: 22 });
    if (desc)          gsap.set(desc,   { y: 15 });
    if (btns.length)   gsap.set(btns,   { y: 10 });
    if (badges.length) gsap.set(badges, { x: -10 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    if (label)         tl.to(label,  { opacity: 1, y: 0, duration: 0.45 });
    if (h1)            tl.to(h1,     { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    if (desc)          tl.to(desc,   { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    // clearProps:'transform' po dokončení — tlačítka mají Tailwind transition,
    // bez clearProps by GSAP zanechal inline transform a hover by "skočil"
    if (btns.length)   tl.to(btns,   { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, clearProps: 'transform' }, '-=0.2');
    if (badges.length) tl.to(badges, { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, clearProps: 'transform' }, '-=0.3');
  }

  const heroLogo = document.querySelector<HTMLElement>('[data-hero-logo]');
  if (heroLogo) {
    gsap.set(heroLogo, { scale: 0.82 });
    gsap.to(heroLogo, { opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.3)', delay: 0.35, clearProps: 'transform' });
  }

  // PageHero text (podstránky) — CSS skryl přímé děti, animujeme je do viditelna
  const pageHeroContent = document.querySelector<HTMLElement>('[data-page-hero-content]');
  if (pageHeroContent) {
    const children = Array.from(pageHeroContent.children) as HTMLElement[];
    if (children.length) {
      gsap.set(children, { y: 20 });
      gsap.to(children, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out', clearProps: 'transform' });
    }
  }

  const heroIcon = document.querySelector<HTMLElement>('[data-hero-icon]');
  if (heroIcon) {
    gsap.set(heroIcon, { scale: 0.65, rotation: -12 });
    gsap.to(heroIcon, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.5)', delay: 0.3, clearProps: 'transform' });
  }
}

function initStaggerGrids() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach(grid => {
    const children = Array.from(grid.children) as HTMLElement[];
    if (!children.length) return;

    // Kartičky mají Tailwind `transition` (včetně transform) — pokud by GSAP animoval Y,
    // CSS přechod by bojoval s GSAPem a kartičky by skákaly. Proto jen opacity.
    // fromTo() — explicitní from:0 i to:1, takže GSAP neodhaduje "přirozený stav" ze CSS.
    gsap.fromTo(children,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  });
}

function initTimeline() {
  const tl = document.querySelector<HTMLElement>('[data-timeline]');
  if (!tl) return;

  // X/Y transform na <li> nesmíme použít: GSAP transform mění "containing block"
  // pro absolutně pozicovaný badge s číslem (.absolute -left-3), který by jinak skočil.
  // Stačí čisté fade-in s lehkým staggerem.
  tl.querySelectorAll<HTMLElement>('li').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        duration: 0.45,
        delay: i * 0.04,
        ease: 'power2.out',
      }
    );
  });
}

function initFadeUps() {
  // data-fade-up je na wrapper divech nadpisů sekcí — ty nemají CSS transition,
  // Y animace je tedy bezpečná.
  document.querySelectorAll<HTMLElement>('[data-fade-up]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    );
  });
}
