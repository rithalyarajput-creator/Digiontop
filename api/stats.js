import { sql } from './_lib/db.js';
import { setCors, verifyToken } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Auto-publish scheduled posts whose time has arrived (keeps counts accurate)
    try {
      await sql`
        UPDATE blog_posts
        SET status = 'published', updated_at = NOW()
        WHERE status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= NOW()
      `;
    } catch {}

    // Counts (run in parallel)
    const [
      blogPublished, blogDraft, blogScheduled, blogTotal,
      categories, authors, subscribers, leads,
      recentBlogs, recentLeads, topBlogs,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'published'`,
      sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'draft'`,
      sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'scheduled'`,
      sql`SELECT COUNT(*)::int AS n FROM blog_posts`,
      sql`SELECT COUNT(*)::int AS n FROM categories`,
      sql`SELECT COUNT(*)::int AS n FROM authors`,
      sql`SELECT COUNT(*)::int AS n FROM newsletter_subscribers WHERE is_active = true`,
      sql`SELECT COUNT(*)::int AS n FROM contact_leads`,
      sql`SELECT id, title, status, category, author, created_at, views
          FROM blog_posts ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT id, full_name, email, service_interested, status, created_at
          FROM contact_leads ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT id, title, views, category FROM blog_posts
          WHERE status = 'published' ORDER BY COALESCE(views,0) DESC LIMIT 5`,
    ]);

    // Total blog views (engagement proxy)
    const totalViews = await sql`SELECT COALESCE(SUM(views),0)::int AS n FROM blog_posts`;
    const leadsNew = await sql`SELECT COUNT(*)::int AS n FROM contact_leads WHERE status = 'new'`;

    return res.status(200).json({
      counts: {
        blogPublished: blogPublished[0].n,
        blogDraft: blogDraft[0].n,
        blogScheduled: blogScheduled[0].n,
        blogTotal: blogTotal[0].n,
        categories: categories[0].n,
        authors: authors[0].n,
        subscribers: subscribers[0].n,
        leads: leads[0].n,
        leadsNew: leadsNew[0].n,
        totalViews: totalViews[0].n,
      },
      recentBlogs,
      recentLeads,
      topBlogs,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
