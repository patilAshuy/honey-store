"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration successful! (Demo Only)");
    window.location.href = "/login";
  };

  return (
    <div className="pt-32 pb-20 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-outfit mb-3 text-brand-green">Join the Hive</h1>
            <p className="text-neutral-500">Create an account to start your golden journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-neutral-500 pb-2">
              <ShieldCheck size={14} className="text-brand-green" />
              <span>We value your privacy and data security.</span>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2 py-5 shadow-xl shadow-brand-green/10">
              <span>Create Account</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-green font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
