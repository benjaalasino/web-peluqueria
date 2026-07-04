import { SectionContainer } from '@/components/layout/SectionContainer'
import { Reveal, RevealGroup, revealItemVariants } from '@/components/ui/Reveal'
import { services } from '@/data/services'
import { ServiceCard } from './ServiceCard'
import { motion } from 'motion/react'

export function ServicesSection() {
  return (
    <SectionContainer id="servicios">
      <Reveal>
        <p className="text-sm tracking-[0.3em] text-gold-400 uppercase">Servicios</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white md:text-5xl">
          Cada corte, un ritual
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <motion.div key={service.id} variants={revealItemVariants}>
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </RevealGroup>
    </SectionContainer>
  )
}
