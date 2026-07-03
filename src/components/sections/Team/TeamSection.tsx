import { SectionContainer } from '@/components/layout/SectionContainer'
import { BarberCard } from '@/components/sections/Team/BarberCard'
import { barbers } from '@/data/barbers'

export function TeamSection() {
  return (
    <SectionContainer id="equipo" eyebrow="El equipo" title="Manos expertas" className="bg-ink-soft/40">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {barbers.map((barber) => (
          <BarberCard key={barber.id} barber={barber} />
        ))}
      </div>
    </SectionContainer>
  )
}
