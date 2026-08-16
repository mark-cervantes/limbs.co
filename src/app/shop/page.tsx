import { PRODUCTS } from "@/lib/products";
import type { ProductCollection } from "@/lib/types";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const params = await searchParams;
  const collection = params.collection as ProductCollection | undefined;

  const products = collection
    ? PRODUCTS.filter((p) => p.collection === collection)
    : PRODUCTS;

  const collectionLabel =
    collection === "first_collection"
      ? "First Collection"
      : collection === "regular"
        ? "Regular"
        : "All Products";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="text-4xl md:text-5xl text-white mb-2"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {collectionLabel}
      </h1>
      <p className="text-sm text-[#999] mb-12">
        {products.length} {products.length === 1 ? "item" : "items"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/shop/${product.slug}`}
            className="product-card group"
          >
            <div className="aspect-square bg-[#111] border border-[#2a2a2a] flex items-center justify-center mb-3 overflow-hidden relative">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: product.color_hex }}
                >
                  <span className="text-sm uppercase tracking-widest opacity-30">
                    {product.color}
                  </span>
                </div>
              )}
              {product.is_drop && (
                <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest bg-black/80 text-white px-2 py-1">
                  Drop
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-white truncate">{product.name}</h3>
              <span className="text-sm text-[#999] ml-2">P{product.price}</span>
            </div>
            <p className="text-xs text-[#555] mt-1">{product.color}</p>
          </a>
        ))}
      </div>
    </div>
  );
}