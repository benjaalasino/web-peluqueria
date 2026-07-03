import { MapPin, Phone, Clock } from 'lucide-react'
import { SectionContainer } from '@/components/layout/SectionContainer'
import { Button } from '@/components/ui/Button'
import { useViewStore } from '@/store/viewStore'

const DETAILS = [
  { icon: MapPin, label: 'Av. Siempre Viva 742, Buenos Aires' },
  { icon: Clock, label: 'Martes a sábado · 9:00 a 19:00' },
  { icon: Phone, label: '+54 9 11 5555-5555' },
]

export function ContactSection() {
  const startTransition = useViewStore((state) => state.startTransition)

  return (
    <SectionContainer id="contacto" eyebrow="Visitanos" title="¿Nos hacemos un lugar?">
      <div className="flex flex-col items-center gap-8">
        <ul className="flex flex-col gap-4 font-body text-bone-dim md:flex-row md:gap-10">
          {DETAILS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-gold" />
              {label}
            </li>
          ))}
        </ul>
        <Button onClick={startTransition}>Reservar mi turno</Button>
      </div>
    </SectionContainer>
  )
}
