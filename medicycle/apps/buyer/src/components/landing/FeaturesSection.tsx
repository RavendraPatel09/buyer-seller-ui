import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Activity, Shield, Zap } from 'lucide-react'

const features = [
  {
    title: "Real-time Monitoring",
    description: "Stream patient vitals with zero latency. Powered by WebSockets and optimized for critical care environments.",
    icon: Activity,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Military-grade Security",
    description: "End-to-end encryption for all PHI. HIPAA, GDPR, and SOC2 compliant out of the box.",
    icon: Shield,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Lightning Fast UX",
    description: "Built on an edge-network architecture. MediCycle is the fastest EMR system on the market.",
    icon: Zap,
    color: "from-orange-500 to-yellow-500"
  }
]

function FeatureCard({ feature }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useMotionTemplate`${springY}deg`
  const rotateY = useMotionTemplate`${springX}deg`

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width - 0.5) * 20 // max 20 deg
    const yPct = (mouseY / height - 0.5) * -20
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-lg mx-auto p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 hover:opacity-20 blur-xl rounded-2xl" />
      <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 h-full shadow-2xl overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
          <feature.icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Engineered for Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to run a modern clinical operation.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
