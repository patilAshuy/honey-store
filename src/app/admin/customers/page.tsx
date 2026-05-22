import React from "react";
import { Search, Mail, MoreHorizontal } from "lucide-react";

export default function AdminCustomers() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Customers</h1>
        <p className="text-neutral-500">View and manage your honey enthusiasts.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic">
              <tr>
                <th className="px-8 py-5 font-normal">Customer</th>
                <th className="px-8 py-5 font-normal">Orders</th>
                <th className="px-8 py-5 font-normal">Total Spent</th>
                <th className="px-8 py-5 font-normal">Joined</th>
                <th className="px-8 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">C</div>
                      <div>
                        <p className="font-bold text-neutral-900">Premium Bee {i}</p>
                        <p className="text-xs text-neutral-500">bee{i}@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-medium text-neutral-600">{i + 2} Orders</td>
                  <td className="px-8 py-6 font-bold text-neutral-900">${(i + 1) * 25}.80</td>
                  <td className="px-8 py-6 text-neutral-500">Jan 22, 2026</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-all"><MoreHorizontal size={20} /></button>
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
