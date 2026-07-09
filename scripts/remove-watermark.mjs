// Elimina la marca de agua (estrella) clonando pasto de una zona vecina
// con blend elíptico feathered para que no se note la costura.
// Uso: node remove-watermark.mjs <imagen> <cx> <cy> <rx> <ry> <offsetX> <offsetY>
import fs from 'node:fs'
import { PNG } from 'pngjs'

const [, , file, cxA, cyA, rxA, ryA, oxA, oyA] = process.argv
const cx = Number(cxA), cy = Number(cyA)
const rx = Number(rxA), ry = Number(ryA)
const ox = Number(oxA), oy = Number(oyA)

const img = PNG.sync.read(fs.readFileSync(file))
const { width: W, height: H, data } = img

const smoothstep = (x) => x * x * (3 - 2 * x)

for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
  for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry)
    if (d >= 1) continue
    // 1 en el centro, 0 en el borde de la elipse (feather en el 25% exterior)
    const t = smoothstep(Math.min(1, (1 - d) / 0.25))
    const sx = x + ox, sy = y + oy
    if (sx < 0 || sy < 0 || sx >= W || sy >= H) continue
    const o = (y * W + x) * 4
    const s = (sy * W + sx) * 4
    for (let c = 0; c < 3; c++) data[o + c] = Math.round(data[s + c] * t + data[o + c] * (1 - t))
  }
}

fs.writeFileSync(file, PNG.sync.write(img))
console.log(`listo: parche en (${cx},${cy}) rx=${rx} ry=${ry} desde offset (${ox},${oy})`)
