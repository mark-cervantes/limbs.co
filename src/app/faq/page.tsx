export const metadata = { title: "FAQ — Limbs.co" };

export default function FAQPage() {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Bicol Region: 2-3 business days via J&T Express. Outside Bicol: up to 7 business days. Orders are processed within 1-2 business days of payment confirmation.",
    },
    {
      q: "How much is shipping?",
      a: "Shipping fee is calculated at checkout based on your location. Bicol Region: P60. Outside Bicol: P120. Rates are set by J&T Express.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept GCash (instant payment) and BDO Bank Transfer (manual deposit with proof of payment upload). Both require online payment — we do not offer Cash on Delivery at this time.",
    },
    {
      q: "How do I pay via BDO Bank Transfer?",
      a: "After placing your order, you'll receive an email with our BDO account details. Transfer the exact amount, then reply to the email with a photo of your deposit slip. We confirm orders within 24 hours of receiving proof of payment.",
    },
    {
      q: "What if my size is sold out?",
      a: "Sold out items may be available for pre-order. If pre-order is enabled, you'll see a 'Pre-order' button instead of 'Sold Out'. Pre-order items ship when restocked.",
    },
    {
      q: "Can I return or exchange an item?",
      a: "Yes — we accept exchanges for sizing issues within 7 days of delivery. Items must be unworn, unwashed, and with original tags. See our Return Policy page for full details.",
    },
    {
      q: "Do you ship internationally?",
      a: "Not yet. We currently ship within the Philippines only.",
    },
    {
      q: "Are your drops limited?",
      a: "Yes. Our First Collection items are limited drops — once stock is gone, they move to pre-order or are retired. Regular collection items are restocked more frequently.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-5xl text-white mb-12"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        FAQ
      </h1>

      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-[#2a2a2a] pb-6">
            <h2 className="text-lg text-white mb-2">{faq.q}</h2>
            <p className="text-sm text-[#999] leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}