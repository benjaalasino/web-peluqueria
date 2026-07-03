import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'
import { fadeInUp } from '@/lib/motionVariants'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.blockquote
      variants={fadeInUp}
      className="rounded-2xl border border-bone-dim/10 bg-ink-raised p-7"
    >
      <div className="flex gap-1 text-gold">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 font-body text-sm text-bone-dim italic">“{testimonial.quote}”</p>
      <footer className="mt-4 font-body text-xs font-semibold tracking-wide text-bone uppercase">
        {testimonial.author}
      </footer>
    </motion.blockquote>
  )
}
