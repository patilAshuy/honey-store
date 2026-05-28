"use client";
import React, { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit3, Trash2, X, Upload, Save, FileText, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { HONEY_TYPES, LOCAL_IMAGES, formatPrice } from "@/lib/honeyTypes";

// All local images as a flat list for the image picker
const LOCAL_IMAGE_OPTIONS = [
  { label: "Jamun Honey 1",   value: "/images/PI Jamun Honey 1.jpg.jpeg" },
  { label: "Jamun Honey 2",   value: "/images/PI Jamun Honey 2.jpg.jpeg" },
  { label: "Jamun Honey 3",   value: "/images/PI Jamun Honey 3.jpg.jpeg" },
  { label: "Sidr Honey 1",    value: "/images/PI Apple Sidr Honey 1.jpg.jpeg" },
  { label: "Sidr Honey 2",    value: "/images/PI Apple Sidr Honey 2.jpg.jpeg" },
  { label: "Sidr Honey 3",    value: "/images/PI Apple Sidr Honey 3.jpg.jpeg" },
  { label: "Forest Honey 1",  value: "/images/PI Forest Honey 1.jpg.jpeg" },
  { label: "Forest Honey 2",  value: "/images/PI Forest Honey 2.jpg.jpeg" },
  { label: "Forest Honey 3",  value: "/images/PI Forest Honey 3.jpg.jpeg" },
  { label: "Mustard Honey 1", value: "/images/PI Mustard Honey 1.jpg.jpeg" },
  { label: "Mustard Honey 2", value: "/images/PI Mustard Honey 2.jpg.jpeg" },
  { label: "Mustard Honey 3", value: "/images/PI Mustard Honey 3.jpg.jpeg" },
  { label: "Tulsi Honey 1",   value: "/images/PI Tulsi Honey 1.jpg.jpeg" },
  { label: "Tulsi Honey 2",   value: "/images/PI Tulsi Honey 2.jpg.jpeg" },
  { label: "Tulsi Honey 3",   value: "/images/PI Tulsi Honey 3.jpg.jpeg" },
  { label: "Believe Honey A", value: "/images/Believe Honey One A.jpg.jpeg" },
  { label: "Believe Honey B", value: "/images/Believe Honey One B.jpg.jpeg" },
  { label: "Believe Honey C", value: "/images/Believe Honey One C.jpg.jpeg" },
  { label: "Believe Honey D", value: "/images/Believe Honey One D.jpg.jpeg" },
  { label: "Believe Honey E", value: "/images/Believe Honey One E.jpg.jpeg" },
  { label: "Kulkarni Apiary", value: "/images/Kulkarni Apiary.jpg.jpeg" },
];

// Returns the default image for a honey type
function defaultImageForType(honeyType: string): string {
  const type = honeyType.toLowerCase().trim();
  for (const [key, imgs] of Object.entries(LOCAL_IMAGES)) {
    if (key === "default") continue;
    if (type.startsWith(key) || type.includes(key)) return imgs[0];
  }
  return LOCAL_IMAGES.default[0];
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discount_price: "",
  stock_quantity: "",
  honey_type: HONEY_TYPES[0].value,
  image_url: HONEY_TYPES[0].image,
  weight: "500g",
  is_featured: false,
  status: "active" as "active" | "inactive",
  lab_report_url: "",
};

type FormData = typeof emptyForm;

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading]             = useState(false);
  const [products, setProducts]           = useState<any[]>([]);
  const [searchQuery, setSearchQuery]     = useState("");
  const [formData, setFormData]           = useState<FormData>(emptyForm);
  const [imagePreview, setImagePreview]   = useState(emptyForm.image_url);
  const [uploadingImage, setUploadingImage]   = useState(false);
  const [uploadingReport, setUploadingReport] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const imageInputRef  = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const openAdd = () => {
    setEditingProduct(null);
    const defaultImg = HONEY_TYPES[0].image;
    setFormData({ ...emptyForm, image_url: defaultImg });
    setImagePreview(defaultImg);
    setIsModalOpen(true);
  };

  const openEdit = (product: any) => {
    setEditingProduct(product);
    const img = product.images?.[0] || defaultImageForType(product.honey_type || "");
    setFormData({
      name:           product.name || "",
      description:    product.description || "",
      price:          product.price?.toString() || "",
      discount_price: product.discount_price?.toString() || "",
      stock_quantity: product.stock_quantity?.toString() || "",
      honey_type:     product.honey_type || product.category_id || HONEY_TYPES[0].value,
      image_url:      img,
      weight:         product.weight || "500g",
      is_featured:    product.is_featured || false,
      status:         product.status || "active",
      lab_report_url: product.lab_report_url || "",
    });
    setImagePreview(img);
    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      // When honey type changes → auto-set the matching default image
      if (name === "honey_type") {
        const autoImg = defaultImageForType(value);
        updated.image_url = autoImg;
        setImagePreview(autoImg);
      }

      if (name === "image_url") {
        setImagePreview(value as string);
      }

      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const ext  = file.name.split(".").pop();
      const path = `products/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("honey-images").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("honey-images").getPublicUrl(path);
      setFormData((p) => ({ ...p, image_url: urlData.publicUrl }));
      setImagePreview(urlData.publicUrl);
      showToast("Image uploaded!");
    } catch (err: any) {
      showToast("Upload failed: " + err.message, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingReport(true);
    try {
      const path = `lab-reports/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("honey-images").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("honey-images").getPublicUrl(path);
      setFormData((p) => ({ ...p, lab_report_url: urlData.publicUrl }));
      showToast("Lab report uploaded!");
    } catch (err: any) {
      showToast("Report upload failed: " + err.message, "error");
    } finally {
      setUploadingReport(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name:           formData.name,
        description:    formData.description,
        // Prices entered as INR — store as-is (no conversion)
        price:          parseFloat(formData.price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        honey_type:     formData.honey_type,
        category_id:    formData.honey_type,   // keep in sync
        images:         formData.image_url ? [formData.image_url] : [],
        weight:         formData.weight,
        is_featured:    formData.is_featured,
        status:         formData.status,
        lab_report_url: formData.lab_report_url || null,
      };

      if (editingProduct) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
        if (error) throw error;
        showToast("Product updated!");
      } else {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
        showToast("Product added!");
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      showToast("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { showToast("Delete failed: " + error.message, "error"); return; }
    showToast(`"${name}" deleted`);
    fetchProducts();
  };

  const handleToggleStatus = async (product: any) => {
    const newStatus = product.status === "active" ? "inactive" : "active";
    const { error } = await supabase.from("products").update({ status: newStatus }).eq("id", product.id);
    if (error) { showToast("Update failed", "error"); return; }
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, status: newStatus } : p));
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.honey_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-inter">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-6 py-3 rounded-2xl text-white font-bold shadow-xl ${
          toast.type === "success" ? "bg-brand-green" : "bg-red-500"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-outfit">Products</h1>
          <p className="text-neutral-500">Manage inventory, pricing, images, and lab reports.</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center space-x-2">
          <Plus size={20} /><span>Add Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all font-medium"
            />
          </div>
          <span className="text-sm text-neutral-400 font-medium">{filtered.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-400 text-sm italic">
              <tr>
                <th className="px-6 py-5 font-normal">Product</th>
                <th className="px-6 py-5 font-normal">Type</th>
                <th className="px-6 py-5 font-normal">Price (₹)</th>
                <th className="px-6 py-5 font-normal">Stock</th>
                <th className="px-6 py-5 font-normal">Lab Report</th>
                <th className="px-6 py-5 font-normal">Status</th>
                <th className="px-6 py-5 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center text-neutral-400">
                    {products.length === 0 ? "No products yet. Click 'Add Product'." : "No products match your search."}
                  </td>
                </tr>
              ) : filtered.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-neutral-100 rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={product.images?.[0] || defaultImageForType(product.honey_type || "")}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{product.name}</p>
                        <p className="text-xs text-neutral-500">{product.weight}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                      {product.honey_type || product.category_id || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-neutral-900">
                      {formatPrice(product.discount_price || product.price)}
                    </span>
                    {product.discount_price && (
                      <span className="text-xs text-neutral-400 line-through ml-2">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`font-bold ${
                      product.stock_quantity === 0 ? "text-red-500"
                      : product.stock_quantity < 10 ? "text-amber-500"
                      : "text-neutral-900"
                    }`}>
                      {product.stock_quantity ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {product.lab_report_url ? (
                      <a href={product.lab_report_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-brand-green text-xs font-bold hover:underline">
                        <FileText size={14} /> View
                      </a>
                    ) : <span className="text-neutral-300 text-xs">—</span>}
                  </td>
                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {product.status === "active" ? <><Eye size={12} /> Active</> : <><EyeOff size={12} /> Hidden</>}
                    </button>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => openEdit(product)}
                        className="p-2 text-neutral-400 hover:text-brand-green hover:bg-neutral-50 rounded-lg transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center flex-shrink-0">
              <h2 className="text-2xl font-bold font-outfit">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">

              {/* Name + Honey Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-xs">Product Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange}
                    className="input-field" placeholder="e.g. Raw Forest Honey" />
                </div>
                <div className="space-y-2">
                  <label className="label-xs">Honey Type *</label>
                  <select name="honey_type" value={formData.honey_type} onChange={handleChange} className="input-field">
                    {HONEY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="label-xs">Description *</label>
                <textarea required name="description" value={formData.description} onChange={handleChange}
                  rows={3} className="input-field resize-none" placeholder="Tell us about this golden harvest..." />
              </div>

              {/* Price / Sale Price / Stock / Weight */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="label-xs">Price (₹) *</label>
                  <input required type="number" step="1" min="1" name="price" value={formData.price}
                    onChange={handleChange} className="input-field" placeholder="499" />
                </div>
                <div className="space-y-2">
                  <label className="label-xs">Sale Price (₹)</label>
                  <input type="number" step="1" min="1" name="discount_price" value={formData.discount_price}
                    onChange={handleChange} className="input-field" placeholder="399" />
                </div>
                <div className="space-y-2">
                  <label className="label-xs">Stock *</label>
                  <input required type="number" min="0" name="stock_quantity" value={formData.stock_quantity}
                    onChange={handleChange} className="input-field" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <label className="label-xs">Weight</label>
                  <input name="weight" value={formData.weight} onChange={handleChange}
                    className="input-field" placeholder="500g" />
                </div>
              </div>

              {/* Status + Featured */}
              <div className="flex flex-wrap gap-6 items-center">
                <div className="space-y-2">
                  <label className="label-xs">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-5">
                  <input type="checkbox" name="is_featured" checked={formData.is_featured}
                    onChange={handleChange} className="w-4 h-4 accent-brand-green" />
                  <span className="text-sm font-bold text-neutral-700">Featured Product</span>
                </label>
              </div>

              {/* Image */}
              <div className="space-y-3">
                <label className="label-xs">Product Image</label>
                <div className="flex gap-4 items-start">
                  {/* Preview */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-neutral-200 flex-shrink-0 bg-neutral-50">
                    {imagePreview
                      ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-3xl">🍯</div>
                    }
                  </div>
                  <div className="flex-1 space-y-2">
                    {/* Pick from local images */}
                    <select
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, image_url: e.target.value }));
                        setImagePreview(e.target.value);
                      }}
                      className="input-field text-sm"
                    >
                      <option value="">— Pick a local image —</option>
                      {LOCAL_IMAGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {/* URL or upload */}
                    <div className="flex gap-2">
                      <input type="url" name="image_url" value={formData.image_url} onChange={handleChange}
                        className="input-field text-sm flex-1" placeholder="Or paste image URL..." />
                      <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <button type="button" onClick={() => imageInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="p-3 bg-neutral-100 rounded-2xl hover:bg-neutral-200 transition-colors disabled:opacity-50 flex-shrink-0">
                        {uploadingImage
                          ? <div className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                          : <Upload size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab Report */}
              <div className="space-y-3 p-5 bg-green-50 rounded-2xl border border-green-100">
                <label className="label-xs text-brand-green flex items-center gap-2">
                  <FileText size={14} /> Lab Report (PDF / Image)
                </label>
                <div className="flex gap-2">
                  <input type="url" name="lab_report_url" value={formData.lab_report_url} onChange={handleChange}
                    className="input-field text-sm flex-1" placeholder="Paste URL or upload..." />
                  <input ref={reportInputRef} type="file" accept=".pdf,image/*" onChange={handleReportUpload} className="hidden" />
                  <button type="button" onClick={() => reportInputRef.current?.click()}
                    disabled={uploadingReport}
                    className="p-3 bg-brand-green text-white rounded-2xl hover:bg-opacity-90 disabled:opacity-50 flex-shrink-0">
                    {uploadingReport
                      ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : <Upload size={18} />}
                  </button>
                </div>
                {formData.lab_report_url && (
                  <a href={formData.lab_report_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-brand-green font-bold underline flex items-center gap-1">
                    <FileText size={12} /> View uploaded report
                  </a>
                )}
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="btn-primary w-full py-5 flex items-center justify-center space-x-3 text-lg">
                {loading
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><Save size={22} /><span>{editingProduct ? "Save Changes" : "Add Product"}</span></>}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .label-xs { display:block; font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#9ca3af; margin-bottom:0.25rem; }
        .input-field { width:100%; padding:1rem; background:#f9fafb; border:1px solid #e5e7eb; border-radius:1rem; outline:none; font-weight:500; color:#1f2937; }
        .input-field:focus { background:white; box-shadow:0 0 0 2px #1a5f3a; }
      `}</style>
    </div>
  );
}
