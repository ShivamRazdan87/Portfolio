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

`src/components/RotatingBadge.tsx` is a reusable React + TypeScript component: a circular SVG badge whose edge text rotates while the centre (ring plus a monogram or logo) stays still. It uses only SVG and CSS, works in Next.js with Tailwind, and respects reduced motion. `src/components/RotatingBadge.example.tsx` shows it in gold (#C9A55C) on a dark background.

It isn't used in any of the concepts at the moment. To add one:

```tsx
<RotatingBadge text="CraveYardd ✦ Selly Oak ✦ Birmingham ✦ " center="CY" color="#FF3D8B" size={160} />
```
