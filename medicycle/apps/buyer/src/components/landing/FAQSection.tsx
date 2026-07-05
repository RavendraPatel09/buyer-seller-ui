import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@medicycle/utils'

const faqs = [
  {
    q: 'How does MediCycle ensure medicine authenticity?',
    a: 'Every listed medicine is verified through a multi-step authentication process, including batch verification, license checks, and a chain-of-custody audit from manufacturer to buyer.',
  },
  {
    q: 'What happens if a medicine is near expiry?',
    a: 'Near-expiry inventory is surfaced automatically, then routed through our redistribution network so waste drops while buyers still see clear expiry information.',
  },
  {
    q: 'Is transaction data secure?',
    a: 'All transactions use encrypted communication rails and auditable account controls, with compliance workflows designed for sensitive procurement and clinical operations.',
  },
  {
    q: 'How do I become a verified seller?',
    a: 'Submit your licensing documents through our onboarding flow and verification typically completes within 24–48 hours.',
  },
  {
    q: 'Can MediCycle integrate with existing ERP systems?',
    a: 'Yes. We offer API-first integration paths and onboarding tooling that supports common procurement and inventory systems.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">FAQ</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Questions that matter in critical moments.
          </h2>
        </motion.div>

        <div className="rounded-[1.7rem] border border-border/70 bg-card/50 p-2 shadow-depth-1">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="border-b border-border/60 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 pl-3 pr-2 text-left"
              >
                <span className={cn('pr-6 text-sm font-semibold transition-colors md:text-base', openIndex === index ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pl-3 pr-12 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
