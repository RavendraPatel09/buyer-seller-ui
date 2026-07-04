import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { year: "Phase 1", title: "Integration", desc: "Connect your existing data silos seamlessly." },
  { year: "Phase 2", title: "Optimization", desc: "AI-driven analysis of your clinical workflows." },
  { year: "Phase 3", title: "Scale", desc: "Deploy across all your facilities instantly." }
]

export function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scrollTrigger: {
          trigger: lineRef.current.parentElement,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        },
        height: '100%',
        ease: 'none'
      })
    }
  }, [])

  return (
    <section className="py-32 relative z-10 bg-background/50 backdrop-blur-sm border-y border-border/20">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-1 bg-border/50 -translate-x-1/2 rounded-full overflow-hidden">
          <div ref={lineRef} className="w-full h-0 bg-primary shadow-glow" />
        </div>
        
        <div className="space-y-24">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} relative`}>
              <div className="hidden md:block w-1/2" />
              <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-background border-4 border-primary rounded-full -translate-x-1/2 mt-1 shadow-glow z-10" />
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16'}`}>
                <div className="text-primary font-bold tracking-wider text-sm mb-2">{step.year}</div>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
