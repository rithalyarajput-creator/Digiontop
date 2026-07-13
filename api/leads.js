import { sql } from './_lib/db.js';
import { setCors, requireAuth } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const auth = requireAuth(req, res);
  if (!auth) return;

  try {
    if (req.method === 'GET') {
      const { status } = req.query;
      let rows;
      if (status) {
        rows = await sql`
          SELECT * FROM contact_leads
          WHERE status = ${status}
          ORDER BY created_at DESC
        `;
      } else {
        rows = await sql`
          SELECT * FROM contact_leads
          ORDER BY created_at DESC
        `;
      }
      return res.status(200).json(rows);
    }

    if (req.method === 'PUT') {
      const { id, status, notes, follow_up_at } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      if (status === undefined && notes === undefined && follow_up_at === undefined) {
        return res.status(400).json({ error: 'nothing to update' });
      }
      // Only write the fields the caller actually sent, so saving a note can't
      // wipe the status (and vice versa).
      //
      // A plain COALESCE(new, old) isn't enough for follow_up_at: clearing a
      // reminder means sending null, which COALESCE would read as "leave it
      // alone". So pass an explicit per-field flag and let SQL choose.
      const setStatus = status !== undefined;
      const setNotes = notes !== undefined;
      const setFollowUp = follow_up_at !== undefined;

      const rows = await sql`
        UPDATE contact_leads SET
          status       = CASE WHEN ${setStatus}   THEN ${status ?? null}       ELSE status       END,
          notes        = CASE WHEN ${setNotes}    THEN ${notes ?? null}        ELSE notes        END,
          follow_up_at = CASE WHEN ${setFollowUp} THEN ${follow_up_at || null} ELSE follow_up_at END
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM contact_leads WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
