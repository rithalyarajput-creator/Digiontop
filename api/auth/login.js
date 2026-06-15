import { sql } from '../_lib/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { setCors } from '../_lib/auth.js';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const rows = await sql`
      SELECT id, username, password
      FROM admin_users
      WHERE username = ${username}
      LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: user.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
