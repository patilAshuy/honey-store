"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const PRODUCTS = [
  {
    id: 1,
    name: "Pure Himalayan Raw Honey",
    price: 32.00,
    discountPrice: 28.00,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop",
    category: "Raw Honey",
    weight: "500g"
  },
  {
    id: 2,
    name: "Wild Forest Oak Honey",
    price: 45.00,
    discountPrice: 38.00,
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1610450530750-f80e0413008c?q=80&w=800&auto=format&fit=crop",
    category: "Forest Honey",
    weight: "250g"
  },
  {
    id: 3,
    name: "Golden Comb Honey",
    price: 24.00,
    discountPrice: null,
    rating: 5.0,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1471943038886-981f9b370607?q=80&w=800&auto=format&fit=crop",
    category: "Comb Honey",
    weight: "300g"
  },
  {
    id: 4,
    name: "Pure Premium A2 Ghee",
    price: 52.00,
    discountPrice: 48.00,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=800&auto=format&fit=crop",
    category: "A2 Ghee",
    weight: "1kg"
  }
];

const FeaturedProducts = ({ filter = "Shop All", searchQuery = "" }: { filter?: string, searchQuery?: string }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.image
    });
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.image
    });
    router.push("/checkout");
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesFilter = filter === "Shop All" || p.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-12 bg-neutral-50 w-full min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-bold text-neutral-400 mb-8 uppercase tracking-widest">
          Showing {filteredProducts.length} of {filteredProducts.length} products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col h-full bg-white border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div 
                className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
