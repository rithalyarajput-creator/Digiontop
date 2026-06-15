import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Set CORS headers on the response (allow all origins).
 */
export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Read the Bearer token from the request and verify it.
 * Returns the decoded payload, or throws on missing/invalid token.
 */
export function verifyToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    throw new Error('Missing or malformed Authorization header');
  }
  const token = parts[1];
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Verify auth for a protected endpoint.
 * Returns the decoded payload on success.
 * On failure sends a 401 response and returns null.
 */
export function requireAuth(req, res) {
  try {
    return verifyToken(req);
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
}
