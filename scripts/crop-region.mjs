// Recorta una región de una imagen para inspección (fracciones de la imagen).
// Uso: node crop-region.mjs <imagen> <l> <t> <w> <h> <salida>
import fs from 'node:fs'
import { PNG } from 'pngjs'

const [, , file, lf, tf, wf, hf, outFile] = process.argv
const src = PNG.sync.read(fs.readFileSync(file))
const { width: W, height: H, data } = src

const x0 = Math.round(Number(lf) * W)
const y0 = Math.round(Number(tf) * H)
const w = Math.round(Number(wf) * W)
const h = Math.round(Number(hf) * H)

const out = new PNG({ width: w, height: h })
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const o = ((y0 + y) * W + (x0 + x)) * 4
    const oo = (y * w + x) * 4
    for (let c = 0; c < 4; c++) out.data[oo + c] = data[o + c]
  }
}
fs.writeFileSync(outFile, PNG.sync.write(out))
console.log(`${outFile} ${w}x${h} desde (${x0},${y0}) de ${W}x${H}`)
