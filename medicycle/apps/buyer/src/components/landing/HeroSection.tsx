import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../../design-system/components/Button/Button'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current && textRef.current) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 150,
        opacity: 0,
        filter: 'blur(10px)',
      })
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <div ref={textRef} className="max-w-4xl mx-auto z-10 space-y-8 mt-[-10vh]">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-sm">
          The Future of <br className="hidden md:block"/> Healthcare Operations
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
          MediCycle brings Apple-grade design and Stripe-level reliability to your clinical workflows.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button size="lg" className="rounded-full px-8 text-base shadow-glow">Get Started</Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 glass-panel text-foreground bg-transparent border-white/20 text-base">Book Demo</Button>
        </div>
      </div>
    </section>
  )
}
