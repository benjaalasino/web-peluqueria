// Extrae los textos pintados en el césped como overlays blancos con alpha.
// Métrica: canal mínimo RGB — el pasto es verde saturado (min≈0-12) y la
// pintura es desaturada (min≈20-70), así el umbral fijo aísla el glifo
// sin que lo afecte el gradiente de iluminación.
// Luego se suprime el ruido (rocío brillante) exigiendo densidad local:
// los trazos pintados son gruesos, los puntitos quedan aislados.
import fs from 'node:fs'
import { PNG } from 'pngjs'

const repo = 'c:/Users/Usuario/OneDrive/Documents/GitHub/web-peluqueria'

// Mismas fracciones que HOUR_SPOTS / DAY_SPOTS en App.jsx
const groups = [
  {
    src: 'pausa-2-opciones.png',
    spots: [
      { name: '19', l: 0.03,  t: 0.6,   w: 0.18, h: 0.21 },
      { name: '20', l: 0.28,  t: 0.625, w: 0.2,  h: 0.195 },
      { name: '21', l: 0.53,  t: 0.615, w: 0.17, h: 0.215 },
      { name: '22', l: 0.765, t: 0.63,  w: 0.2,  h: 0.2 },
    ],
  },
  {
    src: 'pausa-2-dias.png',
    spots: [
      { name: 'LUN', l: 0.055, t: 0.565, w: 0.125, h: 0.13 },
      { name: 'MAR', l: 0.185, t: 0.57,  w: 0.135, h: 0.135 },
      { name: 'MIE', l: 0.33,  t: 0.575, w: 0.12,  h: 0.14 },
      { name: 'JUE', l: 0.45,  t: 0.58,  w: 0.108, h: 0.14 },
      { name: 'VIE', l: 0.585, t: 0.585, w: 0.11,  h: 0.14 },
      { name: 'SAB', l: 0.7,   t: 0.59,  w: 0.115, h: 0.14 },
      { name: 'DOM', l: 0.82,  t: 0.6,   w: 0.15,  h: 0.14 },
    ],
  },
]

const LO = 14 // por debajo: pasto puro → alpha 0
const HI = 38 // por encima: pintura → alpha 1
const R = 4   // radio de la ventana de densidad (9x9)

const smoothstep = (x) => x * x * (3 - 2 * x)
const clamp01 = (x) => Math.min(1, Math.max(0, x))

for (const group of groups) {
  const src = PNG.sync.read(fs.readFileSync(`${repo}/public/${group.src}`))
  const { width: W, height: H, data } = src

  for (const s of group.spots) {
    const x0 = Math.round(s.l * W)
    const y0 = Math.round(s.t * H)
    const w = Math.round(s.w * W)
    const h = Math.round(s.h * H)

    // 1) alpha crudo por umbral de canal mínimo
    const alpha = new Float64Array(w * h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const o = ((y0 + y) * W + (x0 + x)) * 4
        const minCh = Math.min(data[o], data[o + 1], data[o + 2])
        alpha[y * w + x] = smoothstep(clamp01((minCh - LO) / (HI - LO)))
      }
    }

    // 2) tabla de sumas para densidad local rápida
    const sat = new Float64Array((w + 1) * (h + 1))
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++)
        sat[(y + 1) * (w + 1) + (x + 1)] =
          alpha[y * w + x] + sat[y * (w + 1) + (x + 1)] + sat[(y + 1) * (w + 1) + x] - sat[y * (w + 1) + x]

    const density = (x, y) => {
      const x1 = Math.max(0, x - R), y1 = Math.max(0, y - R)
      const x2 = Math.min(w - 1, x + R), y2 = Math.min(h - 1, y + R)
      const sum = sat[(y2 + 1) * (w + 1) + (x2 + 1)] - sat[y1 * (w + 1) + (x2 + 1)] - sat[(y2 + 1) * (w + 1) + x1] + sat[y1 * (w + 1) + x1]
      return sum / ((x2 - x1 + 1) * (y2 - y1 + 1))
    }

    // 3) alpha final = crudo × factor de densidad (mata puntitos aislados)
    const out = new PNG({ width: w, height: h })
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const keep = smoothstep(clamp01((density(x, y) - 0.15) / 0.25))
        const oo = (y * w + x) * 4
        out.data[oo] = 255
        out.data[oo + 1] = 255
        out.data[oo + 2] = 255
        out.data[oo + 3] = Math.round(alpha[y * w + x] * keep * 255)
      }
    }
    fs.writeFileSync(`${repo}/public/glow-${s.name}.png`, PNG.sync.write(out))
    console.log(`glow-${s.name}.png ${w}x${h}`)
  }
}
