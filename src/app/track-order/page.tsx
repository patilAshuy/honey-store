"use client";
import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [isTracked, setIsTracked] = useState(false);

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-outfit mb-4">Track Your Order</h1>
          <p className="text-neutral-500 text-lg">Enter your order ID to see the status of your golden delivery.</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-[3rem] shadow-sm border border-neutral-100 mb-12">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); setIsTracked(true); }}>
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                type="text" 
                placeholder="e.g. #HP-12345" 
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all font-bold text-lg"
              />
            </div>
            <button className="btn-primary px-12 py-5 shadow-primary-200">
              Track Now
            </button>
          </form>
        </div>

        {isTracked && (
          <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-xl border border-primary-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-neutral-100 pb-8">
              <div>
                <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">Current Status</p>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold">On the Way</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-1">Estimated Delivery</p>
                <p className="text-xl font-bold">May 26, 2026</p>
              </div>
            </div>

            <div className="space-y-12 relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-neutral-100 -ml-0.5"></div>
              
              <div className="flex items-start space-x-8 relative">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-green-200">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Order Received</h3>
                  <p className="text-neutral-500">May 21, 2026 • 10:45 AM</p>
                  <p className="text-sm mt-2 text-neutral-400">Order confirmed and transmitted to the harvest team.</p>
                </div>
              </div>

              <div className="flex items-start space-x-8 relative">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-green-200">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Packaged with Care</h3>
                  <p className="text-neutral-500">May 22, 2026 • 02:30 PM</p>
                  <p className="text-sm mt-2 text-neutral-400">Items have been safely secured in eco-friendly packaging.</p>
                </div>
              </div>

              <div className="flex items-start space-x-8 relative">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-primary-200">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Out for Delivery</h3>
                  <p className="text-neutral-900 font-bold">In Transit</p>
                  <p className="text-neutral-500">May 22, 2026 • 04:15 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-8 relative opacity-40">
                <div className="w-12 h-12 bg-neutral-200 text-neutral-400 rounded-full flex items-center justify-center shrink-0 z-10">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Delivered</h3>
                  <p className="text-neutral-500 italic">Expected soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
