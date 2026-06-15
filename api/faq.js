import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT * FROM faqs
        ORDER BY sort_order ASC, created_at ASC
      `;
      return res.status(200).json(rows);
    }

    try {
      verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { question, answer, category, sort_order, is_active } = req.body || {};
      if (!question) {
        return res.status(400).json({ error: 'question is required' });
      }
      const rows = await sql`
        INSERT INTO faqs (question, answer, category, sort_order, is_active)
        VALUES (
          ${question},
          ${answer || null},
          ${category || 'General'},
          ${sort_order ?? 0},
          ${is_active ?? true}
        )
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, question, answer, category, sort_order, is_active } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE faqs SET
          question    = COALESCE(${question ?? null}, question),
          answer      = COALESCE(${answer ?? null}, answer),
          category    = COALESCE(${category ?? null}, category),
          sort_order  = COALESCE(${sort_order ?? null}, sort_order),
          is_active   = COALESCE(${is_active ?? null}, is_active)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM faqs WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
