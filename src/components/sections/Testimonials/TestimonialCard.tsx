import { Star } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800 p-8">
      <div className="flex gap-1 text-gold-400">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/70">"{testimonial.quote}"</p>
      <p className="mt-5 font-display tracking-wide text-white">{testimonial.name}</p>
    </div>
  )
}
