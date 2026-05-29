"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, ShoppingCart, Package, Users, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/honeyTypes";

type MonthlyData = { month: string; revenue: number; orders: number };
type TopProduct  = { name: string; honey_type: string; count: number; revenue: number };

export default function AdminAnalytics() {
  const [loading, setLoading]         = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders]   = useState(0);
  const [avgOrder, setAvgOrder]         = useState(0);
  const [monthly, setMonthly]           = useState<MonthlyData[]>([]);
  const [topProducts, setTopProducts]   = useState<TopProduct[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<Record<string, number>>({});
  const [subscribers, setSubscribers]   = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // All orders
        const { data: orders } = await supabase
          .from("orders")
          .select("id, total_amount, status, items, created_at")
          .order("created_at", { ascending: true });

        // Subscribers count
        const { count: subCount } = await supabase
          .from("subscribers")
          .select("id", { count: "exact", head: true });

        if (orders) {
          const paid = orders.filter((o) => o.status !== "cancelled");
          const rev  = paid.reduce((s, o) => s + Number(o.total_amount), 0);
          setTotalRevenue(rev);
          setTotalOrders(orders.length);
          setAvgOrder(paid.length > 0 ? rev / paid.length : 0);

          // Status breakdown
          const breakdown: Record<string, number> = {};
          orders.forEach((o) => { breakdown[o.status] = (breakdown[o.status] || 0) + 1; });
          setStatusBreakdown(breakdown);

          // Monthly revenue — last 6 months
          const now = new Date();
          const months: MonthlyData[] = [];
          for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const label = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
            const monthOrders = paid.filter((o) => {
              const od = new Date(o.created_at);
              return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
            });
            months.push({
              month: label,
              revenue: monthOrders.reduce((s, o) => s + Number(o.total_amount), 0),
              orders: monthOrders.length,
            });
          }
          setMonthly(months);

          // Top products from order items
          const productMap: Record<string, { name: string; honey_type: string; count: number; revenue: number }> = {};
          orders.forEach((o) => {
            if (!Array.isArray(o.items)) return;
            o.items.forEach((item: any) => {
              const key = item.name || item.id;
              if (!productMap[key]) productMap[key] = { name: item.name, honey_type: "", count: 0, revenue: 0 };
              productMap[key].count   += item.quantity || 1;
              productMap[key].revenue += (item.price || 0) * (item.quantity || 1);
            });
          });
          const sorted = Object.values(productMap).sort((a, b) => b.count - a.count).slice(0, 5);
          setTopProducts(sorted);
        }

        setSubscribers(subCount || 0);
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const maxRevenue = Math.max(...monthly.map((m) => m.revenue), 1);

  const STATUS_COLORS: Record<string, string> = {
    pending:    "bg-yellow-400",
    paid:       "bg-blue-400",
    processing: "bg-purple-400",
    shipped:    "bg-indigo-400",
    delivered:  "bg-green-500",
    cancelled:  "bg-red-400",
  };

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
        <h1 className="text-2xl font-bold text-neutral-900 font-outfit">Analytics</h1>
        <p className="text-neutral-500 mt-1">Live data from your Supabase database.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: "Total Revenue",    value: formatPrice(totalRevenue), icon: <TrendingUp size={20} />, color: "bg-green-50 text-green-600" },
          { label: "Total Orders",     value: totalOrders.toString(),    icon: <ShoppingCart size={20} />, color: "bg-blue-50 text-blue-600" },
          { label: "Avg. Order Value", value: formatPrice(avgOrder),     icon: <Package size={20} />,     color: "bg-amber-50 text-amber-600" },
          { label: "Subscribers",      value: subscribers.toString(),    icon: <Users size={20} />,       color: "bg-purple-50 text-purple-600" },
        ].map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-[1.5rem] border border-neutral-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-neutral-500 text-sm">{card.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm p-6">
          <h2 className="font-bold text-neutral-900 mb-6">Monthly Revenue (Last 6 Months)</h2>
          {monthly.every((m) => m.revenue === 0) ? (
            <div className="h-48 flex items-center justify-center text-neutral-400 italic">
              No revenue data yet.
            </div>
          ) : (
            <div className="flex items-end gap-3 h-48">
              {monthly.map((m) => {
                const pct = maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex items-end justify-center" style={{ height: "160px" }}>
                      <div
                        className="w-full bg-brand-green/80 rounded-t-xl group-hover:bg-brand-green transition-colors relative"
                        style={{ height: `${Math.max(pct, 2)}%` }}
                      >
                        {m.revenue > 0 && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                            {formatPrice(m.revenue)}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">{m.month}</span>
                    <span className="text-[9px] text-neutral-300">{m.orders} orders</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order status breakdown */}
        <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm p-6">
          <h2 className="font-bold text-neutral-900 mb-6">Order Status</h2>
          {Object.keys(statusBreakdown).length === 0 ? (
            <p className="text-neutral-400 italic text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(statusBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([status, count]) => {
                  const pct = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;
                  return (
                    <div key={status}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-neutral-700 capitalize">{status}</span>
                        <span className="text-sm font-bold text-neutral-900">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${STATUS_COLORS[status] || "bg-neutral-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white rounded-[1.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h2 className="font-bold text-neutral-900">Top Selling Products</h2>
        </div>
        {topProducts.length === 0 ? (
          <div className="p-8 text-center text-neutral-400 italic">No sales data yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-neutral-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Units Sold</th>
                  <th className="px-6 py-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {topProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs font-bold text-neutral-500">
                          {i + 1}
                        </span>
                        <span className="font-medium text-neutral-900 text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-900">{p.count}</td>
                    <td className="px-6 py-4 font-bold text-brand-green">{formatPrice(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
