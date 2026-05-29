"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { ShieldCheck, Lock, CreditCard, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/honeyTypes";
import Link from "next/link";

declare global {
  interface Window { Razorpay: any; }
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
};

type FieldError = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Full name is required (min 2 characters)";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Valid email address is required";
  if (!data.phone.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\s+/g, "")))
    errors.phone = "Valid 10-digit Indian mobile number required";
  if (!data.address.trim() || data.address.trim().length < 10)
    errors.address = "Full address is required (min 10 characters)";
  if (!data.city.trim())
    errors.city = "City is required";
  if (!data.pincode.trim() || !/^\d{6}$/.test(data.pincode))
    errors.pincode = "Valid 6-digit pincode required";
  return errors;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
  });

  const shipping = cartTotal >= 499 ? 0 : 60;
  const total = cartTotal + shipping;

  // Load Razorpay script
  useEffect(() => {
    if (document.querySelector('script[src*="razorpay"]')) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validate
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (cart.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create order in DB + get Razorpay order ID
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, formData, subtotal: cartTotal, shipping, total }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Failed to create order");
      }

      const { razorpayOrderId, amount } = await orderRes.json();

      // 2. Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Love of Honey",
        description: "Pure & Natural Honey",
        order_id: razorpayOrderId,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#1a5f3a" },
        handler: async (response: any) => {
          try {
            // 3. Verify payment signature on server
            const verifyRes = await fetch("/api/orders", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            clearCart();
            router.push(`/order-success?id=${razorpayOrderId}&payment_id=${response.razorpay_payment_id}`);
          } catch {
            setSubmitError("Payment received but verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setSubmitError("Payment failed: " + (response.error?.description || "Unknown error"));
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Empty cart guard
  if (cart.length === 0 && !loading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center gap-6 bg-neutral-50">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold font-outfit text-neutral-900">Your cart is empty</h2>
        <p className="text-neutral-500">Add some honey before checking out!</p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full p-4 bg-white border rounded-2xl focus:ring-2 focus:ring-brand-green outline-none text-neutral-800 transition-all ${
      fieldErrors[field] ? "border-red-400 bg-red-50" : "border-neutral-200"
    }`;

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Shipping Form ── */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold font-outfit text-neutral-900 mb-2">Checkout</h1>
              <p className="text-neutral-500">Where should we send your golden jars?</p>
            </div>

            {submitError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Full Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange}
                    className={inputClass("name")} placeholder="Anant Kulkarni" />
                  {fieldErrors.name && <p className="text-red-500 text-xs">{fieldErrors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className={inputClass("email")} placeholder="you@example.com" />
                  {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={inputClass("phone")} placeholder="9876543210" maxLength={10} />
                {fieldErrors.phone && <p className="text-red-500 text-xs">{fieldErrors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Address *</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3}
                  className={`${inputClass("address")} resize-none`}
                  placeholder="House no, Street name, Area, Landmark..." />
                {fieldErrors.address && <p className="text-red-500 text-xs">{fieldErrors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">City *</label>
                  <input name="city" value={formData.city} onChange={handleChange}
                    className={inputClass("city")} placeholder="Mumbai" />
                  {fieldErrors.city && <p className="text-red-500 text-xs">{fieldErrors.city}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Pincode *</label>
                  <input name="pincode" value={formData.pincode} onChange={handleChange}
                    className={inputClass("pincode")} placeholder="400001" maxLength={6} />
                  {fieldErrors.pincode && <p className="text-red-500 text-xs">{fieldErrors.pincode}</p>}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg mt-2">
                {loading
                  ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Processing...</span></>
                  : <><CreditCard size={22} /><span>Pay {formatPrice(total)} Securely</span></>
                }
              </button>

              <p className="text-center text-xs text-neutral-400">
                🔒 Secured by Razorpay · UPI · Cards · Net Banking · Wallets
              </p>
            </form>
          </div>

          {/* ── Order Summary ── */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-xl">🍯</div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-neutral-900 truncate">{item.name}</p>
                      <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-neutral-900 flex-shrink-0 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-5 space-y-3">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-green-600 font-bold text-xs uppercase">Free</span>
                    : <span className="font-bold text-neutral-900">{formatPrice(shipping)}</span>
                  }
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-neutral-400">
                    Add {formatPrice(499 - cartTotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-bold text-neutral-900 text-lg pt-3 border-t border-neutral-100">
                  <span>Total</span>
                  <span className="text-brand-green">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 flex items-center gap-3">
                <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green flex-shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">Quality Guaranteed</p>
                  <p className="text-xs text-neutral-500">100% Raw & Organic</p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 flex items-center gap-3">
                <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green flex-shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">Secure Payment</p>
                  <p className="text-xs text-neutral-500">Encrypted & Safe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
