import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-outfit mb-4">Get in Touch</h1>
          <p className="text-neutral-500 text-lg">Have questions about our honey? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-neutral-100">
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="w-full p-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all" />
                <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <input type="text" placeholder="Subject" className="w-full p-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all" />
              <textarea placeholder="How can we help?" rows={6} className="w-full p-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all"></textarea>
              <button className="btn-primary w-full flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="space-y-8 py-10 lg:pl-12">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-primary-100 text-primary-600 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Email Us</h3>
                <p className="text-neutral-500">hello@honeypremium.com</p>
                <p className="text-neutral-500">support@honeypremium.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-primary-100 text-primary-600 rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Call Us</h3>
                <p className="text-neutral-500">+1 234 567 890</p>
                <p className="text-neutral-500">Mon - Fri, 9am - 6pm</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-primary-100 text-primary-600 rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Our Hive</h3>
                <p className="text-neutral-500">123 Bee Garden, Nature City</p>
                <p className="text-neutral-500">Green Valley, Earth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
