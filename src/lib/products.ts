// Limbs.co — Product catalog seed data
// 5 designs × 4 sizes = 20 SKUs

import type { Product, ProductVariant } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "cropped-tee-black",
    name: "Cropped Tee — Black",
    collection: "regular",
    color: "Black",
    color_hex: "#0a0a0a",
    price: 799,
    description: "Premium cropped t-shirt in black. Part of the Limbs.co regular collection.",
    images: [
      "/products/regular/black-flatlay.jpg",
      "/products/regular/black-flatlay-2.jpg",
      "/products/regular/black-lifestyle.jpg",
    ],
    is_active: true,
    is_drop: false,
    created_at: "2026-08-16T00:00:00Z",
  },
  {
    id: "p2",
    slug: "cropped-tee-cream-white",
    name: "Cropped Tee — Cream White",
    collection: "regular",
    color: "Cream White",
    color_hex: "#f5f0e6",
    price: 799,
    description: "Premium cropped t-shirt in cream white. Part of the Limbs.co regular collection.",
    images: [
      "/products/regular/cream-flatlay.jpg",
      "/products/regular/cream-lifestyle.jpg",
    ],
    is_active: true,
    is_drop: false,
    created_at: "2026-08-16T00:00:00Z",
  },
  {
    id: "p3",
    slug: "cropped-tee-first-collection-a-black",
    name: "Cropped Tee — First Collection A (Black)",
    collection: "first_collection",
    color: "Black",
    color_hex: "#0a0a0a",
    price: 819,
    description: "First Collection design A on black cropped tee. Limited drop.",
    images: [
      "/products/first-collection/a-black-flatlay.jpg",
      "/products/first-collection/a-black-lifestyle.jpg",
    ],
    is_active: true,
    is_drop: true,
    created_at: "2026-08-16T00:00:00Z",
  },
  {
    id: "p4",
    slug: "cropped-tee-first-collection-b-white",
    name: "Cropped Tee — First Collection B (White)",
    collection: "first_collection",
    color: "White",
    color_hex: "#ffffff",
    price: 819,
    description: "First Collection design B on white cropped tee. Limited drop.",
    images: [
      "/products/first-collection/b-white-flatlay.jpg",
    ],
    is_active: true,
    is_drop: true,
    created_at: "2026-08-16T00:00:00Z",
  },
  {
    id: "p5",
    slug: "cropped-tee-first-collection-c-dark-gray",
    name: "Cropped Tee — First Collection C (Dark Gray)",
    collection: "first_collection",
    color: "Dark Gray",
    color_hex: "#3a3a3a",
    price: 819,
    description: "First Collection design C on dark gray cropped tee. Limited drop.",
    images: [
      "/products/first-collection/c-gray-flatlay.jpg",
    ],
    is_active: true,
    is_drop: true,
    created_at: "2026-08-16T00:00:00Z",
  },
];

const SIZES: ProductVariant["size"][] = ["S", "M", "L", "XL"];

export const VARIANTS: ProductVariant[] = PRODUCTS.flatMap((product) =>
  SIZES.map((size, i) => ({
    id: `${product.id}-${size.toLowerCase()}`,
    product_id: product.id,
    size,
    stock: 5, // Default stock per variant — client adjusts via admin
    sku: `${product.slug.toUpperCase().replace(/-/g, "-")}-${size}`,
    is_preorder: false,
  }))
);

// Bicol region provinces for shipping calculation
export const BICOL_PROVINCES = [
  "albay",
  "camarines sur",
  "camarines norte",
  "sorsogon",
  "masbate",
  "catanduanes",
];

export function getShippingFee(region: "bicol" | "national"): number {
  return region === "bicol" ? 60 : 120; // J&T rates estimate
}

export function getShippingTime(region: "bicol" | "national"): string {
  return region === "bicol" ? "2-3 business days" : "up to 7 business days";
}

export function determineRegion(province: string): "bicol" | "national" {
  return BICOL_PROVINCES.includes(province.toLowerCase()) ? "bicol" : "national";
}