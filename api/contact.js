import { sql } from '@vercel/postgres';
import { setCors } from './_lib/auth.js';

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

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
