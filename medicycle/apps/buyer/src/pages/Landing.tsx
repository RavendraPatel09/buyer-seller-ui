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

export function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar className="bg-background/50 border-b-0">
        <div className="flex items-center gap-2">
          {/* Custom logo mark */}
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 5H14L11 8L12 12L8 10L4 12L5 8L2 5H6L8 1Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="text-lg font-display font-bold tracking-tight">MediCycle</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1">
            {['Features', 'Pricing', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="rounded-full px-5">Get Started</Button>
            </Link>
          </div>
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
