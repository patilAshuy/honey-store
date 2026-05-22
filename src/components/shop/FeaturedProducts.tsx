"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Wildflower Raw Honey",
    price: 24.99,
    discountPrice: 19.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    category: "Organic",
    weight: "500g"
  },
  {
    id: 2,
    name: "Manuka Honey UMF 15+",
    price: 45.00,
    discountPrice: 39.99,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop",
    category: "Premium",
    weight: "250g"
  },
  {
    id: 3,
    name: "Clover Blossom Honey",
    price: 18.00,
    discountPrice: 14.99,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1471943038886-981f9b370607?q=80&w=800&auto=format&fit=crop",
    category: "Classic",
    weight: "500g"
  },
  {
    id: 4,
    name: "Forest Oak Honey",
    price: 28.00,
    discountPrice: null,
    rating: 4.6,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1610450530750-f80e0413008c?q=80&w=800&auto=format&fit=crop",
    category: "Special",
    weight: "400g"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold font-outfit">Our Best Sellers</h2>
            <p className="text-neutral-500">Discover our most loved honey varieties, harvested with care.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center space-x-2 text-primary-600 font-bold border-b-2 border-primary-600 pb-1">
            <span>View All</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col h-full bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Secondary image hover effect mockup */}
                <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {product.discountPrice && (
                  <div className="absolute top-4 right-4 bg-brand-rust text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-sm">
                    UP To -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow text-center">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2 font-inter">Love of Honey</p>
                <h3 className="text-sm font-bold text-neutral-900 mb-2 leading-snug group-hover:text-brand-green transition-colors px-4 min-h-[3rem] flex items-center justify-center">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                
                <div className="flex items-center justify-center space-x-1 text-brand-amber mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-[11px] text-neutral-400 font-bold ml-1">({product.reviews})</span>
                </div>
                
                <div className="mb-6">
                  {product.discountPrice ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-neutral-400 line-through font-medium">₹ {Math.round(product.price * 80)}</span>
                      <span className="text-lg font-black text-brand-rust tracking-tight">₹ {Math.round(product.discountPrice * 80)}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-black text-neutral-900">₹ {Math.round(product.price * 80)}</span>
                  )}
                </div>

                <div className="mt-auto">
                  <button className="w-full py-3 border-2 border-brand-green text-brand-green rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all shadow-sm active:scale-95">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
