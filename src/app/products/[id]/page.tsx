"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart, ShieldCheck, Leaf, ArrowLeft, FileText, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { getProductImage, formatPrice } from "@/lib/honeyTypes";

// ── Local image fallbacks (same as honeyTypes.ts) ──────────────────────────
const LOCAL_IMAGES_DETAIL: Record<string, string[]> = {
  jamun:   ["/images/PI Jamun Honey 1.jpg.jpeg", "/images/PI Jamun Honey 2.jpg.jpeg", "/images/PI Jamun Honey 3.jpg.jpeg"],
  sidr:    ["/images/PI Apple Sidr Honey 1.jpg.jpeg", "/images/PI Apple Sidr Honey 2.jpg.jpeg", "/images/PI Apple Sidr Honey 3.jpg.jpeg"],
  forest:  ["/images/PI Forest Honey 1.jpg.jpeg", "/images/PI Forest Honey 2.jpg.jpeg", "/images/PI Forest Honey 3.jpg.jpeg"],
  mustard: ["/images/PI Mustard Honey 1.jpg.jpeg", "/images/PI Mustard Honey 2.jpg.jpeg", "/images/PI Mustard Honey 3.jpg.jpeg"],
  tulsi:   ["/images/PI Tulsi Honey 1.jpg.jpeg", "/images/PI Tulsi Honey 2.jpg.jpeg", "/images/PI Tulsi Honey 3.jpg.jpeg"],
  default: ["/images/Believe Honey One A.jpg.jpeg", "/images/Believe Honey One B.jpg.jpeg", "/images/Believe Honey One C.jpg.jpeg"],
};

function getImages(product: any): string[] {
  const stored: string[] = (product.images || []).filter(
    (img: string) => img && (img.startsWith("http") || img.startsWith("/"))
  );
  if (stored.length > 0) return stored;

  const type = (product.honey_type || product.category_id || "").toLowerCase();
  for (const [key, imgs] of Object.entries(LOCAL_IMAGES_DETAIL)) {
    if (key === "default") continue;
    if (type.startsWith(key) || type.includes(key)) return imgs;
  }
  return LOCAL_IMAGES_DETAIL.default;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();
      if (data) setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-neutral-500 text-lg">Product not found.</p>
        <Link href="/products" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const images = getImages(product);

  // Prices are stored as plain INR — display as-is, no conversion
  const regularPrice = Math.round(Number(product.price) || 0);
  const salePrice    = product.discount_price ? Math.round(Number(product.discount_price)) : null;
  const displayPrice = salePrice ?? regularPrice;
  const originalPrice = salePrice ? regularPrice : null;
  const discountPct = salePrice && regularPrice > 0
    ? Math.round((1 - salePrice / regularPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: displayPrice,
        quantity: 1,
        image: images[0],
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="flex items-center space-x-2 text-neutral-500 hover:text-brand-green transition-colors mb-8 group w-fit text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white border border-neutral-100 shadow-xl">
              <img
                src={images[activeImg]}
                className="w-full h-full object-cover transition-all duration-500"
                alt={product.name}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-brand-green" : "border-neutral-200"
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {product.honey_type && (
                <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.honey_type}
                </span>
              )}
              {product.is_featured && (
                <span className="px-3 py-1 bg-brand-amber/10 text-brand-amber text-xs font-bold uppercase tracking-wider rounded-full">
                  ⭐ Featured
                </span>
              )}
              {product.lab_report_url && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                  🧪 Lab Tested
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-4xl lg:text-5xl font-bold font-outfit text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-brand-amber">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-neutral-400 font-bold text-sm">(4.8 · 124 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-neutral-900">
                {formatPrice(displayPrice)}
              </span>
              {originalPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                    -{discountPct}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Weight */}
            {product.weight && (
              <p className="text-sm text-neutral-400 font-medium">Net Weight: {product.weight}</p>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.stock_quantity > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  product.stock_quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock_quantity > 0
                  ? `In Stock (${product.stock_quantity} left)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity + CTA */}
            {product.stock_quantity > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-4 py-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-neutral-700 hover:bg-neutral-200 transition-colors shadow-sm"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-neutral-900">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.stock_quantity, qty + 1))}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-neutral-700 hover:bg-neutral-200 transition-colors shadow-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-neutral-400">Max {product.stock_quantity}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 border-2 border-brand-green text-brand-green rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-green hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    {added ? "Added! ✓" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {/* Lab Report */}
            {product.lab_report_url && (
              <div className="p-5 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
                    <FileText size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-green text-sm">Lab Test Report</p>
                    <p className="text-xs text-neutral-500">Certified purity & quality analysis</p>
                  </div>
                </div>
                <a
                  href={product.lab_report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-green text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                >
                  View Report
                </a>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-neutral-100 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Quality</p>
                  <p className="font-bold text-sm">Lab Certified</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-neutral-100 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green">
                  <Leaf size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Source</p>
                  <p className="font-bold text-sm">100% Natural</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="font-bold mb-3 uppercase text-xs tracking-widest text-neutral-400">
                  Key Benefits
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((benefit: string) => (
                    <li key={benefit} className="flex items-center text-neutral-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-brand-amber rounded-full mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
