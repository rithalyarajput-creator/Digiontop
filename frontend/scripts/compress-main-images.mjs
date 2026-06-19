// Compress larger images in /public/images (service icons, hero, rocket).
// Keeps transparency (no palette quantization that could harm alpha edges).
// Run:  node scripts/compress-main-images.mjs

import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('public/images')
const MAX_WIDTH = 900
const PNG_QUALITY = 82

const files = await readdir(DIR)
for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue

  const full = path.join(DIR, file)
  let s
  try { s = await stat(full) } catch { continue }
  if (!s.isFile()) continue
  const before = s.size
  if (before < 350 * 1024) { console.log(`skip  ${file}`); continue }

  const tmp = path.join(DIR, file + '.__tmp')
  let pipe = sharp(full).resize({ width: MAX_WIDTH, withoutEnlargement: true })
  if (ext === '.png') pipe = pipe.png({ quality: PNG_QUALITY, compressionLevel: 9, effort: 8 })
  else pipe = pipe.jpeg({ quality: 76, mozjpeg: true })

  await pipe.toFile(tmp)
  await unlink(full)
  await rename(tmp, full)
  const after = (await stat(full)).size
  console.log(`done  ${file}  ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
}
console.log('Done.')
