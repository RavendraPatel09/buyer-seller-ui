import { motion } from 'framer-motion'
import { Button } from '@medicycle/ui'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60">
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            className="max-w-3xl"
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Ready for the next shift</p>
            <h2 className="mb-6 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Calm the supply chain, without sacrificing velocity.
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              Join the care teams already using MediCycle to keep medicine moving with less noise and more certainty.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button size="lg" className="w-full rounded-full px-8 py-6 sm:w-auto">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full rounded-full px-8 py-6 sm:w-auto">
                Schedule demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold">MediCycle</span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              The operating system for modern healthcare supply chains—precision-built for reliability and clarity.
            </p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row lg:px-8">
          <p>© 2026 MediCycle Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="transition-colors hover:text-foreground">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
