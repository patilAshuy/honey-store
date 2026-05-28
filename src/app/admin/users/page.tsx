"use client";
import React, { useState, useEffect } from "react";
import { KeyRound, Mail, Save, ShieldCheck, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (pwForm.next.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwForm.next });
      if (error) throw error;
      showToast("Password updated successfully!");
      setPwForm({ current: "", next: "", confirm: "" });
    } catch (err: any) {
      showToast(err.message || "Failed to update password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-8 font-inter max-w-xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-6 py-3 rounded-2xl text-white font-bold shadow-xl transition-all ${
            toast.type === "success" ? "bg-brand-green" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-outfit">My Account</h1>
        <p className="text-neutral-500 mt-1">Manage your admin login credentials.</p>
      </div>

      {/* Current account info */}
      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-2xl">
            {user?.email?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="font-bold text-neutral-900 text-lg">Administrator</p>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <Mail size={14} />
              <span>{user?.email || "Loading..."}</span>
            </div>
          </div>
          <span className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            <ShieldCheck size={12} /> Admin
          </span>
        </div>

        <div className="pt-4 border-t border-neutral-100 text-sm text-neutral-400 space-y-1">
          <p>User ID: <span className="font-mono text-neutral-600">{user?.id?.slice(0, 16)}...</span></p>
          <p>Last sign in: <span className="text-neutral-600">
            {user?.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString("en-IN")
              : "—"}
          </span></p>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
            <KeyRound size={20} />
          </div>
          <div>
            <h2 className="font-bold text-neutral-900">Change Password</h2>
            <p className="text-xs text-neutral-400">Use a strong password with 8+ characters</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
              New Password *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={pwForm.next}
              onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))}
              placeholder="Min 8 characters"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green font-medium text-neutral-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={pwForm.confirm}
              onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
              placeholder="Repeat new password"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green font-medium text-neutral-800"
            />
          </div>

          {pwForm.next && pwForm.confirm && pwForm.next !== pwForm.confirm && (
            <p className="text-red-500 text-xs font-medium">Passwords do not match</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Save size={18} /> Update Password</>
            )}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-[2rem] border border-red-100 shadow-sm p-8">
        <h2 className="font-bold text-neutral-900 mb-2">Sign Out</h2>
        <p className="text-neutral-500 text-sm mb-4">
          You will be redirected to the login page.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
