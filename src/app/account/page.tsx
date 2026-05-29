"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/honeyTypes";
import { LogOut, Package, User, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-yellow-100 text-yellow-700", icon: <Clock size={14} /> },
  paid:       { label: "Paid",       color: "bg-blue-100 text-blue-700",    icon: <CheckCircle size={14} /> },
  processing: { label: "Processing", color: "bg-purple-100 text-purple-700",icon: <Package size={14} /> },
  shipped:    { label: "Shipped",    color: "bg-indigo-100 text-indigo-700",icon: <Truck size={14} /> },
  delivered:  { label: "Delivered",  color: "bg-green-100 text-green-700",  icon: <CheckCircle size={14} /> },
  cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-700",      icon: <XCircle size={14} /> },
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login?next=/account"); return; }
      setUser(session.user);

      // Fetch orders for this user by email
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", session.user.email)
        .order("created_at", { ascending: false });
      if (data) setOrders(data);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="pt-40 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold font-outfit text-neutral-900">My Account</h1>
            <p className="text-neutral-500 mt-1">{user?.email}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-2xl">
              {(user?.user_metadata?.full_name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-neutral-900 text-xl">
                {user?.user_metadata?.full_name || "Customer"}
              </p>
              <p className="text-neutral-500 text-sm">{user?.email}</p>
              <p className="text-neutral-400 text-xs mt-1">
                Member since {new Date(user?.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-2xl font-bold font-outfit text-neutral-900 mb-6">
            Order History ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-12 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-bold text-neutral-800 text-xl mb-2">No orders yet</h3>
              <p className="text-neutral-500 mb-6">Your order history will appear here after your first purchase.</p>
              <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                Shop Now <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <div key={order.id} className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-bold text-neutral-900">
                          Order #{order.id.slice(0, 12).toUpperCase()}
                        </p>
                        <p className="text-neutral-400 text-xs mt-0.5">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusCfg.color}`}>
                          {statusCfg.icon} {statusCfg.label}
                        </span>
                        <span className="font-bold text-neutral-900">{formatPrice(order.total_amount)}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {items.slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                          <div className="w-8 h-8 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm">🍯</div>
                            )}
                          </div>
                          <span className="flex-1 truncate">{item.name}</span>
                          <span className="text-neutral-400">×{item.quantity}</span>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <p className="text-xs text-neutral-400 pl-11">+{items.length - 3} more items</p>
                      )}
                    </div>

                    {order.payment_id && (
                      <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                        Payment ID: <span className="font-mono">{order.payment_id}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
