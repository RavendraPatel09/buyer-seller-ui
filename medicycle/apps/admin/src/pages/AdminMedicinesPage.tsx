import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Check, X, Flag, Eye } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { listingService } from '../api/adminService';
import { cn } from "@medicycle/utils";
import { SEO } from "../lib/seo/SEO";
import type { MedicineListing } from '../types';

const rowVariants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

const STATUS_STYLES: Record<string, string> = {
  approved: 'bg-green-500/10 text-green-500',
  pending_review: 'bg-yellow-500/10 text-yellow-500',
  rejected: 'bg-destructive/10 text-destructive',
  flagged: 'bg-orange-500/10 text-orange-500',
};

export function AdminMedicinesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: listings = [], isLoading } = useQuery({ queryKey: ['admin-medicines'], queryFn: listingService.getAll });
  const approveMut = useMutation({ mutationFn: listingService.approve, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-medicines'] }) });
  const rejectMut = useMutation({ mutationFn: (id: string) => listingService.reject(id, 'Policy violation'), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-medicines'] }) });
  const flagMut = useMutation({ mutationFn: (id: string) => listingService.flag(id, 'Needs investigation'), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-medicines'] }) });

  const filtered = listings.filter((m: MedicineListing) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.seller.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminShell>
      <SEO title="Medicine Listings" description="Review and moderate medicine listings" />
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Medicine Listings</h1>
          <p className="text-muted-foreground">Approve, reject, or flag medicine uploads across the platform.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines or sellers..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending_review', 'approved', 'rejected', 'flagged'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {f === 'pending_review' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading listings...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/30">
                  <tr>
                    <th className="px-5 py-4 text-left font-medium">Medicine</th>
                    <th className="px-5 py-4 text-left font-medium">Seller</th>
                    <th className="px-5 py-4 text-left font-medium">Price</th>
                    <th className="px-5 py-4 text-left font-medium">Status</th>
                    <th className="px-5 py-4 text-left font-medium hidden lg:table-cell">Expiry</th>
                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <motion.tbody initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                  {filtered.map((med) => (
                    <motion.tr key={med.id} variants={rowVariants} className="border-b border-border/10 last:border-0 hover:bg-muted/20 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="font-medium">{med.name}</div>
                        <div className="text-xs text-muted-foreground">{med.category} · {med.id}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{med.seller}</td>
                      <td className="px-5 py-4 font-medium">${med.price.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", STATUS_STYLES[med.status])}>
                          {med.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{med.expiryDate}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {med.status === 'pending_review' && (
                            <>
                              <button onClick={() => approveMut.mutate(med.id)} className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-md" title="Approve"><Check className="w-4 h-4" /></button>
                              <button onClick={() => rejectMut.mutate(med.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md" title="Reject"><X className="w-4 h-4" /></button>
                            </>
                          )}
                          {med.status !== 'flagged' && (
                            <button onClick={() => flagMut.mutate(med.id)} className="p-1.5 text-orange-500 hover:bg-orange-500/10 rounded-md" title="Flag"><Flag className="w-4 h-4" /></button>
                          )}
                          <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md" title="View details"><Eye className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">No listings match your criteria.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
