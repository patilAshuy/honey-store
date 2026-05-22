"use client";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import FilterDrawer from "@/components/shop/FilterDrawer";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Shop All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Shop All", icon: "🍯" },
    { name: "Raw Honey", icon: "🐝" },
    { name: "Forest Honey", icon: "🌳" },
    { name: "A2 Ghee", icon: "🥛" },
    { name: "Comb Honey", icon: "🧇" },
  ];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Bubbles */}
        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => setCurrentFilter(cat.name)}
              className={`flex flex-col items-center space-y-3 min-w-[100px] group transition-all ${
                currentFilter === cat.name ? "scale-110" : "opacity-60"
              }`}
            >
              <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl transition-all shadow-sm ${
                currentFilter === cat.name ? "border-brand-green bg-brand-green/5 shadow-brand-green/20" : "border-neutral-200 group-hover:border-brand-green/30"
              }`}>
                {cat.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest text-[#1a5f3a] ${
                currentFilter === cat.name ? "opacity-100" : "opacity-70"
              }`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-10 border-t border-neutral-100 gap-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search honey..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all font-medium text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-6 py-2 border border-brand-green rounded-full text-xs font-bold uppercase tracking-widest text-brand-green hover:bg-brand-green hover:text-white transition-all"
            >
              <Filter size={14} />
              <span>Filter and Sort</span>
            </button>
          </div>
        </div>

        <FeaturedProducts filter={currentFilter} searchQuery={searchQuery} />
        <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>
    </div>
  );
}
