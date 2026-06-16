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
      const rows = await sql`
        SELECT c.*,
          (SELECT COUNT(*)::int FROM blog_posts b WHERE b.category = c.name) AS blog_count
        FROM categories c
        ORDER BY c.name ASC
      `;
      return res.status(200).json(rows);
    }

    try {
      verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { name, slug, description, image_url, is_active } = req.body || {};
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'name is required' });
      }
      const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(name);
      const rows = await sql`
        INSERT INTO categories (name, slug, description, image_url, is_active)
        VALUES (${name.trim()}, ${finalSlug}, ${description || null}, ${image_url || null}, ${is_active ?? true})
        ON CONFLICT (name) DO NOTHING
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(409).json({ error: 'Category already exists' });
      }
      return res.status(201).json({ ...rows[0], blog_count: 0 });
    }

    if (req.method === 'PUT') {
      const { id, name, slug, description, image_url, is_active } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE categories SET
          name        = COALESCE(${name ?? null}, name),
          slug        = COALESCE(${slug ? slugify(slug) : (name ? slugify(name) : null)}, slug),
          description = COALESCE(${description ?? null}, description),
          image_url   = COALESCE(${image_url ?? null}, image_url),
          is_active   = COALESCE(${is_active ?? null}, is_active)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      const count = await sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE category = ${rows[0].name}`;
      return res.status(200).json({ ...rows[0], blog_count: count[0].n });
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
    return res.status(500).json({ error: 'Internal server error', detail: String(err?.message || err) });
  }
}
