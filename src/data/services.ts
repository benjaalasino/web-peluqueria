export interface Service {
  id: string
  name: string
  description: string
  durationMin: number
  priceARS: number
}

export const services: Service[] = [
  {
    id: 'corte-clasico',
    name: 'Corte clásico',
    description: 'Corte a tijera y máquina, lavado y peinado incluido.',
    durationMin: 30,
    priceARS: 8500,
  },
  {
    id: 'corte-barba',
    name: 'Corte + barba',
    description: 'Corte completo más perfilado y afeitado de barba con navaja.',
    durationMin: 50,
    priceARS: 13500,
  },
  {
    id: 'afeitado-navaja',
    name: 'Afeitado a navaja',
    description: 'Afeitado tradicional con toalla caliente y navaja de filo.',
    durationMin: 30,
    priceARS: 9000,
  },
  {
    id: 'color',
    name: 'Color y canas',
    description: 'Coloración profesional, disimulo de canas o color de fantasía.',
    durationMin: 60,
    priceARS: 18000,
  },
  {
    id: 'diseno',
    name: 'Diseño de cejas y líneas',
    description: 'Perfilado de cejas y diseño de líneas a navaja.',
    durationMin: 20,
    priceARS: 5000,
  },
  {
    id: 'infantil',
    name: 'Corte infantil',
    description: 'Corte para niños hasta 12 años, ambiente relajado.',
    durationMin: 30,
    priceARS: 7000,
  },
]
