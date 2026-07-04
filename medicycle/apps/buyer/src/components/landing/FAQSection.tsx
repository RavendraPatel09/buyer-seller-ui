import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from "@medicycle/utils"

const faqs = [
  {
    q: "How does MediCycle ensure medicine authenticity?",
    a: "Every listed medicine is verified through our multi-step authentication process including batch verification, FSSAI compliance checks, and seller KYC. We maintain a complete chain of custody from manufacturer to buyer."
  },
  {
    q: "What happens if a medicine is near expiry?",
    a: "Our smart inventory system automatically flags near-expiry items and offers them at discounted rates through our redistribution network, reducing waste by up to 40%. Buyers are always clearly informed of expiry dates."
  },
  {
    q: "Is my transaction data secure?",
    a: "All transactions use bank-grade AES-256 encryption. We're SOC2 Type II certified and HIPAA-ready. Your financial and medical procurement data is never shared with third parties."
  },
  {
    q: "How do I become a verified seller?",
    a: "Submit your pharmacy license, GST registration, and drug license through our onboarding flow. Verification typically completes within 24-48 hours. Once approved, you can list inventory immediately."
  },
  {
    q: "Can I integrate MediCycle with my existing ERP?",
    a: "Yes. We offer REST APIs and pre-built integrations for SAP, Oracle Health, and most major pharmacy management systems. Our developer documentation covers everything you need."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono font-medium text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Common questions
          </h2>
        </motion.div>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "text-sm md:text-base font-medium pr-8 transition-colors",
                  openIndex === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-12">
                      {faq.a}
                    </p>
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
