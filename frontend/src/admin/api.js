const TOKEN_KEY = 'digiontop_admin_token';
const USER_KEY = 'digiontop_admin_user';

/* The admin sections a team account can be granted. User management is
   deliberately NOT in this list — it is owner-only and never grantable. */
export const SECTIONS = [
  { key: 'blog', label: 'Blog Posts', hint: 'Blog posts, authors and categories' },
  { key: 'leads', label: 'Leads', hint: 'Contact / enquiry form submissions' },
  { key: 'reviews', label: 'Reviews', hint: 'Customer testimonials shown on the site' },
  { key: 'faq', label: 'FAQs', hint: 'Frequently asked questions' },
  { key: 'newsletter', label: 'Newsletter', hint: 'Newsletter subscriber list' },
  { key: 'analytics', label: 'Analytics', hint: 'Website visitor and traffic reports' },
  { key: 'settings', label: 'Settings', hint: 'Site-wide settings' },
];

export const SECTION_LABELS = SECTIONS.reduce((acc, s) => {
  acc[s.key] = s.label;
  return acc;
}, {});

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/* Decode the JWT payload without verifying it. Only ever used as a *fallback*
   for a token that predates the /auth/login response carrying a `user` object —
   never as a source of authority. The server checks every permission itself. */
function decodeToken(token) {
  try {
    const part = String(token).split('.')[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function normalise(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const perms = Array.isArray(raw.perms) ? raw.perms : [];
  const isSuper = raw.super === true;
  if (!raw.username && !raw.name && !isSuper && perms.length === 0) return null;
  return {
    username: raw.username || '',
    name: raw.name || raw.username || '',
    super: isSuper,
    perms,
  };
}

export function setUser(user) {
  const u = normalise(user);
  if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
  else localStorage.removeItem(USER_KEY);
}

/**
 * The logged-in user, or null. Never throws — a stale/corrupt localStorage
 * entry (e.g. a token stored before team accounts existed) falls back to the
 * JWT payload, and failing that returns null so the caller can force re-login
 * instead of white-screening the panel.
 */
export function getUser() {
  let stored = null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) stored = normalise(JSON.parse(raw));
  } catch {
    stored = null;
  }
  if (stored) return stored;

  // Fallback: rebuild from the token we already hold.
  const token = getToken();
  if (!token) return null;
  const payload = decodeToken(token);
  const fromToken = normalise(payload);
  if (fromToken) {
    try { localStorage.setItem(USER_KEY, JSON.stringify(fromToken)); } catch { /* ignore */ }
    return fromToken;
  }
  return null;
}

/** Does the current user hold this admin section? Owner holds everything. */
export function can(section) {
  const user = getUser();
  if (!user) return false;
  if (user.super) return true;
  return Array.isArray(user.perms) && user.perms.includes(section);
}

/** Owner-only areas (user management). */
export function isOwner() {
  const user = getUser();
  return !!(user && user.super);
}

/**
 * @param {string} [vaultToken] the short-lived document-vault token. Held in
 *   React state only — never read from storage, and never persisted here.
 */
function authHeaders(vaultToken) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (vaultToken) headers['X-Vault-Token'] = vaultToken;
  return headers;
}

async function handle(res) {
  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!res.ok) {
    // 401 + { locked: true } → the *document vault* is locked or its short-lived
    //   token expired. The admin session itself is perfectly valid, so this must
    //   NOT clear the token or bounce to login. The Documents page catches
    //   err.locked and drops back to its passphrase screen.
    // 401 → the admin session is gone. Clear it and bounce to login.
    // 403 → the session is fine, the user simply lacks this section. Surface
    //       the server's message; do NOT log them out.
    const vaultLocked = res.status === 401 && !!(data && data.locked);

    if (vaultLocked) {
      const err = new Error(
        (data && data.error) || 'Vault locked. Enter the passphrase again.'
      );
      err.status = 401;
      err.locked = true;
      throw err;
    }

    if (res.status === 401) {
      clearToken();
      if (typeof window !== 'undefined' && !window.location.pathname.endsWith('/admin')) {
        window.location.href = '/admin';
      } else if (typeof window !== 'undefined') {
        // already on login route — force a reload so the login screen shows
        window.location.reload();
      }
    }
    const serverMessage =
      (data && data.error) ||
      (data && data.message) ||
      (typeof data === 'string' && data) ||
      '';

    const message =
      res.status === 401 ? 'Your session expired. Please log in again.'
      : res.status === 403 ? (serverMessage || "You don't have access to this section.")
      : serverMessage || `Request failed (${res.status})`;

    const err = new Error(message);
    err.status = res.status;
    err.forbidden = res.status === 403;
    throw err;
  }
  return data;
}

/* Each verb takes an optional trailing `vaultToken`. Only the Documents page
   passes one; every other call site is unaffected. */

export async function apiGet(path, vaultToken) {
  const res = await fetch(`/api${path}`, { method: 'GET', headers: authHeaders(vaultToken) });
  return handle(res);
}

export async function apiPost(path, body, vaultToken) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: authHeaders(vaultToken),
    body: JSON.stringify(body || {}),
  });
  return handle(res);
}

export async function apiPut(path, body, vaultToken) {
  const res = await fetch(`/api${path}`, {
    method: 'PUT',
    headers: authHeaders(vaultToken),
    body: JSON.stringify(body || {}),
  });
  return handle(res);
}

export async function apiDelete(path, vaultToken) {
  const res = await fetch(`/api${path}`, { method: 'DELETE', headers: authHeaders(vaultToken) });
  return handle(res);
}
