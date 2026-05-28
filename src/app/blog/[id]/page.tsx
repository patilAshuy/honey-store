import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { posts } from "../blogData";

// ── Static params for build-time generation ───────────────────────────────
export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);

  // 404 if post not found
  if (!post) notFound();

  // Related posts — other posts excluding current
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back link */}
        <Link
          href="/blog"
          className="flex items-center space-x-2 text-neutral-500 hover:text-brand-green transition-colors mb-12 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Blog</span>
        </Link>

        <article className="space-y-10">
          {/* Meta */}
          <div className="space-y-5">
            <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit text-neutral-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 py-5 border-y border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-sm">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">{post.author}</p>
                  <p className="text-neutral-400 text-xs">{post.readTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-neutral-400">
                <Clock size={14} />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article body */}
          <div
            className="prose prose-lg prose-neutral max-w-none
              prose-headings:font-outfit prose-headings:font-bold prose-headings:text-neutral-900
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-neutral-600 prose-li:leading-relaxed
              prose-strong:text-neutral-800
              prose-ul:space-y-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="bg-neutral-900 text-white p-10 sm:p-14 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl" />
            <div className="relative z-10 text-center space-y-5">
              <span className="text-4xl">🍯</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-outfit">
                Ready to experience the benefits?
              </h2>
              <p className="text-neutral-400 max-w-md mx-auto">
                Shop our range of pure, lab-tested honey varieties — sourced directly from trusted apiaries.
              </p>
              <Link
                href="/products"
                className="btn-primary inline-flex items-center gap-2"
              >
                Shop All Honey <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold font-outfit text-neutral-900 mb-8">
            More from the Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rp) => (
              <Link
                key={rp.id}
                href={`/blog/${rp.id}`}
                className="group flex flex-col bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">
                    {rp.category}
                  </span>
                  <h3 className="font-bold text-neutral-900 text-sm leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                    {rp.title}
                  </h3>
                  <div className="flex items-center gap-1 text-brand-green text-xs font-bold pt-1">
                    Read <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
