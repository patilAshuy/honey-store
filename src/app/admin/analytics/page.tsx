import React from "react";
import { BarChart3, TrendingUp, ArrowUpRight, DollarSign, ShoppingCart, Users } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Analytics</h1>
          <p className="text-neutral-500">Dive deep into your store&apos;s performance metrics.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-neutral-100 shadow-sm">
          <span className="text-sm font-bold text-neutral-500 uppercase">Period:</span>
          <select className="bg-transparent font-bold text-neutral-900 focus:outline-none">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm h-96 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-bold">Revenue Growth</h3>
              <div className="flex items-center space-x-4 text-sm font-medium">
                <div className="flex items-center"><span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span> Current</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-neutral-200 rounded-full mr-2"></span> Previous</div>
              </div>
            </div>
            <div className="flex-grow flex items-end justify-between px-4 pb-4">
              {[40, 60, 45, 80, 95, 70, 85].map((h, i) => (
                <div key={i} className="w-12 bg-primary-500/10 rounded-t-xl relative group">
                  <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-primary-500 rounded-xl group-hover:bg-primary-600 transition-colors"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    ${(h * 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
              <h4 className="text-neutral-500 text-sm font-bold uppercase tracking-wider mb-2">Customer Retention</h4>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold">84.2%</span>
                <span className="text-green-600 font-bold flex items-center text-sm">+4.3% <ArrowUpRight size={14} className="ml-1" /></span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full mt-6 overflow-hidden">
                <div className="bg-green-500 h-full w-[84%]"></div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
              <h4 className="text-neutral-500 text-sm font-bold uppercase tracking-wider mb-2">Conversion Rate</h4>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold">3.15%</span>
                <span className="text-primary-600 font-bold flex items-center text-sm">+0.4% <ArrowUpRight size={14} className="ml-1" /></span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full mt-6 overflow-hidden">
                <div className="bg-primary-500 h-full w-[35%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-neutral-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-bold mb-8">Quick Stats</h3>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <DollarSign size={20} />
                  <span>Total Profit</span>
                </div>
                <span className="font-bold">$12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <ShoppingCart size={20} />
                  <span>Avg. Order</span>
                </div>
                <span className="font-bold">$32.15</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Users size={20} />
                  <span>New Signups</span>
                </div>
                <span className="font-bold">142</span>
              </div>
            </div>
            <button className="w-full mt-12 py-4 bg-primary-600 rounded-2xl font-bold hover:bg-primary-500 transition-all">
              View Detailed Report
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
            <h3 className="font-bold mb-6">Top Products</h3>
            <div className="space-y-6">
              {[
                { name: "Raw Wildflower", sales: 142 },
                { name: "Manuka Premium", sales: 89 },
                { name: "Forest Oak", sales: 64 },
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-neutral-600 font-medium">{p.name}</span>
                  <span className="font-bold">{p.sales} sales</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
