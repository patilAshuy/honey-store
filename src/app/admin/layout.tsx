import React from "react";
import Link from "next/link";
import { LayoutDashboard, Box, ShoppingBag, Users, BarChart, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white fixed h-full hidden lg:flex flex-col">
        <div className="p-8 border-b border-neutral-800">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
            <span className="font-outfit text-xl font-bold">AdminPanel</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-xl bg-primary-600 text-white transition-all">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 transition-all">
            <Box size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 transition-all">
            <ShoppingBag size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 transition-all">
            <Users size={20} />
            <span>Customers</span>
          </Link>
          <Link href="/admin/analytics" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-800 transition-all">
            <BarChart size={20} />
            <span>Analytics</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-neutral-800">
          <button className="flex items-center space-x-3 p-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64">
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h2 className="text-xl font-bold text-neutral-800 font-outfit">Overview</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-neutral-100 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors">
              <span className="relative inline-block w-2 h-2 bg-red-500 rounded-full absolute -top-0 -right-0 border-2 border-white"></span>
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-neutral-900">Admin User</p>
                <p className="text-xs text-neutral-500">Store Manager</p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
