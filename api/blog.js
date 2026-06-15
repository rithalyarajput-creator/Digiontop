import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isAuthed(req) {
  try {
    verifyToken(req);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { slug, id, published } = req.query;
      const authed = isAuthed(req);

      if (slug || id) {
        let rows;
        if (slug) {
          rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} LIMIT 1`;
        } else {
          rows = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`;
        }
        const post = rows[0];
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        if (!authed && post.status !== 'published') {
          return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json(post);
      }

      if (!authed || published === '1') {
        const rows = await sql`
          SELECT * FROM blog_posts
          WHERE status = 'published'
          ORDER BY created_at DESC
        `;
        return res.status(200).json(rows);
      }

      const rows = await sql`
        SELECT * FROM blog_posts
        ORDER BY created_at DESC
      `;
      return res.status(200).json(rows);
    }

    let auth;
    try {
      auth = verifyToken(req);
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { title, slug, excerpt, content, category, image_url, status } = req.body || {};
      if (!title) {
        return res.status(400).json({ error: 'title is required' });
      }
      const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(title);
      const rows = await sql`
        INSERT INTO blog_posts
          (title, slug, excerpt, content, category, image_url, status)
        VALUES
          (${title}, ${finalSlug}, ${excerpt || null}, ${content || null},
           ${category || null}, ${image_url || null}, ${status || 'draft'})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, title, slug, excerpt, content, category, image_url, status } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE blog_posts SET
          title = COALESCE(${title ?? null}, title),
          slug = COALESCE(${slug ?? null}, slug),
          excerpt = COALESCE(${excerpt ?? null}, excerpt),
          content = COALESCE(${content ?? null}, content),
          category = COALESCE(${category ?? null}, category),
          image_url = COALESCE(${image_url ?? null}, image_url),
          status = COALESCE(${status ?? null}, status),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM blog_posts WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
