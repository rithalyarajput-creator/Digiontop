// Generate favicon + apple-touch-icon from the source logo icon.
// Run:  node scripts/make-favicon.mjs

import sharp from 'sharp'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

const SRC = path.resolve('public/favicon-source.png')
const OUT = path.resolve('public')

// Standard favicon (browser tab) — 64px is crisp on hi-dpi tabs
await sharp(SRC).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png().toFile(path.join(OUT, 'favicon.png'))

// Larger 192 for PWA / Android
await sharp(SRC).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png().toFile(path.join(OUT, 'favicon-192.png'))

// Apple touch icon (180, on white so it looks good on iOS home screen)
await sharp(SRC).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png().toFile(path.join(OUT, 'apple-touch-icon.png'))

await unlink(SRC).catch(() => {})
console.log('Favicon files created: favicon.png, favicon-192.png, apple-touch-icon.png')
