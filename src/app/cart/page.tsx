"use client";
import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

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
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-outfit mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[{id: '1', name: 'Raw Wildflower Honey', price: 24.99, quantity: 1, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop'}].map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-neutral-100 flex items-center gap-6 shadow-sm">
                <div className="w-24 h-24 bg-neutral-100 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-neutral-900">{item.name}</h3>
                    <button className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 bg-neutral-100 px-4 py-2 rounded-xl">
                      <button className="text-neutral-500 hover:text-primary-600"><Minus size={16} /></button>
                      <span className="font-bold text-neutral-900 w-4 text-center">{item.quantity}</span>
                      <button className="text-neutral-500 hover:text-primary-600"><Plus size={16} /></button>
                    </div>
                    <span className="text-xl font-bold text-neutral-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">$24.99</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider text-xs">Calculated at checkout</span>
                </div>
                <div className="h-px bg-neutral-100 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">$24.99</span>
                </div>
              </div>
              
              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </Link>
              
              <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-center space-x-6 text-neutral-400">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mb-2">🛡️</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mb-2">🚚</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Global</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mb-2">♻️</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Eco-friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
