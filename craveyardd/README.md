# CraveYardd website

The live site is **Concept 5 "Ultimate Craving"**: mobile-first, with the logo intro, live opening status, full menu with prices, event enquiry form, Find Us map, Follow the Cravings and Contact.

- `index.html` and `app/` are the built website. Upload the whole `craveyardd/` folder to any static host (Netlify, Vercel, GitHub Pages). No build step is needed to publish.
- `data.js` holds the menu, prices, photos and contact details. The site reads it when the page loads, so editing it needs no rebuild.
- `splash.js` is the logo intro.
- `concepts/` holds the five design concepts that were presented. They're marked so search engines won't list them.
- The site's source code is in `concepts/_app/` (React, TypeScript, Tailwind CSS, GSAP). Rebuild only after changing the design:

  ```
  cd concepts/_app
  npm install
  npm run build
  ```

  This rebuilds `index.html` and `app/`, plus concepts 2, 3 and 5.

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

## Animations

The site uses GSAP 3.12.5 with ScrollTrigger, installed through npm in `concepts/_app`:

- The logo intro (`splash.js`) plays for about 4 seconds. It has a Skip intro button and a short fade for visitors with "reduce motion" turned on.
- The hero card animates in as the intro closes, and the hero photo has a slow parallax.
- Blocks, favourites, the gallery and contact rows animate in as you scroll. The favourites grid zooms in gently.
- Visitors with "reduce motion" turned on get no movement.
