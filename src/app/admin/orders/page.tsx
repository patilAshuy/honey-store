import React from "react";
import { Search, Filter, Eye, Download } from "lucide-react";

export default function AdminOrders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Orders</h1>
          <p className="text-neutral-500">Track and manage customer orders.</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by Order ID or Name..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
            />
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button className="flex items-center space-x-2 px-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-100 font-bold text-neutral-600">
              <Filter size={18} />
              <span>Status</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic">
              <tr>
                <th className="px-8 py-5 font-normal">Order ID</th>
                <th className="px-8 py-5 font-normal">Customer</th>
                <th className="px-8 py-5 font-normal">Date</th>
                <th className="px-8 py-5 font-normal">Amount</th>
                <th className="px-8 py-5 font-normal">Status</th>
                <th className="px-8 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-neutral-900">#ORD-202{i}</td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-neutral-900">Johnathan Doe</p>
                    <p className="text-xs text-neutral-500">john@example.com</p>
                  </td>
                  <td className="px-8 py-6 text-neutral-500">22 May, 2026</td>
                  <td className="px-8 py-6 font-bold text-neutral-900">$45.99</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase">Processing</span>
                  </td>
                  <td className="px-8 py-6 text-right text-primary-600">
                    <button className="p-2 hover:bg-primary-50 rounded-lg transition-all"><Eye size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
