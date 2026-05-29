# 🍯 Love of Honey (LOH) — Premium Honey Ecommerce

A production-ready ecommerce platform for premium organic honey, built with **Next.js 14**, **Supabase**, **Razorpay**, and **Tailwind CSS**.

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Product listing with category filter & search | ✅ |
| Product detail page with image gallery | ✅ |
| Shopping cart (localStorage persistent) | ✅ |
| Checkout with form validation | ✅ |
| Razorpay payment + server-side signature verification | ✅ |
| Order saved to Supabase after payment | ✅ |
| Real-time order tracking page | ✅ |
| Customer auth (signup, login, forgot password) | ✅ |
| Account page with order history | ✅ |
| Newsletter subscribe | ✅ |
| Admin login (Supabase Auth) | ✅ |
| Admin dashboard (live stats) | ✅ |
| Admin product CRUD + image upload + certifications | ✅ |
| Admin order management + status update | ✅ |
| Admin customers + subscribers list | ✅ |
| Admin analytics (revenue chart, top products) | ✅ |
| Middleware route protection | ✅ |
| Mobile responsive | ✅ |
| SEO meta tags | ✅ |
| Security headers | ✅ |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Razorpay
- **Deployment**: Vercel

---

## 🚀 Local Setup

### 1. Prerequisites
- Node.js 18+
- Supabase account — [supabase.com](https://supabase.com)
- Razorpay account — [razorpay.com](https://razorpay.com)

### 2. Clone & install
```bash
git clone https://github.com/patilAshuy/honey-store.git
cd honey-store
npm install
```

### 3. Environment variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database setup
1. Go to **Supabase Dashboard → SQL Editor**
2. Paste the entire contents of `supabase-migrations.sql`
3. Click **Run**

### 5. Create admin user
1. Go to **Supabase Dashboard → Authentication → Users → Add User**
2. Enter your email and a strong password
3. Enable **Auto Confirm User**

### 6. Create storage bucket
1. Go to **Supabase Dashboard → Storage → New Bucket**
2. Name: `honey-images`, Public: **ON**, Max size: 10 MB
3. Add policies:
   - `anon` SELECT with `true` (public reads)
   - `authenticated` INSERT/UPDATE/DELETE with `true` (admin uploads)

### 7. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Vercel Deployment

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
3. Add all environment variables from `.env.example`
4. Click **Deploy**

After deploy, update `NEXT_PUBLIC_SITE_URL` to your Vercel URL.

---

## 💳 Razorpay Setup

### Test mode (development)
- Use keys starting with `rzp_test_`
- Test card: `4111 1111 1111 1111`, any future expiry, any CVV

### Production mode
1. Complete KYC on Razorpay dashboard
2. Switch to Live keys (`rzp_live_*`)
3. Update `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` in Vercel

---

## 🔐 Admin Panel

Access at `/admin/login` with the Supabase Auth credentials you created.

**Admin features:**
- Dashboard with live revenue, orders, low-stock alerts
- Product CRUD — add/edit/delete, image upload, certifications, lab reports
- Order management — view details, update status
- Customer list from real order data
- Newsletter subscribers list
- Analytics — monthly revenue chart, top products, order status breakdown

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/          # All page routes
│   ├── admin/            # Admin panel (auth-protected)
│   ├── api/
│   │   ├── orders/       # POST create order, PUT verify payment
│   │   ├── razorpay/     # Legacy Razorpay route
│   │   └── subscribe/    # Newsletter subscribe
│   └── layout.tsx
├── components/
│   ├── shared/           # Navbar, Footer, NewsletterSection
│   └── shop/             # FeaturedProducts, FilterDrawer
├── hooks/
│   └── useCart.tsx       # Cart context + localStorage
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── razorpay.ts       # Razorpay SDK wrapper
│   └── honeyTypes.ts     # Types, images, formatPrice
├── middleware.ts          # Route protection
└── styles/
    └── globals.css
```

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `products` | Honey products with images, pricing, certifications |
| `orders` | Customer orders with items, shipping, payment status |
| `subscribers` | Newsletter email subscribers |

---

## 🔒 Security

- Server-side Razorpay signature verification (HMAC-SHA256)
- Middleware protects `/admin/*` and `/account/*` routes
- `SUPABASE_SERVICE_ROLE_KEY` only used server-side
- Security headers on all responses
- Input validation on all API routes
- RLS policies on all Supabase tables

---

## 📞 Support

WhatsApp: [+91 9422242240](https://wa.me/919422242240)  
Email: anant.kulkarnikk@gmail.com
