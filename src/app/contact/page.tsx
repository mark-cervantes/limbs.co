export const metadata = { title: "Contact — Limbs.co" };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1
        className="text-5xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Contact
      </h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-2">Email</h2>
          <a
            href="mailto:limbscolthing.co@gmail.com"
            className="text-sm text-white underline hover:text-[#999]"
          >
            limbscolthing.co@gmail.com
          </a>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-2">Social</h2>
          <div className="flex gap-4">
            <span className="text-sm text-[#999]">TikTok: @limbs.co (to be confirmed)</span>
          </div>
          <div className="flex gap-4 mt-2">
            <span className="text-sm text-[#999]">Instagram: @limbs.co (to be confirmed)</span>
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-2">Location</h2>
          <p className="text-sm text-[#999]">Bicol Region, Philippines</p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-2">Response Time</h2>
          <p className="text-sm text-[#999]">We respond within 2 business days.</p>
        </div>
      </div>
    </div>
  );
}