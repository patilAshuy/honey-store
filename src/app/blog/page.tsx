import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Incredible Health Benefits of Raw Manuka Honey",
      excerpt: "Discover why Manuka honey is considered a superfood and how it can boost your immune system...",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=800&auto=format&fit=crop",
      date: "May 15, 2026",
      author: "Dr. Bee"
    },
    {
      id: 2,
      title: "Sustainable Beekeeping: Our Commitment to Nature",
      excerpt: "How we ensure our fuzzy friends are happy and thriving while producing the world's finest honey...",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
      date: "May 10, 2026",
      author: "Sarah Gold"
    },
    {
      id: 3,
      title: "5 Delicious Recipes Using Wildflower Honey",
      excerpt: "From Glazed Salmon to Sweetened Teas, explore new ways to enjoy our raw golden harvest...",
      image: "https://images.unsplash.com/photo-1471943038886-981f9b370607?q=80&w=800&auto=format&fit=crop",
      date: "May 05, 2026",
      author: "Chef Hive"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-outfit mb-4">Honey Insights</h1>
          <p className="text-neutral-500 text-lg">Stay updated with the latest news, recipes, and health tips from the hive.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="space-y-4 px-2">
                <div className="flex items-center space-x-4 text-xs font-bold text-primary-600 uppercase tracking-widest">
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.date}</span>
                  <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-neutral-500 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center space-x-2 text-neutral-900 font-bold border-b-2 border-primary-500 pb-1 hover:text-primary-600 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
