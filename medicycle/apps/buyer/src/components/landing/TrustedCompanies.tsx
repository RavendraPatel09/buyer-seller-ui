import { motion } from 'framer-motion'

const companies = [
  "Acme Corp", "Global Health", "Nova Medical", "Prime Care", "Zenith Health", 
  "Acme Corp", "Global Health", "Nova Medical", "Prime Care", "Zenith Health"
]

export function TrustedCompanies() {
  return (
    <section className="py-24 overflow-hidden border-y border-border/10 bg-background/20 backdrop-blur-lg relative z-10">
      <p className="text-center text-sm font-semibold tracking-widest text-muted-foreground mb-12">
        TRUSTED BY INNOVATIVE HEALTHCARE TEAMS
      </p>
      <div className="flex w-[200%]">
        <motion.div 
          className="flex space-x-16 items-center justify-around w-full"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {companies.map((company, i) => (
            <div key={i} className="text-3xl font-extrabold text-foreground/20 hover:text-primary transition-colors duration-500 cursor-default hover:drop-shadow-glow">
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
