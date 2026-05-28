import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

// ── All blog posts data ────────────────────────────────────────────────────
const posts = [
  {
    id: "1",
    title: "The Incredible Health Benefits of Raw Honey",
    category: "Health & Wellness",
    date: "May 15, 2026",
    author: "Dr. Anant Kulkarni",
    readTime: "5 min read",
    image: "/images/Believe Honey One A.jpg.jpeg",
    excerpt:
      "Discover why raw, unprocessed honey is considered a superfood and how it can boost your immunity, heal wounds, and improve digestion naturally.",
    content: `
      <p>Honey has been used for its medicinal properties for thousands of years across cultures — from ancient Egypt to Ayurvedic medicine. But not all honey is created equal. Raw, unprocessed honey retains all the natural enzymes, antioxidants, and pollen that make it a true superfood.</p>

      <h3>What makes raw honey different?</h3>
      <p>Commercial honey is often heated and filtered, which destroys many of its beneficial compounds. Raw honey is extracted cold and minimally processed, preserving:</p>
      <ul>
        <li><strong>Enzymes</strong> like diastase and invertase that aid digestion</li>
        <li><strong>Antioxidants</strong> including flavonoids and phenolic acids</li>
        <li><strong>Bee pollen</strong> — a complete protein source with vitamins and minerals</li>
        <li><strong>Propolis</strong> — a natural antibacterial and antifungal compound</li>
      </ul>

      <h3>Top health benefits</h3>
      <p><strong>1. Boosts immunity:</strong> The antioxidants in raw honey help neutralise free radicals and support your immune system. Regular consumption has been linked to reduced frequency of colds and infections.</p>
      <p><strong>2. Soothes sore throats:</strong> A time-tested remedy — honey coats the throat, reduces inflammation, and its antimicrobial properties fight the bacteria causing the irritation. Mix with warm water and ginger for best results.</p>
      <p><strong>3. Supports wound healing:</strong> Honey's low pH and hydrogen peroxide content create an inhospitable environment for bacteria. It has been used clinically to treat burns and wounds.</p>
      <p><strong>4. Improves sleep:</strong> A teaspoon of honey before bed raises insulin slightly, which triggers the release of tryptophan — a precursor to serotonin and melatonin.</p>
      <p><strong>5. Natural energy source:</strong> The natural sugars in honey (glucose and fructose) provide a quick, sustained energy boost without the crash of refined sugar.</p>

      <h3>How to use raw honey daily</h3>
      <p>Start your morning with warm water, lemon, and a teaspoon of raw honey. Use it as a natural sweetener in tea, drizzle over yoghurt, or apply topically as a face mask for glowing skin.</p>
      <p>Remember: never heat honey above 40°C — this destroys the enzymes and antioxidants that make it special.</p>
    `,
  },
  {
    id: "2",
    title: "Sustainable Beekeeping: Our Commitment to Nature",
    category: "Our Story",
    date: "May 10, 2026",
    author: "Kulkarni Apiary",
    readTime: "4 min read",
    image: "/images/Kulkarni Apiary.jpg.jpeg",
    excerpt:
      "How we ensure our bees are happy and thriving while producing the finest honey — from hive management to ethical harvesting practices.",
    content: `
      <p>At Kulkarni Apiary, beekeeping is not just a business — it's a responsibility. Bees are the backbone of our ecosystem, pollinating over 70% of the crops that feed the world. We take that responsibility seriously.</p>

      <h3>Our beekeeping philosophy</h3>
      <p>We follow natural beekeeping principles that prioritise the health of the colony over maximum honey yield. This means:</p>
      <ul>
        <li>Never harvesting more than 30% of a hive's honey stores</li>
        <li>Allowing bees to build natural comb without artificial foundations</li>
        <li>Zero use of antibiotics or synthetic chemicals in our hives</li>
        <li>Seasonal migration to follow natural flower blooms</li>
      </ul>

      <h3>Where our bees live</h3>
      <p>Our hives are placed in pristine locations — far from pesticide-sprayed farmland, near organic orchards, forest edges, and wildflower meadows. The diversity of flora our bees forage from directly impacts the complexity and nutritional richness of the honey they produce.</p>

      <h3>Ethical harvesting</h3>
      <p>We harvest honey only when the bees have capped it — a sign that the moisture content is below 20% and the honey is fully ripened. We use cold extraction methods that preserve all natural enzymes and never blend or adulterate our honey.</p>

      <p>Every jar you receive is a direct product of this care — pure, traceable, and honest.</p>
    `,
  },
  {
    id: "3",
    title: "Jamun Honey: The Dark Gold for Blood Sugar Balance",
    category: "Honey Varieties",
    date: "May 05, 2026",
    author: "Dr. Anant Kulkarni",
    readTime: "6 min read",
    image: "/images/PI Jamun Honey 1.jpg.jpeg",
    excerpt:
      "Jamun honey is harvested during the brief Indian Blackberry flowering season. Learn why it's prized for its anti-diabetic properties and rich iron content.",
    content: `
      <p>Jamun honey is one of India's most prized and rarest honey varieties. It is harvested during the brief flowering season of the Jamun tree (Syzygium cumini), also known as Indian Blackberry or Java Plum. The season lasts only 3–4 weeks, making this honey scarce and highly sought after.</p>

      <h3>What makes Jamun honey unique?</h3>
      <p>The Jamun tree itself is famous in Ayurveda for its anti-diabetic properties. The nectar from its flowers carries many of these same bioactive compounds into the honey, including:</p>
      <ul>
        <li><strong>Jamboline and jambosine</strong> — alkaloids that slow the conversion of starch to sugar</li>
        <li><strong>High iron content</strong> — beneficial for anaemia and blood health</li>
        <li><strong>Low glycaemic index</strong> — causes a slower rise in blood sugar compared to regular honey</li>
        <li><strong>Anthocyanins</strong> — powerful antioxidants that give Jamun its characteristic dark colour</li>
      </ul>

      <h3>Taste profile</h3>
      <p>Jamun honey is dark amber to almost black in colour with a distinctive tangy-sweet taste and a slight tartness. The flavour is complex — earthy, fruity, and deeply satisfying. It pairs beautifully with strong cheeses, dark bread, and herbal teas.</p>

      <h3>Who should use Jamun honey?</h3>
      <p>While Jamun honey is not a substitute for diabetes medication, it is often recommended by Ayurvedic practitioners as a dietary supplement for people managing blood sugar levels. Its lower glycaemic impact makes it a better choice than refined sugar for most people.</p>
      <p>Always consult your doctor before making dietary changes if you have diabetes.</p>
    `,
  },
  {
    id: "4",
    title: "Sidr Honey: Why It's Called the King of Honey",
    category: "Honey Varieties",
    date: "April 28, 2026",
    author: "Dr. Anant Kulkarni",
    readTime: "7 min read",
    image: "/images/PI Apple Sidr Honey 1.jpg.jpeg",
    excerpt:
      "Harvested from ancient Sidr trees, this rare honey has been prized for centuries. Explore its unique flavour, medicinal properties, and why it commands a premium price.",
    content: `
      <p>Sidr honey — also known as Lote tree honey or Beri honey — is produced by bees that feed exclusively on the nectar of the Sidr tree (Ziziphus spina-christi). This ancient tree is mentioned in the Quran and has been revered across the Middle East and South Asia for millennia.</p>

      <h3>Why is Sidr honey so special?</h3>
      <p>Sidr honey is monofloral — meaning bees collect nectar from a single flower source. This gives it an exceptionally consistent and potent composition. It is harvested only once or twice a year, making it one of the rarest honeys in the world.</p>

      <h3>Nutritional and medicinal properties</h3>
      <ul>
        <li><strong>Exceptionally high antioxidant content</strong> — among the highest of any honey variety</li>
        <li><strong>Powerful antibacterial activity</strong> — effective against antibiotic-resistant bacteria</li>
        <li><strong>Liver support</strong> — traditionally used in Yemeni and Indian medicine to support liver function</li>
        <li><strong>Fertility support</strong> — used in traditional medicine as a tonic for reproductive health</li>
        <li><strong>Wound healing</strong> — applied topically for burns, ulcers, and skin infections</li>
      </ul>

      <h3>Taste and texture</h3>
      <p>Sidr honey has a rich, caramel-like sweetness with a buttery, almost toffee-like finish. It is thick and slow-flowing, with a warm amber colour. The aroma is floral and complex — unlike any other honey you've tasted.</p>

      <h3>How to identify authentic Sidr honey</h3>
      <p>Genuine Sidr honey should crystallise slowly (if at all), have a strong distinctive aroma, and come with traceability information. Our Sidr honey is sourced directly from trusted apiaries and lab-tested for purity.</p>
    `,
  },
  {
    id: "5",
    title: "Forest Honey: Wild Goodness from the Western Ghats",
    category: "Honey Varieties",
    date: "April 20, 2026",
    author: "Kulkarni Apiary",
    readTime: "5 min read",
    image: "/images/PI Forest Honey 1.jpg.jpeg",
    excerpt:
      "Collected by wild bees from the dense forests of the Western Ghats, forest honey captures the essence of hundreds of wildflowers. Here's what makes it special.",
    content: `
      <p>Forest honey is perhaps the most complex and nutritionally rich honey variety available. Unlike monofloral honeys that come from a single flower source, forest honey is collected by wild bees from hundreds of different plants, trees, herbs, and wildflowers growing in the biodiversity hotspot of the Western Ghats.</p>

      <h3>The Western Ghats — a biodiversity treasure</h3>
      <p>The Western Ghats is one of the world's eight "hottest hotspots" of biological diversity. It is home to over 5,000 species of flowering plants, many of which are found nowhere else on Earth. The honey produced here reflects this extraordinary diversity.</p>

      <h3>What's in forest honey?</h3>
      <ul>
        <li><strong>Multifloral pollen</strong> — from hundreds of plant species, providing a broad spectrum of nutrients</li>
        <li><strong>Wild propolis</strong> — collected from forest resins, with strong antimicrobial properties</li>
        <li><strong>High enzyme activity</strong> — wild bees produce honey with higher enzyme concentrations than managed hives</li>
        <li><strong>Complex antioxidant profile</strong> — the diversity of nectar sources creates a uniquely rich antioxidant blend</li>
      </ul>

      <h3>Taste and appearance</h3>
      <p>Forest honey is dark amber to deep brown in colour with an earthy, woody aroma and a complex flavour that changes with each harvest season. You may detect notes of wildflowers, herbs, and even a slight smokiness from the forest environment.</p>

      <p>No two batches are identical — each jar is a snapshot of the forest at a particular moment in time.</p>
    `,
  },
  {
    id: "6",
    title: "5 Simple Ways to Add Honey to Your Daily Routine",
    category: "Lifestyle",
    date: "April 12, 2026",
    author: "Dr. Anant Kulkarni",
    readTime: "4 min read",
    image: "/images/Believe Honey One B.jpg.jpeg",
    excerpt:
      "From morning warm water with honey to skincare masks — five easy, science-backed ways to make raw honey a part of your everyday wellness ritual.",
    content: `
      <p>Raw honey is one of nature's most versatile gifts. Beyond spreading it on toast, there are dozens of ways to incorporate it into your daily life for better health, better skin, and better taste. Here are five of our favourites.</p>

      <h3>1. Morning honey water</h3>
      <p>Start your day with a glass of warm (not hot) water, the juice of half a lemon, and a teaspoon of raw honey. This simple ritual kickstarts digestion, alkalises the body, and provides a gentle energy boost without caffeine. The key is warm water — hot water destroys honey's enzymes.</p>

      <h3>2. Pre-workout energy boost</h3>
      <p>A tablespoon of honey 30 minutes before exercise provides fast-acting glucose for immediate energy and slow-releasing fructose for sustained endurance. It's nature's sports gel — without the artificial colours and preservatives.</p>

      <h3>3. Honey face mask</h3>
      <p>Apply a thin layer of raw honey to clean skin and leave for 15–20 minutes before rinsing. Honey's humectant properties draw moisture into the skin, while its antibacterial compounds help clear acne. Use 2–3 times a week for visibly clearer, softer skin.</p>

      <h3>4. Honey in your tea (the right way)</h3>
      <p>Never add honey to boiling tea — wait until your cup cools to below 40°C. At higher temperatures, honey's beneficial enzymes are destroyed and some compounds can become harmful. Warm tea with honey is a perfect evening wind-down ritual.</p>

      <h3>5. Honey and turmeric golden milk</h3>
      <p>Warm oat milk with a teaspoon of turmeric, a pinch of black pepper, and a teaspoon of raw honey makes a powerful anti-inflammatory bedtime drink. The black pepper activates curcumin in turmeric, and honey adds sweetness while contributing its own anti-inflammatory compounds.</p>

      <p>Small, consistent habits make the biggest difference. Pick one of these and try it for a week — you'll notice the difference.</p>
    `,
  },
];

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
