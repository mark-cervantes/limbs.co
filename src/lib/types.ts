// Limbs.co — Database schema types
// These define the shape of data whether using Supabase or local PostgreSQL

export type ProductCollection = "regular" | "first_collection";

export type ProductSize = "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: ProductCollection;
  color: string;
  color_hex: string;
  price: number;
  description: string;
  images: string[];
  is_active: boolean;
  is_drop: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: ProductSize;
  stock: number;
  sku: string;
  is_preorder: boolean;
}

export interface CartItem {
  product_id: string;
  product_name: string;
  product_slug: string;
  variant_id: string;
  size: ProductSize;
  color: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export type OrderStatus =
  | "pending_payment"   // BDO: waiting for proof of payment
  | "paid"              // Payment confirmed
  | "processing"        // Being packed
  | "shipped"           // Handed to J&T
  | "delivered"         // Received by customer
  | "cancelled"          // Cancelled
  | "refunded";          // Refund issued

export type PaymentMethod = "gcash" | "bdo_bank_transfer";

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_province: string;
  shipping_region: "bicol" | "national";
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: "pending" | "paid" | "refunded";
  payment_proof_url?: string;  // BDO: uploaded deposit slip
  paymongo_payment_id?: string;  // GCash: PayMongo payment intent ID
  order_status: OrderStatus;
  tracking_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Admin user (simple password-based for MVP)
export interface AdminSession {
  authenticated: boolean;
  login_time: string;
}