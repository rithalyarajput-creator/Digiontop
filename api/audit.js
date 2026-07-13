import { sql } from './_lib/db.js';
import { setCors } from './_lib/auth.js';

/**
 * Free SEO audit — a lead magnet.
 *
 * A visitor submits their website URL plus their name/email; we fetch the page,
 * run a set of basic on-page checks, save them as a lead, and return the report.
 * The email is required precisely because capturing the lead is the point.
 *
 * Deliberately simple: it fetches ONE page's HTML and inspects it. No crawling,
 * no third-party APIs, no rate-limited quotas to manage.
 */

const TIMEOUT_MS = 12000;
const MAX_BYTES = 2_000_000; // don't try to parse a huge page

/** Normalise whatever the user typed into a URL we can fetch. */
function normaliseUrl(input) {
  let raw = String(input || '').trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const u = new URL(raw);
    // Only ever fetch public web pages.
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    // Refuse private/loopback hosts — this endpoint must not be usable to probe
    // internal services from our server (SSRF).
    const h = u.hostname.toLowerCase();
    if (
      h === 'localhost' || h === '::1' || h.endsWith('.local') || h.endsWith('.internal') ||
      /^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(h) || /^169\.254\./.test(h) || /^0\./.test(h)
    ) return null;
    if (!h.includes('.')) return null; // needs a real TLD
    return u;
  } catch {
    return null;
  }
}

