/*
 * RotatingBadge for plain HTML pages – produces the same SVG as
 * _app/src/components/RotatingBadge.tsx (the React + TypeScript version).
 *
 * Usage:
 *   <span data-rotating-badge data-text="CRAVEYARDD ✦ SELLY OAK ✦ " data-center="CY"
 *         data-color="#FF3D8B" data-size="160" data-duration="24" data-reverse></span>
 *   <script src="../rotating-badge.js"></script>
 * Optional: data-logo="../../assets/logo.webp" shows an image instead of the monogram.
 */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var CX = 66, CY = 66, R = 50, CIRCUMFERENCE = 314, INNER = 33;
  var count = 0;

  if (!document.getElementById('rotating-badge-css')) {
    var style = document.createElement('style');
    style.id = 'rotating-badge-css';
    style.textContent =
      '@keyframes rotating-badge-spin{to{transform:rotate(360deg)}}' +
      '.rotating-badge{display:inline-block;flex:none;overflow:visible;-webkit-user-select:none;user-select:none}' +
      '.rotating-badge .rb-spin{transform-box:view-box;transform-origin:center;animation:rotating-badge-spin var(--rb-duration,24s) linear infinite}' +
      '.rotating-badge .rb-spin.rb-reverse{animation-direction:reverse}' +
      '@media (prefers-reduced-motion:reduce){.rotating-badge .rb-spin{animation:none}}';
    document.head.appendChild(style);
  }

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function build(host) {
    var text = host.getAttribute('data-text') || '';
    var center = host.getAttribute('data-center') || '';
    var logo = host.getAttribute('data-logo');
    var size = host.getAttribute('data-size') || '132';
    var color = host.getAttribute('data-color') || 'currentColor';
    var duration = parseFloat(host.getAttribute('data-duration') || '24');
    var reverse = host.hasAttribute('data-reverse');
    var id = 'rotating-badge-' + (++count);
    var label = text.replace(/\s*[✦•·★|]+\s*/g, ', ').replace(/[,\s]+$/, '').trim();

    var svg = el('svg', { viewBox: '0 0 132 132', width: size, height: size, role: 'img', 'aria-label': label, 'class': 'rotating-badge ' + (host.className || '') });
    svg.style.color = color;

    var defs = el('defs', {});
    defs.appendChild(el('path', { id: id, fill: 'none',
      d: 'M ' + (CX - R) + ',' + CY + ' a ' + R + ',' + R + ' 0 1,1 ' + R * 2 + ',0 a ' + R + ',' + R + ' 0 1,1 ' + -R * 2 + ',0' }));
    svg.appendChild(defs);

    var g = el('g', { 'class': 'rb-spin' + (reverse ? ' rb-reverse' : '') });
    g.style.setProperty('--rb-duration', duration + 's');
    var t = el('text', { fill: 'currentColor', 'font-size': '10.5', 'font-weight': '600' });
    t.style.textTransform = 'uppercase';
    var tp = el('textPath', { href: '#' + id, textLength: CIRCUMFERENCE, lengthAdjust: 'spacing' });
    tp.textContent = text;
    t.appendChild(tp); g.appendChild(t); svg.appendChild(g);

    svg.appendChild(el('circle', { cx: CX, cy: CY, r: INNER, fill: 'none', stroke: 'currentColor', 'stroke-width': '1.25' }));
    if (logo) {
      svg.appendChild(el('image', { href: logo, x: CX - 29, y: CY - 29, width: 58, height: 58, preserveAspectRatio: 'xMidYMid meet' }));
    } else {
      var m = el('text', { x: CX, y: CY, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: 'currentColor', 'font-size': center.length > 1 ? 24 : 32, 'font-weight': '700' });
      m.textContent = center;
      svg.appendChild(m);
    }
    host.replaceWith(svg);
  }

  function init() { document.querySelectorAll('[data-rotating-badge]').forEach(build); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.RotatingBadge = { init: init };
})();
