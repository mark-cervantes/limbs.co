"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS, VARIANTS } from "@/lib/products";
import type { ProductSize } from "@/lib/types";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl text-white mb-4">Product not found</h1>
        <a href="/shop" className="text-sm text-[#999] underline">Back to shop</a>
      </div>
    );
  }

  const productVariants = VARIANTS.filter((v) => v.product_id === product.id);
  const selectedVariant = productVariants.find((v) => v.size === selectedSize);
  const isSoldOut = selectedVariant ? selectedVariant.stock <= 0 && !selectedVariant.is_preorder : false;
  const isPreorder = selectedVariant?.is_preorder ?? false;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) return;

    const cart = JSON.parse(localStorage.getItem("limbs-cart") || "[]");
    const existing = cart.find(
      (item: any) => item.variant_id === selectedVariant.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        variant_id: selectedVariant.id,
        size: selectedSize,
        color: product.color,
        price: product.price,
        image: product.images[0] || "",
        quantity: 1,
        stock: selectedVariant.stock,
      });
    }

    localStorage.setItem("limbs-cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-[#111] border border-[#2a2a2a] overflow-hidden">
            {product.images.length > 0 ? (
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: product.color_hex }}
              >
                <span className="text-lg uppercase tracking-widest opacity-20">
                  {product.color}
                </span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 border overflow-hidden ${
                    activeImage === i ? "border-white" : "border-[#2a2a2a]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-[#555]">
              {product.collection === "first_collection" ? "First Collection" : "Regular"}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {product.name}
          </h1>
          <p className="text-2xl text-white mb-6">P{product.price}</p>

          <p className="text-sm text-[#999] mb-8">{product.description}</p>

          {/* Color label */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-[#555] mb-2">Color</p>
            <div className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full border border-[#2a2a2a]"
                style={{ backgroundColor: product.color_hex }}
              />
              <span className="text-sm text-white">{product.color}</span>
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-widest text-[#555]">Size</p>
              <a href="/size-guide" className="text-xs text-[#999] underline">Size Guide</a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedSize(v.size)}
                  disabled={v.stock <= 0 && !v.is_preorder}
                  className={`py-3 text-sm border transition-colors ${
                    selectedSize === v.size
                      ? "border-white bg-white text-black"
                      : v.stock <= 0 && !v.is_preorder
                        ? "border-[#2a2a2a] text-[#444] cursor-not-allowed"
                        : "border-[#2a2a2a] text-white hover:border-[#999]"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          {selectedSize && (
            <div className="mb-6">
              {isSoldOut ? (
                <p className="text-sm text-[#555]">Sold Out</p>
              ) : isPreorder ? (
                <p className="text-sm text-[#999]">Pre-order — ships when restocked</p>
              ) : (
                <p className="text-sm text-[#999]">
                  {selectedVariant?.stock} in stock
                </p>
              )}
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || isSoldOut}
            className="btn-primary mb-4"
          >
            {!selectedSize
              ? "Select a size"
              : isSoldOut
                ? "Sold Out"
                : isPreorder
                  ? "Pre-order"
                  : added
                    ? "Added!"
                    : "Add to Cart"}
          </button>

          {/* Shipping info */}
          <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
            <h3 className="text-xs uppercase tracking-widest text-[#555] mb-3">Shipping</h3>
            <p className="text-sm text-[#999]">
              Bicol Region: 2-3 business days via J&T<br />
              Outside Bicol: up to 7 business days via J&T
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}