'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, RefreshCw, UserCheck } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  tilt: string;
}

interface TeamTabProps {
  teamMembers: TeamMember[];
  onSaveTeam: (members: TeamMember[]) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function TeamTab({ teamMembers, onSaveTeam, triggerToast }: TeamTabProps) {
  const [members, setMembers] = useState<TeamMember[]>(JSON.parse(JSON.stringify(teamMembers)));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      [field]: value
    };
    setMembers(updated);
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
        triggerToast('Profile image uploaded successfully!');
      } else {
        triggerToast(data.error || 'Failed to upload image');
      }
    } catch (error) {
      triggerToast('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveTeam(members);
      triggerToast('Team member settings updated successfully!');
    } catch (error) {
      triggerToast('Error saving team updates.');
    } finally {
      setIsSaving(false);
    }
  };

  const currentMember = members[selectedIdx] || members[0];

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Team Curator Settings</h2>
          <p className="text-xs text-slate-400 font-light">Customize profile names, curatorial roles, and photos of the Galleria curators team.</p>
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

      {/* Select Member Bubble Strip */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Select Curator:</span>
        {members.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedIdx === idx
                ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-lg scale-105'
                : 'bg-[#0C1623]/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {m.name || `Curator #${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Two-Column Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Form Editor (Col Span 6) */}
        <div className="lg:col-span-6 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 space-y-5">
          <h4 className="font-serif text-lg font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#C5A059]" />
            <span>Profile details</span>
          </h4>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <input
              type="text"
              required
              value={currentMember.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full text-xs px-4 py-3.5 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Curatorial Role / Title</label>
            <input
              type="text"
              required
              value={currentMember.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full text-xs px-4 py-3.5 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          {/* Profile Picture Uploader */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Profile Image Path</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMember.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="/uploads/avatar.png"
                className="flex-1 text-xs px-4 py-3.5 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
              <label className="bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center flex-shrink-0 transition min-w-[100px]">
                {isUploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right Side: Portrait Polaroid Card Preview (Col Span 6) */}
        <div className="lg:col-span-6 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between items-center text-center">
          
          <div className="space-y-1 pb-4 self-start text-left">
            <span className="text-[9px] font-bold tracking-wider text-[#C5A059] uppercase">Storefront Preview</span>
            <h4 className="font-serif text-lg font-semibold text-white">Curator Polaroid Card Preview</h4>
          </div>

          {/* Polaroid preview with dynamic rotators */}
          <div className={`w-64 p-5 shadow-2xl transition-all duration-500 rounded-[24px] bg-[#0C1623]/60 border border-white/10`}>
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/10 mb-4 border border-white/5">
              {currentMember.image && (
                <Image
                  src={currentMember.image}
                  alt={currentMember.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <div className="pb-1 text-left space-y-0.5">
              <h4 className="font-serif text-lg font-bold tracking-tight text-white">{currentMember.name || 'Curator Name'}</h4>
              <p className="text-[11px] font-medium text-[#C5A059] uppercase tracking-wider">{currentMember.role || 'Role Designation'}</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 italic pt-6 font-light">
            Note: Polaroid tilt and styles are applied organically on the storefront page layout.
          </p>

        </div>

      </div>
    </div>
  );
}
