import { sql } from './_lib/db.js';
import { setCors, requireAuth } from './_lib/auth.js';

// Allow image payloads up to ~4 MB (client resizes before upload, so real size is far smaller)
export const config = { api: { bodyParser: { sizeLimit: '4mb' } } };

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS media (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255),
      mime VARCHAR(100),
      data TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ── GET /api/media?id=N — serve the stored image (public) ──
    if (req.method === 'GET') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'id required' });
      const rows = await sql`SELECT mime, data FROM media WHERE id = ${id} LIMIT 1`;
      const m = rows[0];
      if (!m) return res.status(404).json({ error: 'Not found' });
      const buf = Buffer.from(m.data, 'base64');
      res.setHeader('Content-Type', m.mime || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.status(200).send(buf);
    }

    // ── POST /api/media — upload an image (admin only) ──
    if (req.method === 'POST') {
      const user = requireAuth(req, res);
      if (!user) return;
      const { filename, mime, data } = req.body || {};
      if (!data || !mime || !String(mime).startsWith('image/')) {
        return res.status(400).json({ error: 'Invalid image payload' });
      }
      if (data.length > 3.5 * 1024 * 1024) {
        return res.status(413).json({ error: 'Image too large (max ~2.5 MB after compression)' });
      }
      await ensureTable();
      const rows = await sql`
        INSERT INTO media (filename, mime, data)
        VALUES (${filename || 'upload'}, ${mime}, ${data})
        RETURNING id
      `;
      return res.status(201).json({ id: rows[0].id, url: `/api/media?id=${rows[0].id}` });
    }

    // ── DELETE /api/media?id=N — remove an image (admin only) ──
    if (req.method === 'DELETE') {
      const user = requireAuth(req, res);
      if (!user) return;
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'id required' });
      await sql`DELETE FROM media WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
