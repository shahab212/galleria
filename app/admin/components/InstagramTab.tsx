'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, RefreshCw, Camera, UploadCloud } from 'lucide-react';

interface InstaPost {
  id: number;
  src: string;
  handle: string;
  likes: string;
  caption: string;
  tilt: string;
}

interface InstagramTabProps {
  instaPosts: InstaPost[];
  onSavePosts: (posts: InstaPost[]) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function InstagramTab({ instaPosts, onSavePosts, triggerToast }: InstagramTabProps) {
  const [posts, setPosts] = useState<InstaPost[]>(JSON.parse(JSON.stringify(instaPosts)));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof InstaPost, value: any) => {
    const updated = [...posts];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      [field]: value
    };
    setPosts(updated);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        handleInputChange('src', data.filePath);
        triggerToast('Showcase photo uploaded successfully!');
      } else {
        triggerToast(data.error || 'Failed to upload photo');
      }
    } catch (error) {
      triggerToast('Error uploading photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSavePosts(posts);
      triggerToast('Instagram Showcase updated successfully!');
    } catch (error) {
      triggerToast('Error saving updates.');
    } finally {
      setIsSaving(false);
    }
  };

  const currentPost = posts[selectedIdx] || posts[0];

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Instagram Showcase</h2>
          <p className="text-xs text-slate-400 font-light">Change featured customer photos, social handles, captions, and like stats on the homepage showcase.</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#C5A059] hover:bg-white text-[#0C1623] px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4 stroke-[2.25]" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Select Post Bubble Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        {posts.map((post, idx) => (
          <button
            key={post.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
              selectedIdx === idx
                ? 'bg-[#C5A059] text-[#0C1623] scale-105 shadow-md'
                : 'bg-[#0C1623]/60 border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
            }`}
          >
            Post #{post.id} ({post.handle || '@handle'})
          </button>
        ))}
      </div>

      {/* Workspace Panel */}
      {currentPost && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Edit Form Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#0C1623]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-lg font-normal border-b border-white/10 pb-4">
              Modify Showcase Slot #{currentPost.id}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Instagram Handle input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Instagram Handle</label>
                <input
                  type="text"
                  value={currentPost.handle}
                  onChange={(e) => handleInputChange('handle', e.target.value)}
                  placeholder="e.g. @luxe_interiors_pk"
                  className="w-full bg-[#070D14]/80 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none transition-colors"
                />
              </div>

              {/* Likes Stats */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Likes Count</label>
                <input
                  type="text"
                  value={currentPost.likes}
                  onChange={(e) => handleInputChange('likes', e.target.value)}
                  placeholder="e.g. 1.8k"
                  className="w-full bg-[#070D14]/80 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Caption Area */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Featured Caption</label>
              <textarea
                rows={3}
                value={currentPost.caption}
                onChange={(e) => handleInputChange('caption', e.target.value)}
                placeholder="Describe the display setup (e.g. Living room transformation with Galleria canvas)"
                className="w-full bg-[#070D14]/80 border border-white/10 rounded-2xl p-5 text-xs text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Upload Showcase Photo</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-2xl p-5 cursor-pointer hover:border-[#C5A059]/60 hover:bg-white/[0.01] transition-all relative overflow-hidden group min-h-[110px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#C5A059]" />
                      <span className="text-[10px]">Uploading image asset...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                      <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                      <span className="text-[10px] font-medium text-center">Click to replace photo</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Tilt Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Polaroid Tilt Angle</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: '-rotate-3', label: 'Tilted Left' },
                    { val: 'rotate-2', label: 'Tilted Right' },
                    { val: '-rotate-2', label: 'Slight Left' },
                    { val: 'rotate-3', label: 'Right Large' },
                    { val: 'rotate-0', label: 'Flat Block' }
                  ].map((tiltOpt) => (
                    <button
                      key={tiltOpt.val}
                      onClick={() => handleInputChange('tilt', tiltOpt.val)}
                      className={`py-2 px-3 text-[10px] font-bold rounded-xl border text-center transition-all ${
                        currentPost.tilt === tiltOpt.val
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623]'
                          : 'bg-[#070D14]/80 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      {tiltOpt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0C1623]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px]">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-6">
              Live Polaroid Preview
            </span>

            {/* Simulated Polaroid Showcase item */}
            <div className={`p-4 rounded-[24px] shadow-2xl bg-white border border-gray-200/80 text-[#0C1623] w-64 max-w-full transform transition-transform duration-500 ${currentPost.tilt}`}>
              {/* Image box */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-gray-100 border border-gray-200">
                <Image
                  src={currentPost.src}
                  alt="Insta Preview"
                  fill
                  className="object-cover"
                />
                
                {/* Simulated Hover State */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-3 text-white">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                      ❤️ {currentPost.likes}
                    </span>
                    <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                  </div>
                  <div className="text-[8px] font-extrabold tracking-wider uppercase bg-[#C5A059] text-[#0C1623] py-1 px-2.5 rounded-full text-center shadow-md">
                    Shop Featured Look ↗
                  </div>
                </div>
              </div>

              {/* Caption details */}
              <div className="px-1 text-left space-y-0.5">
                <span className="text-xs font-bold block text-[#0C1623]">
                  {currentPost.handle || '@handle'}
                </span>
                <p className="text-[10px] font-light leading-snug text-slate-600 line-clamp-2">
                  {currentPost.caption || 'Product showcase review description...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
