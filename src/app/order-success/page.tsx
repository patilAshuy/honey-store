"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId    = searchParams.get("id") || "";
  const paymentId  = searchParams.get("payment_id") || "";

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Success card */}
        <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm p-10 text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={44} />
          </div>

          <div>
            <h1 className="text-3xl font-bold font-outfit text-neutral-900 mb-2">
              Order Confirmed! 🍯
            </h1>
            <p className="text-neutral-500">
              Thank you for choosing Love of Honey. Your order has been placed and payment verified successfully.
            </p>
          </div>

          {/* Order details */}
          <div className="bg-neutral-50 rounded-2xl p-5 text-left space-y-3">
            {orderId && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Order ID</span>
                <span className="font-mono text-sm font-bold text-neutral-800 break-all text-right max-w-[60%]">
                  {orderId.slice(0, 20)}...
                </span>
              </div>
            )}
            {paymentId && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Payment ID</span>
                <span className="font-mono text-sm font-bold text-neutral-800">{paymentId}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Est. Delivery</span>
              <span className="text-sm font-bold text-neutral-800">3–5 Business Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
                Paid ✓
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-neutral-500 space-y-1">
            <p>📧 A confirmation has been sent to your email.</p>
            <p>📞 Support: <a href="tel:+919422242240" className="text-brand-green font-bold">+91 9422242240</a></p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {orderId && (
              <Link
                href={`/track-order?id=${orderId}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-green text-white rounded-full font-bold text-sm hover:bg-opacity-90 transition-all"
              >
                <Package size={16} /> Track Order
              </Link>
            )}
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-neutral-200 text-neutral-700 rounded-full font-bold text-sm hover:border-brand-green hover:text-brand-green transition-all"
            >
              <ShoppingBag size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
