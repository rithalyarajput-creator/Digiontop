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
          SELECT * FROM testimonials
          WHERE featured = true
          ORDER BY created_at DESC
        `);
      } else {
        ({ rows } = await sql`
          SELECT * FROM testimonials
          ORDER BY created_at DESC
        `);
      }
      return res.status(200).json(rows);
    }

    // Mutations require auth.
    const auth = requireAuth(req, res);
    if (!auth) return;

    if (req.method === 'POST') {
      const { name, role, company, content, rating, image_url, featured } = req.body || {};
      if (!name || !content) {
        return res.status(400).json({ error: 'name and content are required' });
      }
      const { rows } = await sql`
        INSERT INTO testimonials
          (name, role, company, content, rating, image_url, featured)
        VALUES
          (${name}, ${role || null}, ${company || null}, ${content},
           ${rating ?? null}, ${image_url || null}, ${featured ?? false})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, name, role, company, content, rating, image_url, featured } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const { rows } = await sql`
        UPDATE testimonials SET
          name = COALESCE(${name ?? null}, name),
          role = COALESCE(${role ?? null}, role),
          company = COALESCE(${company ?? null}, company),
          content = COALESCE(${content ?? null}, content),
          rating = COALESCE(${rating ?? null}, rating),
          image_url = COALESCE(${image_url ?? null}, image_url),
          featured = COALESCE(${featured ?? null}, featured)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM testimonials WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
