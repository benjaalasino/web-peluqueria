import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { ServicesSection } from '@/components/sections/Services/ServicesSection'
import { TeamSection } from '@/components/sections/Team/TeamSection'
import { GallerySection } from '@/components/sections/Gallery/GallerySection'
import { TestimonialsSection } from '@/components/sections/Testimonials/TestimonialsSection'
import { ContactSection } from '@/components/sections/Contact/ContactSection'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { useViewStore } from '@/store/viewStore'

/**
 * Placeholder for the cinematic hero->booking handoff (Fase 5 will replace
 * this with the 3D camera rig driving `completeTransition`).
 */
function TransitionOverlay() {
  const completeTransition = useViewStore((s) => s.completeTransition)

  useEffect(() => {
    const timeout = window.setTimeout(completeTransition, 380)
    return () => window.clearTimeout(timeout)
  }, [completeTransition])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-ink"
    />
  )
}

function App() {
  const view = useViewStore((s) => s.view)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <TeamSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      <AnimatePresence>
        {view === 'transitioning' && <TransitionOverlay key="transition" />}
        {view === 'booking' && <BookingFlow key="booking" />}
      </AnimatePresence>
    </>
  )
}

export default App
