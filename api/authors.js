import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Include blog count per author (matched by author name)
      const rows = await sql`
        SELECT a.*,
          (SELECT COUNT(*)::int FROM blog_posts b WHERE b.author = a.name) AS blog_count
        FROM authors a
        ORDER BY a.name ASC
      `;
      return res.status(200).json(rows);
    }

    try {
      verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { name, email, bio, avatar_url, social_links, is_active } = req.body || {};
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'name is required' });
      }
      const rows = await sql`
        INSERT INTO authors (name, email, bio, avatar_url, social_links, is_active)
        VALUES (${name.trim()}, ${email || null}, ${bio || null}, ${avatar_url || null},
                ${social_links || null}, ${is_active ?? true})
        RETURNING *
      `;
      return res.status(201).json({ ...rows[0], blog_count: 0 });
    }

    if (req.method === 'PUT') {
      const { id, name, email, bio, avatar_url, social_links, is_active } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE authors SET
          name         = COALESCE(${name ?? null}, name),
          email        = COALESCE(${email ?? null}, email),
          bio          = COALESCE(${bio ?? null}, bio),
          avatar_url   = COALESCE(${avatar_url ?? null}, avatar_url),
          social_links = COALESCE(${social_links ?? null}, social_links),
          is_active    = COALESCE(${is_active ?? null}, is_active)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Author not found' });
      }
      const count = await sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE author = ${rows[0].name}`;
      return res.status(200).json({ ...rows[0], blog_count: count[0].n });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM authors WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', detail: String(err?.message || err) });
  }
}
