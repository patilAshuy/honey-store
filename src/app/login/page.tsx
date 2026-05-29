"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.push(nextPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account/reset-password`,
      });
      if (resetError) throw resetError;
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-[#fcfbf9] min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🍯</div>
            <h1 className="text-4xl font-bold font-outfit mb-3 text-brand-green">
              {mode === "login" ? "Welcome Back" : "Reset Password"}
            </h1>
            <p className="text-neutral-500">
              {mode === "login"
                ? "Sign in to track your orders and manage your account."
                : "Enter your email and we'll send a reset link."}
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {resetSent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✉️</span>
              </div>
              <p className="text-neutral-700 font-medium">
                Reset link sent to <strong>{email}</strong>
              </p>
              <p className="text-neutral-500 text-sm">Check your inbox and follow the link to reset your password.</p>
              <button
                onClick={() => { setMode("login"); setResetSent(false); }}
                className="text-brand-green font-bold hover:underline text-sm"
              >
                ← Back to Sign In
              </button>
            </div>
          ) : mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                  <input
                    required type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                  <input
                    required type={showPw ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="text-right">
                  <button type="button" onClick={() => setMode("forgot")}
                    className="text-xs font-bold text-brand-green hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-5">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><span>Sign In</span><ArrowRight size={20} /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                  <input
                    required type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-5">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <span>Send Reset Link</span>}
              </button>
              <button type="button" onClick={() => setMode("login")}
                className="w-full text-center text-neutral-500 text-sm hover:text-brand-green transition-colors">
                ← Back to Sign In
              </button>
            </form>
          )}

          {mode === "login" && !resetSent && (
            <div className="mt-8 text-center">
              <p className="text-neutral-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-brand-green font-bold hover:underline">Sign Up</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
