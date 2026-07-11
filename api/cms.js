import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugify(text) {
  return String(text).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function isAuthed(req) {
  try { verifyToken(req); return true; } catch { return false; }
}

/* ─────────── CATEGORIES ─────────── */
async function categories(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`
      SELECT c.*, (SELECT COUNT(*)::int FROM blog_posts b WHERE b.category = c.name) AS blog_count
      FROM categories c ORDER BY c.name ASC`;
    return res.status(200).json(rows);
  }
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, slug, description, image_url, is_active } = req.body || {};
    if (!name || !name.trim()) return res.status(400).json({ error: 'name is required' });
    const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(name);
    const rows = await sql`
      INSERT INTO categories (name, slug, description, image_url, is_active)
      VALUES (${name.trim()}, ${finalSlug}, ${description || null}, ${image_url || null}, ${is_active ?? true})
      ON CONFLICT (name) DO NOTHING RETURNING *`;
    if (rows.length === 0) return res.status(409).json({ error: 'Category already exists' });
    return res.status(201).json({ ...rows[0], blog_count: 0 });
  }
  if (req.method === 'PUT') {
    const { id, name, slug, description, image_url, is_active } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    const rows = await sql`
      UPDATE categories SET
        name = COALESCE(${name ?? null}, name),
        slug = COALESCE(${slug ? slugify(slug) : (name ? slugify(name) : null)}, slug),
        description = COALESCE(${description ?? null}, description),
        image_url = COALESCE(${image_url ?? null}, image_url),
        is_active = COALESCE(${is_active ?? null}, is_active)
      WHERE id = ${id} RETURNING *`;
    if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    const count = await sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE category = ${rows[0].name}`;
    return res.status(200).json({ ...rows[0], blog_count: count[0].n });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id query parameter is required' });
    await sql`DELETE FROM categories WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

/* ─────────── AUTHORS ─────────── */
async function authors(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`
      SELECT a.*, (SELECT COUNT(*)::int FROM blog_posts b WHERE b.author = a.name) AS blog_count
      FROM authors a ORDER BY a.name ASC`;
    return res.status(200).json(rows);
  }
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    const { name, email, bio, avatar_url, social_links, is_active } = req.body || {};
    if (!name || !name.trim()) return res.status(400).json({ error: 'name is required' });
    const rows = await sql`
      INSERT INTO authors (name, email, bio, avatar_url, social_links, is_active)
      VALUES (${name.trim()}, ${email || null}, ${bio || null}, ${avatar_url || null}, ${social_links || null}, ${is_active ?? true})
      RETURNING *`;
    return res.status(201).json({ ...rows[0], blog_count: 0 });
  }
  if (req.method === 'PUT') {
    const { id, name, email, bio, avatar_url, social_links, is_active } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });
    const rows = await sql`
      UPDATE authors SET
        name = COALESCE(${name ?? null}, name),
        email = COALESCE(${email ?? null}, email),
        bio = COALESCE(${bio ?? null}, bio),
        avatar_url = COALESCE(${avatar_url ?? null}, avatar_url),
        social_links = COALESCE(${social_links ?? null}, social_links),
        is_active = COALESCE(${is_active ?? null}, is_active)
      WHERE id = ${id} RETURNING *`;
    if (rows.length === 0) return res.status(404).json({ error: 'Author not found' });
    const count = await sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE author = ${rows[0].name}`;
    return res.status(200).json({ ...rows[0], blog_count: count[0].n });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id query parameter is required' });
    await sql`DELETE FROM authors WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

/* ─────────── NEWSLETTER ─────────── */
async function newsletter(req, res) {
  if (req.method === 'POST') {
    const { email, source } = req.body || {};
    if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'A valid email is required.' });
    await sql`
      INSERT INTO newsletter_subscribers (email, source)
      VALUES (${email.toLowerCase().trim()}, ${source || 'website'})
      ON CONFLICT (email) DO NOTHING`;
    return res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  }
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM newsletter_subscribers ORDER BY created_at DESC`;
    return res.status(200).json(rows);
  }
  if (req.method === 'DELETE') {
    const { id, ids } = req.query;
    if (ids) {
      const idList = String(ids).split(',').map((x) => parseInt(x, 10)).filter(Boolean);
      if (idList.length) await sql`DELETE FROM newsletter_subscribers WHERE id = ANY(${idList})`;
      return res.status(200).json({ success: true, deleted: idList.length });
    }
    if (!id) return res.status(400).json({ error: 'id or ids query parameter is required' });
    await sql`DELETE FROM newsletter_subscribers WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

/* ─────────── MEDIA (uploaded images, stored in Postgres) ─────────── */
async function media(req, res) {
  // GET ?resource=media&id=N — serve the stored image (public)
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    const rows = await sql`SELECT mime, data FROM media WHERE id = ${id} LIMIT 1`;
    const m = rows[0];
    if (!m) return res.status(404).json({ error: 'Not found' });
    const buf = Buffer.from(m.data, 'base64');
    res.setHeader('Content-Type', m.mime || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(buf);
  }
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  // POST — upload an image (admin only)
  if (req.method === 'POST') {
    const { filename, mime, data } = req.body || {};
    if (!data || !mime || !String(mime).startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid image payload' });
    }
    if (data.length > 3.5 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image too large' });
    }
    await sql`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255),
        mime VARCHAR(100),
        data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`;
    const rows = await sql`
      INSERT INTO media (filename, mime, data)
      VALUES (${filename || 'upload'}, ${mime}, ${data})
      RETURNING id`;
    return res.status(201).json({ id: rows[0].id, url: `/api/cms?resource=media&id=${rows[0].id}` });
  }
  // DELETE ?resource=media&id=N — remove an image (admin only)
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    await sql`DELETE FROM media WHERE id = ${id}`;
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const resource = req.query.resource;
  try {
    if (resource === 'authors') return await authors(req, res);
    if (resource === 'newsletter') return await newsletter(req, res);
    if (resource === 'categories') return await categories(req, res);
    if (resource === 'media') return await media(req, res);
    return res.status(400).json({ error: 'Unknown resource' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
