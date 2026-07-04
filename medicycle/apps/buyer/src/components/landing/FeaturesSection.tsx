import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Activity, Shield, Zap, Recycle, BarChart3, Lock } from 'lucide-react'

const features = [
  {
    title: 'Inventory pulse',
    description: 'Live stock levels and handoff windows across every connected care site.',
    icon: Activity,
    span: 'md:col-span-2 md:row-span-2',
    size: 'large',
  },
  {
    title: 'Verified suppliers',
    description: 'Every seller is license-verified and monitored in real time.',
    icon: Shield,
    span: 'md:col-span-1',
    size: 'small',
  },
  {
    title: 'Instant matching',
    description: 'AI-guided offers surface the best price within seconds.',
    icon: Zap,
    span: 'md:col-span-1',
    size: 'small',
  },
  {
    title: 'Circular lifecycle',
    description: 'Track medicine from manufacturing to patient and reclaim near-expiry stock.',
    icon: Recycle,
    span: 'md:col-span-1',
    size: 'small',
  },
  {
    title: 'Operational analytics',
    description: 'Understand procurement velocity, channel health, and supply risk at a glance.',
    icon: BarChart3,
    span: 'md:col-span-1',
    size: 'small',
  },
  {
    title: 'End-to-end trust',
    description: 'Encrypted communication rails, audit trails, and compliant handoffs built in.',
    icon: Lock,
    span: 'md:col-span-2',
    size: 'wide',
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 220, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 220, damping: 26 })
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${springX}px ${springY}px, hsl(var(--primary) / 0.12), transparent 78%)`

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(ref.current ? ref.current.offsetWidth / 2 : 0)
    mouseY.set(ref.current ? ref.current.offsetHeight / 2 : 0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-[1.7rem] border border-border/70 bg-card/60 p-6 md:p-7 ${feature.span} ${feature.size === 'large' ? 'min-h-[280px]' : 'min-h-[220px]'}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <feature.icon className="h-5 w-5" />
        </div>
        <h3 className={`font-display font-semibold tracking-tight ${feature.size === 'large' ? 'text-2xl' : 'text-lg'}`}>
          {feature.title}
        </h3>
        <p className={`mt-3 flex-1 leading-7 text-muted-foreground ${feature.size === 'large' ? 'text-base' : 'text-sm'}`}>
          {feature.description}
        </p>
        <div className="mt-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Read more
            <svg width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-hover:translate-x-0.5">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">Capabilities</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Engineered for a quieter, more precise supply chain.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-4 md:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
