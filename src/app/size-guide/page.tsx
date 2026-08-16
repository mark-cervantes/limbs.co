export const metadata = { title: "Size Guide — Limbs.co" };

export default function SizeGuidePage() {
  const sizes = [
    { size: "S", chest: 36, length: 25, shoulder: 17 },
    { size: "M", chest: 38, length: 26, shoulder: 18 },
    { size: "L", chest: 40, length: 27, shoulder: 19 },
    { size: "XL", chest: 42, length: 28, shoulder: 20 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-5xl text-white mb-8"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Size Guide
      </h1>

      <p className="text-sm text-[#999] mb-8">
        All measurements are in inches. Our cropped tees have a relaxed,
        slightly oversized fit. If you&apos;re between sizes, we recommend
        sizing down for a more fitted look or sizing up for an oversized fit.
      </p>

      <div className="border border-[#2a2a2a] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              <th className="text-left p-4 text-xs uppercase tracking-widest text-[#555]">Size</th>
              <th className="text-left p-4 text-xs uppercase tracking-widest text-[#555]">Chest</th>
              <th className="text-left p-4 text-xs uppercase tracking-widest text-[#555]">Length</th>
              <th className="text-left p-4 text-xs uppercase tracking-widest text-[#555]">Shoulder</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((row) => (
              <tr key={row.size} className="border-b border-[#2a2a2a] last:border-0">
                <td className="p-4 text-white">{row.size}</td>
                <td className="p-4 text-[#999]">{row.chest}&quot;</td>
                <td className="p-4 text-[#999]">{row.length}&quot;</td>
                <td className="p-4 text-[#999]">{row.shoulder}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[#555] mt-6">
        Note: Measurements may vary slightly (+/- 1 inch) due to the manufacturing process.
        These are approximate guides, not exact specifications.
      </p>
    </div>
  );
}