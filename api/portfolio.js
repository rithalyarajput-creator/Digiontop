import { sql } from '@vercel/postgres';
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
        ({ rows } = await sql`
          SELECT * FROM portfolio
          WHERE featured = true
          ORDER BY created_at DESC
        `);
      } else {
        ({ rows } = await sql`
          SELECT * FROM portfolio
          ORDER BY created_at DESC
        `);
      }
      return res.status(200).json(rows);
    }

    // Mutations require auth.
    const auth = requireAuth(req, res);
    if (!auth) return;

    if (req.method === 'POST') {
      const { title, category, description, image_url, project_url, client, featured } = req.body || {};
      if (!title) {
        return res.status(400).json({ error: 'title is required' });
      }
      const { rows } = await sql`
        INSERT INTO portfolio
          (title, category, description, image_url, project_url, client, featured)
        VALUES
          (${title}, ${category || null}, ${description || null}, ${image_url || null},
           ${project_url || null}, ${client || null}, ${featured ?? false})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, title, category, description, image_url, project_url, client, featured } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const { rows } = await sql`
        UPDATE portfolio SET
          title = COALESCE(${title ?? null}, title),
          category = COALESCE(${category ?? null}, category),
          description = COALESCE(${description ?? null}, description),
          image_url = COALESCE(${image_url ?? null}, image_url),
          project_url = COALESCE(${project_url ?? null}, project_url),
          client = COALESCE(${client ?? null}, client),
          featured = COALESCE(${featured ?? null}, featured)
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
      await sql`DELETE FROM portfolio WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
