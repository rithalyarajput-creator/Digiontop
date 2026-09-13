import { sql } from './_lib/db.js';

/**
 * Every crawlable page on the site. This used to list only 13 routes, which
 * quietly excluded ~54 service pages from the sitemap. Keep it in sync when
 * routes are added to frontend/src/App.jsx.
 */
const STATIC_ROUTES = [
  '', 'about', 'why-us', 'industries', 'portfolio', 'work', 'blog', 'contact',
  'faq', 'testimonials', 'privacy-policy', 'terms-of-service',
  // Web development
  'services/website-development', 'services/custom-website',
  'services/business-website', 'services/wordpress-development',
  'services/shopify-development', 'services/custom-web-application',
  'services/woocommerce-development', 'services/website-redesign',
  'services/landing-page-design',
  // SEO
  'services/seo-services', 'services/local-seo', 'services/technical-seo',
  'services/ecommerce-seo', 'services/enterprise-seo', 'services/seo-audit',
  'services/link-building',
  // Paid ads
  'services/ppc', 'services/google-ads', 'services/meta-ads',
  'services/social-advertising', 'services/linkedin-ads', 'services/youtube-ads',
  // Social & content
  'services/social-media-marketing', 'services/social/social-media-marketing',
  'services/social/content-marketing', 'services/social/email-marketing',
  'services/social/social-media-management', 'services/social/influencer-marketing',
  'services/social/seo-content-writing', 'services/social/copywriting',
  // Mobile & software
  'services/mobile-software', 'services/mobile/mobile-app', 'services/mobile/ios',
  'services/mobile/android', 'services/mobile/flutter', 'services/mobile/cloud',
  'services/mobile/api', 'services/mobile/saas', 'services/mobile/devops',
  // E-commerce
  'services/ecommerce-solutions', 'services/ecom/amazon', 'services/ecom/flipkart',
  'services/ecom/meesho', 'services/ecom/product-seo', 'services/ecom/product-image',
  'services/ecom/catalog-management', 'services/ecom/account-management',
  'services/ecom/growth-consulting',
  // Creative & branding
  'services/creative-branding', 'services/branding-identity', 'services/ui-ux-design',
  'services/video-production', 'services/digital-strategy', 'services/analytics-insights',
  'services/logo-design', 'services/graphic-design', 'services/cro-services',
];

async function robots(req, res) {
  let robotsTxt = '';
  try {
    const rows = await sql`SELECT data FROM site_settings WHERE id = 1`;
    robotsTxt = rows[0]?.data?.robots_txt || '';
  } catch {}

  const host = req.headers.host || 'digiontop.com';
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];

  if (!robotsTxt.trim()) {
    robotsTxt = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /api',
      '',
      `Sitemap: ${proto}://${host}/sitemap.xml`,
      '',
    ].join('\n');
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(200).send(robotsTxt);
}

async function sitemap(req, res) {
  const host = req.headers.host || 'digiontop.com';
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const base = `${proto}://${host}`;

  let posts = [];
  try {
    posts = await sql`
      SELECT slug, updated_at FROM blog_posts
      WHERE status = 'published' AND slug IS NOT NULL
      ORDER BY updated_at DESC
    `;
  } catch {}

  // Each client website has its own case-study page.
  let studies = [];
  try {
    studies = await sql`
      SELECT slug FROM portfolio_items
      WHERE slug IS NOT NULL AND slug <> ''
      ORDER BY created_at DESC
    `;
  } catch {}

  const urls = [];
  for (const route of STATIC_ROUTES) {
    urls.push(`  <url>\n    <loc>${base}/${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.7'}</priority>\n  </url>`);
  }
  for (const p of posts) {
    const lastmod = p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : '';
    urls.push(`  <url>\n    <loc>${base}/blog/${p.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
  }

  for (const s of studies) {
    urls.push(`  <url>\n    <loc>${base}/case-study/${s.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(200).send(xml);
}

/** Escape text for safe use inside XML elements. */
function xmlEscape(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Blog RSS feed — lets Pinterest (and any other reader) auto-publish new posts. */
async function rss(req, res) {
  const host = req.headers.host || 'digiontop.com';
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const base = `${proto}://${host}`;

  let posts = [];
  try {
    posts = await sql`
      SELECT title, slug, excerpt, image_url, created_at FROM blog_posts
      WHERE status = 'published' AND slug IS NOT NULL
      ORDER BY created_at DESC
      LIMIT 50
    `;
  } catch {}

  const items = posts.map((p) => {
    const link = `${base}/blog/${p.slug}`;
    const image = p.image_url
      ? (p.image_url.startsWith('http') ? p.image_url : `${base}${p.image_url}`)
      : '';
    // CDATA so the excerpt/img markup doesn't need manual entity-escaping,
    // and RSS readers that expect HTML in <description> (Pinterest included)
    // can find the <img> tag directly.
    const description = `${(p.excerpt || '').replace(/]]>/g, ']]&gt;')}${image ? ` <img src="${image.replace(/"/g, '&quot;')}">` : ''}`;
    const pubDate = p.created_at ? new Date(p.created_at).toUTCString() : new Date().toUTCString();
    return [
      '  <item>',
      `    <title>${xmlEscape(p.title)}</title>`,
      `    <link>${link}</link>`,
      `    <guid isPermaLink="true">${link}</guid>`,
      `    <pubDate>${pubDate}</pubDate>`,
      `    <description><![CDATA[${description}]]></description>`,
      image ? `    <enclosure url="${xmlEscape(image)}" type="image/webp" />` : '',
    ].filter(Boolean).join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `  <title>${xmlEscape('DigionTop Blog')}</title>`,
    `  <link>${base}/blog</link>`,
    `  <description>${xmlEscape('Digital marketing, SEO and web insights from DigionTop.')}</description>`,
    items.join('\n'),
    '</channel>',
    '</rss>',
  ].join('\n');

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=1800');
  return res.status(200).send(xml);
}

export default async function handler(req, res) {
  const type = req.query.type;
  if (type === 'sitemap') return sitemap(req, res);
  if (type === 'rss') return rss(req, res);
  return robots(req, res);
}
