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

/**
 * Verify auth AND that the caller holds a given section permission.
 *
 * Hiding a menu in the UI is not access control — a team member could still
 * call the endpoint directly. Every endpoint a restricted user must not reach
 * has to check here, server-side.
 *
 * Sections: 'blog' | 'leads' | 'reviews' | 'faq' | 'newsletter' | 'settings' | 'users'
 * The owner (super) implicitly holds every section.
 */
export function requirePermission(req, res, section) {
  const user = requireAuth(req, res);
  if (!user) return null;

  if (user.super === true) return user;

  const perms = Array.isArray(user.perms) ? user.perms : [];
  if (perms.includes(section)) return user;

  res.status(403).json({ error: 'You do not have access to this section.' });
  return null;
}

/**
 * Throwing variant of requirePermission, for handlers already written around
 * `try { verifyToken(req) } catch { 401 }`. Throws on a bad token; returns
 * false when the token is valid but lacks the section.
 */
export function hasPermission(req, section) {
  const user = verifyToken(req); // throws if missing/invalid — caller sends 401
  if (user.super === true) return true;
  const perms = Array.isArray(user.perms) ? user.perms : [];
  return perms.includes(section);
}

/** Only the owner may manage team accounts. */
export function requireSuper(req, res) {
  const user = requireAuth(req, res);
  if (!user) return null;
  if (user.super !== true) {
    res.status(403).json({ error: 'Only the owner can manage users.' });
    return null;
  }
  return user;
}
