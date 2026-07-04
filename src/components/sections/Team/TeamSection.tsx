import { SectionContainer } from '@/components/layout/SectionContainer'
import { Reveal, RevealGroup, revealItemVariants } from '@/components/ui/Reveal'
import { barbers } from '@/data/barbers'
import { BarberCard } from './BarberCard'
import { motion } from 'motion/react'

export function TeamSection() {
  return (
    <SectionContainer id="equipo">
      <Reveal>
        <p className="text-sm tracking-[0.3em] text-gold-400 uppercase">Equipo</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide text-white md:text-5xl">
          Manos con oficio
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {barbers.map((barber) => (
          <motion.div key={barber.id} variants={revealItemVariants}>
            <BarberCard barber={barber} />
          </motion.div>
        ))}
      </RevealGroup>
    </SectionContainer>
  )
}
