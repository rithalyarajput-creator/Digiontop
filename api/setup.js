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
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

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
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

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
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_role VARCHAR(255),
        client_location VARCHAR(255),
        testimonial_text TEXT NOT NULL,
        rating SMALLINT DEFAULT 5,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

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

    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads (status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email)`;

    // Seed default admin (password: DigiOnTop@2025!)
    await sql`
      INSERT INTO admin_users (username, password)
      VALUES ('digiontop_admin', '$2b$12$Ved1q5vCdtTRo3q1TyXoDuXiFG/xQl6mx/yjGkzHm0pdmsEDd0KwK')
      ON CONFLICT (username) DO NOTHING
    `;

    return res.status(200).json({
      success: true,
      message: 'Database initialized. Tables created and admin user seeded. You can now log in at /admin.',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Setup failed: ' + err.message });
  }
}
