import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <HeartPulse className="w-10 h-10 text-primary" />
      </motion.div>
      <h2 className="text-xl font-bold tracking-tight text-foreground">Loading MediCycle...</h2>
      <p className="text-sm text-muted-foreground mt-2">Preparing your workspace</p>
    </div>
  );
}
