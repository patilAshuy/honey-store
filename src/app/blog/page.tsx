import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { posts } from "./blogData";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest mb-4">
            Honey Insights
          </span>
          <h1 className="text-5xl font-bold font-outfit mb-4 text-neutral-900">
            The Honey Blog
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto">
            Health tips, honey varieties, beekeeping stories, and recipes — straight from the hive.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${posts[0].id}`}
          className="group block mb-16 rounded-[3rem] overflow-hidden bg-neutral-900 relative shadow-2xl hover:shadow-brand-green/20 transition-all duration-500"
        >
          <div className="absolute inset-0">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="relative z-10 p-10 sm:p-16 flex flex-col justify-end min-h-[400px]">
            <span className="inline-block px-3 py-1 bg-brand-green text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4 w-fit">
              {posts[0].category}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-outfit text-white leading-tight mb-4 max-w-2xl">
              {posts[0].title}
            </h2>
            <p className="text-neutral-300 text-lg max-w-xl mb-6">{posts[0].excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-neutral-400 text-sm">
              <span className="flex items-center gap-1.5">
                <User size={14} /> {posts[0].author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {posts[0].date}
              </span>
              <span className="flex items-center gap-1.5 text-brand-green font-bold">
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* Grid of remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {post.category}
                  </span>
                  <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-brand-green transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-green font-bold text-xs">
                    Read <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
