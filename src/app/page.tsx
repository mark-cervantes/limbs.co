import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const firstCollection = PRODUCTS.filter((p) => p.collection === "first_collection");
  const regularCollection = PRODUCTS.filter((p) => p.collection === "regular");

  return (
    <div className="bg-black text-white">
      {/* Hero — bone "L" centerpiece */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

        <div className="text-center max-w-2xl relative z-10">
          {/* Large bone "L" illustration */}
          <img
            src="/brand/logo-bone-hero.png"
            alt="Limbs.co"
            className="w-48 md:w-72 h-auto mx-auto mb-10 opacity-90"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,0.08))" }}
          />
          <p
            className="text-xl md:text-2xl text-[#999] italic mb-10 tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            At first, everything was just an idea
          </p>
          <Link href="/shop" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* First Collection */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-3xl md:text-4xl text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            First Collection
          </h2>
          <Link
            href="/shop?collection=first_collection"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {firstCollection.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`} className="product-card group">
              <div className="aspect-square bg-[#111] border border-[#2a2a2a] flex items-center justify-center mb-3 overflow-hidden">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[#333] text-sm uppercase tracking-widest">
                    {product.color}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-white truncate">{product.name}</h3>
                <span className="text-sm text-[#999] ml-2">P{product.price}</span>
              </div>
              <p className="text-xs text-[#555] mt-1">{product.color}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Regular Collection */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-3xl md:text-4xl text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Regular
          </h2>
          <Link
            href="/shop?collection=regular"
            className="text-xs uppercase tracking-widest text-[#999] hover:text-white transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {regularCollection.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`} className="product-card group">
              <div className="aspect-square bg-[#111] border border-[#2a2a2a] flex items-center justify-center mb-3 overflow-hidden">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[#333] text-sm uppercase tracking-widest">
                    {product.color}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-white truncate">{product.name}</h3>
                <span className="text-sm text-[#999] ml-2">P{product.price}</span>
              </div>
              <p className="text-xs text-[#555] mt-1">{product.color}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Lifestyle section */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[#2a2a2a]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/brand/street-shot-1.jpg"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/brand/street-shot-2.jpg"
              alt="Lifestyle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="px-6 py-32 text-center">
        <p
          className="text-2xl md:text-4xl text-[#999] italic max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;At first, everything was just an idea&rdquo;
        </p>
      </section>
    </div>
  );
}