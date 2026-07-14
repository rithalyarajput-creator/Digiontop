import { sql } from './_lib/db.js';
import { setCors, verifyToken, hasPermission } from './_lib/auth.js';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Can the caller see unpublished posts (drafts / scheduled)?
 * A valid token is not enough — the caller must actually hold the 'blog'
 * section. Anyone else (public, or an admin restricted to e.g. leads) gets
 * exactly the published-only view the live website gets.
 */
function canSeeUnpublished(req) {
  try {
    return hasPermission(req, 'blog');
  } catch {
    return false; // no/invalid token → public reader
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
      // Only a caller holding the 'blog' section gets the admin view.
      const canSeeDrafts = canSeeUnpublished(req);
      // Any signed-in admin is "not the public" for view-counting purposes.
      let signedIn = false;
      try { verifyToken(req); signedIn = true; } catch { signedIn = false; }

      // Auto-publish any scheduled posts whose time has arrived.
      try {
        await sql`
          UPDATE blog_posts
          SET status = 'published', updated_at = NOW()
          WHERE status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= NOW()
        `;
      } catch {}

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
        if (!canSeeDrafts && post.status !== 'published') {
          return res.status(404).json({ error: 'Post not found' });
        }
        // Count a view for public reads of a published post (by slug only)
        if (!signedIn && slug && post.status === 'published') {
          try { await sql`UPDATE blog_posts SET views = COALESCE(views, 0) + 1 WHERE id = ${post.id}`; } catch {}
        }
        return res.status(200).json(post);
      }

      if (!canSeeDrafts || published === '1') {
        const rows = await sql`
          SELECT * FROM blog_posts
          WHERE status = 'published'
          ORDER BY created_at DESC
        `;
        return res.status(200).json(rows);
      }

      // Admin with the 'blog' section: return everything (drafts, scheduled, published)
      const rows = await sql`
        SELECT * FROM blog_posts
        ORDER BY created_at DESC
      `;
      return res.status(200).json(rows);
    }

    // Every write below is admin-only and requires the 'blog' section.
    try {
      if (!hasPermission(req, 'blog')) {
        return res.status(403).json({ error: 'You do not have access to this section.' });
      }
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Self-heal: make sure every column the API writes to exists, even on
    // an older blog_posts table. Cheap + idempotent; prevents 500s from a
    // missing column after a schema change.
    if (req.method === 'POST' || req.method === 'PUT') {
      try {
        await sql`
          ALTER TABLE blog_posts
            ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255),
            ADD COLUMN IF NOT EXISTS meta_description TEXT,
            ADD COLUMN IF NOT EXISTS tags TEXT,
            ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ,
            ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()
        `;
        // content must allow empty inserts (we default '' in code, but drop
        // NOT NULL so a legacy strict column can't 500 the request either)
        await sql`ALTER TABLE blog_posts ALTER COLUMN content DROP NOT NULL`;
      } catch {}
    }

    if (req.method === 'POST') {
      const {
        title, slug, author, excerpt, content, category, image_url,
        meta_title, meta_description, tags, scheduled_at, status,
      } = req.body || {};
      if (!title || !String(title).trim()) {
        return res.status(400).json({ error: 'Post title is required.' });
      }
      // content column is NOT NULL — never insert null (would 500). Default to ''.
      const finalContent = (content ?? '') === '' ? '' : content;
      const finalStatus = status || 'draft';
      // ensure a unique slug so a duplicate never throws a 500
      let baseSlug = slug && slug.trim() ? slugify(slug) : slugify(title);
      if (!baseSlug) baseSlug = 'post';
      let finalSlug = baseSlug;
      try {
        const existing = await sql`SELECT slug FROM blog_posts WHERE slug LIKE ${baseSlug + '%'}`;
        if (existing.some((r) => r.slug === baseSlug)) {
          let n = 2;
          const taken = new Set(existing.map((r) => r.slug));
          while (taken.has(`${baseSlug}-${n}`)) n++;
          finalSlug = `${baseSlug}-${n}`;
        }
      } catch {}
      const rows = await sql`
        INSERT INTO blog_posts
          (title, slug, author, excerpt, content, category, image_url,
           meta_title, meta_description, tags, scheduled_at, status)
        VALUES
          (${title}, ${finalSlug}, ${author || null}, ${excerpt || null}, ${finalContent},
           ${category || null}, ${image_url || null}, ${meta_title || null}, ${meta_description || null},
           ${tags || null}, ${finalStatus === 'scheduled' ? (scheduled_at || null) : null}, ${finalStatus})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const {
        id, title, slug, author, excerpt, content, category, image_url,
        meta_title, meta_description, tags, scheduled_at, status,
      } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      const rows = await sql`
        UPDATE blog_posts SET
          title = COALESCE(${title ?? null}, title),
          slug = COALESCE(${slug ?? null}, slug),
          author = COALESCE(${author ?? null}, author),
          excerpt = COALESCE(${excerpt ?? null}, excerpt),
          content = COALESCE(${content ?? null}, content),
          category = COALESCE(${category ?? null}, category),
          image_url = COALESCE(${image_url ?? null}, image_url),
          meta_title = COALESCE(${meta_title ?? null}, meta_title),
          meta_description = COALESCE(${meta_description ?? null}, meta_description),
          tags = COALESCE(${tags ?? null}, tags),
          scheduled_at = CASE WHEN ${scheduled_at !== undefined} THEN ${scheduled_at || null} ELSE scheduled_at END,
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
    console.error('[blog api] error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      detail: err?.message || String(err),
    });
  }
}
