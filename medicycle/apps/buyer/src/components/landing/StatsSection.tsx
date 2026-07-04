import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let frame: number
    const start = performance.now()
    const duration = 1800

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = progress < 0.9 ? progress / 0.9 : 1 + Math.sin((progress - 0.9) * Math.PI * 5) * 0.03 * (1 - progress) / 0.1
      setDisplayValue(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 99, suffix: '.9%', label: 'Uptime SLA', sublabel: 'Reliability engineered for 24/7 care operations' },
  { value: 2400, suffix: '+', label: 'Active facilities', sublabel: 'Across 12 countries and rising' },
  { value: 50, suffix: 'x', label: 'Procurement speed', sublabel: 'Compared with manual sourcing workflows' },
]

export function StatsSection() {
  return (
    <section id="proof" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="panel relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
          >
            <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Proof at scale</p>
            <h3 className="font-mono text-6xl font-semibold leading-none text-primary sm:text-7xl lg:text-8xl">
              <AnimatedNumber value={stats[0].value} suffix={stats[0].suffix} />
            </h3>
            <p className="mt-5 max-w-md text-xl font-semibold text-foreground">{stats[0].label}</p>
            <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">{stats[0].sublabel}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.slice(1).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.08 * (i + 1) }}
                className="panel rounded-[1.7rem] p-6"
              >
                <h3 className="font-mono text-4xl font-semibold leading-none text-foreground sm:text-5xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="mt-4 text-base font-semibold text-foreground">{stat.label}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{stat.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
