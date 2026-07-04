export interface Barber {
  id: string
  name: string
  role: string
  bio: string
  initials: string
}

export const barbers: Barber[] = [
  {
    id: 'lucas',
    name: 'Lucas Ferreyra',
    role: 'Fundador · Master barber',
    bio: '15 años de oficio, especialista en cortes clásicos y afeitado a navaja.',
    initials: 'LF',
  },
  {
    id: 'martina',
    name: 'Martina Sosa',
    role: 'Colorista',
    bio: 'Especialista en color, mechas y tratamientos capilares.',
    initials: 'MS',
  },
  {
    id: 'nico',
    name: 'Nicolás Paz',
    role: 'Barber stylist',
    bio: 'Cortes modernos, degradados y diseño de barba.',
    initials: 'NP',
  },
]
