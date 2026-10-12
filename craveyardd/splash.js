/*
 * CraveYardd logo intro – used by the main site and every concept.
 * Include right after <body>:  <script src="splash.js" data-theme="light|dark"></script>  (path relative to the page)
 *
 * About 4 seconds: the logo pops in with a bounce, sparkles burst out, a ring pulses,
 * a progress bar fills, then the screen closes in a circle to reveal the page.
 * - "Skip intro" button (and Esc) end it early.
 * - Visitors with "reduce motion" get a short fade with no movement.
 * - Pages can wait for it:  window.CraveSplash.done.then(startHeroAnimation)
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var theme = (script && script.getAttribute('data-theme')) || 'light';
  var logoUrl = new URL('assets/logo.webp', script ? script.src : location.href).href;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HOLD = reduce ? 1200 : 3300;   // time before the exit starts
  var EXIT = reduce ? 400 : 700;

  var resolveDone;
  window.CraveSplash = { done: new Promise(function (r) { resolveDone = r; }) };

  var css = [
    '.cy-splash{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;overflow:hidden;',
    '  background:radial-gradient(circle at 50% 45%,#FFFFFF 0%,#FFE3EE 38%,#FFC9DF 78%);clip-path:circle(150% at 50% 50%)}',
    '.cy-splash[data-theme=dark]{background:radial-gradient(circle at 50% 45%,#6B3A32 0%,#3D201B 40%,#2A1512 80%)}',
    '.cy-stage{position:relative;display:grid;place-items:center;width:min(86vw,460px)}',
    '.cy-logo{position:relative;z-index:2;width:100%;height:auto;transform-origin:50% 60%;',
    '  animation:cy-pop .95s cubic-bezier(.34,1.56,.64,1) both, cy-bob 2.4s ease-in-out .95s infinite;',
    '  filter:drop-shadow(0 18px 30px rgba(194,24,91,.35))}',
    '.cy-ring{position:absolute;z-index:1;width:62%;aspect-ratio:1;border-radius:50%;border:3px solid #FF3D8B;opacity:0;',
    '  animation:cy-ring 1.8s ease-out .35s infinite}',
    '.cy-ring.r2{animation-delay:1.25s}',
    '.cy-spark{position:absolute;z-index:3;left:50%;top:50%;width:var(--s,18px);height:var(--s,18px);margin:calc(var(--s,18px)/-2);',
    '  color:var(--c,#FF3D8B);opacity:0;animation:cy-burst 1.3s cubic-bezier(.2,.8,.2,1) var(--d,.45s) both}',
    '.cy-spark svg{width:100%;height:100%;display:block}',
    '.cy-bar{position:absolute;left:50%;bottom:calc(-6vh - 10px);width:min(52vw,220px);height:6px;margin-left:calc(min(52vw,220px)/-2);',
    '  border-radius:6px;background:rgba(194,24,91,.18);overflow:hidden}',
    '.cy-bar i{display:block;height:100%;background:linear-gradient(90deg,#FF3D8B,#C2185B);border-radius:6px;transform-origin:0 50%;',
    '  animation:cy-fill ' + (HOLD / 1000) + 's linear both}',
    '.cy-splash[data-theme=dark] .cy-bar{background:rgba(255,201,223,.2)}',
    '.cy-skip{position:absolute;top:calc(14px + env(safe-area-inset-top));right:14px;min-height:44px;padding:0 18px;border:0;border-radius:999px;',
    '  background:rgba(255,255,255,.8);color:#5A302A;font:600 14px/1 system-ui,sans-serif;cursor:pointer}',
    '.cy-splash[data-theme=dark] .cy-skip{background:rgba(255,255,255,.12);color:#FFF9F4}',
    '.cy-skip:focus-visible{outline:3px solid #C2185B;outline-offset:3px}',
    '.cy-splash.cy-out{animation:cy-iris ' + EXIT + 'ms cubic-bezier(.7,0,.3,1) forwards}',
    '.cy-splash.cy-out .cy-stage{animation:cy-shrink ' + EXIT + 'ms cubic-bezier(.7,0,.3,1) forwards}',
    '@keyframes cy-pop{0%{opacity:0;transform:scale(.2) rotate(-12deg)}60%{opacity:1;transform:scale(1.08) rotate(3deg)}80%{transform:scale(.97) rotate(-1deg)}100%{opacity:1;transform:scale(1) rotate(0)}}',
    '@keyframes cy-bob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-8px) rotate(1.5deg)}}',
    '@keyframes cy-ring{0%{opacity:.55;transform:scale(.6)}100%{opacity:0;transform:scale(1.9)}}',
    '@keyframes cy-burst{0%{opacity:0;transform:translate(0,0) scale(0) rotate(0)}25%{opacity:1}70%{opacity:1;transform:translate(var(--x),var(--y)) scale(1) rotate(var(--r,90deg))}100%{opacity:0;transform:translate(calc(var(--x)*1.15),calc(var(--y)*1.15)) scale(.6) rotate(var(--r,90deg))}}',
    '@keyframes cy-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}',
    '@keyframes cy-iris{to{clip-path:circle(0% at 50% 50%)}}',
    '@keyframes cy-shrink{to{transform:scale(.6);opacity:0}}',
    '@keyframes cy-fade{from{opacity:0}to{opacity:1}}',
    '@keyframes cy-fadeout{to{opacity:0}}',
    '@media (prefers-reduced-motion:reduce){',
    '  .cy-logo{animation:cy-fade .4s ease both}.cy-ring,.cy-spark{display:none}.cy-bar i{animation:none;transform:none}',
    '  .cy-splash.cy-out{animation:cy-fadeout ' + EXIT + 'ms ease forwards}.cy-splash.cy-out .cy-stage{animation:none}}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var heart = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-9-5.5-9-11.7A4.8 4.8 0 0 1 12 6.8a4.8 4.8 0 0 1 9 2.5C21 15.5 12 21 12 21z"/></svg>';
  var spark = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1c.7 5.4 2.8 8.6 11 11-8.2 2.4-10.3 5.6-11 11-.7-5.4-2.8-8.6-11-11 8.2-2.4 10.3-5.6 11-11z"/></svg>';
  var bursts = [
    [-150, -95, 22, '#FF3D8B', heart], [150, -105, 18, '#C2185B', spark], [-185, 20, 16, '#FFC9DF', spark], [190, 35, 22, '#FF3D8B', heart],
    [-120, 120, 18, '#C2185B', heart], [125, 125, 16, '#FF3D8B', spark], [0, -150, 20, '#FF3D8B', spark], [-30, 160, 14, '#5A302A', spark],
    [-230, -40, 12, '#FF3D8B', spark], [235, -50, 14, '#FFC9DF', heart]
  ];
  var sparks = bursts.map(function (b, i) {
    return '<span class="cy-spark" style="--x:' + b[0] + 'px;--y:' + b[1] + 'px;--s:' + b[2] + 'px;--c:' + b[3] + ';--d:' + (0.4 + (i % 4) * 0.08) + 's;--r:' + (i % 2 ? -1 : 1) * (60 + i * 12) + 'deg">' + b[4] + '</span>';
  }).join('');

  var el = document.createElement('div');
  el.className = 'cy-splash';
  el.setAttribute('data-theme', theme);
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', 'Loading CraveYardd');
  el.innerHTML =
    '<div class="cy-stage">' +
      '<span class="cy-ring" aria-hidden="true"></span><span class="cy-ring r2" aria-hidden="true"></span>' +
      '<img class="cy-logo" src="' + logoUrl + '" alt="CraveYardd – Where Every Craving Meets Its Match" width="480" height="238" fetchpriority="high">' +
      '<span aria-hidden="true">' + sparks + '</span>' +
      '<span class="cy-bar" aria-hidden="true"><i></i></span>' +
    '</div>' +
    '<button type="button" class="cy-skip">Skip intro</button>';
  document.body.insertBefore(el, document.body.firstChild);

  var root = document.documentElement;
  var prevOverflow = root.style.overflow;
  root.style.overflow = 'hidden';

  var finished = false, timer;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    document.removeEventListener('keydown', onKey);
    el.classList.add('cy-out');
    root.style.overflow = prevOverflow;
    resolveDone();
    window.dispatchEvent(new Event('crave:splash-done'));
    setTimeout(function () {
      el.remove();
      window.dispatchEvent(new Event('resize')); // let scroll-driven animations re-measure
    }, EXIT + 30);
  }
  function onKey(e) { if (e.key === 'Escape') finish(); }

  el.querySelector('.cy-skip').addEventListener('click', finish);
  document.addEventListener('keydown', onKey);
  // Wait for the logo before starting the clock, but never longer than 1.5s.
  var logo = el.querySelector('.cy-logo');
  var started = false;
  function start() { if (started) return; started = true; timer = setTimeout(finish, HOLD); }
  if (logo.complete) start(); else { logo.addEventListener('load', start); logo.addEventListener('error', start); setTimeout(start, 1500); }
})();
