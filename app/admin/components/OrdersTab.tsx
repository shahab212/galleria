'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, ClipboardList } from 'lucide-react';

interface OrdersTabProps {
  orders: any[];
  onUpdateStatus: (id: string, status: string, paymentStatus?: string) => Promise<void>;
  triggerToast: (msg: string) => void;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function OrdersTab({ orders, onUpdateStatus, triggerToast }: OrdersTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.reference?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, nextStatus: string) => {
    try {
      // Auto-set payment status based on order status for efficiency
      let paymentStatus = undefined;
      if (nextStatus === 'Delivered') {
        paymentStatus = 'Paid';
      } else if (nextStatus === 'Cancelled') {
        paymentStatus = 'Refunded / Void';
      }
      
      await onUpdateStatus(id, nextStatus, paymentStatus);
      triggerToast(`Order status updated to: ${nextStatus}`);
    } catch (error) {
      triggerToast('Error updating order status');
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Confirmed': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Shipped': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Client Orders</h2>
        <p className="text-xs text-slate-400 font-light">Track and confirm incoming client payments, shipping addresses, and framing selections.</p>
      </div>

      {/* Filter and search operations */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search by client or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs px-4 py-3 pl-10 border border-white/10 bg-[#0C1623]/60 text-white rounded-xl focus:outline-none focus:border-[#C5A059] transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        {/* Status filters */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-thin">
          {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-transparent border border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Orders Table Display */}
      <div className="bg-[#0C1623]/60 border border-white/10 rounded-[24px] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-[#C5A059] bg-[#070D14]/40">
                <th className="py-4 px-6 font-bold">Reference</th>
                <th className="py-4 px-6 font-bold">Client Information</th>
                <th className="py-4 px-6 font-bold">Artworks Purchased</th>
                <th className="py-4 px-6 font-bold">Total Summary</th>
                <th className="py-4 px-6 font-bold">Transaction Type</th>
                <th className="py-4 px-6 font-bold">Order Status</th>
                <th className="py-4 px-6 font-bold text-right">Concierge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-light">
                    No matching order logs found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const cleanedPhone = o.client?.phone?.replace(/[^0-9+]/g, '');
                  const encodedMsg = encodeURIComponent(
                    `Hello ${o.client?.name}, this is Galleria Arts Concierge. Regarding your order ${o.reference} for ${formatPKR(o.subtotal)}, we would like to confirm your shipping details and custom wood frame choices.`
                  );
                  const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodedMsg}`;

                  const orderDate = new Date(o.createdAt).toLocaleDateString('en-PK', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={o.id} className="hover:bg-white/[0.01] transition-colors items-start">
                      
                      {/* Reference and date */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-white text-sm">{o.reference}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{orderDate}</p>
                      </td>

                      {/* Client card details */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <p className="font-bold text-white text-xs">{o.client?.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{o.client?.email}</p>
                        <p className="text-[10px] text-slate-400">{o.client?.phone} &bull; {o.client?.city}</p>
                        <p className="text-[9px] text-slate-500 italic max-w-xs truncate">{o.client?.address}</p>
                      </td>

                      {/* Items descriptions */}
                      <td className="py-4 px-6">
                        <div className="space-y-1 max-w-xs">
                          {o.items?.map((item: any, idx: number) => (
                            <p key={idx} className="truncate text-xs">
                              <strong className="text-white font-semibold">{item.quantity}x</strong> {item.product?.name}
                            </p>
                          ))}
                        </div>
                      </td>

                      {/* Total Summary */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <p className="font-bold text-[#C5A059] text-sm">{formatPKR(o.total || o.subtotal)}</p>
                        {o.shipping !== undefined && o.shipping > 0 ? (
                          <p className="text-[9px] text-slate-400 mt-0.5">Incl. shipping: {formatPKR(o.shipping)}</p>
                        ) : (
                          <p className="text-[9px] text-emerald-400 mt-0.5 font-semibold uppercase">Free Shipping</p>
                        )}
                      </td>

                      {/* Payment mode and HBL details if any */}
                      <td className="py-4 px-6">
                        <p className="uppercase text-[10px] font-bold text-white">
                          {o.payment?.method === 'bank' ? 'Bank Wire Transfer' : 'COD'}
                        </p>
                        <span className={`inline-block text-[9px] font-bold mt-1 uppercase rounded-full ${
                          o.payment?.status === 'Paid' ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
                          &bull; Payment: {o.payment?.status}
                        </span>
                      </td>

                      {/* Order status dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className={`text-[10px] px-3 py-1.5 rounded-full font-bold uppercase cursor-pointer outline-none focus:ring-1 focus:ring-[#C5A059]/50 transition ${getStatusClass(o.status)}`}
                        >
                          <option value="Pending" className="bg-[#070D14] text-amber-400">Pending</option>
                          <option value="Confirmed" className="bg-[#070D14] text-blue-400">Confirmed</option>
                          <option value="Shipped" className="bg-[#070D14] text-purple-400">Shipped</option>
                          <option value="Delivered" className="bg-[#070D14] text-emerald-400">Delivered</option>
                          <option value="Cancelled" className="bg-[#070D14] text-red-400">Cancelled</option>
                        </select>
                      </td>

                      {/* WhatsApp trigger */}
                      <td className="py-4 px-6 text-right">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition shadow-md"
                          title="Click to chat with client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
