import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Honey Premium | Pure & Organic Honey",
  description: "Experience the finest organic honey delivered straight from the hive. Premium quality, raw and unfiltered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-inter antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <a 
          href="https://wa.me/yournumber" 
          className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 animate-bounce"
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.611-.918-2.208-.242-.588-.487-.508-.67-.517-.172-.008-.37-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.993 8.993 0 01-4.303-1.091l-.31-.184-3.21.841.856-3.132-.202-.322a8.979 8.979 0 01-1.376-4.735c0-4.966 4.042-9.008 9.008-9.008 2.406 0 4.667.937 6.366 2.637a8.956 8.956 0 012.637 6.371c0 4.968-4.042 9.008-9.008 9.008m6.368-15.373A10.605 10.605 0 0012.651 1.006c-5.874 0-10.655 4.781-10.655 10.655 0 1.877.49 3.71 1.418 5.334L2.006 23l6.108-1.604a10.62 10.62 0 005.158 1.332h.005c5.874 0 10.657-4.782 10.657-10.655 0-2.846-1.107-5.522-3.118-7.533z"/></svg>
        </a>
      </body>
    </html>
  );
}
