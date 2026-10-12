# CraveYardd website

One-page, mobile-first site for CraveYardd. It's plain HTML, CSS and JS with no build step. Open `index.html`, or upload the folder to any static host such as Netlify, Vercel or GitHub Pages.

## 1. Add the official images

Put the original files in `assets/originals/` using these exact names:

| File | Used for |
|---|---|
| `logo.png` | Header and footer logo, favicon, share image |
| `hero-strawberry-cup.jpg` | Hero photo and share image |
| `strawberry-cups.jpg` | Classic Chocolate Strawberry cup |
| `dubai-chocolate-cup.jpg` | Dubai Chocolate cup |
| `biscoff-crunch-cup.jpg` | Biscoff Crunch cup |
| `oreo-crunch-cup.jpg` | Oreo Crunch cup |
| `chocolate-strawberry-waffle.jpg` | Chocolate & Strawberry Waffle |
| `biscoff-waffle.jpg` | Biscoff Waffle |
| `loaded-waffle.jpg` | CraveYardd Loaded Waffle |
| `oreo-waffle.jpg` | Oreo Waffle |
| `milk-cake.jpg` | Milk Cake |
| `san-sebastian-cheesecake.jpg` | San Sebastian Cheesecake |
| `real-mango-pop.jpg` | Real Mango Pop |
| `espresso-bean.jpg` | The Espresso Bean |
| `blueberry-cheesecake.jpg` | Blueberry Cheesecake |
| `matilda-cake.jpg` | Matilda Cake |
| `strawberry-skewers.jpg` | Instagram gallery |

Then run:

```
pip install pillow
python3 tools/optimise_images.py
```

This writes compressed `.webp` photos to `assets/photos/`, a web-sized `assets/logo.png`, the favicons and `assets/og-image.jpg`. The logo is only resized, never redrawn or recoloured. Any slot without a photo shows a soft pink placeholder.

## 2. Edit menu, prices and contact details

Everything editable lives in **`data.js`**:

- **Menu:** categories, items, descriptions, prices, and the sauces and toppings in "Make It Yours". A category `price` applies to every item in it (for example "£6.49 each"). An item `price` overrides it.
- **Favourites:** give an item `favourite: 1`, `2`, `3` and so on to show it in Our Favourites in that order. `tag` adds a label such as "Fully loaded".
- **Gallery and About photos:** paths to files in `assets/photos/`.
- **Contact:** `tiktokUrl`, `email`, `phone` and `whatsapp`. The floating WhatsApp button only appears once `whatsapp` is set.
- **Enquiry form:** set `formEndpoint` (for example a Formspree URL) to receive enquiries by email. Without it, the form opens the visitor's email app using `email`. If neither is set, it asks visitors to DM on Instagram.

## 3. Before launch

- Add `<link rel="canonical">` and make the `og:image` URL absolute once the domain is known (see the comment in `index.html`).
- Check the Google Map pin points at Oba's Kitchen, Lounge & Bar.

## Animations (GSAP)

Animations live in `animations.js` and use GSAP 3.12.5 with ScrollTrigger, bundled in `vendor/` so they don't depend on a CDN.

- **Hero:** the chocolate drip falls in, the headline rises word by word, the buttons pop in, the sparkles float, and the photo has a slow parallax.
- **On scroll:** section headings, favourite cards, menu categories and items, About photos (a curtain wipe), event occasion chips, the gallery, contact rows and the footer logo animate in.
- **Buttons:** they squish slightly when pressed.
- **Reduced motion:** visitors with "reduce motion" turned on get no animation. If GSAP fails to load, everything stays visible.
