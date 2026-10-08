#!/usr/bin/env python3
"""
Derive web assets from the official logo.

Usage:  python3 scripts/prepare-logo.py path/to/full-logo.png

Writes:
  src/assets/brand/logo.png        full logo, white made transparent
  src/assets/brand/logo-mark.png   the "G" emblem only (header/footer mark)
  public/og-image.png              1200x630 social-sharing card
  public/apple-touch-icon.png      180x180 home-screen icon
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
NAVY = (12, 29, 66)


def whiten_to_alpha(img: Image.Image, threshold: int = 240) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            m = min(r, g, b)
            if m >= threshold:
                px[x, y] = (r, g, b, 0)
            elif m > 200:  # soften the anti-aliased edge
                px[x, y] = (r, g, b, int(a * (threshold - m) / (threshold - 200)))
    return img


def content_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    bbox = img.getchannel("A").point(lambda a: 255 if a > 16 else 0).getbbox()
    if not bbox:
        sys.exit("Logo appears to be empty after background removal.")
    return bbox


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = Image.open(sys.argv[1])
    full = whiten_to_alpha(src)
    full = full.crop(content_bbox(full))

    brand = ROOT / "src/assets/brand"
    brand.mkdir(parents=True, exist_ok=True)
    full.save(brand / "logo.png", optimize=True)

    # The emblem occupies roughly the top 55% of the artwork, above the "GYANG" wordmark.
    w, h = full.size
    mark = full.crop((0, 0, w, int(h * 0.55)))
    mark = mark.crop(content_bbox(mark))
    side = max(mark.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark)
    square.resize((192, 192), Image.LANCZOS).save(brand / "logo-mark.png", optimize=True)

    og = Image.new("RGB", (1200, 630), (255, 255, 255))
    logo = full.copy()
    logo.thumbnail((1000, 540), Image.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2), logo)
    og.save(ROOT / "public/og-image.png", optimize=True)

    touch = Image.new("RGB", (180, 180), (255, 255, 255))
    m = square.copy()
    m.thumbnail((150, 150), Image.LANCZOS)
    touch.paste(m, ((180 - m.width) // 2, (180 - m.height) // 2), m)
    touch.save(ROOT / "public/apple-touch-icon.png", optimize=True)

    print("Wrote logo.png, logo-mark.png, og-image.png and apple-touch-icon.png")


if __name__ == "__main__":
    main()
