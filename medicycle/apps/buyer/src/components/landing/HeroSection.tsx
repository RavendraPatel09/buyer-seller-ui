import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Button } from '@medicycle/ui'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const spring = { type: 'spring' as const, stiffness: 120, damping: 18 }

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 24 })
  const springY = useSpring(y, { stiffness: 220, damping: 24 })

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02, rotate: -0.8 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <Link to={href}>
        {children}
      </Link>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.12])
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28">
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: reducedMotion ? 0.4 : 0.8 }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsla(var(--primary)/0.24),transparent_42%),radial-gradient(circle_at_85%_18%,hsla(var(--primary)/0.16),transparent_34%),linear-gradient(135deg,transparent,hsla(var(--foreground)/0.02))]" />
        <motion.div className="absolute inset-0" style={{ y: panelY }}>
          <div className="absolute inset-y-0 right-0 w-[44%] bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-background to-transparent" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <motion.div style={{ y: reducedMotion ? 0 : textY, opacity: reducedMotion ? 1 : textOpacity }} className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.05 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground shadow-depth-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Trusted by modern care networks
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.12 }}
              className="font-display text-balance text-4xl leading-[0.95] sm:text-5xl lg:text-7xl"
            >
              Precision medicine movement,
              <span className="mt-2 block text-muted-foreground">reimagined as a living network.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
            >
              MediCycle pairs inventory intelligence with human-centered commerce so care teams can source, verify, and redistribute vital medicine without friction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.28 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton href="/marketplace">
                <Button size="lg" className="w-full rounded-full px-7 py-6 sm:w-auto">
                  Explore marketplace
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton href="/register">
                <Button variant="outline" size="lg" className="w-full rounded-full px-7 py-6 sm:w-auto">
                  Join as seller
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/60 pt-6"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-sm text-muted-foreground shadow-depth-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Verified procurement rails
              </div>
              <div className="font-mono text-sm text-foreground">12k+ stock movements • 16h median response</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring, delay: 0.16 }}
            style={{ y: reducedMotion ? 0 : panelY }}
            className="relative"
          >
            <div className="panel relative overflow-hidden rounded-[2rem] border border-border/70 p-4 sm:p-6 md:p-8">
              <div className="absolute inset-x-8 top-6 h-24 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-[1.6rem] border border-border/70 bg-background/70 p-5 shadow-depth-2">
                <div className="mb-5 flex items-center justify-between rounded-full border border-border/70 bg-card/70 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  <span>Live cycle audit</span>
                  <span className="font-mono text-foreground">01</span>
                </div>

                <div className="relative overflow-hidden rounded-[1.35rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_38%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--surface-raised)))] p-6 shadow-depth-1">
                  <div className="motif-ring absolute inset-0" />
                  <svg viewBox="0 0 320 260" className="relative h-64 w-full" aria-hidden="true">
                    <path d="M64 184c30-58 76-90 124-90 28 0 56 12 96 42" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
                    <path d="M94 92c28-18 58-24 96-12 38 12 56 28 80 66" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45" />
                    <circle cx="84" cy="176" r="24" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2" />
                    <circle cx="228" cy="138" r="28" fill="hsl(var(--foreground) / 0.06)" stroke="hsl(var(--foreground))" strokeWidth="2" />
                    <path d="M78 182h36" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M206 138h36" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M120 90c8 0 14 6 14 14" stroke="hsl(var(--accent-foreground))" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
                    {['Inventory sync', 'Verified sellers', 'Waste reduction'].map((item) => (
                      <div key={item} className="rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs font-medium text-muted-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
