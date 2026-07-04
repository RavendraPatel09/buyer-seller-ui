import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { AdminShell } from '../components/layout/AdminShell';
import { reportService } from '../api/adminService';
import { Button } from "@medicycle/ui";
import { cn } from "@medicycle/utils";
import { SEO } from "../lib/seo/SEO";

const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-destructive text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-black',
  low: 'bg-blue-500/20 text-blue-500',
};

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-destructive/10 text-destructive',
  investigating: 'bg-yellow-500/10 text-yellow-500',
  resolved: 'bg-green-500/10 text-green-500',
  dismissed: 'bg-muted text-muted-foreground',
};

export function AdminReportsPage() {
  const queryClient = useQueryClient();
  const { data: reports = [], isLoading } = useQuery({ queryKey: ['admin-reports'], queryFn: reportService.getAll });
  const resolveMut = useMutation({ mutationFn: reportService.resolve, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reports'] }) });
  const dismissMut = useMutation({ mutationFn: reportService.dismiss, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reports'] }) });

  const openCount = reports.filter(r => r.status === 'open' || r.status === 'investigating').length;
  const criticalCount = reports.filter(r => r.severity === 'critical').length;

  return (
    <AdminShell>
      <SEO title="Reports & Fraud" description="Review reports, complaints, and fraud alerts" />
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Reports & Fraud Detection</h1>
          <p className="text-muted-foreground">Investigate complaints, fraud alerts, and content moderation flags.</p>
        </div>

        {/* Summary Strip */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-5 py-3 flex items-center space-x-3">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            <div>
              <div className="text-lg font-bold text-destructive">{criticalCount}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-3 flex items-center space-x-3">
            <ShieldAlert className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="text-lg font-bold">{openCount}</div>
              <div className="text-xs text-muted-foreground">Open Cases</div>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground">Loading reports...</div>
        ) : (
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-4">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 hover:bg-card/80 transition-colors group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", SEVERITY_STYLES[report.severity])}>
                        {report.severity}
                      </span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", STATUS_STYLES[report.status])}>
                        {report.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">{report.type}</span>
                    </div>
                    <h4 className="font-bold text-base mb-1">{report.subject}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>Reported by: <span className="text-foreground font-medium">{report.reportedBy}</span></span>
                      <span>Entity: <span className="text-foreground font-medium">{report.reportedEntity}</span></span>
                      <span>{report.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {(report.status === 'open' || report.status === 'investigating') && (
                      <>
                        <Button variant="outline" className="h-8 text-xs text-green-500 border-green-500/30 hover:bg-green-500/10" onClick={() => resolveMut.mutate(report.id)}>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Resolve
                        </Button>
                        <Button variant="outline" className="h-8 text-xs" onClick={() => dismissMut.mutate(report.id)}>
                          <XCircle className="w-3.5 h-3.5 mr-1.5" /> Dismiss
                        </Button>
                      </>
                    )}
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AdminShell>
  );
}
