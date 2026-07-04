import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Package, Flag, ShieldAlert, TrendingUp, MessageSquare, UploadCloud } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { dashboardService } from '../api/adminService';
import { cn } from '../../design-system/utils/cn';
import { SEO } from '../../lib/seo/SEO';

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function KPICard({ title, value, icon: Icon, trend, color, delay }: { title: string; value: string; icon: typeof Users; trend?: string; color: string; delay: number }) {
  return (
    <motion.div variants={fadeUp} transition={{ delay }} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 group hover:bg-card/80 transition-all">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={cn("p-2.5 rounded-xl", color)}><Icon className="w-5 h-5" /></div>
      </div>
      <h3 className="text-3xl font-black tracking-tight">{value}</h3>
      {trend && <p className="text-xs font-bold text-green-500 mt-2">+{trend}</p>}
    </motion.div>
  );
}

export function AdminDashboardPage() {
  const { data: kpis } = useQuery({ queryKey: ['admin-kpis'], queryFn: dashboardService.getKPIs });
  const { data: trends } = useQuery({ queryKey: ['admin-trends'], queryFn: dashboardService.getTrends });

  return (
    <AdminShell>
      <SEO title="Admin Dashboard" description="MediCycle platform analytics and KPIs" />
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Global Analytics</h1>
          <p className="text-muted-foreground">Real-time platform health, revenue, and moderation metrics.</p>
        </div>

        {/* KPI Cards */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <KPICard title="Total Users" value={kpis ? kpis.totalUsers.toLocaleString() : '—'} icon={Users} trend={kpis ? `${kpis.userGrowthPercent}%` : undefined} color="bg-blue-500/10 text-blue-500" delay={0} />
          <KPICard title="Platform Revenue" value={kpis ? `$${(kpis.totalRevenue / 1000).toFixed(0)}K` : '—'} icon={DollarSign} trend={kpis ? `${kpis.revenueGrowthPercent}%` : undefined} color="bg-green-500/10 text-green-500" delay={0.08} />
          <KPICard title="Pending Listings" value={kpis ? kpis.pendingListings.toString() : '—'} icon={Package} color="bg-yellow-500/10 text-yellow-500" delay={0.16} />
          <KPICard title="Open Reports" value={kpis ? kpis.openReports.toString() : '—'} icon={Flag} color="bg-destructive/10 text-destructive" delay={0.24} />
        </motion.div>

        {/* Revenue & Users Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-primary" />Platform Growth</h3>
              <p className="text-sm text-muted-foreground">Revenue vs Active Users (Last 7 Months)</p>
            </div>
            <div className="flex space-x-4 text-xs font-medium mt-2 sm:mt-0">
              <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-primary mr-2" />Revenue</div>
              <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />Users</div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends || []} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminUserGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#adminRevGrad)" />
                <Area yAxisId="right" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#adminUserGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Upload Trends */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
            <h3 className="text-lg font-bold flex items-center mb-6"><UploadCloud className="w-5 h-5 mr-2 text-green-500" />Medicine Upload Trends</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px' }} />
                  <Bar dataKey="uploads" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Chat Statistics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
            <h3 className="text-lg font-bold flex items-center mb-6"><MessageSquare className="w-5 h-5 mr-2 text-purple-500" />Chat Activity</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminMsgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="messages" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#adminMsgGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Quick alerts strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5 flex items-center space-x-4">
          <ShieldAlert className="w-8 h-8 text-destructive shrink-0" />
          <div>
            <h4 className="font-bold text-destructive">Active Fraud Alerts</h4>
            <p className="text-sm text-muted-foreground">There are {kpis?.flaggedContent || 0} flagged items requiring immediate review. Visit the <span className="text-primary font-medium">Reports & Fraud</span> page.</p>
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}
