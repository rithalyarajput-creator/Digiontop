import { sql } from './_lib/db.js';
import { setCors, requireAuth } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { featured } = req.query;
      let rows;
      if (featured === '1') {
        rows = await sql`
          SELECT * FROM portfolio_items
          WHERE is_featured = true
          ORDER BY created_at DESC
        `;
      } else {
        rows = await sql`
          SELECT * FROM portfolio_items
          ORDER BY created_at DESC
        `;
      }
      return res.status(200).json(rows);
    }

    const auth = requireAuth(req, res);
    if (!auth) return;

    if (req.method === 'POST') {
      const { title, category, description, image_url, client_name, results, is_featured } = req.body || {};
      if (!title) {
        return res.status(400).json({ error: 'title is required' });
      }
      const rows = await sql`
        INSERT INTO portfolio_items
          (title, category, description, image_url, client_name, results, is_featured)
        VALUES
          (${title}, ${category || null}, ${description || null}, ${image_url || null},
           ${client_name || null}, ${results || null}, ${is_featured ?? false})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, title, category, description, image_url, client_name, results, is_featured } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE portfolio_items SET
          title = COALESCE(${title ?? null}, title),
          category = COALESCE(${category ?? null}, category),
          description = COALESCE(${description ?? null}, description),
          image_url = COALESCE(${image_url ?? null}, image_url),
          client_name = COALESCE(${client_name ?? null}, client_name),
          results = COALESCE(${results ?? null}, results),
          is_featured = COALESCE(${is_featured ?? null}, is_featured)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Portfolio item not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
