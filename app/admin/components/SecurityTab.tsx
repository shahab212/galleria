'use client';

import React, { useState } from 'react';
import { KeyRound, RefreshCw, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface SecurityTabProps {
  onSavePassword: (currentPass: string, newPass: string) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function SecurityTab({ onSavePassword, triggerToast }: SecurityTabProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setIsSaving(true);
    try {
      await onSavePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      triggerToast('Admin password updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Incorrect current password or update failed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-white max-w-2xl">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Security Settings</h2>
        <p className="text-xs text-slate-400 font-light">Change the access password for this advisory portal workspace. Keep credentials stored securely.</p>
      </div>

      <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 sm:p-8 space-y-6">
        <h4 className="font-serif text-lg font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#C5A059]" />
          <span>Update Credentials</span>
        </h4>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 text-xs text-red-400 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5 relative">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password..."
                className="w-full text-xs px-4 py-3.5 pr-12 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition text-white"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5 relative">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)..."
                className="w-full text-xs px-4 py-3.5 pr-12 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition text-white"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5 relative">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                className="w-full text-xs px-4 py-3.5 pr-12 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#C5A059] hover:bg-white text-[#0C1623] px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 min-w-[160px]"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <KeyRound className="w-4 h-4 stroke-[2.25]" />
              )}
              <span>{isSaving ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
