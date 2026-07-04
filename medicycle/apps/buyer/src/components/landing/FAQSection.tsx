import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from "@medicycle/utils"

const faqs = [
  { q: "Is MediCycle HIPAA compliant?", a: "Yes, MediCycle is fully HIPAA, GDPR, and SOC2 compliant. All PHI is encrypted at rest and in transit using military-grade encryption." },
  { q: "How long does implementation take?", a: "Unlike legacy systems that take months, MediCycle can be deployed in as little as 48 hours depending on your current data architecture." },
  { q: "Do you integrate with existing EHRs?", a: "We have out-of-the-box bi-directional sync with Epic, Cerner, and AthenaHealth using modern FHIR APIs." },
  { q: "What is the pricing model?", a: "We offer transparent, per-bed pricing with no hidden implementation fees. Contact our sales team for a custom quote." }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-32 relative z-10 bg-background/50 backdrop-blur-sm border-t border-border/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border/50 rounded-xl bg-card/50 overflow-hidden">
              <button 
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", openIndex === i && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-muted-foreground">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
