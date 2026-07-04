import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  isPositive: boolean;
  delay?: number;
}

export function AdminStatCard({ title, value, icon: Icon, trend, isPositive, delay = 0 }: AdminStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 hover:bg-card/80 transition-colors"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-3">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        <span className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-destructive'}`}>
          {isPositive ? '+' : '-'}{trend}
        </span>
      </div>
    </motion.div>
  );
}
