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
    description: 'Corte a tijera y máquina, terminación con navaja en contorno.',
    durationMin: 30,
    priceARS: 8500,
  },
  {
    id: 'corte-barba',
    name: 'Corte + barba',
    description: 'Corte completo más perfilado de barba con toalla caliente.',
    durationMin: 45,
    priceARS: 12500,
  },
  {
    id: 'afeitado-navaja',
    name: 'Afeitado a navaja',
    description: 'Afeitado tradicional con navaja, toalla caliente y aceites.',
    durationMin: 30,
    priceARS: 9000,
  },
  {
    id: 'color',
    name: 'Color y mechas',
    description: 'Aplicación de color o mechas con asesoramiento personalizado.',
    durationMin: 60,
    priceARS: 18000,
  },
]
