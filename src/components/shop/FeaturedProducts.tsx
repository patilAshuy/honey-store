"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Map local images to honey types so products always have a fallback image
const LOCAL_IMAGES: Record<string, string[]> = {
  "jamun":    [
    "/images/PI Jamun Honey 1.jpg.jpeg",
    "/images/PI Jamun Honey 2.jpg.jpeg",
    "/images/PI Jamun Honey 3.jpg.jpeg",
  ],
  "sidr":     [
    "/images/PI Apple Sidr Honey 1.jpg.jpeg",
    "/images/PI Apple Sidr Honey 2.jpg.jpeg",
    "/images/PI Apple Sidr Honey 3.jpg.jpeg",
  ],
  "forest":   [
    "/images/PI Forest Honey 1.jpg.jpeg",
    "/images/PI Forest Honey 2.jpg.jpeg",
    "/images/PI Forest Honey 3.jpg.jpeg",
  ],
  "mustard":  [
    "/images/PI Mustard Honey 1.jpg.jpeg",
    "/images/PI Mustard Honey 2.jpg.jpeg",
    "/images/PI Mustard Honey 3.jpg.jpeg",
  ],
  "tulsi":    [
    "/images/PI Tulsi Honey 1.jpg.jpeg",
    "/images/PI Tulsi Honey 2.jpg.jpeg",
    "/images/PI Tulsi Honey 3.jpg.jpeg",
  ],
  "default":  [
    "/images/Believe Honey One A.jpg.jpeg",
    "/images/Believe Honey One B.jpg.jpeg",
    "/images/Believe Honey One C.jpg.jpeg",
    "/images/Believe Honey One D.jpg.jpeg",
    "/images/Believe Honey One E.jpg.jpeg",
  ],
};

function getProductImage(product: any, index = 0): string {
  // 1. Use stored image if it's a real URL (not empty/null)
  const stored = product.images?.[0];
  if (stored && stored.startsWith("http")) return stored;
  if (stored && stored.startsWith("/")) return stored;

  // 2. Fall back to local images based on honey_type or category
  const type = (product.honey_type || product.category_id || "").toLowerCase();
  for (const [key, imgs] of Object.entries(LOCAL_IMAGES)) {
    if (type.includes(key)) return imgs[index % imgs.length];
  }
  return LOCAL_IMAGES.default[index % LOCAL_IMAGES.default.length];
}

const FeaturedProducts = ({
  filter = "Shop All",
  searchQuery = "",
}: {
  filter?: string;
  searchQuery?: string;
}) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active");

      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.discount_price || product.price,
      quantity: 1,
      image: getProductImage(product),
    });
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    router.push("/checkout");
  };

  // ── Filter logic ──────────────────────────────────────────────────────────
  // Matches against: honey_type, category_id (text slug), name, description
  const filteredProducts = products.filter((p) => {
    const matchesFilter =
      filter === "Shop All" ||
      [p.honey_type, p.category_id, p.category, p.name]
        .filter(Boolean)
        .some((field: string) =>
          field.toLowerCase().includes(filter.toLowerCase())
        );

    const matchesSearch =
      !searchQuery ||
      [p.name, p.description, p.honey_type, p.category_id]
        .filter(Boolean)
        .some((field: string) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-neutral-50 w-full min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-bold text-neutral-400 mb-8 uppercase tracking-widest">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-neutral-100 italic text-neutral-400">
            {products.length === 0
              ? "No products in the database yet. Add products from the admin panel."
              : "No products match your search or filter."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {filteredProducts.map((product, idx) => {
              const imgSrc = getProductImage(product, idx);
              const displayPrice = product.discount_price || product.price;
              const originalPrice = product.discount_price ? product.price : null;
              const discountPct =
                originalPrice
                  ? Math.round((1 - displayPrice / originalPrice) * 100)
                  : null;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col h-full bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {discountPct && (
                      <div className="absolute top-4 right-4 bg-brand-rust text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">
                        -{discountPct}%
                      </div>
                    )}

                    {/* Lab report badge */}
                    {product.lab_report_url && (
                      <div className="absolute top-4 left-4 bg-brand-green text-white px-2 py-1 text-[9px] font-black uppercase tracking-tight rounded-sm flex items-center gap-1">
                        🧪 Lab Tested
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2 font-inter">
                      Love of Honey
                    </p>
                    <h3 className="text-sm font-bold text-neutral-900 mb-2 leading-snug group-hover:text-brand-green transition-colors px-4 min-h-[3rem] flex items-center justify-center">
                      <Link href={`/products/${product.id}`}>{product.name}</Link>
                    </h3>

                    <div className="flex items-center justify-center space-x-1 text-brand-amber mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                      <span className="text-[11px] text-neutral-400 font-bold ml-1">(4.8)</span>
                    </div>

                    <div className="mb-4">
                      {originalPrice ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-neutral-400 line-through font-medium">
                            ₹{originalPrice}
                          </span>
                          <span className="text-lg font-black text-brand-rust tracking-tight">
                            ₹{displayPrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-black text-neutral-900">
                          ₹{displayPrice}
                        </span>
                      )}
                    </div>

                    {/* Lab report link */}
                    {product.lab_report_url && (
                      <a
                        href={product.lab_report_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-brand-green underline underline-offset-2 mb-3 hover:text-brand-amber transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🧪 View Lab Report
                      </a>
                    )}

                    <div className="mt-auto space-y-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-3 border-2 border-brand-green text-brand-green rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full py-3 bg-brand-green text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