function textOf(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

/** Run the on-page checks. Each returns pass/warn/fail plus a plain-English note. */
function audit(html, url, headers) {
  const checks = [];
  const add = (label, status, detail, fix) => checks.push({ label, status, detail, fix });

  // Title
  const title = textOf(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!title) {
    add('Page title', 'fail', 'No title tag found.', 'Add a unique <title> — this is what Google shows in search results.');
  } else if (title.length > 60) {
    add('Page title', 'warn', `${title.length} characters — Google truncates around 60.`, 'Shorten it so the whole title shows in search results.');
  } else if (title.length < 20) {
    add('Page title', 'warn', `Only ${title.length} characters — too short to describe the page.`, 'Expand it to 40–60 characters with your main keyword.');
  } else {
    add('Page title', 'pass', `${title.length} characters — good length.`, '');
  }

  // Meta description
  const desc = textOf(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
               textOf(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  if (!desc) {
    add('Meta description', 'fail', 'Missing.', 'Add a 150–160 character description. It is your ad copy in search results.');
  } else if (desc.length > 160) {
    add('Meta description', 'warn', `${desc.length} characters — will be cut off.`, 'Trim to under 160 characters.');
  } else if (desc.length < 70) {
    add('Meta description', 'warn', `Only ${desc.length} characters — wasting space.`, 'Expand to 150–160 characters.');
  } else {
    add('Meta description', 'pass', `${desc.length} characters — good length.`, '');
  }

  // H1
  const h1s = html.match(/<h1[\s>]/gi) || [];
  if (h1s.length === 0) {
    add('H1 heading', 'fail', 'No H1 on the page.', 'Add exactly one H1 stating what the page is about.');
  } else if (h1s.length > 1) {
    add('H1 heading', 'warn', `${h1s.length} H1 tags — should be one.`, 'Keep a single H1; make the rest H2/H3.');
  } else {
    add('H1 heading', 'pass', 'Exactly one H1.', '');
  }

  // Images without alt
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\balt\s*=/i.test(t));
  if (imgs.length === 0) {
    add('Image alt text', 'warn', 'No images found on the page.', '');
  } else if (noAlt.length) {
    add('Image alt text', 'fail', `${noAlt.length} of ${imgs.length} images have no alt text.`, 'Describe each image in its alt attribute — Google reads it, and screen readers need it.');
  } else {
    add('Image alt text', 'pass', `All ${imgs.length} images have alt text.`, '');
  }

  // HTTPS
  if (url.protocol === 'https:') {
    add('HTTPS', 'pass', 'Site is served over HTTPS.', '');
  } else {
    add('HTTPS', 'fail', 'Site is served over plain HTTP.', 'Install an SSL certificate. Google ranks HTTP sites lower and browsers mark them "Not secure".');
  }

  // Mobile viewport
  if (/<meta[^>]+name=["']viewport["']/i.test(html)) {
    add('Mobile friendly', 'pass', 'Viewport tag present.', '');
  } else {
    add('Mobile friendly', 'fail', 'No viewport meta tag — the site will not scale on phones.', 'Add <meta name="viewport" content="width=device-width, initial-scale=1">. Most of your traffic is mobile.');
  }

  // Canonical
  if (/<link[^>]+rel=["']canonical["']/i.test(html)) {
    add('Canonical URL', 'pass', 'Canonical tag present.', '');
  } else {
    add('Canonical URL', 'warn', 'No canonical tag.', 'Add one so Google knows which URL is the real version of the page.');
  }

  // Open Graph (link previews)
  if (/property=["']og:title["']/i.test(html)) {
    add('Social preview', 'pass', 'Open Graph tags present.', '');
  } else {
    add('Social preview', 'warn', 'No Open Graph tags.', 'Add og:title, og:description and og:image so links look right when shared on WhatsApp and LinkedIn.');
  }

  // Structured data
  if (/application\/ld\+json/i.test(html)) {
    add('Structured data', 'pass', 'Schema markup found.', '');
  } else {
    add('Structured data', 'warn', 'No schema markup.', 'Add JSON-LD schema so Google can show rich results (stars, FAQs, breadcrumbs).');
  }

  // Page weight
  const kb = Math.round(html.length / 1024);
  if (kb > 200) {
    add('Page size', 'warn', `HTML alone is ${kb} KB.`, 'Trim unused markup and inline styles — heavy pages lose mobile visitors.');
  } else {
    add('Page size', 'pass', `HTML is ${kb} KB.`, '');
  }

  // Content depth
  const words = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2).length;
  if (words < 300) {
    add('Content depth', 'fail', `About ${words} words — thin for ranking.`, 'Aim for 600+ words of genuinely useful content on key pages.');
  } else if (words < 600) {
    add('Content depth', 'warn', `About ${words} words.`, 'Pages with 600+ words tend to rank better for competitive terms.');
  } else {
    add('Content depth', 'pass', `About ${words} words.`, '');
  }

  const score = Math.round(
    (checks.filter((c) => c.status === 'pass').length +
      checks.filter((c) => c.status === 'warn').length * 0.5) /
      checks.length * 100
  );

  return { score, checks, title, description: desc };
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, name, email, phone } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Please enter your name and email to see the report.' });
  }
  const target = normaliseUrl(url);
  if (!target) {
    return res.status(400).json({ error: 'Please enter a valid public website address, e.g. example.com' });
  }

  // Fetch the page.
  let html;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const resp = await fetch(target.href, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        // Identify honestly; some hosts block unknown clients outright.
        'User-Agent': 'DigionTop-SEO-Audit/1.0 (+https://www.digiontop.com)',
        Accept: 'text/html',
      },
    });
    clearTimeout(timer);

    if (!resp.ok) {
      return res.status(400).json({ error: `That site returned ${resp.status}. Check the address and try again.` });
    }
    const type = resp.headers.get('content-type') || '';
    if (!type.includes('html')) {
      return res.status(400).json({ error: 'That address does not return a web page.' });
    }
    html = (await resp.text()).slice(0, MAX_BYTES);
  } catch (err) {
    const msg = err.name === 'AbortError'
      ? 'That site took too long to respond — it may be down or very slow.'
      : 'Could not reach that site. Check the address and try again.';
    return res.status(400).json({ error: msg });
  }

  const report = audit(html, target, {});

  // Save the visitor as a lead. Do this AFTER the audit succeeds, so a failed
  // fetch doesn't create a junk lead — but never let a database hiccup deny the
  // visitor the report they just waited for.
  try {
    await sql`
      INSERT INTO contact_leads
        (full_name, email, phone, service_interested, message, source)
      VALUES
        (${name}, ${email}, ${phone || null}, 'Free SEO Audit',
         ${`Requested a free SEO audit for ${target.href} — scored ${report.score}/100.`},
         'seo-audit')
    `;
  } catch (err) {
    console.error('SEO audit lead could not be saved:', err);
  }

  return res.status(200).json({ url: target.href, ...report });
}
