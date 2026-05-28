import React from "react";
import Link from "next/link";
import { Mail, Phone, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">LOH</div>
              <span className="font-outfit text-2xl font-bold">Love of<span className="text-primary-500"> Honey</span></span>
            </Link>
            <p className="text-neutral-400 leading-relaxed">
              Bringing the purest essence of nature to your doorstep. Our honey is ethically sourced, raw, and full of natural goodness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-primary-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-primary-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-primary-600 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-neutral-400">
              <li><Link href="/products" className="hover:text-primary-500 transition-colors">Shop All Honey</Link></li>
              <li><Link href="/track-order" className="hover:text-primary-500 transition-colors">Track Your Order</Link></li>
              <li><Link href="/about" className="hover:text-primary-500 transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-primary-500 transition-colors">Honey Benefits</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-neutral-400">
              <li><Link href="/shipping" className="hover:text-primary-500 transition-colors">Shipping Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-primary-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-neutral-400 group">
                <Mail className="w-5 h-5 text-brand-green group-hover:scale-110 transition-transform" />
                <span className="text-sm">anant.kulkarnikk@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-neutral-400 group">
                <Phone className="w-5 h-5 text-brand-green group-hover:scale-110 transition-transform" />
                <span className="text-sm">+91 9422242240</span>
              </li>
              <li className="flex items-start space-x-3 text-neutral-400 group">
                <MessageSquare className="w-5 h-5 text-brand-green group-hover:scale-110 transition-transform" />
                <a href="https://wa.me/919422242240" className="text-sm hover:text-brand-green transition-colors">WhatsApp Support</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HoneyPremium. All rights reserved. Crafted with ❤️ for nature.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
