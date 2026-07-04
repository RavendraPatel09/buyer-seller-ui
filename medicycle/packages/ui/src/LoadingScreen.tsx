import { motion } from "framer-motion"

const ecgPath = "M 0 50 L 15 50 L 20 50 L 25 20 L 30 80 L 35 50 L 40 50 L 50 50 L 55 50 L 60 50 L 65 20 L 70 80 L 75 50 L 80 50 L 90 50 L 95 50 L 100 50"

export function LoadingScreen() {
  const letters = "MediCycle".split("")

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* ECG Waveform */}
      <div className="w-48 h-12 mb-8 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d={ecgPath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: [0.4, 1, 0.4] }}
            transition={{
              pathLength: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          {/* Glow trail */}
          <motion.path
            d={ecgPath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.15}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Brand Name — staggered letter reveal */}
      <div className="flex items-center gap-[1px]">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.06,
              type: "spring" as const,
              stiffness: 200,
              damping: 20,
            }}
            className="text-2xl font-display font-bold tracking-tight text-foreground"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Subtle progress bar */}
      <div className="w-32 h-[2px] bg-border rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-muted-foreground mt-4 tracking-wide uppercase font-medium"
      >
        Preparing your workspace
      </motion.p>
    </div>
  )
}
