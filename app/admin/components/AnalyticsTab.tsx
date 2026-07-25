'use client';

import React from 'react';
import { DollarSign, FileText, BarChart2, Inbox } from 'lucide-react';
import { Product } from '../../types';

interface AnalyticsProps {
  products: Product[];
  orders: any[];
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function AnalyticsTab({ products, orders }: AnalyticsProps) {
  // Calculations
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeProductsCount = products.length;

  // Recent 5 sales
  const recentSales = orders.slice(0, 5);

  // Weekly mockup reports
  const weeklyData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 18 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 24 },
    { day: 'Fri', count: 32 },
    { day: 'Sat', count: 28 },
    { day: 'Sun', count: 14 }
  ];
  const maxWeeklyCount = Math.max(...weeklyData.map((d) => d.count));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tab Header */}
      <div className="space-y-1">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Analytics Dashboard</h2>
        <p className="text-xs text-slate-400 font-light">Real-time performance indicators and financial metrics of Galleria Arts.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Total Earnings */}
        <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex items-center justify-between shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Gross Revenue</span>
            <p className="text-2xl font-bold text-[#C5A059]">{formatPKR(totalRevenue)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shadow-inner">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Orders Count */}
        <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex items-center justify-between shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Total Orders</span>
            <p className="text-2xl font-bold text-white">{totalOrders}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: AOV */}
        <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex items-center justify-between shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Average Order</span>
            <p className="text-2xl font-bold text-white">{formatPKR(averageOrderValue)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shadow-inner">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Active Artworks */}
        <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex items-center justify-between shadow-md">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Active Catalog</span>
            <p className="text-2xl font-bold text-white">{activeProductsCount} Artworks</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shadow-inner">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Grid: Weekly Chart & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Weekly Sales Activity (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between">
          <div className="space-y-1 pb-4">
            <span className="text-[9px] font-bold tracking-wider text-[#C5A059] uppercase">Weekly Sales Activity</span>
            <h4 className="font-serif text-lg font-semibold text-white">Consolidated Orders Frequency</h4>
          </div>

          {/* Custom Styled Responsive Bars Chart */}
          <div className="flex items-end justify-between h-48 pt-6 border-b border-white/10 px-2 sm:px-6">
            {weeklyData.map((data, idx) => {
              const heightPercent = Math.round((data.count / maxWeeklyCount) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-3 w-8 group">
                  <div className="text-[9px] font-bold text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mb-2">
                    {data.count}
                  </div>
                  {/* Rounded Premium Pillar bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-4 bg-gradient-to-t from-[#C5A059]/40 to-[#C5A059] hover:brightness-125 transition-all duration-500 rounded-t-lg"
                  />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">{data.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-4 font-light">
            <span>Peak Activity: Friday ({maxWeeklyCount} checkout entries)</span>
            <span>Real-time Sync</span>
          </div>
        </div>

        {/* Right Column: Recent Activity Log (Col Span 5) */}
        <div className="lg:col-span-5 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between">
          <div className="space-y-1 pb-4">
            <span className="text-[9px] font-bold tracking-wider text-[#C5A059] uppercase">Recent Transactions</span>
            <h4 className="font-serif text-lg font-semibold text-white">Latest Sales Actions</h4>
          </div>

          <div className="flex-1 space-y-4 pr-1 overflow-y-auto max-h-[220px] scrollbar-thin">
            {recentSales.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-500 py-8">
                <FileText className="w-8 h-8 mb-2 text-slate-600 stroke-[1.5]" />
                <p>No recent orders placed yet.</p>
              </div>
            ) : (
              recentSales.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between border-b border-dashed border-white/10 pb-3 last:border-b-0 last:pb-0">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-white truncate">{order.client.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{order.reference} &bull; {order.client.city}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-[#C5A059]">{formatPKR(order.subtotal)}</p>
                    <span className={`inline-block text-[9px] px-2 py-0.5 mt-0.5 font-bold uppercase rounded-full tracking-wider ${
                      order.status === 'Pending'
                        ? 'bg-amber-500/10 text-amber-400'
                        : order.status === 'Confirmed'
                        ? 'bg-blue-500/10 text-blue-400'
                        : order.status === 'Shipped'
                        ? 'bg-purple-500/10 text-purple-400'
                        : order.status === 'Cancelled'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
