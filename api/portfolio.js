import { sql } from './_lib/db.js';
import { setCors, requirePermission } from './_lib/auth.js';

function slugify(text) {
  return String(text).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Make sure the slug is unique, ignoring the row being edited. */
async function uniqueSlug(base, excludeId) {
  let slug = base || 'project';
  for (let i = 2; i < 50; i += 1) {
    const clash = excludeId
      ? await sql`SELECT id FROM portfolio_items WHERE slug = ${slug} AND id <> ${excludeId}`
      : await sql`SELECT id FROM portfolio_items WHERE slug = ${slug}`;
    if (clash.length === 0) return slug;
    slug = `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { featured, slug } = req.query;
      // One case study, by slug — the public /case-study/:slug page.
      if (slug) {
        const rows = await sql`SELECT * FROM portfolio_items WHERE slug = ${slug} LIMIT 1`;
        if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(rows[0]);
      }
      // featured=1 — the three picked for the home page.
      const rows = featured === '1'
        ? await sql`
            SELECT * FROM portfolio_items WHERE is_featured = true
            ORDER BY sort_order ASC, created_at DESC`
        : await sql`
            SELECT * FROM portfolio_items
            ORDER BY sort_order ASC, created_at DESC`;
      return res.status(200).json(rows);
    }

    const auth = requirePermission(req, res, 'reviews');
    if (!auth) return;

    if (req.method === 'POST') {
      const { title, category, description, image_url, client_name, results, is_featured,
              link_url, logo_url, slug, feature_image_url, content, sort_order } = req.body || {};
      if (!title) {
        return res.status(400).json({ error: 'title is required' });
      }
      const finalSlug = await uniqueSlug(slugify(slug || title));
      const rows = await sql`
        INSERT INTO portfolio_items
          (title, category, description, image_url, client_name, results, is_featured,
           link_url, logo_url, slug, feature_image_url, content, sort_order)
        VALUES
          (${title}, ${category || null}, ${description || null}, ${image_url || null},
           ${client_name || null}, ${results || null}, ${is_featured ?? false},
           ${link_url || null}, ${logo_url || null}, ${finalSlug},
           ${feature_image_url || null}, ${content || null}, ${sort_order ?? 0})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, title, category, description, image_url, client_name, results, is_featured,
              link_url, logo_url, slug, feature_image_url, content, sort_order } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }
      // Only touch the slug when one was actually supplied — editing anything
      // else must never silently change a live case-study URL.
      const nextSlug = slug ? await uniqueSlug(slugify(slug), id) : null;
      const rows = await sql`
        UPDATE portfolio_items SET
          title = COALESCE(${title ?? null}, title),
          category = COALESCE(${category ?? null}, category),
          description = COALESCE(${description ?? null}, description),
          image_url = COALESCE(${image_url ?? null}, image_url),
          client_name = COALESCE(${client_name ?? null}, client_name),
          results = COALESCE(${results ?? null}, results),
          is_featured = COALESCE(${is_featured ?? null}, is_featured),
          link_url = COALESCE(${link_url ?? null}, link_url),
          logo_url = COALESCE(${logo_url ?? null}, logo_url),
          slug = COALESCE(${nextSlug}, slug),
          feature_image_url = COALESCE(${feature_image_url ?? null}, feature_image_url),
          content = COALESCE(${content ?? null}, content),
          sort_order = COALESCE(${sort_order ?? null}, sort_order)
        WHERE id = ${id}
        RETURNING *
      `;
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Portfolio item not found' });
      }
      return res.status(200).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'id query parameter is required' });
      }
      await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
