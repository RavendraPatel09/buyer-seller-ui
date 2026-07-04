import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Check, X, Ban, ShieldCheck, MoreHorizontal, Trash2 } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { userService } from '../api/adminService';
import { Button } from "@medicycle/ui";
import { cn } from "@medicycle/utils";
import { SEO } from "../lib/seo/SEO";
import type { PlatformUser } from '../types';

const rowVariants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500',
  pending: 'bg-yellow-500/10 text-yellow-500',
  suspended: 'bg-orange-500/10 text-orange-500',
  banned: 'bg-destructive/10 text-destructive',
};

export function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: userService.getAll });
  const suspendMut = useMutation({ mutationFn: userService.suspend, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }) });
  const verifyMut = useMutation({ mutationFn: userService.verify, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }) });
  const deleteMut = useMutation({ mutationFn: userService.delete, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }) });

  const filtered = users.filter((u: PlatformUser) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || u.status === filter || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminShell>
      <SEO title="User Management" description="Manage platform users, sellers and buyers" />
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">User Management</h1>
          <p className="text-muted-foreground">View, verify, suspend, or remove platform accounts.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'active', 'pending', 'suspended', 'buyer', 'seller'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize",
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/30">
                  <tr>
                    <th className="px-5 py-4 text-left font-medium">User</th>
                    <th className="px-5 py-4 text-left font-medium">Role</th>
                    <th className="px-5 py-4 text-left font-medium">Status</th>
                    <th className="px-5 py-4 text-left font-medium hidden lg:table-cell">Registered</th>
                    <th className="px-5 py-4 text-left font-medium hidden xl:table-cell">Revenue</th>
                    <th className="px-5 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <motion.tbody initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                  {filtered.map((user) => (
                    <motion.tr key={user.id} variants={rowVariants} className="border-b border-border/10 last:border-0 hover:bg-muted/20 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium flex items-center">
                              {user.name}
                              {user.verified && <ShieldCheck className="w-3.5 h-3.5 text-primary ml-1.5" />}
                            </div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 capitalize text-muted-foreground">{user.role}</td>
                      <td className="px-5 py-4">
                        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase", STATUS_STYLES[user.status])}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{user.registeredAt}</td>
                      <td className="px-5 py-4 font-medium hidden xl:table-cell">${user.totalRevenue.toLocaleString()}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!user.verified && (
                            <button onClick={() => verifyMut.mutate(user.id)} className="p-1.5 text-green-500 hover:bg-green-500/10 rounded-md" title="Verify"><Check className="w-4 h-4" /></button>
                          )}
                          {user.status !== 'suspended' && user.status !== 'banned' && (
                            <button onClick={() => suspendMut.mutate(user.id)} className="p-1.5 text-orange-500 hover:bg-orange-500/10 rounded-md" title="Suspend"><Ban className="w-4 h-4" /></button>
                          )}
                          <button onClick={() => deleteMut.mutate(user.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">No users match your criteria.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
