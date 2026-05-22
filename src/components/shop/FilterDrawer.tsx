"use client";
import React from "react";
import { X, ChevronDown } from "lucide-react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#1a5f3a]">Filter and Sort</h2>
            <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <X size={24} className="text-[#1a5f3a]" />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-8">
            {/* Sorting */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Sort By</h3>
              <select className="w-full p-4 bg-neutral-50 rounded-2xl border-transparent focus:ring-2 focus:ring-brand-green font-bold text-sm">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            
            {/* Filter Group */}
            <div className="space-y-4">
              <div className="flex justify-between items-center group cursor-pointer">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1a5f3a]">Product Type</h3>
                <ChevronDown size={18} />
              </div>
              <div className="space-y-3 pl-2">
                {["Raw Honey", "Infused Honey", "Ghee", "Comb Honey"].map((type) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 text-brand-green focus:ring-brand-green" />
                    <span className="text-sm font-medium text-neutral-600 group-hover:text-brand-green transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center group cursor-pointer">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#1a5f3a]">Availability</h3>
                <ChevronDown size={18} />
              </div>
              <div className="space-y-3 pl-2">
                {["In Stock", "Out of Stock"].map((status) => (
                  <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-neutral-300 text-brand-green focus:ring-brand-green" />
                    <span className="text-sm font-medium text-neutral-600 group-hover:text-brand-green transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-neutral-100 bg-neutral-50">
            <div className="flex gap-4">
              <button className="flex-grow py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                Apply Filters
              </button>
              <button className="flex-grow py-4 border-2 border-neutral-200 text-neutral-500 rounded-full font-bold uppercase tracking-widest text-xs hover:border-neutral-300 transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
