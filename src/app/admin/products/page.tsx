"use client";
import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, Filter, ChevronRight } from "lucide-react";

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Products</h1>
          <p className="text-neutral-500">Manage your honey inventory and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2 shadow-primary-200"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
            />
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button className="flex items-center space-x-2 px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-100 font-bold text-neutral-600 hover:bg-neutral-100 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <select className="px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-100 font-bold text-neutral-600 focus:outline-none">
              <option>All Categories</option>
              <option>Organic</option>
              <option>Premium</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic font-normal">
              <tr>
                <th className="px-8 py-5 font-normal">Product Details</th>
                <th className="px-8 py-5 font-normal">Category</th>
                <th className="px-8 py-5 font-normal">Price</th>
                <th className="px-8 py-5 font-normal">Stock</th>
                <th className="px-8 py-5 font-normal">Status</th>
                <th className="px-8 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl overflow-hidden shadow-inner"></div>
                      <div>
                        <p className="font-bold text-neutral-900">Manuka Honey {i}</p>
                        <p className="text-xs text-neutral-500">SKU: MH-{100+i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-neutral-600">Premium</td>
                  <td className="px-8 py-6 font-bold text-neutral-900">$39.99</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-neutral-900">45</span>
                      <span className="text-xs text-neutral-400">units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">Active</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                      <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-neutral-50 flex justify-between items-center">
          <p className="text-sm text-neutral-500">Showing 1 to 4 of 24 products</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-xl border border-neutral-100 disabled:opacity-50 hover:bg-neutral-50"><ChevronRight size={18} className="rotate-180" /></button>
            <button className="w-10 h-10 rounded-xl bg-primary-600 text-white font-bold">1</button>
            <button className="w-10 h-10 rounded-xl hover:bg-neutral-50 font-bold">2</button>
            <button className="p-2 rounded-xl border border-neutral-100 hover:bg-neutral-50"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
