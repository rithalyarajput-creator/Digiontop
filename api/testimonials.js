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
          SELECT * FROM testimonials
          WHERE is_featured = true
          ORDER BY created_at DESC
        `;
      } else {
        rows = await sql`
          SELECT * FROM testimonials
          ORDER BY created_at DESC
        `;
      }
      return res.status(200).json(rows);
    }

    const auth = requireAuth(req, res);
    if (!auth) return;

    if (req.method === 'POST') {
      const { client_name, client_role, client_location, testimonial_text, rating, is_featured, avatar_url, reviewed_at } = req.body || {};
      if (!client_name || !testimonial_text) {
        return res.status(400).json({ error: 'client_name and testimonial_text are required' });
      }
      const rows = await sql`
        INSERT INTO testimonials
          (client_name, client_role, client_location, testimonial_text, rating, is_featured, avatar_url, reviewed_at)
        VALUES
          (${client_name}, ${client_role || null}, ${client_location || null}, ${testimonial_text},
           ${rating ?? 5}, ${is_featured ?? false}, ${avatar_url || null}, ${reviewed_at || null})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, client_name, client_role, client_location, testimonial_text, rating, is_featured, avatar_url, reviewed_at } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE testimonials SET
          client_name = COALESCE(${client_name ?? null}, client_name),
          client_role = COALESCE(${client_role ?? null}, client_role),
          client_location = COALESCE(${client_location ?? null}, client_location),
          testimonial_text = COALESCE(${testimonial_text ?? null}, testimonial_text),
          rating = COALESCE(${rating ?? null}, rating),
          is_featured = COALESCE(${is_featured ?? null}, is_featured),
          avatar_url = COALESCE(${avatar_url ?? null}, avatar_url),
          reviewed_at = COALESCE(${reviewed_at ?? null}, reviewed_at)
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
