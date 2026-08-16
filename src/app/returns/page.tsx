export const metadata = { title: "Return Policy — Limbs.co" };

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-5xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Return Policy
      </h1>

      <div className="space-y-8 text-sm text-[#999] leading-relaxed">
        <p className="text-white">Last updated: August 2026</p>

        <p>
          We want you to love your Limbs.co purchase. If something isn&apos;t right,
          here&apos;s what we can do for you.
        </p>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Eligibility</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Requests must be made within 7 days of receiving your order.</li>
            <li>Items must be unworn, unwashed, with all original tags attached.</li>
            <li>Items must be in original condition — no stains, odors, damage, or signs of wear.</li>
            <li>Only sizing issues and defective items are eligible for exchange.</li>
            <li>We do not accept returns for change of mind.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">What We Accept</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Wrong size received — Exchange for correct size, subject to availability.</li>
            <li>Defective item — Full refund or exchange, at the customer&apos;s choice.</li>
            <li>Wrong item received — Full refund or correct item sent at no cost.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">What We Don&apos;t Accept</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Items worn, washed, or altered</li>
            <li>Items damaged by the customer</li>
            <li>Items without original packaging/tags</li>
            <li>Sale or clearance items (all sales final)</li>
            <li>Change of mind / preference</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">How to Request</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Email us at limbscolthing.co@gmail.com within 7 days of delivery.</li>
            <li>Include your order number, a photo of the item, and the reason for the request.</li>
            <li>We will respond within 2 business days with instructions.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Shipping for Exchanges</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>The customer covers the cost of shipping the item back to us.</li>
            <li>We cover the cost of shipping the replacement item to you.</li>
            <li>If the item is defective or our error, we cover all shipping costs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Refunds</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Approved refunds are processed back to the original payment method within 5-7 business days.</li>
            <li>For GCash payments, refunds are sent to the GCash number used at checkout.</li>
            <li>For BDO bank transfers, refunds are sent to the BDO account used at checkout.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Questions?</h2>
          <p>
            Email: <a href="mailto:limbscolthing.co@gmail.com" className="text-white underline">limbscolthing.co@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}