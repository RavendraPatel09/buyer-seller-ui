import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: value,
            duration: 2.5,
            ease: 'power3.out',
            onUpdate: function() {
              setDisplayValue(Math.floor(this.targets()[0].val))
            }
          })
        },
        once: true
      })
    }
  }, [value])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

export function StatsSection() {
  return (
    <section className="py-32 relative z-10 bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/20">
        <div className="space-y-4 py-8 md:py-0">
          <h3 className="text-6xl font-black text-primary drop-shadow-glow">
            <AnimatedNumber value={99} suffix="%" />
          </h3>
          <p className="text-lg font-medium text-muted-foreground">Uptime Reliability</p>
        </div>
        <div className="space-y-4 py-8 md:py-0">
          <h3 className="text-6xl font-black text-primary drop-shadow-glow">
            <AnimatedNumber value={2} suffix="M+" />
          </h3>
          <p className="text-lg font-medium text-muted-foreground">Patient Records</p>
        </div>
        <div className="space-y-4 py-8 md:py-0">
          <h3 className="text-6xl font-black text-primary drop-shadow-glow">
            <AnimatedNumber value={50} suffix="x" />
          </h3>
          <p className="text-lg font-medium text-muted-foreground">Faster Workflows</p>
        </div>
      </div>
    </section>
  )
}
