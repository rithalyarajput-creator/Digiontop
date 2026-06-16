import { sql } from './_lib/db.js';

export default async function handler(req, res) {
  let robotsTxt = '';
  try {
    const rows = await sql`SELECT data FROM site_settings WHERE id = 1`;
    robotsTxt = rows[0]?.data?.robots_txt || '';
  } catch {}

  if (!robotsTxt.trim()) {
    const host = req.headers.host || 'digiontop.com';
    const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
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
