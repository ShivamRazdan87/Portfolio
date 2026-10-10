---
name: architecture-motion
description: "Editorial motion for architecture and interior-design websites, in the style of studios like Minale + Mann: a timed logo intro, full-screen hero zoom, scroll parallax, line-by-line text reveals, image mask reveals and a panel-wipe page transition — all with CSS + light JavaScript and full reduced-motion fallbacks. Use when adding, reviewing or tuning animation on an architect, interior designer or studio portfolio site, or when the user asks for parallax, scroll reveals, page transitions or a logo intro."
argument-hint: "[technique] [page or section]"
metadata:
  author: ShivamRazdan87
  version: "1.0.0"
---

# Architecture Motion

Calm, slow, editorial motion for studio websites. Motion should feel like walking through a building: unhurried, sequential, never bouncy. Build it with CSS keyframes/transitions plus a little JavaScript (IntersectionObserver, one scroll listener). No animation library is required; reach for GSAP only if the project already ships it.

## Techniques

| Technique | What it does | Timing |
|---|---|---|
| Logo intro | Mark draws in, studio name slides up, rule and tagline appear, then the overlay lifts away | 4000 ms total; Skip button; Replay in footer |
| Hero zoom | Full-screen hero image scales 1.18 → 1 after the intro | 2400 ms, `cubic-bezier(.2,.7,.2,1)` |
| Parallax | Image layer inside an `overflow:hidden` frame moves slower than the page | speed 0.1–0.35; clamp shift to ±11% of frame height |
| Line reveal | Each heading line is wrapped `<span class="ln"><span>…</span></span>` and slides up from `translateY(105%)` | 1000 ms, +110 ms stagger per line |
| Mask reveal | Image uncovers bottom-to-top with `clip-path: inset(100% 0 0 0)` → `inset(0)` | 1300 ms, `cubic-bezier(.7,0,.2,1)` |
| Panel wipe | Solid panel (with destination name) covers the screen, page swaps underneath, panel lifts off | cover 650 ms, swap, reveal 700 ms |

## Rules

1. **Reduced motion first.** Under `prefers-reduced-motion: reduce`: no parallax, no reveals, no wipe; page changes are instant; the intro becomes a short fade. Put every keyframe animation inside `@media (prefers-reduced-motion: no-preference)`.
2. **Never hide content by default.** Reveal styles apply only under a root class (e.g. `.motion`) that JavaScript adds once IntersectionObserver is available — if the script fails, everything is visible.
3. **Give users a switch.** Continuous motion (parallax, looping cues) gets a visible "Motion on/off" toggle with `aria-pressed` (WCAG 2.2.2).
4. **Parallax never shows gaps.** The moving layer extends 12% beyond its frame (`top:-12%; bottom:-12%`), and the shift is clamped.
5. **One scroll listener.** Throttle with `requestAnimationFrame`, use `{ passive: true }`, skip elements far outside the viewport, and remove listeners on unmount.
6. **Page transitions move focus.** After the swap, scroll to top, focus the new page's `h1` (`tabindex="-1"`), and announce it in a `role="status"` region ("Showing project: …"). The wipe panel is `aria-hidden="true"`.
7. **Intro is skippable.** The Skip button sends focus to `main`; content entrance animations are delayed until the intro ends (e.g. `.intro-on .rise { animation-delay: 3700ms }`).
8. **Easing:** use slow-out curves (`cubic-bezier(.2,.7,.2,1)`) for entrances and `cubic-bezier(.8,0,.2,1)` for wipes. No springs or overshoot.
9. **Full-screen heroes:** use `height: clamp(640px, 100vh, 940px)` rather than bare `100vh`, so tall preview frames don't stretch the hero.

## Snippets

```css
.px{position:relative;overflow:hidden}
.px-in{position:absolute;left:0;right:0;top:-12%;bottom:-12%;will-change:transform}
.ln{display:block;overflow:hidden;padding-bottom:.06em}
.ln > span{display:block}
@media (prefers-reduced-motion: no-preference){
  .motion .rv .ln > span{transform:translateY(105%);transition:transform 1000ms cubic-bezier(.2,.7,.2,1)}
  .motion .rv .ln:nth-child(2) > span{transition-delay:110ms}
  .motion .rv.in .ln > span{transform:none}
  .motion .rv-mask{clip-path:inset(100% 0 0 0);transition:clip-path 1300ms cubic-bezier(.7,0,.2,1)}
  .motion .rv-mask.in{clip-path:inset(0 0 0 0)}
}
```

```js
// Parallax: elements carry data-speed; their parent is the .px frame
function parallax() {
  const vh = window.innerHeight;
  document.querySelectorAll('[data-speed]').forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const shift = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.speed);
    const max = r.height * 0.11;
    el.style.transform = `translate3d(0,${Math.max(-max, Math.min(max, shift))}px,0)`;
  });
}
```

## Reference implementation

Concept K — Motion Study on the "Interior Designer Website Concepts" canvas uses every technique above.
