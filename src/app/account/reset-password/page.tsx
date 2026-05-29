"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPw, setShowPw]           = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Supabase sends the user here with a hash fragment — we need to
  // exchange it for a session before we can call updateUser.
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setSessionReady(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm p-10 max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold font-outfit text-neutral-900">Password Updated!</h2>
          <p className="text-neutral-500">Your password has been changed. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-3xl font-bold font-outfit text-neutral-900 mb-2">Set New Password</h1>
          <p className="text-neutral-500 text-sm">Choose a strong password for your account.</p>
        </div>

        {!sessionReady && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm">
            Waiting for password reset session... If this persists, please request a new reset link.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required minLength={8}
                placeholder="Min 8 characters"
                className="w-full pl-12 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Repeat new password"
                className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all font-medium text-neutral-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !sessionReady}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading
              ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
