import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck, Leaf } from "lucide-react";
import FeaturedProducts from "@/components/shop/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#fffbeb]">
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src="/images/Believe Honey One A.jpg.jpeg" 
              alt="Honey Jar" 
              className="relative z-10 w-full h-full object-contain mix-blend-multiply animate-float"
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="lg:w-1/2 space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm tracking-wide uppercase">
              100% Raw & Organic
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold font-outfit text-neutral-900 leading-[1.1]">
              Nature&apos;s Sweetest <span className="text-primary-600">Golden</span> Gift
            </h1>
            <p className="text-xl text-neutral-600 max-w-lg leading-relaxed">
              Experience the pure, unfiltered taste of premium organic honey, harvested with love from the world&apos;s most pristine gardens.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products" className="btn-primary flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="px-8 py-3 rounded-full border-2 border-neutral-200 font-semibold hover:border-primary-500 hover:text-primary-600 transition-all">
                Learn More
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-neutral-900">50k+</span>
                <span className="text-neutral-500">Happy Bees</span>
              </div>
              <div className="w-px h-10 bg-neutral-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-neutral-900">10k+</span>
                <span className="text-neutral-500">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl hover:bg-primary-50 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold">Lab Tested</h3>
              <p className="text-neutral-600">Every batch is rigorously tested for purity and quality in certified labs.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl hover:bg-primary-50 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold">100% Raw</h3>
              <p className="text-neutral-600">Unprocessed, unfiltered, and unheated to preserve natural enzymes and nutrients.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl hover:bg-primary-50 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-neutral-600">Eco-friendly packaging and fast shipping to keep your honey fresh.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold font-outfit">Join the Sweet Revolution</h2>
              <p className="text-primary-100 text-lg opacity-80">
                Subscribe to our newsletter and get 15% off your first order. Stay updated on our latest harvests and limited editions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full sm:w-80 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button className="w-full sm:w-auto px-10 py-4 bg-white text-primary-900 rounded-full font-bold hover:bg-primary-50 transition-colors shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
