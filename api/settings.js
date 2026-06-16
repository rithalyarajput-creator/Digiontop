import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

const DEFAULTS = {
  site_name: 'DigionTop',
  tagline: 'Digital Marketing Agency',
  description: 'We help brands rank higher, grow faster and generate more revenue with result driven digital marketing strategies.',
  contact_email: 'digiontop.agency@gmail.com',
  contact_phone: '+91 9217594664',
  contact_phone2: '+91 7303769921',
  logo_header: '/images/logo-header.png',
  logo_footer: '/images/logo-footer.png',
  favicon: '/vite.svg',
  social_facebook: 'https://www.facebook.com/share/14eaPvHNx9A/',
  social_instagram: 'https://www.instagram.com/digiontop.agency',
  social_linkedin: '',
  social_twitter: '',
  social_youtube: 'https://www.youtube.com/@digiontop',
  seo_meta_title: 'DigionTop — #1 Digital Marketing Agency in India',
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
    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM site_settings WHERE id = 1`;
      const data = rows[0]?.data || {};
      return res.status(200).json({ ...DEFAULTS, ...data });
    }

    let auth;
    try {
      auth = verifyToken(req);
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
    return res.status(500).json({ error: 'Internal server error', detail: String(err?.message || err) });
  }
}
