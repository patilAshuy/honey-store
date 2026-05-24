"use client";
import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="space-y-8 font-inter">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Orders</h1>
        <p className="text-neutral-500">Track and manage customer orders.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic font-normal">
              <tr>
                <th className="px-8 py-5 font-normal">Order Details</th>
                <th className="px-8 py-5 font-normal">Customer</th>
                <th className="px-8 py-5 font-normal">Amount</th>
                <th className="px-8 py-5 font-normal">Status</th>
                <th className="px-8 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-neutral-400 italic">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-neutral-400 italic">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-neutral-100 rounded-xl text-neutral-400">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-neutral-400">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-neutral-900">{order.shipping_address?.name || "Guest"}</p>
                      <p className="text-xs text-neutral-400">{order.shipping_address?.email || "No email"}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-neutral-900">₹ {order.total_amount}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-brand-green hover:bg-neutral-50 rounded-lg transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
