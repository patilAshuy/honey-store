"use client";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import FilterDrawer from "@/components/shop/FilterDrawer";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = [
    { name: "Shop All", icon: "🍯" },
    { name: "Raw Honey", icon: "🐝" },
    { name: "Forest Honey", icon: "🌳" },
    { name: "A2 Ghee", icon: "🥛" },
    { name: "Comb Honey", icon: "🧇" },
  ];

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Bubbles */}
        <div className="flex overflow-x-auto pb-8 mb-12 scrollbar-hide gap-6 justify-center">
          {categories.map((cat) => (
            <button key={cat.name} className="flex flex-col items-center space-y-3 min-w-[100px] group transition-all">
              <div className="w-20 h-20 rounded-full border-2 border-brand-green flex items-center justify-center text-3xl group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm">
                {cat.icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-green">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-y border-neutral-100 py-6">
          <div className="text-sm font-bold text-neutral-400 italic">
            Showing 18 products
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-6 py-2 border border-brand-green rounded-full text-xs font-bold uppercase tracking-widest text-brand-green hover:bg-brand-green hover:text-white transition-all"
            >
              <Filter size={14} />
              <span>Filter and Sort</span>
            </button>
          </div>
        </div>

        <FeaturedProducts />
        <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>
    </div>
  );
}


