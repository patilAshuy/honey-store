import React from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="pt-40 pb-20 flex flex-col items-center justify-center space-y-8 px-4">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
        <CheckCircle size={56} />
      </div>
      <div className="text-center space-y-4 max-w-lg">
        <h1 className="text-4xl font-bold font-outfit">Order Confirmed!</h1>
        <p className="text-neutral-500 text-lg">
          Thank you for choosing HoneyPremium. Your order #HP-12345 has been placed successfully and is being prepared for harvest.
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm w-full max-w-md space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Order ID</p>
            <p className="font-bold">#ORD-1001-XYZ</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-neutral-900">Estimated Delivery</p>
          <p className="text-neutral-500">May 25, 2026 - May 28, 2026</p>
        </div>
        <hr className="border-neutral-100" />
        <Link href="/track-order" className="text-primary-600 font-bold hover:underline flex items-center space-x-2">
          <span>Track Order Status</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products" className="btn-primary">
          Continue Shopping
        </Link>
        <Link href="/" className="px-8 py-3 rounded-full border-2 border-neutral-200 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all text-center">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
