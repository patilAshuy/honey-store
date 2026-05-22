import React from "react";
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$12,845.00", icon: <DollarSign />, trend: "+12.5%", isPositive: true },
    { label: "Total Orders", value: "456", icon: <ShoppingBag />, trend: "+8.2%", isPositive: true },
    { label: "Total Customers", value: "1,204", icon: <Users />, trend: "+5.1%", isPositive: true },
    { label: "Avg. Order Value", value: "$28.16", icon: <TrendingUp />, trend: "-2.4%", isPositive: false },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-sm font-bold ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                <span>{stat.trend}</span>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold text-neutral-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Recent Orders</h3>
            <button className="text-sm font-bold text-primary-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-100 italic text-neutral-400 text-sm">
                  <th className="pb-4 font-normal">Order ID</th>
                  <th className="pb-4 font-normal">Customer</th>
                  <th className="pb-4 font-normal">Status</th>
                  <th className="pb-4 font-normal">Amount</th>
                </tr>
              </thead>
              <tbody className="text-neutral-600">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="py-4 font-bold text-neutral-900">#ORD-{1000 + i}</td>
                    <td className="py-4">John Doe</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">Delivered</span>
                    </td>
                    <td className="py-4 font-bold">$34.99</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Inventory Status</h3>
            <button className="text-sm font-bold text-primary-600 hover:underline">Manage Stock</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-xl"></div>
                  <div>
                    <p className="font-bold text-neutral-900">Wildflower Honey</p>
                    <p className="text-xs text-neutral-500">SKU: WF-001</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">124 Units</p>
                  <div className="w-32 h-2 bg-neutral-100 rounded-full mt-2 overflow-hidden">
                    <div className="w-[80%] h-full bg-primary-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
