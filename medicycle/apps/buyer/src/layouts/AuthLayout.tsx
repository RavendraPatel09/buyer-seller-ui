import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const spring = { type: "spring" as const, stiffness: 100, damping: 20 }

export function AuthLayout({ children, title, subtitle }: { children: ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="min-h-screen w-full flex bg-background selection:bg-primary/30 relative">
      
      {/* Left pane - Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10">
        
        {/* Logo */}
        <Link to="/" className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg">MediCycle</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={spring}
          className="w-full max-w-md mx-auto space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="surface rounded-2xl p-8 relative overflow-hidden">
             {/* Accent line on top */}
             <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
             {children}
          </div>
        </motion.div>
      </div>

      {/* Right pane - Branding Visual */}
      <div className="hidden lg:flex w-[45%] bg-card relative overflow-hidden flex-col items-center justify-center p-12 border-l border-border">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        {/* Accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        
        <div className="relative z-20 max-w-md text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-border mb-6">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight">The precision platform for healthcare supply.</h2>
          <p className="text-muted-foreground">Join thousands of healthcare professionals who trust MediCycle to run their daily operations.</p>
          
          {/* Floating testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...spring }}
            className="mt-8 surface rounded-xl p-5 text-left"
          >
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              &ldquo;MediCycle reduced our procurement time by 80%. The real-time inventory sync is a game changer.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">DR</div>
              <div>
                <p className="text-xs font-medium">Dr. Rajan Mehta</p>
                <p className="text-xs text-muted-foreground">Chief Pharmacist, Apollo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
