const TOKEN_KEY = 'digiontop_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
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
    // Session expired or invalid token → clear it and bounce to login
    if (res.status === 401) {
      clearToken();
      if (typeof window !== 'undefined' && !window.location.pathname.endsWith('/admin')) {
        window.location.href = '/admin';
      } else if (typeof window !== 'undefined') {
        // already on login route — force a reload so the login screen shows
        window.location.reload();
      }
    }
    const message =
      res.status === 401 ? 'Your session expired. Please log in again.'
      : (data && data.error) ||
      (data && data.message) ||
      (typeof data === 'string' && data) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(`/api${path}`, { method: 'GET', headers: authHeaders() });
  return handle(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`/api${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body || {}),
  });
  return handle(res);
}

export async function apiPut(path, body) {
  const res = await fetch(`/api${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body || {}),
  });
  return handle(res);
}

export async function apiDelete(path) {
  const res = await fetch(`/api${path}`, { method: 'DELETE', headers: authHeaders() });
  return handle(res);
}
