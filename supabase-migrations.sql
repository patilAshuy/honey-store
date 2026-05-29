-- ============================================================
-- Love of Honey (LOH) — Complete Supabase Schema
-- Run this ONCE in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── 1. PRODUCTS ──────────────────────────────────────────────
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS lab_report_url   TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS honey_type        TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured       BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS certifications    TEXT[]  DEFAULT '{}';

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read active products"  ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can do all"   ON public.products;

CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated admin can do all"
  ON public.products FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ── 2. ORDERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                TEXT PRIMARY KEY,
  customer_name     TEXT,
  customer_email    TEXT,
  customer_phone    TEXT,
  shipping_address  JSONB,
  items             JSONB    NOT NULL DEFAULT '[]',
  subtotal          NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_fee      NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount      NUMERIC(10,2) NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled')),
  payment_id        TEXT,
  razorpay_order_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_email      ON public.orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON public.orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert orders"             ON public.orders;
DROP POLICY IF EXISTS "Authenticated admin can read orders"  ON public.orders;
DROP POLICY IF EXISTS "Authenticated admin can update orders"ON public.orders;
DROP POLICY IF EXISTS "Users can read own orders"            ON public.orders;

CREATE POLICY "Anyone can insert orders"
  ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admin can read orders"
  ON public.orders FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated admin can update orders"
  ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow customers to read their own orders by email (anon)
CREATE POLICY "Users can read own orders"
  ON public.orders FOR SELECT
  USING (true);   -- open read so track-order page works without auth

-- ── 3. SUBSCRIBERS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can subscribe"                    ON public.subscribers;
DROP POLICY IF EXISTS "Authenticated admin can read subscribers"ON public.subscribers;

CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated admin can read subscribers"
  ON public.subscribers FOR SELECT TO authenticated USING (true);

-- ── 4. STORAGE BUCKET ────────────────────────────────────────
-- Do this in: Supabase Dashboard → Storage → New Bucket
--   Name:    honey-images
--   Public:  YES
--   Max:     10 MB
--   MIME:    image/jpeg, image/png, image/webp, application/pdf
--
-- Storage policies (Dashboard → Storage → honey-images → Policies):
--   Policy 1: "Public read"
--     Operation: SELECT | Role: anon | USING: true
--   Policy 2: "Authenticated upload"
--     Operation: INSERT, UPDATE, DELETE | Role: authenticated | USING: true

-- ── 5. ADMIN USER ────────────────────────────────────────────
-- Supabase Dashboard → Authentication → Users → Add User
--   Email:    your-admin@email.com
--   Password: (strong password)
--   ✅ Auto Confirm User = ON

-- ── 6. SAMPLE PRODUCTS (optional — uncomment to seed) ────────
/*
INSERT INTO public.products
  (name, description, price, discount_price, stock_quantity,
   honey_type, category_id, images, weight, status, is_featured, certifications)
VALUES
  ('Premium Jamun Honey',
   'Dark, rich honey from Jamun blossoms. Tangy-sweet with potential blood sugar benefits.',
   499, 399, 100, 'Jamun', 'Jamun',
   ARRAY['/images/PI Jamun Honey 1.jpg.jpeg'], '500g', 'active', true,
   ARRAY['FSSAI', 'Organic India']),

  ('Pure Sidr Honey',
   'Rare honey from ancient Sidr trees. Rich caramel-like flavour with powerful medicinal properties.',
   899, 749, 50, 'Sidr', 'Sidr',
   ARRAY['/images/PI Apple Sidr Honey 1.jpg.jpeg'], '500g', 'active', true,
   ARRAY['FSSAI', 'AGMARK']),

  ('Wild Forest Honey',
   'Raw, unfiltered honey from wild bees in the Western Ghats. Complex earthy flavour.',
   649, null, 75, 'Forest', 'Forest',
   ARRAY['/images/PI Forest Honey 1.jpg.jpeg'], '500g', 'active', false,
   ARRAY['FSSAI']),

  ('Mustard Blossom Honey',
   'Light golden honey from mustard fields. Mild, buttery sweetness perfect for everyday use.',
   349, null, 120, 'Mustard', 'Mustard',
   ARRAY['/images/PI Mustard Honey 1.jpg.jpeg'], '500g', 'active', false,
   ARRAY['FSSAI']),

  ('Tulsi Honey',
   'Aromatic honey infused with the essence of holy basil. Supports immunity and respiratory health.',
   449, 379, 80, 'Tulsi', 'Tulsi',
   ARRAY['/images/PI Tulsi Honey 1.jpg.jpeg'], '500g', 'active', true,
   ARRAY['FSSAI', 'Organic India']);
*/
