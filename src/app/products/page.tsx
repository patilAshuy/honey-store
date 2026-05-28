"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import FeaturedProducts from "@/components/shop/FeaturedProducts";

const categories = [
  { name: "Shop All", icon: "🍯" },
  { name: "Jamun",    icon: "🫐" },
  { name: "Sidr",     icon: "🌿" },
  { name: "Forest",   icon: "🌳" },
  { name: "Mustard",  icon: "🌻" },
  { name: "Tulsi",    icon: "🌱" },
  { name: "Raw Honey",icon: "🐝" },
];

export default function ProductsPage() {
  const [currentFilter, setCurrentFilter] = useState("Shop All");
  const [searchQuery, setSearchQuery]     = useState("");

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category bubbles */}
        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCurrentFilter(cat.name)}
              className={`flex flex-col items-center space-y-3 min-w-[90px] group transition-all ${
                currentFilter === cat.name ? "scale-110" : "opacity-60"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl transition-all shadow-sm ${
                  currentFilter === cat.name
                    ? "border-brand-green bg-brand-green/5 shadow-brand-green/20"
                    : "border-neutral-200 group-hover:border-brand-green/30"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest text-[#1a5f3a] ${
                  currentFilter === cat.name ? "opacity-100" : "opacity-70"
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Search bar only — filter drawer removed */}
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
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors text-lg leading-none"
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
