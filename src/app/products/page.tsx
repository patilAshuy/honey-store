import React from "react";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import { Filter, Search } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold font-outfit text-neutral-900">Our Honey Collection</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            From the deep forests to the wildflower meadows, explore our range of pure, organic honey varieties.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {["All Honey", "Raw Organic", "Manuka Premium", "Special Reserve", "Bee Pollen"].map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                    <span className="group-hover:text-primary-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Price Range</h3>
              <input type="range" className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              <div className="flex justify-between mt-2 text-sm text-neutral-500 font-medium">
                <span>$10</span>
                <span>$200</span>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <div className="relative w-full max-w-md">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search your favorite honey..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-sm text-neutral-400 italic">Sort by:</span>
                <select className="bg-transparent font-bold text-neutral-900 focus:outline-none cursor-pointer">
                  <option>Featured First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <FeaturedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
