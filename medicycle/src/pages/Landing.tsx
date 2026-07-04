import { useEffect } from 'react'
import { Scene } from '../components/3d/Scene'
import { HeroSection } from '../components/landing/HeroSection'
import { TrustedCompanies } from '../components/landing/TrustedCompanies'
import { StatsSection } from '../components/landing/StatsSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { TimelineSection } from '../components/landing/TimelineSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { FAQSection } from '../components/landing/FAQSection'
import { Footer } from '../components/landing/Footer'
import { Navbar } from '../design-system/components/Navigation/Navbar'
import { Button } from '../design-system/components/Button/Button'
import { HeartPulse } from 'lucide-react'

export function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar className="fixed top-0 w-full z-50 bg-background/50 border-b-0 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">MediCycle</span>
        </div>
        <div>
          <Button variant="ghost" className="mr-2 hidden sm:inline-flex">Log In</Button>
          <Button className="rounded-full shadow-glow">Book Demo</Button>
        </div>
      </Navbar>

      <Scene />
      
      <main>
        <HeroSection />
        <TrustedCompanies />
        <StatsSection />
        <FeaturesSection />
        <TimelineSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  )
}
