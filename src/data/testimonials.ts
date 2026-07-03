export interface Testimonial {
  id: string
  author: string
  quote: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Nicolás D.',
    quote: 'El mejor corte que me hice en años. La atención y el ambiente son otro nivel.',
    rating: 5,
  },
  {
    id: 't2',
    author: 'Rodrigo M.',
    quote: 'Reservar el turno fue rapidísimo y llegué sin esperar nada. Volví a las dos semanas.',
    rating: 5,
  },
  {
    id: 't3',
    author: 'Bruno S.',
    quote: 'El afeitado a navaja es una experiencia. Se nota el detalle en cada paso.',
    rating: 5,
  },
]
