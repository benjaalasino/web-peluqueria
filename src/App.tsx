import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero/Hero'
import { ServicesSection } from '@/components/sections/Services/ServicesSection'
import { TeamSection } from '@/components/sections/Team/TeamSection'
import { GallerySection } from '@/components/sections/Gallery/GallerySection'
import { TestimonialsSection } from '@/components/sections/Testimonials/TestimonialsSection'
import { ContactSection } from '@/components/sections/Contact/ContactSection'

function App() {
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
    </>
  )
}

export default App
