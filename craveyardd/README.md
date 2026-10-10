# CraveYardd website

One-page, mobile-first site for CraveYardd. It's plain HTML, CSS and JS with no build step. Open `index.html`, or upload the folder to any static host such as Netlify, Vercel or GitHub Pages.

## 1. Add the official images

Put the original files in `assets/originals/` using these exact names:

| File | Used for |
|---|---|
| `logo.png` | Header and footer logo, favicon, share image |
| `hero-strawberry-cup.jpg` | Hero photo and share image |
| `strawberry-cups.jpg` | Signature Strawberry Cups |
| `strawberry-skewers.jpg` | Strawberry Skewers |
| `matilda-cake.jpg` | Matilda Cake |
| `milk-cake.jpg` | Milk Cake |
| `san-sebastian-cheesecake.jpg` | San Sebastian Cheesecake |
| `loaded-waffles.jpg` | Loaded Waffles (set `image` in `data.js`) |
| `kunafa-cups.jpg` | Kunafa Cups (set `image` in `data.js`) |

Then run:

```
pip install pillow
python3 tools/optimise_images.py
```

This writes compressed `.webp` photos to `assets/photos/`, a web-sized `assets/logo.png`, the favicons and `assets/og-image.jpg`. The logo is only resized, never redrawn or recoloured. Any slot without a photo shows a soft pink placeholder.

## 2. Edit menu, prices and contact details

Everything editable lives in **`data.js`**:

- **Menu:** categories, items, descriptions, flavours and prices. Prices are `null` (shown as "Price on request") until they're confirmed from the current menu.
- **Favourites:** set `favourite: true` on an item.
- **Gallery and About photos:** paths to files in `assets/photos/`.
- **Contact:** `tiktokUrl`, `email`, `phone` and `whatsapp`. The floating WhatsApp button only appears once `whatsapp` is set.
- **Enquiry form:** set `formEndpoint` (for example a Formspree URL) to receive enquiries by email. Without it, the form opens the visitor's email app using `email`. If neither is set, it asks visitors to DM on Instagram.

## 3. Before launch

- Add `<link rel="canonical">` and make the `og:image` URL absolute once the domain is known (see the comment in `index.html`).
- Check the Google Map pin points at Oba's Kitchen, Lounge & Bar.
