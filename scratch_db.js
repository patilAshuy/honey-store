const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    // remove surrounding quotes
    if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      value = value.substring(1, value.length - 1);
    }
    envVars[key] = value.trim();
  }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'] || '';
const supabaseAnonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || '';

console.log('URL:', supabaseUrl);
console.log('Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  try {
    const { data: categories, error: catErr } = await supabase.from('categories').select('*');
    console.log('--- Categories ---');
    if (catErr) console.error(catErr);
    else console.log(categories);

    const { data: products, error: prodErr } = await supabase.from('products').select('*');
    console.log('--- Products ---');
    if (prodErr) console.error(prodErr);
    else {
      console.log(`Found ${products.length} products`);
      if (products.length > 0) {
        console.log('Sample product:', JSON.stringify(products[0], null, 2));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

run();
