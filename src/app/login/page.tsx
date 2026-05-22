import React from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#fffbeb] px-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-xl border border-primary-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">H</div>
          <h1 className="text-3xl font-bold font-outfit">Welcome Back</h1>
          <p className="text-neutral-500 mt-2">Login to your sweet account</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="email" 
                placeholder="honey@example.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-neutral-700">Password</label>
              <Link href="#" className="text-xs font-bold text-primary-600 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
          
          <button className="btn-primary w-full flex items-center justify-center space-x-2 py-4">
            <span>Login</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
