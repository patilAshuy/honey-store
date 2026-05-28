"use client";
import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/honeyTypes";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
          <ShoppingBag size={48} />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-outfit mb-2">Your cart is empty</h2>
          <p className="text-neutral-500">Looks like you haven&apos;t added any golden sweetness yet.</p>
        </div>
        <Link href="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const shipping = cartTotal >= 499 ? 0 : 60;
  const total    = cartTotal + shipping;

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-outfit mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-neutral-100 flex items-center gap-6 shadow-sm">
                <div className="w-24 h-24 bg-neutral-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-neutral-900">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 bg-neutral-100 px-4 py-2 rounded-xl">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-neutral-500 hover:text-brand-green">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-neutral-900 w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-neutral-500 hover:text-brand-green">
                        <Plus size={16} />
                      </button>
                    </div>
                    {/* Price stored as INR — no * 80 */}
                    <span className="text-xl font-bold text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-green-600 font-bold text-xs uppercase tracking-wider">Free</span>
                    : <span className="font-bold text-neutral-900">{formatPrice(shipping)}</span>
                  }
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-neutral-400">
                    Add {formatPrice(499 - cartTotal)} more for free shipping
                  </p>
                )}
                <div className="h-px bg-neutral-100 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-brand-green">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </Link>

              <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-center space-x-6 text-neutral-400">
                {[["🛡️","Secure"],["🚚","Fast Delivery"],["♻️","Eco-friendly"]].map(([icon, label]) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mb-2">{icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
