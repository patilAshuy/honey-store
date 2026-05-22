"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, Search } from "lucide-react";

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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">H</div>
            <span className={`font-outfit text-2xl font-bold ${isScrolled ? "text-primary-900" : "text-primary-800"}`}>
              Honey<span className="text-primary-500">Premium</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link href="/products" className="text-neutral-700 hover:text-primary-600 transition-colors">Shop</Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-600 transition-colors">Our Story</Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-neutral-700 hover:text-primary-600">
              <Search size={22} />
            </button>
            <Link href="/cart" className="relative text-neutral-700 hover:text-primary-600">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link href="/login" className="text-neutral-700 hover:text-primary-600 font-medium">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="text-neutral-700">
              <ShoppingCart size={22} />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-700">
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
            <Link href="/products" className="block text-lg font-medium py-2">Shop</Link>
            <Link href="/about" className="block text-lg font-medium py-2">Our Story</Link>
            <Link href="/contact" className="block text-lg font-medium py-2">Contact</Link>
            <hr className="border-neutral-100" />
            <Link href="/login" className="block text-lg font-medium py-2 text-primary-600">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
