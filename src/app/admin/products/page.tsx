"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Filter, X, Upload, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    stock_quantity: "",
    category: "Organic",
    image_url: "",
    weight: "500g"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
          stock_quantity: parseInt(formData.stock_quantity),
          category_id: formData.category, 
          images: [formData.image_url],
          weight: formData.weight,
          status: 'active'
        }
      ]);

      if (error) throw error;
      
      alert("Product added successfully!");
      setIsModalOpen(false);
      fetchProducts();
      setFormData({
        name: "", description: "", price: "", discount_price: "",
        stock_quantity: "", category: "Organic", image_url: "", weight: "500g"
      });
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Products</h1>
          <p className="text-neutral-500">Manage your honey inventory and pricing.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2 shadow-primary-200"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic font-normal">
              <tr>
                <th className="px-8 py-5 font-normal">Product Details</th>
                <th className="px-8 py-5 font-normal">Price</th>
                <th className="px-8 py-5 font-normal">Stock</th>
                <th className="px-8 py-5 font-normal">Status</th>
                <th className="px-8 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-neutral-400">
                    No products found in the database.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-neutral-100 rounded-2xl overflow-hidden shadow-inner">
                          <img src={product.images?.[0]} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">{product.name}</p>
                          <p className="text-xs text-neutral-500">{product.weight}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-neutral-900">₹ {(product.price * 80).toFixed(2)}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-neutral-900">{product.stock_quantity}</span>
                        <span className="text-xs text-neutral-400">units</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">{product.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-neutral-400 hover:text-brand-green hover:bg-neutral-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                        <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold font-outfit">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none font-bold" placeholder="e.g. Raw Forest Honey" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none font-bold">
                    <option>Organic</option>
                    <option>Premium</option>
                    <option>Wildflower</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Description</label>
                <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none" placeholder="Tell us about this golden harvest..."></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Price (USD)</label>
                  <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none font-bold" placeholder="24.99" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Stock Qty</label>
                  <input required type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleInputChange} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none font-bold" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Weight</label>
                  <input required name="weight" value={formData.weight} onChange={handleInputChange} className="w-full p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none font-bold" placeholder="500g" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Image URL</label>
                <div className="flex gap-4">
                  <input required name="image_url" value={formData.image_url} onChange={handleInputChange} className="flex-grow p-4 bg-neutral-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-green outline-none" placeholder="https://unsplash.com/..." />
                  <button type="button" className="p-4 bg-neutral-100 rounded-2xl hover:bg-neutral-200 transition-colors">
                    <Upload size={20} />
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-5 flex items-center justify-center space-x-3 text-lg"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={22} />
                    <span>Save Product</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
