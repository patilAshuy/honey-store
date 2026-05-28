"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/honeyTypes";

declare global {
  interface Window { Razorpay: any; }
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
  });

  const shipping = cartTotal >= 499 ? 0 : 60;
  const total    = cartTotal + shipping;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send total in INR — the API converts to paisa (× 100) internally
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SsNBb7JqEqjZke",
        amount: order.amount,          // already in paisa from server
        currency: "INR",
        name: "Love of Honey",
        description: "Order Payment",
        order_id: order.id,
        handler: function (response: any) {
          clearCart();
          window.location.href = "/track-order?success=true&payment_id=" + response.razorpay_payment_id;
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#1a5f3a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Shipping Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-outfit mb-2">Shipping Details</h2>
              <p className="text-neutral-500">Where should we send your golden jars?</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange}
                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="Anant Kulkarni" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="you@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                  placeholder="+91 98765 43210" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Address</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3}
                  className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                  placeholder="House no, Street name, Area..." />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">City</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange}
                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Pincode</label>
                  <input required name="pincode" value={formData.pincode} onChange={handleInputChange}
                    className="w-full p-4 bg-white border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="400001" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-5 flex items-center justify-center space-x-3 text-lg">
                {loading
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><CreditCard size={22} /><span>Pay {formatPrice(total)}</span></>
                }
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-16 space-y-12">
            <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Your Order</h3>
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-neutral-900">{item.name}</p>
                        <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    {/* Price is stored as INR — no * 80 */}
                    <span className="font-bold text-neutral-900 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-3">
                <div className="flex justify-between text-neutral-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-500 text-sm">
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
                <div className="flex justify-between text-xl font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                  <span>Total Payable</span>
                  <span className="text-brand-green">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-neutral-100 flex items-center space-x-4">
                <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green"><ShieldCheck size={24} /></div>
                <div>
                  <p className="font-bold text-sm">Quality Guaranteed</p>
                  <p className="text-xs text-neutral-500">100% Raw & Organic</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-neutral-100 flex items-center space-x-4">
                <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green"><Lock size={24} /></div>
                <div>
                  <p className="font-bold text-sm">Secure Checkout</p>
                  <p className="text-xs text-neutral-500">Encrypted Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
