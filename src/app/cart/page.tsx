"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { CartItem } from "@/lib/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("limbs-cart") || "[]");
    setCart(stored);
    setLoaded(true);
  }, []);

  const updateQty = (variantId: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.variant_id === variantId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("limbs-cart", JSON.stringify(updated));
  };

  const removeItem = (variantId: string) => {
    const updated = cart.filter((item) => item.variant_id !== variantId);
    setCart(updated);
    localStorage.setItem("limbs-cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!loaded) return null;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1
          className="text-3xl text-white mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Your cart is empty
        </h1>
        <Link href="/shop" className="btn-outline mt-4 inline-block">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1
        className="text-4xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Cart
      </h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.variant_id}
            className="flex items-center gap-4 border border-[#2a2a2a] p-4"
          >
            <div className="w-20 h-20 bg-[#111] border border-[#2a2a2a] flex-shrink-0 overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">
                  {item.color}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-sm text-white">{item.product_name}</h3>
              <p className="text-xs text-[#999] mt-1">
                {item.color} / Size {item.size}
              </p>
              <p className="text-sm text-white mt-1">P{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.variant_id, -1)}
                className="w-8 h-8 border border-[#2a2a2a] text-white hover:border-white"
              >
                -
              </button>
              <span className="text-sm text-white w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQty(item.variant_id, 1)}
                className="w-8 h-8 border border-[#2a2a2a] text-white hover:border-white"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.variant_id)}
                className="ml-2 text-xs text-[#555] hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#2a2a2a] pt-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#555]">Subtotal</p>
          <p className="text-2xl text-white">P{subtotal}</p>
        </div>
        <Link href="/checkout" className="btn-primary">
          Checkout
        </Link>
      </div>
    </div>
  );
}