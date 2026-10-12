# Concepts 2, 3 and 5 (React source)

Source for the React-built concepts. The built pages are already committed in `../2-21st-dev`, `../3-gsap-21st` and `../5-all-combined`, with shared code in `../_assets`, so the site works without building.

They read the menu, prices and photos from `craveyardd/data.js` at runtime. Changing the menu doesn't need a rebuild.

## Rebuild after changing the design

```
cd craveyardd/concepts/_app
npm install
rm -rf ../_assets && npm run build
```

## Stack

- React 18, Vite, Tailwind CSS v4
- GSAP 3.12.5 with ScrollTrigger (concepts 3 and 5)
- Motion for React, used by the components
- Components in `src/components/ui`:
  - From the 21st.dev registry: `button.tsx` (shadcn/ui) and `marquee.tsx` (Magic UI)
  - From the same MIT-licensed libraries on GitHub: Magic UI (`blur-fade`, `shimmer-button`, `bento-grid`, `word-rotate`, `border-beam`, `sparkles-text`) and Motion Primitives (`text-effect`, `tilt`, `animated-group`, `in-view`, `infinite-slider`, `magnetic`, `spotlight`). These came from GitHub because the 21st.dev free plan allows only 2 component downloads a day.
- Licences: see `THIRD_PARTY_LICENSES.md`.

## RotatingBadge

`src/components/RotatingBadge.tsx` is a reusable React + TypeScript component: a circular SVG badge whose edge text rotates while the centre (ring plus a monogram or logo) stays still. It uses only SVG and CSS, works in Next.js with Tailwind, respects reduced motion, and has `role="img"` with an `aria-label`. Each badge gets its own path id from `useId()`.

```tsx
<RotatingBadge text="CraveYardd ✦ Selly Oak ✦ Birmingham ✦ " center="CY" color="#FF3D8B" size={160} />
<RotatingBadge text="Open daily ✦ 2PM – 11PM ✦ " logoSrc="/logo.png" duration={18} reverse />
```

Props: `text`, `center`, `logoSrc`, `size`, `color`, `duration` (seconds, default 24), `reverse`, plus `className` for layout.

- `src/components/RotatingBadge.example.tsx` is a page section showing it in gold (#C9A55C) on a dark background.
- Concepts 1 and 4 are plain HTML, so they use `../rotating-badge.js`. It produces the same SVG from `<span data-rotating-badge data-text="…" data-center="CY" data-color="#…">`.
