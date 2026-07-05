import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@medicycle/ui'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroScene } from '../3d/HeroScene'

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-28 border-b border-border/50"
    >
      {/* Background gradients for the hero */}
      <div className="absolute inset-0 z-0 bg-background pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      </div>

      {/* Max Width Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* LEFT: Copy & CTAs */}
          <motion.div 
            style={{ y: textY, opacity }} 
            className="flex flex-col items-start max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary shadow-glow-sm"
            >
              <Zap className="h-4 w-4" />
              <span>Next-Generation Healthcare SaaS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="font-display text-[56px] leading-[1.05] tracking-tight font-bold text-foreground sm:text-[64px]"
            >
              Procurement, <br />
              <span className="gradient-text">engineered for precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-lg sm:text-[20px] leading-relaxed text-muted-foreground"
            >
              The unified platform for hospitals and pharmacies to source, verify, and redistribute vital medicines with absolute confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-[16px] group">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full text-[16px]">
                  Join as Seller
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-6 pt-8 border-t border-border/50 w-full"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">SOC2 Certified</span>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="avatar" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Trusted by 500+ clinics</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative h-[600px] w-full rounded-[32px] overflow-hidden border border-white/10 glass-panel-heavy shadow-premium hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            <HeroScene />
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
