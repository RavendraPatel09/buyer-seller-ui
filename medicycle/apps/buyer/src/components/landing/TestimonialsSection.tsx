import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Head Pharmacist, Apollo Hospitals',
    text: 'MediCycle made our procurement flow feel calm and measurable. The handoff visibility saved our team more than 200 hours every quarter.',
    initials: 'PS',
    color: 'bg-emerald-500',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Supply Chain Director, Fortis',
    text: 'The verification layer gives us real confidence in every order. Counterfeit risk dropped sharply the moment we switched.',
    initials: 'RK',
    color: 'bg-sky-500',
  },
  {
    name: 'Dr. Ananya Patel',
    role: 'CEO, MedSupply Co.',
    text: 'As a seller, the analytics are surgical. I can see exactly where demand is emerging and price with conviction.',
    initials: 'AP',
    color: 'bg-violet-500',
  },
]

export function TestimonialsSection() {
  return (
    <section id="stories" className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Testimonials</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Trusted by operators who need calm under pressure.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.08 }}
              className="panel rounded-[1.7rem] p-6 md:p-7"
            >
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm leading-8 text-muted-foreground">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-[11px] font-semibold text-white`}>
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
