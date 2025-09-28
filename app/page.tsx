import { Hero } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { TrustBadges } from '@/components/landing/trust-badges'
import { CTA } from '@/components/landing/cta'
import { Testimonials } from '@/components/landing/testimonials'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <TrustBadges />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
