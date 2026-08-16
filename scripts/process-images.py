from PIL import Image

src = "/home/cmark/projects/limbs-co/public/brand/logo.png"
img = Image.open(src).convert("RGBA")

# Remove white background - make transparent
datas = img.getdata()
new_data = []
for item in datas:
    r, g, b, a = item
    if r > 200 and g > 200 and b > 200:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append((r, g, b, a))
img.putdata(new_data)

# Save transparent (black bones on transparent - for light bg)
img.save("/home/cmark/projects/limbs-co/public/brand/logo-bone-transparent.png")

# Create inverted (white bones on transparent - for dark bg)
inverted = img.copy()
inv_data = []
for item in img.getdata():
    r, g, b, a = item
    if a > 0:
        inv_data.append((255 - r, 255 - g, 255 - b, a))
    else:
        inv_data.append(item)
inverted.putdata(inv_data)
inverted.save("/home/cmark/projects/limbs-co/public/brand/logo-bone-white.png")

# Create favicon versions - crop to bounding box first
bbox = inverted.getbbox()
cropped = inverted.crop(bbox)

# Make square with padding
max_dim = max(cropped.size)
square = Image.new("RGBA", (max_dim + 40, max_dim + 40), (0, 0, 0, 0))
offset = ((max_dim + 40 - cropped.size[0]) // 2, (max_dim + 40 - cropped.size[1]) // 2)
square.paste(cropped, offset, cropped)

# Save favicons
for size in [16, 32, 64]:
    resized = square.resize((size, size), Image.LANCZOS)
    resized.save(f"/home/cmark/projects/limbs-co/public/favicon-{size}.png")

# Save hero version (large, white bones on transparent)
inverted.save("/home/cmark/projects/limbs-co/public/brand/logo-bone-hero.png")

# Also create an ICO favicon
square.resize((32, 32), Image.LANCZOS).save("/home/cmark/projects/limbs-co/public/favicon.ico", format="ICO")

print("All images processed successfully")