import bcrypt from 'bcryptjs';
import { sql } from './_lib/db.js';

/**
 * One-time database initialization endpoint.
 * Visit /api/setup?key=YOUR_SETUP_KEY once after deploying to create
 * all tables and seed the default admin user.
 *
 * Guarded by the SETUP_KEY environment variable.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const key = req.query.key;
  if (!process.env.SETUP_KEY || key !== process.env.SETUP_KEY) {
    return res.status(403).json({ error: 'Forbidden: invalid or missing setup key.' });
  }

  try {
    // @vercel/postgres does not allow multiple statements in one call,
    // so each statement runs separately.

    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(80) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(120),
        is_super BOOLEAN DEFAULT false,
        permissions TEXT DEFAULT '',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Private document vault — proformas, invoices, agreements. Owner-only, and
    // additionally gated behind its own passphrase, so someone who walks up to an
    // already-logged-in laptop still can't read them. Files are stored base64 in
    // Postgres, like the existing media table; Vercel caps a request body at
    // 4.5MB, which is what bounds the file size.
    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(80),
        notes TEXT,
        filename VARCHAR(255),
        mime VARCHAR(120),
        size_bytes INTEGER,
        data TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // The vault passphrase, hashed — never stored in plain text, and never sent
    // to the browser. Seeded once; change it from the Documents page.
    await sql`
      CREATE TABLE IF NOT EXISTS doc_vault (
        id INT PRIMARY KEY DEFAULT 1,
        passphrase VARCHAR(255) NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT doc_vault_single_row CHECK (id = 1)
      )
    `;
    await sql`
      INSERT INTO doc_vault (id, passphrase)
      VALUES (1, ${bcrypt.hashSync('Sssstk', 12)})
      ON CONFLICT (id) DO NOTHING
    `;

    // Team accounts arrived after the table existed: each user now carries the
    // set of admin sections they may open. `is_super` marks the owner, who has
    // every section and is the only one who can manage users.
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS full_name VARCHAR(120)`;
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS is_super BOOLEAN DEFAULT false`;
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS permissions TEXT DEFAULT ''`;
    await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`;
    // The original account is the owner.
    await sql`UPDATE admin_users SET is_super = true WHERE username = 'digiontop@2026'`;

    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        author VARCHAR(150),
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        image_url VARCHAR(500),
        meta_title VARCHAR(255),
        meta_description TEXT,
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author VARCHAR(150)`;
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255)`;
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT`;
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT`;
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ`;
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0`;

    // Allow 'scheduled' status: drop old CHECK constraint then re-add with the extra value.
    await sql`ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_status_check`;
    await sql`ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published', 'scheduled'))`;

    // Categories (proper table)
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) UNIQUE NOT NULL,
        slug VARCHAR(150) UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Authors (proper table)
    await sql`
      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255),
        bio TEXT,
        avatar_url VARCHAR(500),
        social_links TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE authors ADD COLUMN IF NOT EXISTS social_links TEXT`;
    await sql`ALTER TABLE authors ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`;

    // Category extra columns
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url VARCHAR(500)`;
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`;

    // Newsletter subscribers
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(100) DEFAULT 'website',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Site settings (single-row JSON store, id = 1)
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT site_settings_singleton CHECK (id = 1)
      )
    `;
    await sql`INSERT INTO site_settings (id, data) VALUES (1, '{}'::jsonb) ON CONFLICT (id) DO NOTHING`;

    // Activity log
    await sql`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        action VARCHAR(255) NOT NULL,
        detail TEXT,
        actor VARCHAR(120),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Seed default categories
    await sql`
      INSERT INTO categories (name, slug) VALUES
        ('General', 'general'),
        ('SEO', 'seo'),
        ('Social Media', 'social-media'),
        ('Website Development', 'website-development'),
        ('E-Commerce', 'e-commerce'),
        ('Digital Marketing', 'digital-marketing'),
        ('Case Study', 'case-study')
      ON CONFLICT (name) DO NOTHING
    `;

    // Seed a default author
    await sql`
      INSERT INTO authors (name, email, bio) VALUES
        ('DigionTop Team', 'digiontop.agency@gmail.com', 'Official content team at DigionTop digital marketing agency.')
      ON CONFLICT DO NOTHING
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS contact_leads (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255),
        business_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service_interested VARCHAR(255),
        budget_range VARCHAR(100),
        message TEXT,
        source VARCHAR(100) DEFAULT 'website',
        status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
        notes TEXT,
        follow_up_at DATE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Leads grew follow-up tracking after the table was first created, so
    // back-fill the columns on existing databases.
    await sql`ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS notes TEXT`;
    await sql`ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS follow_up_at DATE`;

    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_role VARCHAR(255),
        client_location VARCHAR(255),
        testimonial_text TEXT NOT NULL,
        rating SMALLINT DEFAULT 5,
        is_featured BOOLEAN DEFAULT false,
        avatar_url TEXT,
        reviewed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Reviews grew an optional photo and a "reviewed on" date after the table
    // was first created, so back-fill the columns on existing databases.
    await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS avatar_url TEXT`;
    await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ`;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        description TEXT,
        image_url VARCHAR(500),
        client_name VARCHAR(255),
        results TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Visitor analytics — one row per page view. Kept deliberately lightweight
    // (no personal data, just anonymous session id + coarse location/device) so
    // it's our own free traffic tracker without needing Google Analytics.
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(40),
        path VARCHAR(500),
        referrer VARCHAR(500),
        country VARCHAR(80),
        city VARCHAR(120),
        device VARCHAR(20),
        browser VARCHAR(40),
        duration_ms INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    // Social posts tracker — a manual log of what we posted where and how it
    // did. Free/API-less: the owner types each post's stats in. Lets us see, in
    // one place, per-platform which post did well.
    await sql`
      CREATE TABLE IF NOT EXISTS social_posts (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(30) NOT NULL,
        caption TEXT,
        post_url VARCHAR(500),
        posted_at DATE,
        likes INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        comments INTEGER DEFAULT 0,
        shares INTEGER DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_social_posts_posted_at ON social_posts (posted_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts (platform)`;

    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events (created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics_events (path)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events (session_id)`;

    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads (status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email)`;

    // Remove old default admin and seed the current admin (username: digiontop@2026)
    await sql`DELETE FROM admin_users WHERE username = 'digiontop_admin'`;
    await sql`
      INSERT INTO admin_users (username, password)
      VALUES ('digiontop@2026', '$2a$12$nSWzOwhjlOlYM9S8xTFNIupns3Aa5SJ6S8N9qBeiutDLb.s35e.KG')
      ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password
    `;

    return res.status(200).json({
      success: true,
      message: 'Database initialized. Tables created and admin user seeded. You can now log in at /admin.',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Setup failed: ' + err.message });
  }
}
