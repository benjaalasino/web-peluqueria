import { SectionContainer } from '@/components/layout/SectionContainer'
import { Reveal, RevealGroup, revealItemVariants } from '@/components/ui/Reveal'
import { testimonials } from '@/data/testimonials'
import { TestimonialCard } from './TestimonialCard'
import { motion } from 'motion/react'

export function TestimonialsSection() {
  return (
    <SectionContainer id="testimonios">
      <Reveal>
        <p className="text-sm tracking-[0.3em] text-gold-400 uppercase">Testimonios</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white md:text-5xl">
          Lo que dicen los clientes
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={revealItemVariants}>
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </RevealGroup>
    </SectionContainer>
  )
}
