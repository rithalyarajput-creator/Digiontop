import { sql } from './_lib/db.js';
import { setCors } from './_lib/auth.js';

/* Escape user-supplied text before dropping it into the notification HTML. */
function esc(v) {
  return String(v ?? '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Email the new lead to the agency inbox via Resend.
 *
 * Best-effort: the lead is already saved to the database by the time this runs,
 * so a mail failure must never fail the visitor's form submission.
 */
async function sendLeadEmail(lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO;
  if (!key || !to) return; // not configured — silently skip

  const rows = [
    ['Name', lead.fullName],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Business', lead.businessName],
    ['Service', lead.service],
    ['Budget', lead.budget],
    ['Source', lead.source],
  ]
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:8px 14px;color:#616161;font-size:13px;white-space:nowrap;">${esc(label)}</td>
           <td style="padding:8px 14px;color:#1a1a1a;font-size:13px;font-weight:600;">${esc(value)}</td>
         </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#1a1a1a;padding:18px 22px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;color:#f5a800;font-size:17px;">New enquiry — DigionTop</h1>
      </div>
      <div style="border:1px solid #e3e3e3;border-top:none;border-radius:0 0 12px 12px;padding:6px 8px 18px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        <div style="padding:14px;margin:6px 14px 0;background:#f6f6f7;border-radius:8px;">
          <p style="margin:0 0 6px;color:#616161;font-size:12px;">Message</p>
          <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(lead.message)}</p>
        </div>
      </div>
    </div>`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Resend's shared sender — works without verifying a domain.
        from: process.env.LEADS_EMAIL_FROM || 'DigionTop <onboarding@resend.dev>',
        to: [to],
        reply_to: lead.email,
        subject: `New lead: ${lead.fullName}${lead.service ? ` — ${lead.service}` : ''}`,
        html,
      }),
    });
    if (!resp.ok) {
      console.error('Resend rejected the lead email:', resp.status, await resp.text());
    }
  } catch (err) {
    console.error('Lead email failed to send:', err);
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      businessName,
      email,
      phone,
      service,
      budget,
      message,
      source,
    } = req.body || {};

    if (!fullName || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, email and message are required.',
      });
    }

    await sql`
      INSERT INTO contact_leads
        (full_name, business_name, email, phone, service_interested, budget_range, message, source)
      VALUES
        (${fullName}, ${businessName || null}, ${email}, ${phone || null},
         ${service || null}, ${budget || null}, ${message}, ${source || null})
    `;

    // Notify the agency inbox. Awaited so the serverless function isn't frozen
    // mid-request, but its own errors are swallowed — the lead is already saved,
    // so a mail outage must not show the visitor an error.
    await sendLeadEmail({ fullName, businessName, email, phone, service, budget, message, source });

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
