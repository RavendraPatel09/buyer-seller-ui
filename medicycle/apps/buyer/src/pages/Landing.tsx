import { useEffect } from 'react'
import { HeroSection } from '../components/landing/HeroSection'
import { TrustedCompanies } from '../components/landing/TrustedCompanies'
import { StatsSection } from '../components/landing/StatsSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { FAQSection } from '../components/landing/FAQSection'
import { Footer } from '../components/landing/Footer'
import { Navbar, Button } from "@medicycle/ui"
import { Link } from 'react-router-dom'
import { CommandPalette } from '../components/landing/CommandPalette'
import { useTheme } from '../lib/theme/ThemeContext'
import { MoonStar, SunMedium } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Platform', href: '#features' },
  { label: 'Network', href: '#proof' },
  { label: 'Testimonials', href: '#stories' },
]

export function Landing() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      {/* Global Noise Texture */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E')]" />

      <Navbar showProgress className="max-w-[1400px] mx-auto left-0 right-0 top-4 rounded-[24px] border border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-glow-sm">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="font-display text-[1.1rem] font-bold tracking-tight">MediCycle</p>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
            >
              {item.label}
              <motion.div className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex rounded-xl"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {resolvedTheme === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </Button>
          <CommandPalette />
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="font-semibold">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="rounded-xl shadow-premium">Get Started</Button>
          </Link>
        </div>
      </Navbar>

      <main className="relative z-10 flex flex-col items-center">
        <HeroSection />
        
        {/* Alternate dark gradients between sections */}
        <div className="w-full relative py-20 bg-[radial-gradient(ellipse_at_center,rgba(var(--glow-rgb),0.05)_0%,transparent_70%)]">
          <TrustedCompanies />
          <StatsSection />
        </div>
        
        <div className="w-full bg-background relative z-10">
          <FeaturesSection />
        </div>
        
        <div className="w-full relative py-20 bg-[radial-gradient(ellipse_at_top,rgba(var(--glow-rgb),0.03)_0%,transparent_80%)]">
          <TestimonialsSection />
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
