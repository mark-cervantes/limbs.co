import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/brand/logo-wordmark-only.png"
              alt="LIM3S"
              className="h-20 w-auto mb-3 opacity-80"
            />
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#555] mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-[#999] hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=first_collection" className="text-sm text-[#999] hover:text-white transition-colors">
                  First Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=regular" className="text-sm text-[#999] hover:text-white transition-colors">
                  Regular
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#555] mb-4">Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-[#999] hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#999] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-[#999] hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-[#999] hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2a2a2a]">
          <p className="text-xs text-[#555] text-center">
            (c) {new Date().getFullYear()} Limbs.co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}