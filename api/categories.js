import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM categories ORDER BY name ASC`;
      return res.status(200).json(rows);
    }

    try {
      verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { name } = req.body || {};
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'name is required' });
      }
      const slug = slugify(name);
      const rows = await sql`
        INSERT INTO categories (name, slug)
        VALUES (${name.trim()}, ${slug})
        ON CONFLICT (name) DO NOTHING
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(409).json({ error: 'Category already exists' });
      }
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, name } = req.body || {};
      if (!id || !name) {
        return res.status(400).json({ error: 'id and name are required' });
      }
      const rows = await sql`
        UPDATE categories SET name = ${name.trim()}, slug = ${slugify(name)}
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM categories WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
