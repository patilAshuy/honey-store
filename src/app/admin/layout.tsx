"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Box, ShoppingBag, KeyRound,
  BarChart, LogOut, Menu, X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin",          label: "Dashboard",  icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products",   icon: Box },
  { href: "/admin/orders",   label: "Orders",     icon: ShoppingBag },
  { href: "/admin/users",    label: "My Account", icon: KeyRound },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checking, setChecking]   = useState(true);
  const [email, setEmail]         = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Auth guard ────────────────────────────────────────────
  useEffect(() => {
    // Skip guard on the login page itself
    if (pathname === "/admin/login") { setChecking(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setEmail(session.user.email ?? "");
        setChecking(false);
      }
    });

    // Listen for sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && pathname !== "/admin/login") {
          router.replace("/admin/login");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  // Show nothing while checking auth (prevents flash)
  if (checking && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login page renders without sidebar
  if (pathname === "/admin/login") return <>{children}</>;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-7 border-b border-neutral-800">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-green/30">
            LOH
          </div>
          <div>
            <span className="font-outfit font-bold text-white text-base block leading-tight">
              Love of Honey
            </span>
            <span className="text-neutral-500 text-[10px] uppercase tracking-widest">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-grow p-5 space-y-1">
        {NAV.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              isActive(href, exact)
                ? "bg-brand-green text-white shadow-md shadow-brand-green/30"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-5 border-t border-neutral-800 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold text-sm flex-shrink-0">
            {email.charAt(0).toUpperCase()}
          </div>
          <p className="text-neutral-400 text-xs truncate">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          ← View Store
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-neutral-900 fixed h-full hidden lg:flex flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 z-50 flex flex-col lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="flex-grow lg:ml-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 text-neutral-600 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="text-base font-bold text-neutral-800 font-outfit capitalize">
              {NAV.find((n) => isActive(n.href, n.exact))?.label ?? "Admin"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-neutral-900">Administrator</p>
              <p className="text-[10px] text-neutral-400 truncate max-w-[160px]">{email}</p>
            </div>
            <div className="w-9 h-9 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-sm">
              {email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
