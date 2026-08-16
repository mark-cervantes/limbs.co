"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, VARIANTS } from "@/lib/products";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"orders" | "stock" | "products">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});

  useEffect(() => {
    if (sessionStorage.getItem("limbs-admin") !== "true") {
      window.location.href = "/admin";
      return;
    }
    setAuthed(true);
    const stored = JSON.parse(localStorage.getItem("limbs-orders") || "[]");
    setOrders(stored);
  }, []);

  const updateStock = (variantId: string, value: number) => {
    setStockOverrides({ ...stockOverrides, [variantId]: value });
  };

  const getStock = (variantId: string, defaultStock: number) => {
    return stockOverrides[variantId] ?? defaultStock;
  };

  const updateOrderStatus = (orderNumber: string, status: string) => {
    const updated = orders.map((o) =>
      o.order_number === orderNumber ? { ...o, order_status: status } : o
    );
    setOrders(updated);
    localStorage.setItem("limbs-orders", JSON.stringify(updated));
  };

  if (!authed) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-4xl text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Dashboard
        </h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("limbs-admin");
            window.location.href = "/";
          }}
          className="text-xs uppercase tracking-widest text-[#999] hover:text-white"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-[#2a2a2a]">
        {(["orders", "stock", "products"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-xs uppercase tracking-widest border-b-2 transition-colors ${
              tab === t
                ? "border-white text-white"
                : "border-transparent text-[#555] hover:text-[#999]"
            }`}
          >
            {t === "stock" ? "Stock" : t === "products" ? "Products" : "Orders"}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <p className="text-sm text-[#999]">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <div key={i} className="border border-[#2a2a2a] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-white font-medium">
                        {order.order_number}
                      </p>
                      <p className="text-xs text-[#555]">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs uppercase tracking-widest px-2 py-1 ${
                          order.order_status === "paid"
                            ? "bg-green-900/30 text-green-400"
                            : order.order_status === "pending_payment"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-[#111] text-[#999]"
                        }`}
                      >
                        {order.order_status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-[#555] uppercase tracking-widest mb-1">Customer</p>
                      <p className="text-white">{order.customer_name}</p>
                      <p className="text-[#999]">{order.customer_email}</p>
                      <p className="text-[#999]">{order.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#555] uppercase tracking-widest mb-1">Shipping</p>
                      <p className="text-[#999]">{order.shipping_address}</p>
                      <p className="text-[#999]">
                        {order.shipping_city}, {order.shipping_province}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                    <p className="text-xs text-[#555] uppercase tracking-widest mb-2">Items</p>
                    {order.items.map((item: any, j: number) => (
                      <div key={j} className="flex justify-between text-sm mb-1">
                        <span className="text-[#999]">
                          {item.product_name} ({item.size}) x{item.quantity}
                        </span>
                        <span className="text-white">P{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between mt-2 pt-2 border-t border-[#1a1a1a]">
                      <span className="text-sm text-white">Total</span>
                      <span className="text-sm text-white">P{order.total}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <p className="text-xs text-[#555] uppercase tracking-widest">Status:</p>
                    <select
                      value={order.order_status}
                      onChange={(e) => updateOrderStatus(order.order_number, e.target.value)}
                      className="bg-[#111] border border-[#2a2a2a] text-white text-xs px-2 py-1"
                    >
                      <option value="pending_payment">Pending Payment</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs text-[#555]">
                      Payment: {order.payment_method.replace(/_/g, " ")} | P{order.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stock tab */}
      {tab === "stock" && (
        <div className="space-y-6">
          {PRODUCTS.map((product) => {
            const productVariants = VARIANTS.filter((v) => v.product_id === product.id);
            return (
              <div key={product.id} className="border border-[#2a2a2a] p-6">
                <h3 className="text-sm text-white mb-4">{product.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productVariants.map((v) => (
                    <div key={v.id} className="text-center">
                      <p className="text-xs text-[#555] uppercase tracking-widest mb-2">
                        Size {v.size}
                      </p>
                      <input
                        type="number"
                        min={0}
                        value={getStock(v.id, v.stock)}
                        onChange={(e) => updateStock(v.id, parseInt(e.target.value) || 0)}
                        className="input-field text-center w-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <button
            onClick={() => {
              // In production, this would save to Supabase
              alert("Stock levels saved (demo — will save to database in production)");
            }}
            className="btn-primary"
          >
            Save Stock Levels
          </button>
        </div>
      )}

      {/* Products tab */}
      {tab === "products" && (
        <div className="space-y-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="border border-[#2a2a2a] p-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-white">{product.name}</h3>
                <p className="text-xs text-[#999] mt-1">
                  {product.color} | P{product.price} | {product.collection.replace(/_/g, " ")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 ${
                    product.is_active
                      ? "bg-green-900/30 text-green-400"
                      : "bg-[#111] text-[#555]"
                  }`}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}