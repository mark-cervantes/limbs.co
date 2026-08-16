from PIL import Image

img = Image.open('public/brand/logo-dark-bg.png')
print(f"Original: {img.size}")

w, h = img.size
crop_bottom = int(h * 0.58)  # Keep wordmark, remove tagline
cropped = img.crop((0, 0, w, crop_bottom))
print(f"Cropped: {cropped.size}")
cropped.save('public/brand/logo-wordmark-only.png')
print("Saved logo-wordmark-only.png")