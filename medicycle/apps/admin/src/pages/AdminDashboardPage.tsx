import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Package, Flag, ShieldAlert, TrendingUp, MessageSquare, UploadCloud } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { dashboardService } from '../api/adminService';
import { cn } from "@medicycle/utils";
import { SEO } from "../lib/seo/SEO";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } } };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel-heavy border border-border px-4 py-3 rounded-2xl shadow-premium">
        <p className="text-muted-foreground text-xs font-medium mb-2 uppercase tracking-wider">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="font-mono text-sm font-bold flex items-center gap-2 mb-1" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}: {p.name === 'revenue' ? `$${(p.value).toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function KPICard({ title, value, icon: Icon, trend, color, delay }: { title: string; value: string; icon: typeof Users; trend?: string; color: string; delay: number }) {
  return (
    <motion.div variants={fadeUp} className="glass-panel border border-border/50 rounded-[24px] p-6 lg:p-8 relative overflow-hidden group shadow-premium hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
      <div className={cn("absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity", color.split(' ')[0].replace('bg-', 'bg-'))} />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <p className="text-[15px] text-muted-foreground font-medium">{title}</p>
        <div className={cn("p-2.5 rounded-xl border shadow-sm", color, color.replace('text-', 'border-').replace('bg-', 'border-').replace('/10', '/20'))}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="text-4xl font-display font-bold tracking-tight relative z-10 group-hover:text-primary transition-colors">{value}</h3>
      {trend && <p className="text-xs font-bold text-green-500 mt-2 font-mono relative z-10">+{trend}</p>}
    </motion.div>
  );
}

export function AdminDashboardPage() {
  const { data: kpis } = useQuery({ queryKey: ['admin-kpis'], queryFn: dashboardService.getKPIs });
  const { data: trends } = useQuery({ queryKey: ['admin-trends'], queryFn: dashboardService.getTrends });

  return (
    <AdminShell>
      <SEO title="Admin Dashboard" description="MediCycle platform analytics and KPIs" />
      <div className="space-y-8 pb-12 max-w-[1600px] mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold tracking-tight mb-2">Global Analytics</h1>
          <p className="text-[15px] text-muted-foreground">Real-time platform health, revenue, and moderation metrics.</p>
        </div>

        {/* KPI Cards */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <KPICard title="Total Users" value={kpis ? kpis.totalUsers.toLocaleString() : '—'} icon={Users} trend={kpis ? `${kpis.userGrowthPercent}%` : undefined} color="bg-blue-500/10 text-blue-500" delay={0} />
          <KPICard title="Platform Revenue" value={kpis ? `$${(kpis.totalRevenue / 1000).toFixed(0)}K` : '—'} icon={DollarSign} trend={kpis ? `${kpis.revenueGrowthPercent}%` : undefined} color="bg-green-500/10 text-green-500" delay={0.1} />
          <KPICard title="Pending Listings" value={kpis ? kpis.pendingListings.toString() : '—'} icon={Package} color="bg-yellow-500/10 text-yellow-500" delay={0.2} />
          <KPICard title="Open Reports" value={kpis ? kpis.openReports.toString() : '—'} icon={Flag} color="bg-destructive/10 text-destructive" delay={0.3} />
        </motion.div>

        {/* Revenue & Users Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="glass-panel border border-border/50 rounded-[24px] p-6 lg:p-8 shadow-premium relative overflow-hidden">
          <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-display font-bold flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-primary" />Platform Growth</h3>
              <p className="text-[14px] text-muted-foreground mt-1">Revenue vs Active Users (Last 7 Months)</p>
            </div>
          </div>
          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminUserGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} opacity={0.4} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} dx={-10} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dx={10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#adminRevGrad)" />
                <Area yAxisId="right" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#adminUserGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel border border-border/50 rounded-[24px] p-6 lg:p-8 shadow-premium relative">
             <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
            <h3 className="text-xl font-display font-bold flex items-center mb-8 relative z-10"><UploadCloud className="w-5 h-5 mr-2 text-green-500" />Medicine Upload Trends</h3>
            <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} opacity={0.4} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }} />
                  <Bar dataKey="uploads" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel border border-border/50 rounded-[24px] p-6 lg:p-8 shadow-premium relative">
             <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
            <h3 className="text-xl font-display font-bold flex items-center mb-8 relative z-10"><MessageSquare className="w-5 h-5 mr-2 text-purple-500" />Chat Activity</h3>
            <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminMsgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} opacity={0.4} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="messages" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#adminMsgGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Quick alerts strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-panel border border-destructive/30 bg-destructive/10 rounded-[20px] p-6 flex items-center space-x-5 shadow-premium">
          <div className="p-3 bg-destructive/20 rounded-xl">
            <ShieldAlert className="w-6 h-6 text-destructive shrink-0 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          </div>
          <div>
            <h4 className="font-bold text-destructive text-lg">Active Fraud Alerts</h4>
            <p className="text-[14px] text-destructive/80 mt-1">There are {kpis?.flaggedContent || 0} flagged items requiring immediate review. Visit the <span className="font-bold border-b border-destructive/50 pb-0.5 cursor-pointer">Reports & Fraud</span> page.</p>
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
