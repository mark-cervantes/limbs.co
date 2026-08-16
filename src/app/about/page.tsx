export const metadata = { title: "About — Limbs.co" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-5xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        About
      </h1>

      <div className="space-y-6 text-[#999] text-lg leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
        <p>
          Limbs.co began as an idea — a streetwear brand born in the Philippines,
          built around limited drops of cropped tees that speak to those who
          refuse to blend in.
        </p>

        <p>
          Every piece is designed with intention. Our bone-illustration logo
          represents the structure beneath — the skeleton of something that
          grows into its full form.
        </p>

        <p className="text-white italic text-2xl">
          &ldquo;At first, everything was just an idea.&rdquo;
        </p>

        <p>
          We drop in small batches. When it&apos;s gone, it&apos;s gone —
          or it comes back as a pre-order. That&apos;s the model.
          No mass production, no compromises.
        </p>

        <p>
          Based in Bicol, shipping nationwide via J&T Express.
        </p>
      </div>
    </div>
  );
}