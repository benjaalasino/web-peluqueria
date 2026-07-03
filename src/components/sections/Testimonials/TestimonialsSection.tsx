import { SectionContainer } from '@/components/layout/SectionContainer'
import { TestimonialCard } from '@/components/sections/Testimonials/TestimonialCard'
import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  return (
    <SectionContainer id="testimonios" eyebrow="Lo que dicen" title="Clientes que vuelven" className="bg-ink-soft/40">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </SectionContainer>
  )
}
