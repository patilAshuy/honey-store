import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Mock blog data based on ID
  const post = {
    id: params.id,
    title: "The Incredible Health Benefits of Raw Manuka Honey",
    content: `
      <p>Honey has been used for its medicinal properties for thousands of years. But not all honey is created equal. Manuka honey, in particular, has gained global recognition for its unique antibacterial properties and healing potential.</p>
      <p>Manuka honey is native to New Zealand and is produced by bees that pollinate the flower Leptospermum scoparium, commonly known as the manuka bush.</p>
      <h3>What makes Manuka honey special?</h3>
      <p>The primary difference between Manuka honey and other types of honey is its high concentration of methylglyoxal (MGO). While all honey has some antibacterial action, Manuka honey's MGO levels are significantly higher, making it more effective at fighting certain types of bacteria.</p>
      <ul>
        <li>Supports wound healing</li>
        <li>Soothes sore throats</li>
        <li>Improves digestive health</li>
        <li>Boosts the immune system</li>
      </ul>
      <p>When purchasing Manuka honey, look for the UMF (Unique Manuka Factor) rating. This ensures that the honey is authentic and contains the markers that provide its unique benefits.</p>
    `,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1200&auto=format&fit=crop",
    date: "May 15, 2026",
    author: "Dr. Bee",
    category: "Health & Wellness"
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/blog" className="flex items-center space-x-2 text-neutral-500 hover:text-brand-green transition-colors mb-12 group w-fit">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Insights</span>
        </Link>

        <article className="space-y-12">
          <div className="space-y-6">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-outfit text-neutral-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-neutral-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">B</div>
                  <span className="font-bold text-neutral-900">{post.author}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-neutral-400 font-medium">
                  <span className="flex items-center"><Clock size={16} className="mr-2" /> {post.date}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          </div>

          <div 
            className="prose prose-lg prose-neutral max-w-none prose-headings:font-outfit prose-headings:font-bold prose-p:leading-relaxed prose-li:text-neutral-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="pt-12 border-t border-neutral-100">
            <div className="bg-neutral-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl font-bold font-outfit">Love these health tips?</h2>
                <p className="text-neutral-400 max-w-md mx-auto">
                  Try our Raw Manuka Honey today and experience the benefits for yourself.
                </p>
                <Link href="/products" className="btn-primary inline-flex items-center space-x-2">
                  <span>Shop Manuka Honey</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
