"use client";
import React, { useState, useEffect } from "react";
import { Search, Package, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/honeyTypes";

type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  paid:       "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped:    "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders]         = useState<any[]>([]);
  const [filtered, setFiltered]     = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast]           = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    let result = orders;
    if (statusFilter !== "all") result = result.filter((o) => o.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id?.toLowerCase().includes(q) ||
          o.customer_name?.toLowerCase().includes(q) ||
          o.customer_email?.toLowerCase().includes(q) ||
          o.customer_phone?.includes(q)
      );
    }
    setFiltered(result);
  }, [orders, searchQuery, statusFilter]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      showToast("Failed to update status", "error");
    } else {
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast("Order status updated");
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[200] px-5 py-3 rounded-2xl text-white font-bold shadow-xl text-sm ${toast.type === "success" ? "bg-brand-green" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 font-outfit">Orders</h1>
        <p className="text-neutral-500 text-sm mt-1">
          {orders.length} total · {orders.filter((o) => o.status === "pending").length} pending
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              placeholder="Search by order ID, name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green text-sm font-medium text-neutral-800"
            />
          </div>
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green text-sm font-medium text-neutral-800"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-7 h-7 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p className="italic">{orders.length === 0 ? "No orders yet." : "No orders match your search."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="border-t border-neutral-50 hover:bg-neutral-50 transition-colors">
                      {/* Order ID */}
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-bold text-neutral-700">
                          #{order.id.slice(0, 16)}...
                        </p>
                        {order.payment_id && (
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Pay: {order.payment_id.slice(0, 14)}...
                          </p>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="font-bold text-neutral-900 text-sm">{order.customer_name || "—"}</p>
                        <p className="text-xs text-neutral-400">{order.customer_email || "—"}</p>
                        {order.customer_phone && (
                          <p className="text-xs text-neutral-400">{order.customer_phone}</p>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 font-bold text-neutral-900 text-sm">
                        {formatPrice(order.total_amount)}
                      </td>

                      {/* Status — editable dropdown */}
                      <td className="px-5 py-4">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green ${STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600"}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-white text-neutral-800 normal-case text-xs">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs text-neutral-500">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>

                      {/* Expand toggle */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
                        >
                          {expandedId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expandedId === order.id && (
                      <tr className="border-t border-neutral-100 bg-neutral-50">
                        <td colSpan={6} className="px-5 py-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Items */}
                            <div>
                              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                                Items Ordered
                              </p>
                              <div className="space-y-2">
                                {Array.isArray(order.items) && order.items.length > 0
                                  ? order.items.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                      <div className="w-8 h-8 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.image
                                          ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                          : <div className="w-full h-full flex items-center justify-center text-xs">🍯</div>
                                        }
                                      </div>
                                      <span className="flex-1 text-neutral-700">{item.name}</span>
                                      <span className="text-neutral-400 text-xs">×{item.quantity}</span>
                                      <span className="font-bold text-neutral-900">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                  ))
                                  : <p className="text-neutral-400 text-sm italic">No items data</p>
                                }
                              </div>
                            </div>

                            {/* Shipping + Summary */}
                            <div className="space-y-4">
                              {order.shipping_address && (
                                <div>
                                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                    Shipping Address
                                  </p>
                                  <p className="text-sm text-neutral-700">{order.customer_name}</p>
                                  <p className="text-sm text-neutral-500">
                                    {order.shipping_address.address}
                                  </p>
                                  <p className="text-sm text-neutral-500">
                                    {order.shipping_address.city} — {order.shipping_address.pincode}
                                  </p>
                                  <p className="text-sm text-neutral-500">{order.customer_phone}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                  Order Summary
                                </p>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between text-neutral-600">
                                    <span>Shipping</span>
                                    <span>{order.shipping_fee > 0 ? formatPrice(order.shipping_fee) : "Free"}</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-neutral-900 pt-1 border-t border-neutral-200">
                                    <span>Total</span>
                                    <span>{formatPrice(order.total_amount)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
