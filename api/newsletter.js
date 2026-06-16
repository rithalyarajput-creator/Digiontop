import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ── Public subscribe ──
    if (req.method === 'POST') {
      const { email, source } = req.body || {};
      if (!email || !EMAIL_RE.test(email)) {
        return res.status(400).json({ error: 'A valid email is required.' });
      }
      await sql`
        INSERT INTO newsletter_subscribers (email, source)
        VALUES (${email.toLowerCase().trim()}, ${source || 'website'})
        ON CONFLICT (email) DO NOTHING
      `;
      return res.status(200).json({ success: true, message: 'Subscribed successfully!' });
    }

    // ── Admin-only below ──
    try {
      verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM newsletter_subscribers ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    if (req.method === 'DELETE') {
      const { id, ids } = req.query;
      if (ids) {
        // Bulk delete: comma-separated id list
        const idList = String(ids).split(',').map((x) => parseInt(x, 10)).filter(Boolean);
        if (idList.length) {
          await sql`DELETE FROM newsletter_subscribers WHERE id = ANY(${idList})`;
        }
        return res.status(200).json({ success: true, deleted: idList.length });
      }
      if (!id) {
        return res.status(400).json({ error: 'id or ids query parameter is required' });
      }
      await sql`DELETE FROM newsletter_subscribers WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
