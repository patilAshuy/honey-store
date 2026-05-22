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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-neutral-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{product.category}</span>
                  <div className="flex items-center text-amber-400">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-sm font-bold text-neutral-900">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-sm text-neutral-500 mb-4">{product.weight}</p>
                
                <div className="mt-auto flex justify-between items-center">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-neutral-900">${product.discountPrice}</span>
                        <span className="text-sm text-neutral-400 line-through">${product.price}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-neutral-900">${product.price}</span>
                    )}
                  </div>
                  <button className="p-3 bg-neutral-900 text-white rounded-2xl hover:bg-primary-600 transition-all hover:shadow-lg active:scale-90">
                    <ShoppingCart size={20} />
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
