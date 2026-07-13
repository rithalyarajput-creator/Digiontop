/**
 * Prerender every static route to real HTML.
 *
 * The site is a client-rendered SPA, so a crawler's first fetch of any URL
 * returns the same empty `<div id="root">` — no title, no description, no
 * headings, no content. Google can execute the JS to see the page, but that
 * happens on a deferred second pass and is applied inconsistently. Social
 * scrapers (WhatsApp, LinkedIn, X) don't execute JS at all, so link previews
 * are blank.
 *
 * This runs after `vite build`, serves `dist/` locally, visits each route in a
 * headless browser, and writes the fully-rendered HTML back to
 * `dist/<route>/index.html`. React then hydrates over that markup at runtime,
 * so behaviour in the browser is unchanged.
 *
 * Dynamic routes (/blog/:slug) are intentionally skipped: their content lives
 * in the database, so they are crawled the ordinary way.
 */
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.xml': 'application/xml',
}

/** Static routes from App.jsx, so this can't drift out of sync with the router. */
function staticRoutes() {
  const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf-8')
  const found = [...app.matchAll(/path="(\/[^"]*)"/g)].map((m) => m[1])
  return [...new Set(found)].filter((r) => !r.includes(':') && !r.includes('*'))
}

/** Serve dist/ with SPA fallback, mirroring how Vercel serves the site. */
function serve(port) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    let file = path.join(dist, url)
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const asIndex = path.join(file, 'index.html')
      file = fs.existsSync(asIndex) ? asIndex : path.join(dist, 'index.html')
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => server.listen(port, () => resolve(server)))
}

const routes = staticRoutes()
const PORT = 5111
const server = await serve(PORT)
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

console.log(`\nPrerendering ${routes.length} routes…`)
let ok = 0
const failed = []

for (const route of routes) {
  const page = await browser.newPage()
  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })
    // The app dispatches this once React has painted (see main.jsx). If the
    // page already fired it before we attached, the race is harmless — the
    // networkidle0 wait above means the DOM is settled either way.
    await page.waitForSelector('#root > *', { timeout: 15000 })

    const html = await page.content()

    // Refuse to write a shell. Silently shipping an empty page would be worse
    // than not prerendering it at all, since it looks like it worked.
    if (!/<h1[\s>]/i.test(html)) {
      failed.push(`${route} (no <h1> — rendered empty?)`)
      continue
    }

    const dir = route === '/' ? dist : path.join(dist, route)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
    ok++
  } catch (err) {
    failed.push(`${route} (${err.message.split('\n')[0]})`)
  } finally {
    await page.close()
  }
}

await browser.close()
server.close()

console.log(`Prerendered ${ok}/${routes.length} routes.`)
if (failed.length) {
  console.error(`\n${failed.length} route(s) failed:`)
  failed.forEach((f) => console.error(`  ✗ ${f}`))
  // Fail the build: shipping the SPA shell for these routes is the exact
  // problem this script exists to fix, so it must not pass silently.
  process.exit(1)
}
