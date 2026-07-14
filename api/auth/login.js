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
      SELECT id, username, password, full_name, is_super, permissions, is_active
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

    // A revoked account must not be able to log back in.
    if (user.is_active === false) {
      return res.status(403).json({ error: 'This account has been disabled.' });
    }

    // Which admin sections this user may open. The owner gets everything; a team
    // member gets exactly what was ticked for them. This rides in the signed
    // token, so the client can't grant itself sections it wasn't given.
    const isSuper = user.is_super === true;
    const perms = isSuper
      ? ['*']
      : String(user.permissions || '').split(',').map((s) => s.trim()).filter(Boolean);

    const token = jwt.sign(
      {
        uid: user.id,
        username: user.username,
        name: user.full_name || user.username,
        super: isSuper,
        perms,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      token,
      user: { username: user.username, name: user.full_name || user.username, super: isSuper, perms },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
