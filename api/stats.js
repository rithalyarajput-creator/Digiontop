import { sql } from './_lib/db.js';
import { setCors, verifyToken, hasPermission } from './_lib/auth.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // The Dashboard is shown to everyone who can log in, so this endpoint stays
  // open to any valid token rather than being locked behind one section.
  // Instead, each slice of the response is filtered by what the caller is
  // actually allowed to see: a user without 'leads' must not receive lead
  // counts, recent leads, the leads chart, or lead notifications — even though
  // the Dashboard UI would not have rendered them anyway. Hiding a widget in
  // the UI is not access control.
  //
  // The keys are always returned (with empty/zero values when not permitted)
  // so the Dashboard front-end, which reads them unconditionally, cannot crash.
  let canBlog;
  let canLeads;
  let canNewsletter;
  try {
    verifyToken(req);
    canBlog = hasPermission(req, 'blog');
    canLeads = hasPermission(req, 'leads');
    canNewsletter = hasPermission(req, 'newsletter');
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

    const zero = [{ n: 0 }];
    const none = () => Promise.resolve([]);
    const count = (q) => (q ?? Promise.resolve(zero));

    // Counts (run in parallel). Only query the slices the caller may see.
    const [
      blogPublished, blogDraft, blogScheduled, blogTotal,
      categories, authors, subscribers, leads,
      recentBlogs, recentLeads, topBlogs,
    ] = await Promise.all([
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'published'` : null),
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'draft'` : null),
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM blog_posts WHERE status = 'scheduled'` : null),
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM blog_posts` : null),
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM categories` : null),
      count(canBlog ? sql`SELECT COUNT(*)::int AS n FROM authors` : null),
      count(canNewsletter ? sql`SELECT COUNT(*)::int AS n FROM newsletter_subscribers WHERE is_active = true` : null),
      count(canLeads ? sql`SELECT COUNT(*)::int AS n FROM contact_leads` : null),
      canBlog
        ? sql`SELECT id, title, status, category, author, created_at, views
              FROM blog_posts ORDER BY created_at DESC LIMIT 5`
        : none(),
      canLeads
        ? sql`SELECT id, full_name, email, service_interested, status, created_at
              FROM contact_leads ORDER BY created_at DESC LIMIT 5`
        : none(),
      canBlog
        ? sql`SELECT id, title, views, category FROM blog_posts
              WHERE status = 'published' ORDER BY COALESCE(views,0) DESC LIMIT 5`
        : none(),
    ]);

    // Total blog views (engagement proxy)
    const totalViews = canBlog
      ? await sql`SELECT COALESCE(SUM(views),0)::int AS n FROM blog_posts`
      : zero;
    const leadsNew = canLeads
      ? await sql`SELECT COUNT(*)::int AS n FROM contact_leads WHERE status = 'new'`
      : zero;

    // Per-day lead counts for the dashboard chart. The notifications feed below
    // is capped at 15 rows, so deriving the chart from it silently under-counted
    // any range with more leads than that — this counts in the database instead.
    const leadsByDay = canLeads
      ? await sql`
          SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date::text AS day,
                 COUNT(*)::int AS n
          FROM contact_leads
          WHERE created_at >= NOW() - INTERVAL '365 days'
          GROUP BY day
          ORDER BY day
        `
      : [];

    // Notifications feed: recent leads + newsletter signups merged.
    // Each half is only fetched if the caller holds the matching section.
    const [notifLeads, notifSubs] = await Promise.all([
      canLeads
        ? sql`SELECT id, full_name, email, source, created_at FROM contact_leads ORDER BY created_at DESC LIMIT 15`
        : none(),
      canNewsletter
        ? sql`SELECT id, email, source, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 15`
        : none(),
    ]);
    const notifications = [
      ...notifLeads.map((l) => ({
        type: 'lead',
        title: l.full_name || l.email || 'New lead',
        sub: l.source === 'blog' ? 'Blog form' : 'Contact form',
        created_at: l.created_at,
      })),
      ...notifSubs.map((s) => ({
        type: 'newsletter',
        title: s.email,
        sub: 'Newsletter signup',
        created_at: s.created_at,
      })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 20);

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
      notifications,
      leadsByDay,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
