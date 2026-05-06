import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import AuditSection from '@/components/AuditSection'
import WhyAI from '@/components/WhyAI'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import AuditStickyBar from '@/components/AuditStickyBar'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#07070c] overflow-x-hidden">
        <Nav />
        <Hero />
        <Services />
        <HowItWorks />
        <AuditSection />
        <WhyAI />
        <Testimonials />
        <About />
        <ContactCTA />
        <Footer />
      </main>
      <AuditStickyBar />
    </>
  )
}
