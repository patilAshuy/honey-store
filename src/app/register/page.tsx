"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name },
          emailRedirectTo: `${window.location.origin}/account`,
        },
      });
      if (signUpError) throw signUpError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-20 bg-[#fcfbf9] min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={36} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold font-outfit text-brand-green mb-3">Check Your Email</h2>
            <p className="text-neutral-600 mb-2">
              We sent a confirmation link to <strong>{formData.email}</strong>
            </p>
            <p className="text-neutral-500 text-sm mb-8">
              Click the link in the email to activate your account, then sign in.
            </p>
            <Link href="/login" className="btn-primary inline-flex items-center gap-2">
              Go to Sign In <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🐝</div>
            <h1 className="text-4xl font-bold font-outfit mb-3 text-brand-green">Join the Hive</h1>
            <p className="text-neutral-500">Create an account to track orders and save your details.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Anant Kulkarni"
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input required type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input required type={showPw ? "text" : "password"} name="password" value={formData.password}
                  onChange={handleChange} placeholder="Min 8 characters" minLength={8}
                  className="w-full pl-12 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                <input required type="password" name="confirmPassword" value={formData.confirmPassword}
                  onChange={handleChange} placeholder="Repeat password"
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2 py-5">
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create Account</span><ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-green font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
