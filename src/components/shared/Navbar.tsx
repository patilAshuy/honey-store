"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { cart } = useCart();
  const cartCount = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <>
      <div className="bg-brand-rust text-white text-[11px] font-bold py-2 text-center uppercase tracking-[0.2em] relative z-[60]">
        Sale is Live - Max 20% OFF | Pure Raw Honey
      </div>
      <nav className={`fixed top-8 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity">Shop All</Link>
              <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 transition-opacity">Our Story</Link>
            </div>

            {/* Center Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mb-1">LOH</div>
              <span className="font-outfit text-lg font-black tracking-tighter text-[#1a5f3a]">
                LOVE OF <span className="text-brand-amber">HONEY</span>
              </span>
            </Link>

            {/* Right Nav */}
            <div className="flex items-center space-x-6">
              <button className="text-[#1a5f3a] hover:opacity-70 hidden md:block">
                <Search size={20} />
              </button>
              <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-[#1a5f3a] hover:opacity-70 hidden md:block">
                Account
              </Link>
              <Link href="/cart" className="relative text-[#1a5f3a] hover:opacity-70">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-brand-rust text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[#1a5f3a]">
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <Link href="/" className="block text-lg font-medium py-2">Home</Link>
              <Link href="/products" className="block text-lg font-medium py-2">Shop All</Link>
              <Link href="/about" className="block text-lg font-medium py-2">Our Story</Link>
              <Link href="/contact" className="block text-lg font-medium py-2">Contact</Link>
              <hr className="border-neutral-100" />
              <Link href="/login" className="block text-lg font-medium py-2 text-brand-green">Login</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
