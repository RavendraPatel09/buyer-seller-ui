import { useEffect } from 'react'
import { HeroSection } from '../components/landing/HeroSection'
import { TrustedCompanies } from '../components/landing/TrustedCompanies'
import { StatsSection } from '../components/landing/StatsSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { FAQSection } from '../components/landing/FAQSection'
import { Footer } from '../components/landing/Footer'
import { Navbar } from "@medicycle/ui"
import { Button } from "@medicycle/ui"
import { Link } from 'react-router-dom'
import { CommandPalette } from '../components/landing/CommandPalette'
import { useTheme } from '../lib/theme/ThemeContext'
import { MoonStar, SunMedium } from 'lucide-react'

const navItems = [
  { label: 'Capabilities', href: '#features' },
  { label: 'Proof', href: '#proof' },
  { label: 'Stories', href: '#stories' },
]

export function Landing() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar className="bg-background/70 border-b-0 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-depth-1">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="font-display text-[1rem] font-semibold tracking-tight">MediCycle</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Studio Supply OS</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-card/70 px-2 py-1.5 shadow-depth-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-full px-3 sm:inline-flex"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {resolvedTheme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>
          <CommandPalette />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="rounded-full px-4 text-muted-foreground">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="rounded-full px-5">Get Started</Button>
          </Link>
        </div>
      </Navbar>

      <main>
        <HeroSection />
        <TrustedCompanies />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}
