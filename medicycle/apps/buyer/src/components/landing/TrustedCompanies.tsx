import { motion } from 'framer-motion'

const companies = [
  "Apollo", "Fortis", "Max", "AIIMS", "Medanta", "Narayana", "Manipal", "Columbia Asia"
]

export function TrustedCompanies() {
  return (
    <section className="py-16 border-y border-border/50 relative z-10">
      <div className="container mx-auto px-6 lg:px-8">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground text-center mb-8">
          Trusted by leading healthcare organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-sm font-display font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-default"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
