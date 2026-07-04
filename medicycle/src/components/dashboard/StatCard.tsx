import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../design-system/utils/cn";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number; // percentage
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border border-border/50 rounded-3xl p-6 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 bg-muted rounded-2xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-xs font-bold",
            trend >= 0 ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
          )}>
            {trend >= 0 ? "+" : ""}{trend}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-black tracking-tight mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
      </div>
    </motion.div>
  );
}
