// Compone los glow-*.png sobre fondo negro para inspección visual + stats de alpha.
import fs from 'node:fs'
import { PNG } from 'pngjs'

const repo = 'c:/Users/Usuario/OneDrive/Documents/GitHub/web-peluqueria'

const names = ['19', '20', '21', '22', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM']

for (const name of names) {
  const img = PNG.sync.read(fs.readFileSync(`${repo}/public/glow-${name}.png`))
  const { width: w, height: h, data } = img
  const out = new PNG({ width: w, height: h })
  let sum = 0
  for (let i = 0; i < w * h; i++) {
    const a = data[i * 4 + 3]
    sum += a
    const oo = i * 4
    out.data[oo] = a
    out.data[oo + 1] = a
    out.data[oo + 2] = a
    out.data[oo + 3] = 255
  }
  fs.writeFileSync(`${repo}/scripts/debug-glow-${name}.png`, PNG.sync.write(out))
  console.log(`glow-${name}: alpha medio ${(sum / (w * h)).toFixed(1)}/255`)
}
