export interface Barber {
  id: string
  name: string
  role: string
  bio: string
}

export const barbers: Barber[] = [
  {
    id: 'lucas',
    name: 'Lucas Ferreyra',
    role: 'Fundador · Barbero senior',
    bio: 'Más de 12 años de oficio, especialista en cortes clásicos y afeitado a navaja.',
  },
  {
    id: 'martina',
    name: 'Martina Sosa',
    role: 'Colorista',
    bio: 'Referente en color, mechas y disimulo de canas.',
  },
  {
    id: 'facundo',
    name: 'Facundo Ríos',
    role: 'Barbero',
    bio: 'Especialista en fades y diseños de líneas.',
  },
  {
    id: 'agustina',
    name: 'Agustina Paz',
    role: 'Estilista',
    bio: 'Cortes modernos y asesoramiento de imagen personalizado.',
  },
]
