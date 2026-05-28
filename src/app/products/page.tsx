"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import { HONEY_TYPES } from "@/lib/honeyTypes";

// "Shop All" + every honey type from the shared list
const categories = [
  { value: "Shop All", label: "Shop All", icon: "🍯" },
  ...HONEY_TYPES.map((t) => ({ value: t.value, label: t.label, icon: t.icon })),
];

export default function ProductsPage() {
  const [currentFilter, setCurrentFilter] = useState("Shop All");
  const [searchQuery, setSearchQuery]     = useState("");

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category bubbles */}
        <div className="flex overflow-x-auto pb-8 gap-4 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCurrentFilter(cat.value)}
              className={`flex flex-col items-center space-y-2 min-w-[80px] group transition-all duration-200 ${
                currentFilter === cat.value ? "scale-110" : "opacity-60 hover:opacity-80"
              }`}
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center text-2xl sm:text-3xl transition-all shadow-sm ${
                  currentFilter === cat.value
                    ? "border-brand-green bg-brand-green/5 shadow-brand-green/20"
                    : "border-neutral-200 group-hover:border-brand-green/30"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#1a5f3a] text-center leading-tight ${
                  currentFilter === cat.value ? "opacity-100" : "opacity-70"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="py-8 border-t border-neutral-100">
          <div className="relative w-full sm:w-96 mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search honey by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all font-medium text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <FeaturedProducts filter={currentFilter} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
