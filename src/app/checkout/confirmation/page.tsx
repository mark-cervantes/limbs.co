"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") || "";
  const method = params.get("method") || "gcash";
  const total = params.get("total") || "0";

  const isGCash = method === "gcash";

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1
        className="text-4xl text-white mb-4"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Order Placed
      </h1>
      <p className="text-sm text-[#999] mb-8">
        Order Number: <span className="text-white">{orderNumber}</span>
      </p>

      {isGCash ? (
        <div className="border border-[#2a2a2a] p-8 mb-8 text-left">
          <h2 className="text-sm uppercase tracking-widest text-[#555] mb-4">GCash Payment</h2>
          <p className="text-sm text-[#999] mb-4">
            You will receive an email with your GCash payment link shortly.
            Once payment is confirmed, your order will be processed.
          </p>
          <p className="text-sm text-white">
            Total to pay: <span className="text-lg">P{total}</span>
          </p>
        </div>
      ) : (
        <div className="border border-[#2a2a2a] p-8 mb-8 text-left">
          <h2 className="text-sm uppercase tracking-widest text-[#555] mb-4">BDO Bank Transfer</h2>
          <p className="text-sm text-[#999] mb-4">
            Please transfer the exact amount to the following BDO account,
            then reply to our email with your deposit slip:
          </p>
          <div className="bg-[#111] p-4 mb-4 space-y-2">
            <p className="text-sm text-white">
              <span className="text-[#999]">Bank:</span> BDO
            </p>
            <p className="text-sm text-white">
              <span className="text-[#999]">Account Name:</span> Limbs.co
            </p>
            <p className="text-sm text-white">
              <span className="text-[#999]">Account Number:</span> [To be provided]
            </p>
            <p className="text-sm text-white">
              <span className="text-[#999]">Amount:</span> P{total}
            </p>
          </div>
          <p className="text-xs text-[#555]">
            Orders are held for 3 days. If payment is not received within 3 days,
            the order will be automatically cancelled.
          </p>
        </div>
      )}

      <p className="text-sm text-[#999] mb-8">
        A confirmation email has been sent to your inbox.
      </p>

      <a href="/shop" className="btn-outline">
        Continue Shopping
      </a>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-6 py-20 text-center text-[#999]">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}