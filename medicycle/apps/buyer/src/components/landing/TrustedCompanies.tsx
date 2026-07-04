import { motion } from 'framer-motion'

const companies = ['Apollo', 'Fortis', 'Max', 'AIIMS', 'Medanta', 'Narayana', 'Manipal', 'Columbia Asia']

export function TrustedCompanies() {
  return (
    <section className="relative z-10 border-y border-border/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Trusted by leading healthcare organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 lg:gap-x-12">
          {companies.map((company, index) => (
            <motion.span
              key={company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-full border border-border/70 bg-card/70 px-3 py-2 text-sm font-semibold tracking-[0.16em] text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
