# 🍯 HoneyPremium - Modern Ecommerce Platform

HoneyPremium is a premium, full-featured ecommerce web application designed for organic honey stores. Built with **Next.js 14**, **Tailwind CSS**, and **Supabase**, it offers a high-performance shopping experience for customers and a powerful dashboard for administrators.

## ✨ Features

- 🌟 **Premium UI/UX**: Modern, responsive design with glassmorphism and smooth animations.
- 🛍️ **Complete Shop**: Product listing, detailed descriptions, search, and category filtering.
- 🛒 **Advanced Cart**: State persistence, quantity controls, and easy checkout.
- 💳 **Razorpay Integration**: Secure payment processing with test/production support.
- 🔒 **Secure Auth**: Supabase Auth for customers and admin-only dashboard protection.
- 📊 **Admin Dashboard**: Real-time sales analytics, inventory management (CRUD), and order tracking.
- 📱 **Mobile Ready**: Fully optimized for all screen sizes.
- 🐳 **Dockerized**: Easy deployment with Docker and Docker Compose.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **Payments**: Razorpay Node.js SDK.
- **Icons**: Lucide React.
- **Deployment**: Vercel (Frontend), Docker (Self-hosting).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ and npm
- Supabase Account
- Razorpay Account (Test mode enabled)

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### 4. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor:
- [SQL Schema provided in /sql/schema.sql]

---

## 📦 Deployment Guide

### Vercel (Easiest for Beginners)
1. Push your code to GitHub.
2. Link your repository to Vercel.
3. Add Environment Variables in Vercel Dashboard.
4. Click **Deploy**.

### Docker Deployment
```bash
docker-compose up --build -d
```

### Render / Railway
1. Connect your GitHub.
2. Select **Web Service**.
3. Use Build Command: `npm run build` and Start Command: `npm run start`.

---

## 🌐 Free Domain & SSL Setup

### 1. Free Domain (EU.org)
- Visit [nic.eu.org](https://nic.eu.org) and register a free domain.
- Verify your email and wait for domain approval.

### 2. Cloudflare DNS
- Create a Cloudflare account.
- Add your EU.org domain.
- Point EU.org nameservers to Cloudflare (e.g., `ashley.ns.cloudflare.com`).

### 3. Domain Mapping
- In your hosting platform (Vercel/Render), add your custom domain.
- Add the CNAME or A records provided by the host into Cloudflare.
- Set Cloudflare SSL/TLS to **Full (strict)**.

---

## 🛡️ Security
- **Protected Routes**: Middleware checks for admin session on `/admin/*`.
- **Environment Variables**: Secrets are never exposed to the client.
- **Input Validation**: API routes use Zod/Server-side checks.

---

## 📄 License
MIT License. Feel free to use this for your individual or commercial projects.

---

*Crafted by Antigravity AI* 🐝
