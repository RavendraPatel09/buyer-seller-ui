import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@medicycle/utils";

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
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 400, damping: 30 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-panel border border-border/50 rounded-[24px] p-6 lg:p-8 relative overflow-hidden group shadow-premium"
    >
      {/* Glow Effect */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-500" />
      
      {/* Internal Glass Reflection */}
      <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/5 z-20 mix-blend-overlay" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl shadow-glow-sm">
          <Icon className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(var(--glow-rgb),0.8)]" />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold font-mono border",
            trend >= 0 
              ? "bg-green-500/10 text-green-500 border-green-500/20" 
              : "bg-destructive/10 text-destructive border-destructive/20"
          )}>
            {trend >= 0 ? "+" : ""}{trend}%
          </div>
        )}
      </div>

      <div className="relative z-10 mt-2">
        <h3 className="text-[32px] font-display font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">{value}</h3>
        <p className="text-[15px] text-muted-foreground font-medium">{title}</p>
      </div>
    </motion.div>
  );
}
