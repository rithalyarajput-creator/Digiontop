import bcrypt from 'bcryptjs';
import { sql } from './_lib/db.js';
import { setCors, requireSuper, requirePermission } from './_lib/auth.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugify(text) {
  return String(text).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Gate an admin-only branch on a section permission.
 * Sends 401 (no/bad token) or 403 (valid token, wrong section) itself and
 * returns false — the caller just bails out.
 *
 * Hiding a menu item in the admin UI is not access control: a restricted team
 * member still holds a valid token and can call these endpoints directly, so
 * every admin-only branch below has to be checked here, server-side.
 */
function allow(req, res, section) {
  return requirePermission(req, res, section) !== null;
}

/* ─────────── CATEGORIES ─────────── */
async function categories(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`
      SELECT c.*, (SELECT COUNT(*)::int FROM blog_posts b WHERE b.category = c.name) AS blog_count
      FROM categories c ORDER BY c.name ASC`;
    return res.status(200).json(rows);
  }
  // GET above is public. Categories are blog-adjacent → writes need 'blog'.
  if (!allow(req, res, 'blog')) return;

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
  // GET above is public (the public blog post page renders author bios).
  // Authors are blog-adjacent → writes need 'blog'.
  if (!allow(req, res, 'blog')) return;

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
  // POST above is the public signup form and stays open. Reading or deleting
  // the subscriber list is admin-only → 'newsletter'.
  if (!allow(req, res, 'newsletter')) return;

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
  // GET above is public — it serves the actual image bytes to the live site.
  //
  // Upload/delete is admin-only. The uploader is shared by the blog editor,
  // the reviews page and the authors page, so there is no single "correct"
  // section for it; 'blog' is the pragmatic choice — it is the section that
  // owns the media library and the one the image editor primarily serves.
  if (!allow(req, res, 'blog')) return;

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

/* ── Team accounts ─────────────────────────────────────────────────────────
   Only the owner can reach any of this. A team member's own account is not
   editable by them — passwords are reset by the owner. */
const SECTIONS = ['blog', 'leads', 'reviews', 'faq', 'newsletter', 'settings'];

async function users(req, res) {
  const me = requireSuper(req, res);
  if (!me) return;

  if (req.method === 'GET') {
    // Never return password hashes.
    const rows = await sql`
      SELECT id, username, full_name, is_super, permissions, is_active, created_at
      FROM admin_users
      ORDER BY is_super DESC, username
    `;
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const { username, password, full_name, permissions } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    // Only ever store sections we actually recognise.
    const perms = (Array.isArray(permissions) ? permissions : [])
      .filter((p) => SECTIONS.includes(p));

    const exists = await sql`SELECT id FROM admin_users WHERE username = ${username}`;
    if (exists.length) {
      return res.status(409).json({ error: 'That username is already taken.' });
    }

    const hash = await bcrypt.hash(String(password), 12);
    const rows = await sql`
      INSERT INTO admin_users (username, password, full_name, permissions, is_super, is_active)
      VALUES (${username}, ${hash}, ${full_name || null}, ${perms.join(',')}, false, true)
      RETURNING id, username, full_name, is_super, permissions, is_active, created_at
    `;
    return res.status(201).json(rows[0]);
  }

  if (req.method === 'PUT') {
    const { id, full_name, permissions, is_active, password } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id is required' });

    const found = await sql`SELECT * FROM admin_users WHERE id = ${id}`;
    if (!found.length) return res.status(404).json({ error: 'User not found' });
    const target = found[0];

    // The owner's own account can't be demoted, disabled, or locked out of the
    // one section that manages users — that would strand the site with no admin.
    if (target.is_super) {
      if (is_active === false) {
        return res.status(400).json({ error: "The owner's account cannot be disabled." });
      }
      if (permissions !== undefined) {
        return res.status(400).json({ error: "The owner always has every section." });
      }
    }

    const nextName = full_name === undefined ? target.full_name : (full_name || null);
    const nextPerms = permissions === undefined
      ? target.permissions
      : (Array.isArray(permissions) ? permissions : []).filter((p) => SECTIONS.includes(p)).join(',');
    const nextActive = is_active === undefined ? target.is_active : !!is_active;
    const nextHash = password ? await bcrypt.hash(String(password), 12) : target.password;

    if (password && String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const rows = await sql`
      UPDATE admin_users SET
        full_name   = ${nextName},
        permissions = ${nextPerms},
        is_active   = ${nextActive},
        password    = ${nextHash}
      WHERE id = ${id}
      RETURNING id, username, full_name, is_super, permissions, is_active, created_at
    `;
    return res.status(200).json(rows[0]);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id query parameter is required' });

    const found = await sql`SELECT is_super FROM admin_users WHERE id = ${id}`;
    if (!found.length) return res.status(404).json({ error: 'User not found' });
    if (found[0].is_super) {
      return res.status(400).json({ error: "The owner's account cannot be deleted." });
    }
    await sql`DELETE FROM admin_users WHERE id = ${id}`;
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
    if (resource === 'users') return await users(req, res);
    return res.status(400).json({ error: 'Unknown resource' });
  } catch (err) {
    console.error(`/api/cms?resource=${resource} failed:`, err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
