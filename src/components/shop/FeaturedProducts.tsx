"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getProductImage, formatPrice } from "@/lib/honeyTypes";

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
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // ── Filter: category bubble + search ──────────────────────────────────
  const filteredProducts = products.filter((p) => {
    // Category match — "Shop All" shows everything
    // Compare filter value against honey_type stored in DB (exact, case-insensitive)
    const catMatch =
      filter === "Shop All" ||
      (p.honey_type || p.category_id || "")
        .toLowerCase()
        .trim() === filter.toLowerCase().trim();

    // Search match
    const q = searchQuery.trim().toLowerCase();
    const searchMatch =
      !q ||
      [p.name, p.description, p.honey_type, p.category_id]
        .filter(Boolean)
        .some((f: string) => f.toLowerCase().includes(q));

    return catMatch && searchMatch;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      // Price is stored as plain INR — use as-is
      price: Number(product.discount_price || product.price) || 0,
      quantity: 1,
      image: getProductImage(product),
    });
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    router.push("/checkout");
  };

  // ── Skeleton ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="py-12 bg-neutral-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-neutral-100 animate-pulse">
                <div className="aspect-[3/4] bg-neutral-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-neutral-100 rounded w-1/2 mx-auto" />
                  <div className="h-4 bg-neutral-100 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-neutral-100 rounded w-1/3 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <section className="py-12 bg-neutral-50 w-full min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-sm font-bold text-neutral-400 mb-8 uppercase tracking-widest">
          {filteredProducts.length === products.length
            ? `${products.length} product${products.length !== 1 ? "s" : ""}`
            : `${filteredProducts.length} of ${products.length} products`}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-neutral-100">
            <p className="text-4xl mb-4">🍯</p>
            <p className="italic text-neutral-400">
              {products.length === 0
                ? "No products yet — add some from the admin panel."
                : "No products match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {filteredProducts.map((product, idx) => {
              const imgSrc       = getProductImage(product, idx);
              const regularPrice = Number(product.price) || 0;
              const salePrice    = product.discount_price ? Number(product.discount_price) : null;
              const displayPrice = salePrice ?? regularPrice;
              const discountPct  = salePrice && regularPrice > 0
                ? Math.round((1 - salePrice / regularPrice) * 100)
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

                    {discountPct && discountPct > 0 && (
                      <div className="absolute top-4 right-4 bg-brand-rust text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">
                        -{discountPct}%
                      </div>
                    )}
                    {product.lab_report_url && (
                      <div className="absolute top-4 left-4 bg-brand-green text-white px-2 py-1 text-[9px] font-black uppercase tracking-tight rounded-sm flex items-center gap-1">
                        🧪 Lab Tested
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow text-center">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">
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

                    {/* Price — stored as INR, displayed as-is */}
                    <div className="mb-4">
                      {salePrice ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-neutral-400 line-through font-medium">
                            {formatPrice(regularPrice)}
                          </span>
                          <span className="text-lg font-black text-brand-rust tracking-tight">
                            {formatPrice(salePrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-black text-neutral-900">
                          {formatPrice(regularPrice)}
                        </span>
                      )}
                    </div>

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
