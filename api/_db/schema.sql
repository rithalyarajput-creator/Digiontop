-- DigionTop PostgreSQL schema
-- Target: Vercel Postgres (standard Postgres)

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
    tags TEXT,
    scheduled_at TIMESTAMPTZ,
    views INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL,
    slug VARCHAR(150) UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    social_links TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(100) DEFAULT 'website',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    data JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT site_settings_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS activity_log (
    id SERIAL PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    detail TEXT,
    actor VARCHAR(120),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
);

CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_role VARCHAR(255),
    client_location VARCHAR(255),
    testimonial_text TEXT NOT NULL,
    rating SMALLINT DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads (status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at);

INSERT INTO admin_users (username, password)
VALUES ('digiontop_admin', '$2b$12$Ved1q5vCdtTRo3q1TyXoDuXiFG/xQl6mx/yjGkzHm0pdmsEDd0KwK')
ON CONFLICT (username) DO NOTHING;
