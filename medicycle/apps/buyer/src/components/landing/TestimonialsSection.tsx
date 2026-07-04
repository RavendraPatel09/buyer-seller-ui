import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Head Pharmacist, Apollo Hospitals",
    text: "MediCycle transformed how we manage pharmaceutical procurement. The real-time inventory sync alone saved us 200+ hours per quarter.",
    initials: "PS",
    color: "bg-emerald-500",
  },
  {
    name: "Rajesh Kumar",
    role: "Supply Chain Director, Fortis",
    text: "The seller verification system gives us confidence in every transaction. We've reduced counterfeit risk to near zero since switching.",
    initials: "RK",
    color: "bg-blue-500",
  },
  {
    name: "Dr. Ananya Patel",
    role: "CEO, MedSupply Co.",
    text: "As a seller, the dashboard analytics are incredible. I can see exactly which products are trending and price competitively in real-time.",
    initials: "AP",
    color: "bg-violet-500",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 relative z-10 bg-card/30">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16"
        >
          <p className="text-sm font-mono font-medium text-primary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-lg">
            Trusted by healthcare leaders
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
              className="surface rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-[11px] font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
