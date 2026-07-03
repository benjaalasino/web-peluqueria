import { SectionContainer } from '@/components/layout/SectionContainer'
import { ServiceCard } from '@/components/sections/Services/ServiceCard'
import { services } from '@/data/services'

export function ServicesSection() {
  return (
    <SectionContainer id="servicios" eyebrow="Nuestros servicios" title="Precisión en cada corte">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  )
}
