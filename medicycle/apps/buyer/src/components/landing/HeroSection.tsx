import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@medicycle/ui"
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const spring = { type: "spring" as const, stiffness: 100, damping: 20 }

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: gridOpacity }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
        {/* Gradient fade on edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      {/* Accent glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-4xl"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Trusted by 500+ healthcare facilities</span>
          </motion.div>

          {/* Headline — left aligned, asymmetric */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="gradient-text">Healthcare supply,</span>
            <br />
            <span className="text-foreground">reimagined.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            MediCycle connects buyers and sellers of pharmaceutical supplies with
            surgical precision. Real-time inventory, transparent pricing, zero waste.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link to="/marketplace">
              <Button size="lg" className="rounded-full px-8 gap-2 group">
                Browse Marketplace
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Start Selling
              </Button>
            </Link>
          </motion.div>

          {/* Social proof avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 mt-16 pt-8 border-t border-border/50"
          >
            <div className="flex -space-x-2.5">
              {[
                'bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500'
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-mono font-semibold text-foreground">2,400+</span>
              <span className="text-muted-foreground ml-1.5">healthcare professionals</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
