import { motion } from "framer-motion";

interface ProgressRingProps {
  progress: number;
  label: string;
  sublabel: string;
}

export function ProgressRing({ progress, label, sublabel }: ProgressRingProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center justify-center h-full min-h-[300px]"
    >
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-muted"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            cx="80"
            cy="80"
            r={radius}
            stroke="var(--color-primary)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black">{progress}%</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h4 className="font-bold">{label}</h4>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
    </motion.div>
  );
}
