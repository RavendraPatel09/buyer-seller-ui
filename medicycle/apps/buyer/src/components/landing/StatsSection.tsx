import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const start = performance.now()
    const duration = 2000

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Spring-like overshoot: ease with slight bounce
      const eased = progress < 0.9
        ? progress / 0.9
        : 1 + Math.sin((progress - 0.9) * Math.PI * 5) * 0.03 * (1 - progress) / 0.1
      setDisplayValue(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 99, suffix: ".9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
  { value: 2400, suffix: "+", label: "Active Facilities", sublabel: "Across 12 countries" },
  { value: 50, suffix: "x", label: "Faster Procurement", sublabel: "vs. traditional methods" },
]

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Asymmetric layout — large stat left, two smaller right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Large stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <h3 className="font-mono text-7xl md:text-8xl font-bold text-primary glow-text leading-none">
              <AnimatedNumber value={stats[0].value} suffix={stats[0].suffix} />
            </h3>
            <p className="text-xl font-display font-semibold mt-4">{stats[0].label}</p>
            <p className="text-muted-foreground mt-1">{stats[0].sublabel}</p>
          </motion.div>

          {/* Two smaller stats */}
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-8">
            {stats.slice(1).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 * (i + 1) }}
                className="p-6 rounded-2xl border border-border bg-card/50"
              >
                <h3 className="font-mono text-4xl md:text-5xl font-bold text-foreground leading-none">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-base font-display font-semibold mt-3">{stat.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
