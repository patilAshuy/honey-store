"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp, ShoppingBag, Package, DollarSign,
  ArrowUpRight, Clock, CheckCircle, Truck, XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/honeyTypes";

type Stats = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
};

type RecentOrder = {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
};

type LowStockProduct = {
  id: string;
  name: string;
  stock_quantity: number;
  honey_type: string;
  images: string[];
};

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  paid:       "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped:    "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const [stats, setStats]           = useState<Stats>({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStock, setLowStock]     = useState<LowStockProduct[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Fetch orders
        const { data: orders } = await supabase
          .from("orders")
          .select("id, customer_name, total_amount, status, created_at")
          .order("created_at", { ascending: false });

        // Fetch products
        const { data: products } = await supabase
          .from("products")
          .select("id, name, stock_quantity, honey_type, images")
          .eq("status", "active");

        if (orders) {
          const paid = orders.filter((o) => o.status !== "pending" && o.status !== "cancelled");
          const revenue = paid.reduce((sum, o) => sum + Number(o.total_amount), 0);
          const pending = orders.filter((o) => o.status === "pending").length;
          setStats({
            totalRevenue: revenue,
            totalOrders: orders.length,
            totalProducts: products?.length || 0,
            pendingOrders: pending,
          });
          setRecentOrders(orders.slice(0, 6));
        }

        if (products) {
          setLowStock(
            products
              .filter((p) => p.stock_quantity <= 10)
              .sort((a, b) => a.stock_quantity - b.stock_quantity)
              .slice(0, 5)
          );
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: <DollarSign size={22} />,
      color: "bg-green-50 text-green-600",
      sub: "From paid orders",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: <ShoppingBag size={22} />,
      color: "bg-blue-50 text-blue-600",
      sub: `${stats.pendingOrders} pending`,
    },
    {
      label: "Active Products",
      value: stats.totalProducts.toString(),
      icon: <Package size={22} />,
      color: "bg-amber-50 text-amber-600",
      sub: `${lowStock.length} low stock`,
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders.toString(),
      icon: <Clock size={22} />,
      color: "bg-orange-50 text-orange-600",
      sub: "Awaiting processing",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 font-outfit">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-[1.5rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.color}`}>{card.icon}</div>
            </div>
            <p className="text-neutral-500 text-sm font-medium">{card.label}</p>
            <p className="text-3xl font-bold text-neutral-900 mt-1">{card.value}</p>
            <p className="text-xs text-neutral-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-neutral-100">
            <h2 className="font-bold text-neutral-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-bold text-brand-green hover:underline">
              View All →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 italic">No orders yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-neutral-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-medium">Order</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-mono text-xs text-neutral-600">
                          #{order.id.slice(0, 14)}...
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {new Date(order.created_at).toLocaleDateString("en-IN")}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-800 text-sm">
                        {order.customer_name || "Guest"}
                      </td>
                      <td className="px-6 py-4 font-bold text-neutral-900 text-sm">
                        {formatPrice(order.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_COLORS[order.status] || "bg-neutral-100 text-neutral-600"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low stock */}
        <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-neutral-100">
            <h2 className="font-bold text-neutral-900">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-sm font-bold text-brand-green hover:underline">
              Manage →
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
              <p className="text-neutral-500 text-sm">All products well stocked!</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-50">
              {lowStock.map((product) => (
                <div key={product.id} className="flex items-center gap-3 px-6 py-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                    {product.images?.[0]
                      ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-base">🍯</div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-neutral-400">{product.honey_type}</p>
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 ${
                    product.stock_quantity === 0 ? "text-red-500" : "text-amber-500"
                  }`}>
                    {product.stock_quantity === 0 ? "Out" : `${product.stock_quantity} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm p-6">
        <h2 className="font-bold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products" className="btn-primary text-sm py-2.5 px-5">
            + Add Product
          </Link>
          <Link href="/admin/orders" className="px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
            View Orders
          </Link>
          <Link href="/admin/analytics" className="px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
            Analytics
          </Link>
          <Link href="/" target="_blank" className="px-5 py-2.5 bg-neutral-100 text-neutral-700 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
            View Store ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
