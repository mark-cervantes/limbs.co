"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CartItem, PaymentMethod } from "@/lib/types";
import { determineRegion, getShippingFee, getShippingTime, BICOL_PROVINCES } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    paymentMethod: "gcash" as PaymentMethod,
    notes: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("limbs-cart") || "[]");
    setCart(stored);
    setLoaded(true);
  }, []);

  const region = determineRegion(form.province);
  const shippingFee = getShippingFee(region);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Generate order
    const orderNumber = `LIM3S-${Date.now().toString().slice(-6)}`;
    const order = {
      order_number: orderNumber,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: form.address,
      shipping_city: form.city,
      shipping_province: form.province,
      shipping_region: region,
      items: cart,
      subtotal,
      shipping_fee: shippingFee,
      total,
      payment_method: form.paymentMethod,
      payment_status: form.paymentMethod === "gcash" ? "pending" : "pending",
      order_status: "pending_payment",
      notes: form.notes,
      created_at: new Date().toISOString(),
    };

    // Save order to localStorage (will be replaced by API call to Supabase)
    const orders = JSON.parse(localStorage.getItem("limbs-orders") || "[]");
    orders.push(order);
    localStorage.setItem("limbs-orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("limbs-cart");

    // Redirect to confirmation
    router.push(`/checkout/confirmation?order=${orderNumber}&method=${form.paymentMethod}&total=${total}`);
  };

  if (!loaded) return null;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl text-white mb-4">Your cart is empty</h1>
        <a href="/shop" className="text-sm text-[#999] underline">Browse Shop</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1
        className="text-4xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping details */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-4">Shipping Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Complete Shipping Address"
            required
            rows={3}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="input-field resize-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City/Municipality"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Province"
              required
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
              className="input-field"
            />
          </div>
          <input
            type="text"
            placeholder="ZIP Code"
            value={form.zipCode}
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            className="input-field"
          />

          {form.province && (
            <p className="text-xs text-[#999]">
              Estimated delivery: {getShippingTime(region)} via J&T Express
            </p>
          )}

          <textarea
            placeholder="Order Notes (optional)"
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="input-field resize-none"
          />

          {/* Payment method */}
          <div className="pt-4">
            <h2 className="text-xs uppercase tracking-widest text-[#555] mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                  form.paymentMethod === "gcash"
                    ? "border-white bg-[#1a1a1a]"
                    : "border-[#2a2a2a]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={form.paymentMethod === "gcash"}
                  onChange={() => setForm({ ...form, paymentMethod: "gcash" })}
                  className="accent-white"
                />
                <div>
                  <p className="text-sm text-white">GCash</p>
                  <p className="text-xs text-[#999]">Pay instantly via GCash</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                  form.paymentMethod === "bdo_bank_transfer"
                    ? "border-white bg-[#1a1a1a]"
                    : "border-[#2a2a2a]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bdo_bank_transfer"
                  checked={form.paymentMethod === "bdo_bank_transfer"}
                  onChange={() => setForm({ ...form, paymentMethod: "bdo_bank_transfer" })}
                  className="accent-white"
                />
                <div>
                  <p className="text-sm text-white">BDO Bank Transfer</p>
                  <p className="text-xs text-[#999]">Transfer then upload deposit slip</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-4">Order Summary</h2>
          <div className="border border-[#2a2a2a] p-6 space-y-4">
            {cart.map((item) => (
              <div key={item.variant_id} className="flex justify-between text-sm">
                <span className="text-[#999]">
                  {item.product_name} ({item.size}) x{item.quantity}
                </span>
                <span className="text-white">P{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="border-t border-[#2a2a2a] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#999]">Subtotal</span>
                <span className="text-white">P{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#999]">Shipping ({region === "bicol" ? "Bicol" : "National"})</span>
                <span className="text-white">P{shippingFee}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-[#2a2a2a]">
                <span className="text-white">Total</span>
                <span className="text-white">P{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-4"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}