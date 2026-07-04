import { motion } from 'framer-motion'
import { Button } from "@medicycle/ui"
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50">
      {/* CTA Banner */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to transform your supply chain?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Join thousands of healthcare professionals who&apos;ve already switched to MediCycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="rounded-full px-8 gap-2 group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer links */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg">MediCycle</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The operating system for modern healthcare supply chains. Precision-built for reliability.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Integrations", "Changelog"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Compliance"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 MediCycle Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
