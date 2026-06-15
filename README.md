# DigionTop Website

Official website for **DigionTop** — India's Remote-First Digital Marketing Agency.

> Reach More. Grow Faster. Stay On Top.

**Live:** https://www.digiontop.com

---

## 🧱 Tech Stack — single Vercel deployment

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + React Router |
| **Admin** | React (same app, `/admin` route) |
| **API** | Vercel Serverless Functions (Node.js) — `/api/*` |
| **Database** | Vercel Postgres |

Everything — website, admin, API, and database — runs on **one Vercel project, one domain**.
No PHP, no separate hosting.

---

## 📁 Project Structure

```
Digiontop/
├── frontend/                 # React Vite app (website + admin)
│   ├── public/
│   │   ├── images/           # logo-header.png, logo-footer.png
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/       # Navbar, Footer
│   │   ├── pages/            # Home, About, services, Contact, etc.
│   │   ├── admin/            # Admin panel (login, dashboard, leads, blog…)
│   │   ├── styles/           # CSS
│   │   ├── App.jsx           # Routes (public site + /admin)
│   │   └── main.jsx
│   └── package.json
├── api/                      # Vercel serverless functions
│   ├── auth/login.js         # Admin login (returns JWT)
│   ├── contact.js            # Public — receives contact form
│   ├── leads.js              # Admin — manage leads
│   ├── blog.js               # Blog CRUD
│   ├── testimonials.js       # Testimonials CRUD
│   ├── portfolio.js          # Portfolio CRUD
│   ├── setup.js              # One-time DB initializer
│   ├── _lib/auth.js          # Auth + CORS helpers
│   └── _db/schema.sql        # Postgres schema (reference)
├── package.json              # API dependencies (@vercel/postgres, bcryptjs, jsonwebtoken)
├── vercel.json               # Build + routing config
├── .env.example              # Required env vars
└── DEPLOYMENT.md             # 👈 Step-by-step deploy guide (read this!)
```

---

## 🚀 Deploy

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the full step-by-step guide.

Quick version:
1. Import repo in Vercel.
2. Storage tab → create Postgres DB (auto-adds `POSTGRES_URL`).
3. Add env vars `JWT_SECRET` and `SETUP_KEY`.
4. Deploy.
5. Visit `/api/setup?key=YOUR_SETUP_KEY` once to create tables.
6. Login at `/admin` with `digiontop_admin` / `DigiOnTop@2025!`.

---

## 💻 Local Development

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Note: the admin login and API need Vercel Postgres, so they work fully only after
deploying (or via `vercel dev` with a linked database). The public website and all
page UIs work locally.

---

## 🎨 Brand Colors

| Color | Hex |
|-------|-----|
| Primary Yellow | `#F5A800` |
| Brand Black | `#1A1A1A` |
| White | `#FFFFFF` |

**Font:** Inter · Navbar: white + yellow hover · Footer: black + yellow accents

---

## 📞 Contact

- **Email:** digiontop.agency@gmail.com
- **Phone:** +91 9217594664 | +91 7303769921
- **Hours:** Mon–Sat, 10:00 AM – 7:00 PM IST

---

© 2025 DigionTop. All Rights Reserved.
