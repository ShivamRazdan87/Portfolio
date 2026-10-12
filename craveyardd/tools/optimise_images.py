#!/usr/bin/env python3
"""Compress CraveYardd photos and build favicons / share image from the official logo.

Usage (from the craveyardd/ folder):
    pip install pillow
    python3 tools/optimise_images.py

Input:
    assets/originals/logo.png                 official logo (transparent PNG preferred)
    assets/originals/<photo-name>.jpg|png|... full-size photos, named as in README.md

Output:
    assets/logo.png, assets/logo.webp          logo resized for the web (artwork untouched)
    assets/photos/<photo-name>.webp            compressed photos (max 1600px)
    assets/favicon-32.png, assets/apple-touch-icon.png
    assets/og-image.jpg                        1200x630 social-sharing image
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "originals"
PHOTOS = ROOT / "assets" / "photos"
ASSETS = ROOT / "assets"
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"}
CREAM = (255, 249, 244)


def fit(img, max_side):
    img = img.copy()
    img.thumbnail((max_side, max_side), Image.LANCZOS)
    return img


def on_square(img, size, bg=(255, 255, 255, 0), pad=0.08):
    """Scale the whole logo onto a square canvas without cropping or recolouring it."""
    inner = int(size * (1 - 2 * pad))
    logo = img.copy()
    logo.thumbnail((inner, inner), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), bg)
    canvas.paste(logo, ((size - logo.width) // 2, (size - logo.height) // 2), logo)
    return canvas


def main():
    if not SRC.exists():
        raise SystemExit(f"Put the originals in {SRC} first (see README.md).")
    PHOTOS.mkdir(parents=True, exist_ok=True)

    logo_src = SRC / "logo.png"
    if logo_src.exists():
        logo = Image.open(logo_src).convert("RGBA")
        fit(logo, 480).save(ASSETS / "logo.png", optimize=True)
        fit(logo, 480).save(ASSETS / "logo.webp", "WEBP", quality=90, method=6)
        on_square(logo, 32).save(ASSETS / "favicon-32.png", optimize=True)
        on_square(logo, 180, bg=(255, 255, 255, 255)).convert("RGB").save(ASSETS / "apple-touch-icon.png", optimize=True)
        print("logo -> logo.png, logo.webp, favicon-32.png, apple-touch-icon.png")
    else:
        logo = None
        print("No assets/originals/logo.png – skipped logo and favicons.")

    for f in sorted(SRC.iterdir()):
        if f.stem == "logo" or f.suffix.lower() not in PHOTO_EXT:
            continue
        img = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        out = PHOTOS / f"{f.stem}.webp"
        fit(img, 1600).save(out, "WEBP", quality=82, method=6)
        print(f"{f.name} -> photos/{out.name} ({out.stat().st_size // 1024} KB)")

    hero = next((p for p in SRC.iterdir() if p.stem == "hero-strawberry-cup"), None)
    if hero:
        img = ImageOps.exif_transpose(Image.open(hero)).convert("RGB")
        og = Image.new("RGB", (1200, 630), CREAM)
        photo = ImageOps.fit(img, (560, 630), Image.LANCZOS, centering=(0.5, 0.4))
        og.paste(photo, (640, 0))
        if logo is not None:
            badge = logo.copy()
            badge.thumbnail((540, 420), Image.LANCZOS)
            og.paste(badge, (50 + (540 - badge.width) // 2, (630 - badge.height) // 2), badge)
        og.save(ASSETS / "og-image.jpg", quality=86, optimize=True, progressive=True)
        print("hero -> og-image.jpg")


if __name__ == "__main__":
    main()
