import React from "react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold font-outfit mb-8">Our Story</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-neutral-600 leading-relaxed">
              Founded in the heart of nature, HoneyPremium began with a simple mission: to bring the purest, most ethically sourced honey to your table.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Our beekeepers follow traditional methods, ensuring that every jar is raw, unfiltered, and packed with the natural goodness that only happy bees can provide.
            </p>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Harvesting Honey"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
