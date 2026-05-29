"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail]           = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen]     = useState(false);

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = () => setUserMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-rust text-white text-[11px] font-bold py-2 text-center uppercase tracking-[0.2em] relative z-[60]">
        Sale is Live — Max 20% OFF | Pure Raw Honey
      </div>

      <nav className={`fixed top-8 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/products"
                className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity">
                Shop All
              </Link>
              <Link href="/about"
                className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity">
                Our Story
              </Link>
              <Link href="/blog"
                className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity">
                Blog
              </Link>
            </div>

            {/* Center logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
              <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mb-1 group-hover:shadow-xl transition-shadow">
                LOH
              </div>
              <span className="font-outfit text-lg font-black tracking-tighter text-[#1a5f3a]">
                LOVE OF <span className="text-brand-amber">HONEY</span>
              </span>
            </Link>

            {/* Right nav */}
            <div className="flex items-center space-x-4">

              {/* Account — shows dropdown if logged in, link to login if not */}
              {userEmail ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity"
                  >
                    <User size={16} />
                    <span className="max-w-[80px] truncate">{userEmail.split("@")[0]}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-50">
                      <Link href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 font-medium">
                        <User size={14} /> My Account
                      </Link>
                      <Link href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 font-medium">
                        <Package size={14} /> My Orders
                      </Link>
                      <hr className="my-1 border-neutral-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium w-full text-left">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login"
                  className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 hidden md:block transition-opacity">
                  Account
                </Link>
              )}

              {/* Cart */}
              <Link href="/cart" className="relative text-[#1a5f3a] hover:opacity-70 transition-opacity">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-rust text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-[#1a5f3a]"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {[
                { href: "/",         label: "Home" },
                { href: "/products", label: "Shop All" },
                { href: "/about",    label: "Our Story" },
                { href: "/blog",     label: "Blog" },
                { href: "/contact",  label: "Contact" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-neutral-800 font-medium hover:bg-neutral-50 transition-colors">
                  {label}
                </Link>
              ))}
              <hr className="border-neutral-100 my-2" />
              {userEmail ? (
                <>
                  <Link href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-brand-green font-bold hover:bg-neutral-50">
                    <User size={16} /> My Account
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl text-red-500 font-bold hover:bg-red-50 w-full text-left">
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-brand-green font-bold hover:bg-neutral-50">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
