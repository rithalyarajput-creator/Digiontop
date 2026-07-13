import { sql } from './_lib/db.js';

/**
 * Every crawlable page on the site. This used to list only 13 routes, which
 * quietly excluded ~54 service pages from the sitemap. Keep it in sync when
 * routes are added to frontend/src/App.jsx.
 */
const STATIC_ROUTES = [
  '', 'about', 'why-us', 'industries', 'portfolio', 'work', 'blog', 'contact',
  'faq', 'testimonials',
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

  const urls = [];
  for (const route of STATIC_ROUTES) {
    urls.push(`  <url>\n    <loc>${base}/${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.7'}</priority>\n  </url>`);
  }
  for (const p of posts) {
    const lastmod = p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : '';
    urls.push(`  <url>\n    <loc>${base}/blog/${p.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(200).send(xml);
}

export default async function handler(req, res) {
  const type = req.query.type;
  if (type === 'sitemap') return sitemap(req, res);
  return robots(req, res);
}
