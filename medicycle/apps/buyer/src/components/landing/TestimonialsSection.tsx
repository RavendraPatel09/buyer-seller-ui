import { useRef } from 'react'

const testimonials = [
  { quote: "MediCycle completely transformed our ICU. The interface is intuitive and the speed is unmatched.", author: "Dr. Sarah Jenkins", role: "Chief of Surgery" },
  { quote: "We migrated 2 million patient records in a weekend. Their data integrity guarantees are real.", author: "Michael Chen", role: "CTO, Zenith Health" },
  { quote: "Finally, an EMR that doesn't look like it was built in 1995. Our nurses love the dark mode.", author: "Emily Davis", role: "Head of Nursing" }
]

function TestimonialCard({ t }: any) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--x', `${x}px`)
    cardRef.current.style.setProperty('--y', `${y}px`)
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative p-[1px] rounded-2xl bg-border/20 overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
           style={{ 
             background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), hsl(var(--primary) / 0.5), transparent 40%)`
           }} 
      />
      <div className="relative bg-card/90 backdrop-blur-xl h-full p-8 rounded-2xl flex flex-col justify-between">
        <p className="text-lg italic text-muted-foreground mb-8 leading-relaxed">"{t.quote}"</p>
        <div>
          <div className="font-bold">{t.author}</div>
          <div className="text-sm text-primary mt-1">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">Don't just take our word for it</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
