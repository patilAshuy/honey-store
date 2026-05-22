"use client";
import React, { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // 1. Create order on server (Next.js API route)
    // 2. Open Razorpay Checkout modal
    // 3. Verify payment on server
    
    // Placeholder implementation
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 2499,
      currency: "INR",
      name: "HoneyPremium",
      description: "Organic Wildflower Honey",
      order_id: "order_mock_123",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        window.location.href = "/order-success";
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#d97706" },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
    setIsProcessing(false);
  };

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold font-outfit mb-12">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Shipping Information</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl border-neutral-200 focus:ring-primary-500" />
              <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border-neutral-200 focus:ring-primary-500" />
              <input type="tel" placeholder="Phone Number" className="w-full p-4 rounded-2xl border-neutral-200 focus:ring-primary-500" />
              <textarea placeholder="Complete Address" rows={4} className="w-full p-4 rounded-2xl border-neutral-200 focus:ring-primary-500"></textarea>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-neutral-500">Items (1)</span>
                <span className="font-bold">$24.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery</span>
                <span className="text-green-600 font-bold">$0.00</span>
              </div>
              <div className="h-px bg-neutral-100 my-4"></div>
              <div className="flex justify-between items-center bg-primary-50 p-4 rounded-2xl">
                <span className="font-bold">Amt. Payable</span>
                <span className="text-2xl font-bold text-primary-600">$24.99</span>
              </div>
            </div>
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn-primary w-full shadow-primary-200 py-4 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Pay with Razorpay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
