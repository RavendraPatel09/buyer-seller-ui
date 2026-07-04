import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Activity, Shield, Zap, Recycle, BarChart3, Lock } from 'lucide-react'

const features = [
  {
    title: "Real-time Inventory Sync",
    description: "Live stock levels across all connected pharmacies. Zero-latency WebSocket updates ensure you never oversell or understock.",
    icon: Activity,
    span: "md:col-span-2 md:row-span-2",
    size: "large",
  },
  {
    title: "Verified Suppliers",
    description: "Every seller is license-verified. FSSAI, CDSCO, and WHO-GMP compliant.",
    icon: Shield,
    span: "md:col-span-1",
    size: "small",
  },
  {
    title: "Instant Matching",
    description: "AI-powered buyer-seller matching finds the best price within seconds.",
    icon: Zap,
    span: "md:col-span-1",
    size: "small",
  },
  {
    title: "Circular Lifecycle",
    description: "Track medicines from manufacture to patient. Reduce waste with smart redistribution of near-expiry inventory.",
    icon: Recycle,
    span: "md:col-span-1",
    size: "small",
  },
  {
    title: "Analytics Dashboard",
    description: "Revenue trends, procurement patterns, and savings reports in real-time.",
    icon: BarChart3,
    span: "md:col-span-1",
    size: "small",
  },
  {
    title: "End-to-end Encryption",
    description: "All transactions and communications are E2E encrypted. HIPAA-ready architecture.",
    icon: Lock,
    span: "md:col-span-2",
    size: "wide",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, hsl(var(--primary) / 0.08), transparent 80%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(ref.current ? ref.current.offsetWidth / 2 : 0)
    mouseY.set(ref.current ? ref.current.offsetHeight / 2 : 0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card/50 hover:border-primary/20 transition-colors duration-300 group ${feature.span} ${feature.size === 'large' ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}
    >
      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
          <feature.icon className="w-5 h-5 text-primary" />
        </div>

        <h3 className={`font-display font-semibold mb-3 ${feature.size === 'large' ? 'text-2xl' : 'text-lg'}`}>
          {feature.title}
        </h3>
        <p className={`text-muted-foreground leading-relaxed flex-1 ${feature.size === 'large' ? 'text-base' : 'text-sm'}`}>
          {feature.description}
        </p>

        {/* Learn more link — appears on hover */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
            Learn more
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
    <section id="features" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16"
        >
          <p className="text-sm font-mono font-medium text-primary uppercase tracking-widest mb-3">Capabilities</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
            Engineered for clinical precision
          </h2>
        </motion.div>
        
        {/* Bento grid */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
