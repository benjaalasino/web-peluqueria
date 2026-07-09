// Recorta los márgenes transparentes de un PNG (bounding box de alpha > 8).
// Uso: node trim-ball.mjs <entrada> <salida>
import fs from 'node:fs'
import { PNG } from 'pngjs'

const [, , inFile, outFile] = process.argv
const src = PNG.sync.read(fs.readFileSync(inFile))
const { width: W, height: H, data } = src

let minX = W, minY = H, maxX = -1, maxY = -1
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (data[(y * W + x) * 4 + 3] > 8) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

const w = maxX - minX + 1
const h = maxY - minY + 1
const out = new PNG({ width: w, height: h })
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const o = ((minY + y) * W + (minX + x)) * 4
    const oo = (y * w + x) * 4
    for (let c = 0; c < 4; c++) out.data[oo + c] = data[o + c]
  }
}
fs.writeFileSync(outFile, PNG.sync.write(out))
console.log(`${outFile}: bbox (${minX},${minY})-(${maxX},${maxY}) → ${w}x${h}`)
