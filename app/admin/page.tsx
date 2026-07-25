'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';

import AdminSidebar from './components/AdminSidebar';
import AdminLogin from './components/AdminLogin';
import AdminHeader from './components/AdminHeader';
import AnalyticsTab from './components/AnalyticsTab';
import ProductsTab from './components/ProductsTab';
import OrdersTab from './components/OrdersTab';
import HeroTab from './components/HeroTab';
import TeamTab from './components/TeamTab';
import DiscountsTab from './components/DiscountsTab';
import InstagramTab from './components/InstagramTab';
import SecurityTab from './components/SecurityTab';

export default function AdminPage() {
  // Session Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState('analytics');

  // DB State loaded via API
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [globalDiscount, setGlobalDiscount] = useState<number>(0);
  const [instaPosts, setInstaPosts] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check login session on mount
  useEffect(() => {
    const token = localStorage.getItem('galleria_admin_token');
    if (token === 'galleria-admin-session-token') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setIsDataLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const [prodRes, ordRes, heroRes, teamRes, settingsRes, instaRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/hero'),
        fetch('/api/team'),
        fetch('/api/settings'),
        fetch('/api/instagram')
      ]);

      if (prodRes.ok && ordRes.ok && heroRes.ok && teamRes.ok && settingsRes.ok && instaRes.ok) {
        const prodData = await prodRes.json();
        const ordData = await ordRes.json();
        const heroData = await heroRes.json();
        const teamData = await teamRes.json();
        const settingsData = await settingsRes.json();
        const instaData = await instaRes.json();
        setProducts(prodData);
        setOrders(ordData);
        setHeroSlides(heroData);
        setTeamMembers(teamData);
        setGlobalDiscount(settingsData.globalDiscountPercent || 0);
        setInstaPosts(instaData);
      }
    } catch (error) {
      triggerToast('Error synchronizing database.');
    } finally {
      setIsDataLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('galleria_admin_token', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(data.error || 'Authorization failed.');
      }
    } catch (error) {
      setAuthError('Connection error to auth services.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('galleria_admin_token');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  // Product actions
  const handleAddProduct = async (prod: Omit<Product, 'id'>) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prod)
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to add product');
    }
  };

  const handleEditProduct = async (id: string, prod: Partial<Product>) => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prod)
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to edit product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to delete product');
    }
  };

  const handleSaveHeroSlides = async (slides: any[]) => {
    const res = await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides })
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to update slideshow settings');
    }
  };

  const handleSaveTeam = async (members: any[]) => {
    const res = await fetch('/api/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ members })
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to update team settings');
    }
  };

  const handleSaveGlobalDiscount = async (percent: number) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ globalDiscountPercent: percent })
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to update settings');
    }
  };

  const handleSaveInstagramPosts = async (posts: any[]) => {
    const res = await fetch('/api/instagram', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ posts })
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to update Instagram showcase settings');
    }
  };

  // Order status actions
  const handleUpdateOrderStatus = async (id: string, status: string, paymentStatus?: string) => {
    const res = await fetch(`/api/orders?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, paymentStatus })
    });
    if (res.ok) {
      fetchData();
    } else {
      throw new Error('Failed to update status');
    }
  };

  const handleSavePassword = async (currentPass: string, newPass: string) => {
    const res = await fetch('/api/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to update password');
    }
  };

  // Login View Card (Matching Luxury Theme)
  if (!isAuthenticated) {
    return (
      <AdminLogin
        authError={authError}
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        handleLoginSubmit={handleLoginSubmit}
      />
    );
  }

  // Dashboard Workspace view
  return (
    <div className="min-h-screen bg-[#070D14] flex text-slate-200 font-sans">
      
      {/* Toast notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0B131F] text-white px-5 py-3.5 shadow-2xl rounded-none border-l-4 border-[#C5A059] animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Luxury Sidebar Navigation */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {/* Main Workspace Frame */}
      <main className="flex-1 min-w-0 bg-[#070D14] flex flex-col">
        
        {/* Workspace Top Status Header bar */}
        <AdminHeader />

        {/* Dynamic Inner Tab container */}
        <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {isDataLoading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-500 font-light tracking-widest uppercase">Syncing dashboard panels...</span>
            </div>
          ) : (
            <>
              {activeTab === 'analytics' && <AnalyticsTab products={products} orders={orders} />}
              {activeTab === 'products' && (
                <ProductsTab
                  products={products}
                  onAddProduct={handleAddProduct}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'orders' && (
                <OrdersTab
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'hero' && (
                <HeroTab
                  heroSlides={heroSlides}
                  onSaveSlides={handleSaveHeroSlides}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'team' && (
                <TeamTab
                  teamMembers={teamMembers}
                  onSaveTeam={handleSaveTeam}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'discounts' && (
                <DiscountsTab
                  products={products}
                  globalDiscount={globalDiscount}
                  onSaveGlobalDiscount={handleSaveGlobalDiscount}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'instagram' && (
                <InstagramTab
                  instaPosts={instaPosts}
                  onSavePosts={handleSaveInstagramPosts}
                  triggerToast={triggerToast}
                />
              )}
              {activeTab === 'security' && (
                <SecurityTab
                  onSavePassword={handleSavePassword}
                  triggerToast={triggerToast}
                />
              )}
            </>
          )}
        </div>

      </main>

    </div>
  );
}
