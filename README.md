# DigionTop — Digital Marketing Agency Website

A full-stack website for **DigionTop**, a remote-first digital marketing agency based in India. Built with React + Vite (frontend) and Vercel Serverless Functions + Neon PostgreSQL (backend).

🌐 **Live:** [https://digiontop.vercel.app](https://digiontop.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Custom CSS + AOS animations |
| Backend | Vercel Serverless Functions (ESM) |
| Database | Neon PostgreSQL (`@neondatabase/serverless`) |
| Auth | JWT (`jsonwebtoken`) + bcryptjs |
| Deployment | Vercel |

---

## Project Structure

```
Digiontop/
├── api/                        # Vercel Serverless Functions
│   ├── _lib/
│   │   ├── db.js               # Neon DB connection
│   │   └── auth.js             # JWT helpers + CORS
│   ├── login.js                # Admin login
│   ├── blog.js                 # Blog CRUD
│   ├── contact.js              # Contact form leads
│   ├── testimonials.js         # Testimonials CRUD
│   ├── faq.js                  # FAQ CRUD
│   ├── portfolio.js            # Portfolio CRUD
│   └── setup.js                # DB initializer (run once)
│
├── frontend/
│   ├── public/images/          # Logos, hero banner
│   └── src/
│       ├── pages/              # Public pages
│       ├── components/         # Navbar, Footer, ChatBot
│       ├── admin/              # Admin panel (isolated)
│       └── styles/             # CSS files
│
├── package.json                # Root — API dependencies
└── vercel.json                 # Vercel config
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Services, Why Us, Industries, Testimonials, CTA |
| `/about` | About DigionTop |
| `/services/website-development` | Website Development |
| `/services/seo-services` | SEO Services |
| `/services/social-media-marketing` | Social Media Marketing |
| `/services/ecommerce-solutions` | E-Commerce Solutions |
| `/why-us` | Why Choose DigionTop |
| `/industries` | Industries We Serve |
| `/testimonials` | Client Testimonials |
| `/faq` | Frequently Asked Questions |
| `/work` | Our Work / Portfolio |
| `/blog` | Blog listing |
| `/blog/:slug` | Single blog post |
| `/contact` | Contact form + social links |
| `/admin` | Admin panel (login required) |

---

## Admin Panel

Access at `/admin` — JWT protected.

### Sidebar Menu

- **Dashboard** — Stats overview
- **Content** ▼
  - Blog Posts — Create / Edit / Delete (HTML editor + SEO fields)
  - Authors — Manage blog authors
  - Categories — Manage blog categories
- **Leads** ▼
  - Form Leads — Contact form submissions
  - Newsletter — Newsletter signups
- **Testimonials** — Add / Edit client testimonials
- **FAQs** — Manage FAQ questions
- **Settings** — Site info + social media links

### Blog Editor Features
- Title, Slug (auto-generated), Author, Category
- Simple Editor + HTML Editor with toolbar
- Featured Image URL with preview
- Meta Title (60 chars) + Meta Description (160 chars)
- Status: Draft / Published
- Live card preview panel

---

## API Endpoints

| Endpoint | Methods | Auth |
|---|---|---|
| `/api/login` | POST | No |
| `/api/blog` | GET / POST / PUT / DELETE | GET: No, Others: JWT |
| `/api/contact` | POST | No |
| `/api/testimonials` | GET / POST / PUT / DELETE | GET: No, Others: JWT |
| `/api/faq` | GET / POST / PUT / DELETE | GET: No, Others: JWT |
| `/api/portfolio` | GET / POST / PUT / DELETE | GET: No, Others: JWT |
| `/api/setup?key=SETUP_KEY` | GET | Key-based |

---

## Environment Variables

Set in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Description |
|---|---|
| `POSTGRES_URL` | Neon PostgreSQL connection string (auto-set by Neon integration) |
| `JWT_SECRET` | Secret key for JWT token signing |
| `SETUP_KEY` | One-time key to initialize database tables |

---

## First-Time Setup

After deploying to Vercel:

1. Connect **Neon** database via Vercel integrations
2. Set `JWT_SECRET` and `SETUP_KEY` environment variables
3. Run: `https://your-domain.vercel.app/api/setup?key=YOUR_SETUP_KEY`
4. This creates all tables and seeds the default admin user
5. Login at `/admin`

---

## Local Development

```bash
# Install API dependencies (root)
npm install

# Install frontend dependencies
cd frontend
npm install

# Start dev server
npm run dev
# Runs at http://localhost:5173
```

> API routes require Vercel — use `vercel dev` for local API testing.

---

## Features

- ✅ Fully responsive — mobile, tablet, desktop
- ✅ Floating pill navbar with 4-column Services mega menu
- ✅ AI Chatbot "Digi" — Intercom-style, keyword-based replies
- ✅ Blog system — yellow card design, HTML editor, SEO fields
- ✅ Testimonial cards — dark teal header + star ratings
- ✅ Contact form — saves leads to database
- ✅ Full CMS admin panel with JWT auth
- ✅ AOS scroll animations throughout
- ✅ Brand: #F5A800 yellow + #1A1A1A black

---

## Brand & Social

- **Colors:** #F5A800 Yellow · #1A1A1A Black · #FFFFFF White
- **Font:** Inter
- **Instagram:** [@digiontop.agency](https://www.instagram.com/digiontop.agency)
- **Facebook:** [DigionTop](https://www.facebook.com/share/14eaPvHNx9A/)
- **YouTube:** [@digiontop](https://www.youtube.com/@digiontop)

---

© 2025 DigionTop. All Rights Reserved.
