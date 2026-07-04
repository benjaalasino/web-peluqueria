import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Hero } from '@/components/sections/Hero/Hero'
import { ServicesSection } from '@/components/sections/Services/ServicesSection'
import { TeamSection } from '@/components/sections/Team/TeamSection'
import { GallerySection } from '@/components/sections/Gallery/GallerySection'
import { TestimonialsSection } from '@/components/sections/Testimonials/TestimonialsSection'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { useCursorMotionValues } from '@/hooks/useCustomCursor'
import { useSyncReducedMotion } from '@/lib/reducedMotion'
import { useViewStore } from '@/store/viewStore'

function App() {
  useSyncReducedMotion()
  const view = useViewStore((s) => s.view)
  const { x, y, handlePointerMove } = useCursorMotionValues()
  const [cursorActive, setCursorActive] = useState(false)

  return (
    <div onPointerMove={handlePointerMove}>
      <CustomCursor x={x} y={y} active={cursorActive} />
      <Header />
      <main>
        <Hero onCursorActiveChange={setCursorActive} />
        <ServicesSection />
        <TeamSection />
        <GallerySection />
        <TestimonialsSection />
      </main>
      <Footer />

      <AnimatePresence>
        {view === 'booking' && <BookingFlow key="booking-flow" />}
      </AnimatePresence>
    </div>
  )
}

export default App
