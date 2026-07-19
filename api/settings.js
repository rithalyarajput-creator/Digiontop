import { sql } from './_lib/db.js';
import { setCors, verifyToken, hasPermission, requireSuper } from './_lib/auth.js';

/**
 * Full-site backup: every table dumped to one JSON file, images included as
 * the base64 already stored in `media`. Owner-only — this is the entire
 * business's data in one download.
 */
async function fullBackup(req, res) {
  const user = requireSuper(req, res);
  if (!user) return;

  const [
    blog_posts, categories, authors, contact_leads, testimonials,
    portfolio_items, faqs, newsletter_subscribers, site_settings, media,
  ] = await Promise.all([
    sql`SELECT * FROM blog_posts ORDER BY id`,
    sql`SELECT * FROM categories ORDER BY id`,
    sql`SELECT * FROM authors ORDER BY id`,
    sql`SELECT * FROM contact_leads ORDER BY id`,
    sql`SELECT * FROM testimonials ORDER BY id`,
    sql`SELECT * FROM portfolio_items ORDER BY id`,
    sql`SELECT * FROM faqs ORDER BY id`,
    sql`SELECT * FROM newsletter_subscribers ORDER BY id`,
    sql`SELECT * FROM site_settings ORDER BY id`,
    sql`SELECT * FROM media ORDER BY id`,
  ]);

  const backup = {
    exported_at: new Date().toISOString(),
    site: 'digiontop.com',
    tables: {
      blog_posts, categories, authors, contact_leads, testimonials,
      portfolio_items, faqs, newsletter_subscribers, site_settings, media,
    },
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="digiontop-full-backup-${new Date().toISOString().slice(0, 10)}.json"`
  );
  return res.status(200).send(JSON.stringify(backup));
}

const DEFAULTS = {
  site_name: 'DigionTop',
  tagline: 'Digital Marketing Agency',
  description: 'We help brands rank higher, grow faster and generate more revenue with result driven digital marketing strategies.',
  contact_email: 'digiontop.agency@gmail.com',
  contact_phone: '+91 9217594664',
  contact_phone2: '+91 7303769921',
  logo_header: '/images/logo-header.webp',
  logo_footer: '/images/logo-footer.webp',
  favicon: '/favicon.png',
  social_facebook: 'https://www.facebook.com/share/14eaPvHNx9A/',
  social_instagram: 'https://www.instagram.com/digiontop.agency',
  social_linkedin: 'https://www.linkedin.com/company/digiontop/',
  social_twitter: 'https://x.com/digiontopagency',
  social_youtube: 'https://www.youtube.com/@digiontop',
  seo_meta_title: 'DigionTop: #1 Digital Marketing Agency in India',
  seo_meta_description: 'Result-driven SEO, social media, web development & e-commerce marketing for businesses across India.',
  seo_og_image: '',
  seo_twitter_handle: '',
};

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET' && req.query.action === 'full-backup') {
      return await fullBackup(req, res);
    }

    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM site_settings WHERE id = 1`;
      const data = rows[0]?.data || {};
      return res.status(200).json({ ...DEFAULTS, ...data });
    }

    // GET above stays public — the live website reads site settings on every
    // page load. The PUT below requires the 'settings' section.
    let auth;
    try {
      auth = verifyToken(req);
      if (!hasPermission(req, 'settings')) {
        return res.status(403).json({ error: 'You do not have access to this section.' });
      }
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'PUT') {
      const incoming = req.body || {};
      // Merge with existing
      const rows = await sql`SELECT data FROM site_settings WHERE id = 1`;
      const current = rows[0]?.data || {};
      const merged = { ...current, ...incoming };

      await sql`
        INSERT INTO site_settings (id, data, updated_at)
        VALUES (1, ${JSON.stringify(merged)}::jsonb, NOW())
        ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(merged)}::jsonb, updated_at = NOW()
      `;

      try {
        await sql`INSERT INTO activity_log (action, detail, actor) VALUES ('settings.update', ${Object.keys(incoming).join(', ')}, ${auth?.username || 'admin'})`;
      } catch {}

      return res.status(200).json({ ...DEFAULTS, ...merged });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
