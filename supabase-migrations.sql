-- ============================================================
-- Love of Honey (LOH) — Supabase Setup SQL
-- Paste this entire file into: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── STEP 1: Add missing columns to products ─────────────────

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS lab_report_url TEXT;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS honey_type TEXT;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- ── STEP 2: Products RLS ─────────────────────────────────────
-- Public can read active products; only authenticated admin can write.

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist, then recreate cleanly
DROP POLICY IF EXISTS "Public can read active products"   ON public.products;
DROP POLICY IF EXISTS "Authenticated admin can do all"    ON public.products;

CREATE POLICY "Public can read active products"
  ON public.products
  FOR SELECT
  USING (status = 'active');

-- Admin (any authenticated Supabase user) can INSERT / UPDATE / DELETE
CREATE POLICY "Authenticated admin can do all"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── STEP 3: Orders table ─────────────────────────────────────
-- Create if it doesn't already exist in your project

CREATE TABLE IF NOT EXISTS public.orders (
  id                  TEXT PRIMARY KEY,
  customer_name       TEXT,
  customer_email      TEXT,
  customer_phone      TEXT,
  shipping_address    JSONB,
  items               JSONB NOT NULL DEFAULT '[]',
  subtotal            NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_fee        NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount        NUMERIC(10,2) NOT NULL DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled')),
  payment_id          TEXT,
  razorpay_order_id   TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert orders"              ON public.orders;
DROP POLICY IF EXISTS "Authenticated admin can read orders"   ON public.orders;
DROP POLICY IF EXISTS "Authenticated admin can update orders" ON public.orders;

-- Customers can place orders (no auth required)
CREATE POLICY "Anyone can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read / update orders
CREATE POLICY "Authenticated admin can read orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admin can update orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── STEP 4: Create the admin user in Supabase Auth ───────────
-- Do this in: Supabase Dashboard → Authentication → Users → Add User
--
--   Email:    anant.kulkarnikk@gmail.com   (or whatever you prefer)
--   Password: choose a strong password
--   ✅ Auto Confirm User = ON
--
-- That's it. No extra table needed. The email+password is all that
-- protects the /admin route.

-- ── STEP 5: Storage bucket ───────────────────────────────────
-- Do this in: Supabase Dashboard → Storage → New Bucket
--
--   Name:        honey-images
--   Public:      YES  (toggle ON)
--   Max size:    10 MB
--   MIME types:  image/jpeg, image/png, image/webp, application/pdf
--
-- Then add a storage policy:
--   Dashboard → Storage → honey-images → Policies → New Policy
--   Policy name:  "Public can read honey-images"
--   Allowed ops:  SELECT
--   Target roles: public (anon)
--   USING expr:   true
--
--   And a second policy for uploads:
--   Policy name:  "Authenticated can upload honey-images"
--   Allowed ops:  INSERT, UPDATE, DELETE
--   Target roles: authenticated
--   USING expr:   true

-- ── STEP 6 (optional): seed sample products ──────────────────
-- Uncomment and run after your bucket + auth user are ready.

/*
INSERT INTO public.products
  (name, description, price, discount_price, stock_quantity, honey_type, category_id,
   images, weight, status, is_featured, lab_report_url)
VALUES
  ('Premium Jamun Honey',
   'Dark, rich honey from Jamun blossoms. Tangy-sweet with potential blood sugar benefits.',
   499, 399, 100, 'Jamun', 'Jamun',
   ARRAY['/images/PI Jamun Honey 1.jpg.jpeg'], '500g', 'active', true, null),

  ('Pure Sidr Honey',
   'Rare honey from ancient Sidr trees. Rich caramel-like flavour with powerful medicinal properties.',
   899, 749, 50, 'Sidr', 'Sidr',
   ARRAY['/images/PI Apple Sidr Honey 1.jpg.jpeg'], '500g', 'active', true, null),

  ('Wild Forest Honey',
   'Raw, unfiltered honey from wild bees in the Western Ghats. Complex earthy flavour.',
   649, null, 75, 'Forest', 'Forest',
   ARRAY['/images/PI Forest Honey 1.jpg.jpeg'], '500g', 'active', false, null),

  ('Mustard Blossom Honey',
   'Light golden honey from mustard fields. Mild, buttery sweetness perfect for everyday use.',
   349, null, 120, 'Mustard', 'Mustard',
   ARRAY['/images/PI Mustard Honey 1.jpg.jpeg'], '500g', 'active', false, null),

  ('Tulsi Honey',
   'Aromatic honey infused with the essence of holy basil. Supports immunity and respiratory health.',
   449, 379, 80, 'Tulsi', 'Tulsi',
   ARRAY['/images/PI Tulsi Honey 1.jpg.jpeg'], '500g', 'active', true, null);
*/
