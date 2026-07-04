export interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Julián R.',
    quote: 'El mejor corte que me hice en años. La atención al detalle se nota desde que entrás.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Bruno M.',
    quote: 'El afeitado a navaja es una experiencia aparte. Volví tres veces en un mes.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Ezequiel D.',
    quote: 'Reservar el turno online fue rapidísimo y llegaron los recordatorios a tiempo.',
    rating: 5,
  },
]
