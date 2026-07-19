import { sql } from './_lib/db.js';
import { setCors, verifyToken, hasPermission } from './_lib/auth.js';

// ── Visitor tracking (public POST) ──
// The site posts one of these per page view. No auth: it's called by every
// visitor's browser. We keep only anonymous data — a random session id the
// browser makes up, the path, referrer, and Vercel's coarse geo/device hints.
async function recordPageview(req, res) {
  try {
    const b = typeof req.body === 'object' && req.body ? req.body : {};
    const clip = (v, n) => (typeof v === 'string' ? v.slice(0, n) : null);

    // Vercel injects these edge headers for free — no geo-IP service needed.
    const country = clip(req.headers['x-vercel-ip-country'], 80);
    const city = decodeURIComponent(clip(req.headers['x-vercel-ip-city'], 120) || '') || null;

    const ua = req.headers['user-agent'] || '';
    const device = /mobile|android|iphone|ipad|ipod/i.test(ua) ? 'mobile' : 'desktop';
    const browser = /edg/i.test(ua) ? 'Edge'
      : /chrome/i.test(ua) ? 'Chrome'
      : /safari/i.test(ua) ? 'Safari'
      : /firefox/i.test(ua) ? 'Firefox'
      : 'Other';

    await sql`
      INSERT INTO analytics_events (session_id, path, referrer, country, city, device, browser, duration_ms)
      VALUES (
        ${clip(b.sid, 40)},
        ${clip(b.path, 500)},
        ${clip(b.ref, 500)},
        ${country},
        ${city},
        ${device},
        ${browser},
        ${Number.isFinite(b.duration) ? Math.max(0, Math.min(b.duration | 0, 3600000)) : 0}
      )
    `;
    return res.status(204).end();
  } catch {
    // Tracking must never break a page — swallow and 204.
    return res.status(204).end();
  }
}

// ── Analytics report (GET ?type=analytics) — admin only ──
async function analyticsReport(req, res) {
  try {
    verifyToken(req);
    if (!hasPermission(req, 'analytics')) {
      return res.status(403).json({ error: 'You do not have access to Analytics.' });
    }
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);

  try {
    // Compute the cutoff in JS and pass it as a plain timestamp parameter —
    // neon doesn't reliably support a nested sql`` fragment or a parameterised
    // INTERVAL, so this keeps every query a simple bound comparison.
    const since = new Date(Date.now() - days * 86400000).toISOString();

    const [
      totals, byDay, topPages, topCountries, byDevice, byBrowser,
      topReferrers, recent, topBlogs,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int AS views,
                 COUNT(DISTINCT session_id)::int AS visitors,
                 COALESCE(AVG(NULLIF(duration_ms,0)),0)::int AS avg_ms
          FROM analytics_events WHERE created_at >= ${since}`,
      sql`SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date::text AS day,
                 COUNT(*)::int AS views,
                 COUNT(DISTINCT session_id)::int AS visitors
          FROM analytics_events WHERE created_at >= ${since}
          GROUP BY day ORDER BY day`,
      sql`SELECT path, COUNT(*)::int AS views, COUNT(DISTINCT session_id)::int AS visitors
          FROM analytics_events WHERE created_at >= ${since} AND path IS NOT NULL
          GROUP BY path ORDER BY views DESC LIMIT 12`,
      sql`SELECT COALESCE(country,'-') AS country, COUNT(*)::int AS views
          FROM analytics_events WHERE created_at >= ${since}
          GROUP BY country ORDER BY views DESC LIMIT 10`,
      sql`SELECT COALESCE(device,'-') AS device, COUNT(*)::int AS views
          FROM analytics_events WHERE created_at >= ${since}
          GROUP BY device ORDER BY views DESC`,
      sql`SELECT COALESCE(browser,'-') AS browser, COUNT(*)::int AS views
          FROM analytics_events WHERE created_at >= ${since}
          GROUP BY browser ORDER BY views DESC`,
      sql`SELECT COALESCE(NULLIF(referrer,''),'Direct') AS referrer, COUNT(*)::int AS views
          FROM analytics_events WHERE created_at >= ${since}
          GROUP BY referrer ORDER BY views DESC LIMIT 10`,
      sql`SELECT path, country, city, device, browser, referrer, duration_ms, created_at
          FROM analytics_events WHERE created_at >= ${since}
          ORDER BY created_at DESC LIMIT 30`,
      sql`SELECT id, title, slug, views, category FROM blog_posts
          WHERE status = 'published' ORDER BY COALESCE(views,0) DESC LIMIT 10`,
    ]);

    return res.status(200).json({
      days,
      totals: totals[0],
      byDay, topPages, topCountries, byDevice, byBrowser, topReferrers, recent, topBlogs,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Public visitor tracking write.
  if (req.method === 'POST' && req.query.type === 'track') {
    return recordPageview(req, res);
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Full analytics report for the admin Analytics page.
  if (req.query.type === 'analytics') {
    return analyticsReport(req, res);
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
