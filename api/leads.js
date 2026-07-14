import { sql } from './_lib/db.js';
import { setCors, requirePermission } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hiding the Leads menu isn't access control — a restricted user could still
  // call this endpoint directly. Enforce the section server-side.
  const auth = requirePermission(req, res, 'leads');
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
      // Read-then-merge rather than a conditional UPDATE: Postgres can't infer
      // a type for `CASE WHEN $1 THEN $2` when $2 may be NULL, and a plain
      // COALESCE(new, old) can't express "clear this field" — sending null to
      // drop a follow-up date would read as "leave it alone".
      const current = await sql`SELECT * FROM contact_leads WHERE id = ${id}`;
      if (current.length === 0) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      const row = current[0];

      const nextStatus = status === undefined ? row.status : status;
      const nextNotes = notes === undefined ? row.notes : (notes || null);
      const rawFollowUp = follow_up_at === undefined ? row.follow_up_at : follow_up_at;
      // follow_up_at is a DATE. The row may hand it back as a Date object and the
      // client sends "YYYY-MM-DD"; normalise both to a plain date string (or null),
      // so the driver never has to guess a type for a bare NULL parameter.
      const nextFollowUp = rawFollowUp
        ? new Date(rawFollowUp).toISOString().slice(0, 10)
        : null;

      const rows = await sql`
        UPDATE contact_leads
        SET status = ${nextStatus}::varchar,
            notes = ${nextNotes}::text,
            follow_up_at = ${nextFollowUp}::date
        WHERE id = ${id}
        RETURNING *
      `;
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
    // Log the real cause — swallowing it into a bare 500 left "notes won't save"
    // undiagnosable from the client.
    console.error(`/api/leads ${req.method} failed:`, err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
