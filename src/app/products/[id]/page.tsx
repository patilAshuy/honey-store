"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, ShieldCheck, Leaf, ArrowLeft, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  
  // Mock product data based on ID
  const product = {
    id: params.id,
    name: "Wildflower Raw Honey",
    description: "Our Wildflower Honey is a true taste of nature's diversity. Harvested from pristine wildflower meadows, this honey offers a rich, complex flavor profile that changes with the seasons.",
    price: 24.99,
    rating: 4.8,
    reviews: 124,
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop"],
    weight: "500g",
    type: "Raw Organic",
    skus: "WF-001",
    benefits: ["Rich in antioxidants", "Natural energy booster", "Soothes sore throats"],
    availability: "In Stock"
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="flex items-center space-x-2 text-neutral-500 hover:text-brand-green transition-colors mb-8 group w-fit text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white border border-neutral-100 shadow-xl">
              <img src={product.images[0]} className="w-full h-full object-cover" alt={product.name} />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider rounded-full">{product.type}</span>
                <span className="text-green-600 flex items-center text-xs font-bold uppercase tracking-wider"><Leaf size={14} className="mr-1" /> Sustainable</span>
              </div>
              <h1 className="text-5xl font-bold font-outfit text-neutral-900 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-brand-amber">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
                <span className="text-neutral-400 font-bold ml-1">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-4xl font-bold text-neutral-900">₹ {(product.price * 80).toFixed(2)}</span>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-neutral-100 flex items-center space-x-4 shadow-sm">
                <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green"><ShieldCheck size={24} /></div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Quality</p>
                  <p className="font-bold text-sm">Lab Certified</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-neutral-100 flex items-center space-x-4 shadow-sm">
                <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green"><Package className="text-primary-600" /></div>
                <div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Weight</p>
                  <p className="font-bold text-sm">{product.weight}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn-primary flex-grow h-16 flex items-center justify-center space-x-3 text-lg"
                >
                  <ShoppingCart size={22} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-100">
              <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-neutral-400">Honey Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center text-neutral-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-amber rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Package = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
