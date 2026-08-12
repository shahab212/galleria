'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, RefreshCw, Heart, Plus, Trash2, MapPin, Sparkles, Upload } from 'lucide-react';
import { Patron } from '../../components/Patrons';

interface PatronsTabProps {
  patrons: Patron[];
  onSavePatrons: (patrons: Patron[]) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function PatronsTab({ patrons, onSavePatrons, triggerToast }: PatronsTabProps) {
  const [list, setList] = useState<Patron[]>(JSON.parse(JSON.stringify(patrons)));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof Patron, value: string) => {
    if (list.length === 0) return;
    const updated = [...list];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      [field]: value
    };
    setList(updated);
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
        handleInputChange('image', data.filePath);
        triggerToast('Showcase image uploaded successfully!');
      } else {
        triggerToast(data.error || 'Failed to upload image');
      }
    } catch (error) {
      triggerToast('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddPatron = () => {
    const newPatron: Patron = {
      id: `patron-${Date.now()}`,
      name: 'New Patron Space',
      location: 'Lahore',
      initials: 'N.P',
      type: 'Bespoke Art Curation',
      description: 'Describe the curation project details and installed artworks here.',
      highlights: '10+ Pieces Installed',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      established: `Patron since ${new Date().getFullYear()}`
    };
    const updated = [...list, newPatron];
    setList(updated);
    setSelectedIdx(updated.length - 1);
    triggerToast('New patron added. Fill in details and click Save Changes.');
  };

  const handleDeletePatron = () => {
    if (list.length === 0) return;
    const updated = list.filter((_, i) => i !== selectedIdx);
    setList(updated);
    setSelectedIdx(Math.max(0, selectedIdx - 1));
    triggerToast('Patron removed. Click Save Changes to commit.');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSavePatrons(list);
      triggerToast('Patrons list updated successfully!');
    } catch (error) {
      triggerToast('Error saving patrons updates.');
    } finally {
      setIsSaving(false);
    }
  };

  const currentPatron = list[selectedIdx] || null;

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Patrons & Spaces Curation</h2>
          <p className="text-xs text-slate-400 font-light">Customize regular customers, installation snapshot portfolios, and curation descriptions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddPatron}
            className="border border-[#C5A059] hover:bg-[#C5A059]/10 text-[#C5A059] px-4 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Patron</span>
          </button>

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
      </div>

      {/* Main Grid Workspace */}
      {list.length === 0 ? (
        <div className="bg-[#0B131F]/40 border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <Heart className="w-12 h-12 text-slate-600 animate-pulse" />
          <h3 className="text-lg font-serif">No Patrons Registered</h3>
          <p className="text-xs text-slate-500 max-w-sm">Click "Add New Patron" at the top right to start registering regular curation clients.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selector sidebar (4/12 width) */}
          <div className="lg:col-span-4 bg-[#0B131F]/30 border border-white/5 rounded-3xl p-5 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase px-2">Patrons Index</h4>
            
            <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
              {list.map((patron, idx) => {
                const isActive = idx === selectedIdx;
                return (
                  <button
                    key={patron.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#C5A059]/10 border-[#C5A059] text-white'
                        : 'bg-[#0B131F]/50 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-serif text-xs font-bold border ${
                        isActive
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#070D14]'
                          : 'bg-[#070D14] border-white/10 text-slate-300'
                      }`}>
                        {patron.initials || '?'}
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-serif text-sm font-normal truncate leading-snug">{patron.name || 'Untitled'}</h5>
                        <p className="text-[9px] text-slate-500 font-light truncate">{patron.type || 'None'}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editor & Preview (8/12 width) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Patron Editor Card */}
            {currentPatron && (
              <div className="bg-[#0B131F]/50 border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
                
                {/* Title and Delete Actions */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-serif text-lg">Modify Patron: <span className="text-[#C5A059]">{currentPatron.name}</span></h3>
                  </div>
                  
                  <button
                    onClick={handleDeletePatron}
                    className="text-red-400 hover:text-white hover:bg-red-500/10 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Edit Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Client Name</label>
                    <input
                      type="text"
                      value={currentPatron.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. Pearl Continental"
                    />
                  </div>

                  {/* Curation Type */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Curation Category</label>
                    <input
                      type="text"
                      value={currentPatron.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. Modern Abstract Series"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Location (City)</label>
                    <input
                      type="text"
                      value={currentPatron.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. Lahore & Karachi"
                    />
                  </div>

                  {/* Initials badge text */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Initials Badge (2-3 Chars)</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={currentPatron.initials}
                      onChange={(e) => handleInputChange('initials', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. P.C"
                    />
                  </div>

                  {/* Highlights tag */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Highlights Tag (Installed Art)</label>
                    <input
                      type="text"
                      value={currentPatron.highlights}
                      onChange={(e) => handleInputChange('highlights', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. 35+ Custom Pieces"
                    />
                  </div>

                  {/* Partnership date */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Partnership Duration Text</label>
                    <input
                      type="text"
                      value={currentPatron.established}
                      onChange={(e) => handleInputChange('established', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                      placeholder="e.g. Patron since 2023"
                    />
                  </div>

                  {/* Description text */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Detailed Curation Description</label>
                    <textarea
                      rows={3}
                      value={currentPatron.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059] resize-none"
                      placeholder="Enter description of what we curating for this client..."
                    />
                  </div>

                  {/* Visual Image Showcase Uploader */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">Showcase Space Photo</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-8">
                        <input
                          type="text"
                          value={currentPatron.image}
                          onChange={(e) => handleInputChange('image', e.target.value)}
                          className="w-full bg-[#070D14] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
                          placeholder="Image URL or upload a file"
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

                </div>

                {/* Micro Preview of Card Visual */}
                <div className="border-t border-white/5 pt-6 space-y-3">
                  <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Interactive Curation Preview</h4>
                  
                  <div className="bg-[#070D14] rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                    
                    {/* Visual Frame */}
                    <div className="relative w-36 h-44 rounded-xl overflow-hidden shadow-xl border border-white/10 flex-shrink-0 bg-slate-800">
                      {currentPatron.image && (
                        <Image
                          src={currentPatron.image}
                          alt="preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070D14]/90 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-[8px] text-[#C5A059] font-bold tracking-wider flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Curated Spotlight</span>
                      </div>
                    </div>

                    {/* Metadata Card details */}
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-[#C5A059] text-[#070D14] flex items-center justify-center text-[10px] font-serif font-bold">
                          {currentPatron.initials}
                        </div>
                        <div>
                          <span className="text-[8px] font-bold tracking-widest text-[#C5A059] uppercase block leading-none">{currentPatron.type}</span>
                          <h4 className="font-serif text-base leading-snug truncate">{currentPatron.name}</h4>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 font-light leading-relaxed line-clamp-2">{currentPatron.description}</p>
                      
                      <div className="flex items-center justify-between text-[8px] text-slate-500 font-medium tracking-wide pt-2 border-t border-white/5">
                        <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-[#C5A059]" /> {currentPatron.location}</span>
                        <span className="text-[#C5A059] font-bold uppercase">{currentPatron.highlights}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
