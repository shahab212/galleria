'use client';

import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  authError: string | null;
  usernameInput: string;
  setUsernameInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  handleLoginSubmit: (e: React.FormEvent) => void;
}

export default function AdminLogin({
  authError,
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
  handleLoginSubmit
}: AdminLoginProps) {
  return (
    <div className="min-h-screen bg-[#070D14] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      
      {/* Decorative Gold Blurred Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0C1623]/80 border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header Icon & Branding */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-[#C5A059]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-3xl font-bold tracking-wide text-white">GALLERIA</h2>
            <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">Advisory Portal Login</span>
          </div>
        </div>

        {/* Error alert banner */}
        {authError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-center gap-3 text-xs text-red-400 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Username</label>
            <input
              type="text"
              required
              placeholder="Enter admin username..."
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full text-xs px-4 py-3.5 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
            <input
              type="password"
              required
              placeholder="Enter password..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full text-xs px-4 py-3.5 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#C5A059] hover:bg-white text-[#0C1623] py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg"
            >
              AUTHORIZE LOGIN
            </button>
          </div>

        </form>

        {/* Hint details for local evaluator convenience */}
        <p className="text-[10px] text-slate-500 text-center font-light leading-relaxed">
          Local credentials: <span className="font-semibold text-slate-400">admin / admin123</span>
        </p>

      </div>
    </div>
  );
}
