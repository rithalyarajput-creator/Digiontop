// One-time image compressor for /public/images/work
// Resizes huge full-page screenshots down to a sane width and re-compresses
// them IN PLACE (same filename + extension) so no code references break.
// Run:  node scripts/compress-images.mjs

import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/images/work')
const MAX_WIDTH = 1100          // plenty for a card preview
const JPEG_QUALITY = 74
const PNG_QUALITY = 80

const files = await readdir(DIR)
for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

  const full = path.join(DIR, file)
  const before = (await stat(full)).size
  if (before < 300 * 1024) {
    console.log(`skip  ${file} (${Math.round(before / 1024)}KB)`)
    continue
  }

  const tmp = path.join(DIR, file + '.__tmp')
  let pipe = sharp(full).resize({ width: MAX_WIDTH, withoutEnlargement: true })

  if (ext === '.png') {
    // keep PNG extension but compress hard (palette + effort)
    pipe = pipe.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true, effort: 8 })
  } else {
    pipe = pipe.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  }

  await pipe.toFile(tmp)
  await unlink(full)
  await rename(tmp, full)

  const after = (await stat(full)).size
  console.log(`done  ${file}  ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
}
console.log('All images processed.')
