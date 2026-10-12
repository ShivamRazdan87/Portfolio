/*
 * CraveYardd — GSAP animations
 * Runs after the page content (menu, favourites, gallery) has been built from data.js.
 * Respects "reduce motion" and leaves everything visible if GSAP fails to load.
 */
(function () {
  'use strict';
  var root = document.documentElement;

  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('anim'); return; }
  gsap.registerPlugin(ScrollTrigger);

  // Header shadow once the page has scrolled.
  var header = document.querySelector('.site-header');
  ScrollTrigger.create({
    start: 'top -10',
    onToggle: function (self) { header.classList.toggle('scrolled', self.isActive); }
  });

  // Split the hero headline into words (keeps the pink accent span) for a staggered rise.
  function splitWords(el) {
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var wrap = document.createElement('span'); wrap.className = 'w-wrap';
          var w = document.createElement('span'); w.className = 'w'; w.textContent = part;
          wrap.appendChild(w); frag.appendChild(wrap);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        splitWords(node);
      }
    });
  }

  var mm = gsap.matchMedia();

  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 960px)'
  }, function (ctx) {
    var c = ctx.conditions;
    root.classList.add('anim-ready');

    if (c.reduce) { root.classList.remove('anim'); return; }

    /* ---------- Hero intro ---------- */
    var title = document.getElementById('hero-title');
    if (title && !title.querySelector('.w')) {
      title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
      splitWords(title);
      title.querySelectorAll('.w-wrap').forEach(function (n) { n.setAttribute('aria-hidden', 'true'); });
    }

    var heroImg = document.querySelector('.hero-media img');
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero .drip', { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 0%' },
              { autoAlpha: 1, scaleY: 1, duration: 0.9, ease: 'power2.out' }, 0);
    if (heroImg) {
      tl.fromTo(heroImg, { autoAlpha: 0, scale: 1.18 }, { autoAlpha: 1, scale: 1.08, duration: 1.6, ease: 'power2.out' }, 0);
    }
    tl.fromTo('.hero-copy .eyebrow', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.25)
      .set(title, { autoAlpha: 1 }, 0.35)
      .from('#hero-title .w', { yPercent: 115, rotate: 6, duration: 0.9, stagger: 0.07 }, 0.35)
      .fromTo('.hero-sub', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.45')
      .fromTo('.hero-ctas', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, '-=0.4')
      .from('.hero-ctas .btn', { y: 26, autoAlpha: 0, scale: 0.94, duration: 0.6, stagger: 0.09, ease: 'back.out(1.7)' }, '<')
      .fromTo('.hero-chip', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.2')
      .fromTo('.hero-copy .sparkle', { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(3)' }, '-=0.5')
      .add(function () { root.classList.remove('anim'); });

    // Sparkles and heart gently float forever.
    gsap.to('.hero-copy .sparkle', {
      y: -8, rotate: 14, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
      stagger: { each: 0.8 }, delay: 1.8
    });

    // Hero photo drifts slower than the page (parallax).
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: c.desktop ? 6 : 4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* ---------- Scroll reveals ---------- */
    var EASE = 'power3.out';

    // Section headings, text blocks and single panels: rise in, children one after another.
    gsap.utils.toArray('.section-head, .about-copy, .find-card').forEach(function (el) {
      gsap.from(el.children, {
        y: 34, autoAlpha: 0, duration: 0.8, ease: EASE, stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // Remaining simple panels.
    gsap.utils.toArray('.reveal:not([data-anim]):not(.section-head):not(.about-copy):not(.find-card):not(.menu-cat)').forEach(function (el) {
      gsap.from(el, {
        y: 40, autoAlpha: 0, duration: 0.9, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    // Favourite cards: lift in as a group.
    gsap.set('.fav-card', { autoAlpha: 0 });
    ScrollTrigger.batch('.fav-card', {
      start: 'top 90%', once: true,
      onEnter: function (batch) {
        gsap.fromTo(batch, { y: 70, autoAlpha: 0, rotate: 1.5 },
          { y: 0, autoAlpha: 1, rotate: 0, duration: 0.9, ease: EASE, stagger: 0.1, overwrite: true });
      }
    });

    // Menu: category cards in turn, then their items slide in.
    gsap.utils.toArray('.menu-cat').forEach(function (cat) {
      var t = gsap.timeline({ scrollTrigger: { trigger: cat, start: 'top 88%', once: true } });
      t.from(cat, { y: 40, autoAlpha: 0, duration: 0.7, ease: EASE })
       .from(cat.querySelectorAll('.menu-item, .chips li'), { x: -14, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: EASE }, '-=0.35');
    });
    gsap.from('.cat-nav a', {
      y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: EASE,
      scrollTrigger: { trigger: '.cat-nav', start: 'top 92%', once: true }
    });

    // About photos: wipe up like a curtain.
    gsap.fromTo('#story figure',
      { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.1, ease: 'power4.out', stagger: 0.15,
        scrollTrigger: { trigger: '#story', start: 'top 82%', once: true } });

    // Events: chocolate drip, occasions pop like sprinkles, form slides in.
    gsap.from('.events .drip', {
      scaleY: 0, transformOrigin: '50% 100%', duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.events', start: 'bottom 98%', once: true }
    });
    gsap.from('.occasions li', {
      scale: 0.6, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(2.2)',
      scrollTrigger: { trigger: '.occasions', start: 'top 90%', once: true }
    });

    // Instagram gallery tiles, social cards and contact rows.
    gsap.utils.toArray('[data-anim="stagger"]:not(.fav-track):not(.story)').forEach(function (group) {
      gsap.from(group.children, {
        y: 36, scale: 0.94, autoAlpha: 0, duration: 0.7, ease: EASE,
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: group, start: 'top 88%', once: true }
      });
    });

    // Footer logo bounces in.
    gsap.from('.foot-logo', {
      y: 30, scale: 0.85, autoAlpha: 0, duration: 0.9, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.site-footer', start: 'top 92%', once: true }
    });

    // Buttons squish slightly on press (pointer devices).
    function press(e) { gsap.to(e.currentTarget, { scale: 0.96, duration: 0.12 }); }
    function release(e) { gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }); }
    var btns = document.querySelectorAll('.btn');
    btns.forEach(function (b) {
      b.addEventListener('pointerdown', press);
      b.addEventListener('pointerup', release);
      b.addEventListener('pointerleave', release);
    });

    return function () {
      btns.forEach(function (b) {
        b.removeEventListener('pointerdown', press);
        b.removeEventListener('pointerup', release);
        b.removeEventListener('pointerleave', release);
      });
    };
  });

  // Recalculate trigger positions once images and the map have loaded.
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
