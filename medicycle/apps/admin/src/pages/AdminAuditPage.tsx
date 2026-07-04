import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ClipboardList, Shield } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { auditService } from '../api/adminService';
import { SEO } from "../lib/seo/SEO";

const rowVariants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

const ACTION_COLORS: Record<string, string> = {
  USER_SUSPENDED: 'text-orange-500 bg-orange-500/10',
  USER_VERIFIED: 'text-green-500 bg-green-500/10',
  LISTING_FLAGGED: 'text-destructive bg-destructive/10',
  LISTING_APPROVED: 'text-primary bg-primary/10',
  REPORT_RESOLVED: 'text-blue-500 bg-blue-500/10',
};

export function AdminAuditPage() {
  const { data: logs = [], isLoading } = useQuery({ queryKey: ['admin-audit'], queryFn: auditService.getLog });

  return (
    <AdminShell>
      <SEO title="Audit Log" description="Track all administrative actions" />
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Audit Log</h1>
          <p className="text-muted-foreground">Immutable record of every administrative action taken on the platform.</p>
        </div>

        {/* Info banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center space-x-3">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">All actions are automatically logged with admin identity, timestamp, and originating IP address for compliance.</p>
        </div>

        {/* Table */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading audit log...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/30">
                  <tr>
                    <th className="px-5 py-4 text-left font-medium">Action</th>
                    <th className="px-5 py-4 text-left font-medium">Target</th>
                    <th className="px-5 py-4 text-left font-medium hidden md:table-cell">Admin</th>
                    <th className="px-5 py-4 text-left font-medium hidden lg:table-cell">Details</th>
                    <th className="px-5 py-4 text-left font-medium hidden xl:table-cell">IP</th>
                    <th className="px-5 py-4 text-right font-medium">Timestamp</th>
                  </tr>
                </thead>
                <motion.tbody initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
                  {logs.map((log) => (
                    <motion.tr key={log.id} variants={rowVariants} className="border-b border-border/10 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${ACTION_COLORS[log.action] || 'text-muted-foreground bg-muted'}`}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium">{log.target}</td>
                      <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{log.adminName.charAt(0)}</div>
                          <span>{log.adminName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground text-xs hidden lg:table-cell max-w-[200px] truncate">{log.details}</td>
                      <td className="px-5 py-4 text-muted-foreground font-mono text-xs hidden xl:table-cell">{log.ip}</td>
                      <td className="px-5 py-4 text-right text-muted-foreground text-xs">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
