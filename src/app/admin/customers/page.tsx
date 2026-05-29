"use client";
import React, { useState, useEffect } from "react";
import { Search, Mail, Phone, ShoppingBag, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/honeyTypes";

type Customer = {
  email: string;
  name: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrder: string;
};

type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
};

export default function AdminCustomers() {
  const [customers, setCustomers]     = useState<Customer[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading]         = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab]                 = useState<"customers" | "subscribers">("customers");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build customer list from orders
        const { data: orders } = await supabase
          .from("orders")
          .select("customer_name, customer_email, customer_phone, total_amount, status, created_at")
          .neq("status", "cancelled")
          .order("created_at", { ascending: false });

        if (orders) {
          const map: Record<string, Customer> = {};
          orders.forEach((o) => {
            const key = o.customer_email || o.customer_name;
            if (!key) return;
            if (!map[key]) {
              map[key] = {
                email: o.customer_email || "",
                name: o.customer_name || "Guest",
                phone: o.customer_phone || "",
                orderCount: 0,
                totalSpent: 0,
                lastOrder: o.created_at,
              };
            }
            map[key].orderCount += 1;
            map[key].totalSpent += Number(o.total_amount);
            if (o.created_at > map[key].lastOrder) map[key].lastOrder = o.created_at;
          });
          setCustomers(Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent));
        }

        // Subscribers
        const { data: subs } = await supabase
          .from("subscribers")
          .select("*")
          .order("subscribed_at", { ascending: false });
        if (subs) setSubscribers(subs);
      } catch (err) {
        console.error("Customers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-inter">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 font-outfit">Customers</h1>
        <p className="text-neutral-500 text-sm mt-1">
          {customers.length} customers · {subscribers.length} newsletter subscribers
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["customers", "subscribers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              tab === t
                ? "bg-brand-green text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-brand-green hover:text-brand-green"
            }`}
          >
            {t === "customers" ? `Customers (${customers.length})` : `Subscribers (${subscribers.length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
        <input
          type="text"
          placeholder={tab === "customers" ? "Search by name, email, phone..." : "Search by email..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green text-sm font-medium text-neutral-800"
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-7 h-7 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === "customers" ? (
          filteredCustomers.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="italic">{customers.length === 0 ? "No customers yet." : "No customers match your search."}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-100">
                  <tr>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Orders</th>
                    <th className="px-5 py-3 font-medium">Total Spent</th>
                    <th className="px-5 py-3 font-medium">Last Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filteredCustomers.map((c, i) => (
                    <tr key={i} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-sm flex-shrink-0">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <p className="font-bold text-neutral-900 text-sm">{c.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <Mail size={11} /> {c.email || "—"}
                          </div>
                          {c.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                              <Phone size={11} /> {c.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-900">
                          <ShoppingBag size={14} className="text-neutral-400" />
                          {c.orderCount}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold text-brand-green text-sm">
                        {formatPrice(c.totalSpent)}
                      </td>
                      <td className="px-5 py-4 text-xs text-neutral-500">
                        {new Date(c.lastOrder).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Subscribers tab */
          filteredSubscribers.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Mail size={40} className="mx-auto mb-3 opacity-30" />
              <p className="italic">{subscribers.length === 0 ? "No subscribers yet." : "No subscribers match your search."}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-neutral-400 text-xs uppercase tracking-wider border-b border-neutral-100">
                  <tr>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Subscribed On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
                          <Mail size={14} className="text-neutral-400" />
                          {s.email}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-neutral-500">
                        {new Date(s.subscribed_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
