'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit2, Trash2, X, Upload, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data';

interface ProductsTabProps {
  products: Product[];
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<void>;
  onEditProduct: (id: string, prod: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  triggerToast: (msg: string) => void;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function ProductsTab({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  triggerToast
}: ProductsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, image: data.filePath }));
        triggerToast('Product image uploaded and watermarked successfully!');
      } else {
        triggerToast(data.error || 'Failed to upload image');
      }
    } catch (error) {
      triggerToast('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'abstract',
    type: 'Textured Canvas',
    pricePKR: '',
    rating: '4.8',
    image: '/shop/image11.jpg',
    desc: '',
    discountPercent: '0'
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'abstract',
      type: 'Textured Canvas',
      pricePKR: '',
      rating: '4.8',
      image: '/shop/image11.jpg',
      desc: '',
      discountPercent: '0'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      type: product.type,
      pricePKR: String(product.pricePKR),
      rating: String(product.rating || 4.8),
      image: product.image,
      desc: product.desc || '',
      discountPercent: String(product.discountPercent || 0)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = {
        name: formData.name,
        category: formData.category,
        type: formData.type,
        pricePKR: Number(formData.pricePKR) || 20000,
        rating: Number(formData.rating) || 4.8,
        image: formData.image,
        desc: formData.desc,
        discountPercent: Number(formData.discountPercent) || 0
      };

      if (editingProduct) {
        await onEditProduct(editingProduct.id, parsedData);
        triggerToast(`Updated "${formData.name}" successfully!`);
      } else {
        await onAddProduct(parsedData);
        triggerToast(`Added "${formData.name}" to catalog!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      triggerToast('Error saving product changes');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the active store?`)) {
      try {
        await onDeleteProduct(id);
        triggerToast(`Deleted "${name}" from catalog`);
      } catch (error) {
        triggerToast('Error deleting catalog item');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header section with add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Store Catalog</h2>
          <p className="text-xs text-slate-400 font-light">Add, edit, or remove Galleria arts pieces displayed on the landing page.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-[#C5A059] hover:bg-white text-[#0C1623] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Artwork</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-4 py-3 pl-10 border border-white/10 bg-[#0C1623]/60 text-white rounded-xl focus:outline-none focus:border-[#C5A059] transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        {/* Categories select tabs */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-thin">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === c.id
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

      </div>

      {/* Products Table Grid */}
      <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-[#C5A059] bg-[#070D14]/40">
                <th className="py-4 px-6 font-bold">Image</th>
                <th className="py-4 px-6 font-bold">Details</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold">Base Price</th>
                <th className="py-4 px-6 font-bold">Rating</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-light">
                    No artworks found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/15 bg-white/5 flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-white text-sm">{p.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.type}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 font-semibold text-[10px] tracking-wide uppercase">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-[#C5A059]">
                      {formatPKR(p.pricePKR)}
                    </td>
                    <td className="py-4 px-6 font-medium text-amber-400">
                      ★ {p.rating || '4.8'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition"
                          aria-label="Edit Artwork"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition"
                          aria-label="Delete Artwork"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0C1623] border border-white/10 rounded-[32px] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-6">
              {editingProduct ? 'Edit Catalog Artwork' : 'Add New Canvas Artwork'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Artwork Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter title..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                  >
                    <option value="abstract">Abstract</option>
                    <option value="modern">Modern</option>
                    <option value="nature">Nature</option>
                    <option value="islamic">Islamic Art</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </div>

                {/* Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Artwork Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Textured Canvas..."
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Price */}
                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Base Price (PKR)</label>
                  <input
                    type="number"
                    required
                    placeholder="Base Price..."
                    value={formData.pricePKR}
                    onChange={(e) => setFormData({ ...formData, pricePKR: e.target.value })}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                  />
                </div>

                {/* Discount */}
                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Image Asset Path</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8">
                    <input
                      type="text"
                      required
                      placeholder="/shop/image11.jpg..."
                      value={formData.image}
                      onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                    />
                  </div>
                  
                  <div className="sm:col-span-4 w-full">
                    <label className="w-full border border-dashed border-white/20 hover:border-[#C5A059] rounded-xl py-3 px-4 flex items-center justify-center gap-2 cursor-pointer transition text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {isUploading ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-[#C5A059]" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#C5A059]" />
                      )}
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed description of canvas texture, framing defaults..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full text-xs p-4 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#C5A059] hover:bg-white text-[#0C1623] py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Artwork'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-transparent border-2 border-white/15 hover:bg-white/10 text-white py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
