import type { ReactNode } from "react"
import { HeartPulse } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function AuthLayout({ children, title, subtitle }: { children: ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="min-h-screen w-full flex bg-background selection:bg-primary/30 relative">
      
      {/* Left pane - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
        
        {/* Logo */}
        <Link to="/" className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center space-x-2 transition-opacity hover:opacity-80">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">MediCycle</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md mx-auto space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
             {/* subtle top gradient line on glass panel */}
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
             {children}
          </div>
        </motion.div>
      </div>

      {/* Right pane - Branding / Visual */}
      <div className="hidden lg:flex w-1/2 bg-muted relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=3132&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/40 backdrop-blur-xl z-10" />
        
        {/* Animated background gradient shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] -right-20 -top-20 z-0"
        />
        
        <div className="relative z-20 max-w-lg text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-background/50 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl mb-8">
            <HeartPulse className="h-16 w-16 text-primary drop-shadow-glow" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">The Operating System for Modern Care.</h2>
          <p className="text-xl text-muted-foreground">Join thousands of healthcare professionals who trust MediCycle to run their daily operations securely.</p>
        </div>
      </div>
    </div>
  )
}
