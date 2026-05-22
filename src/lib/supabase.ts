import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  images: string[];
  category_id: string;
  stock_quantity: number;
  weight: string;
  honey_type: string;
  benefits: string[];
  sku: string;
  is_featured: boolean;
  status: 'active' | 'inactive';
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  payment_id?: string;
  tracking_id?: string;
  shipping_address: any;
  created_at: string;
};
