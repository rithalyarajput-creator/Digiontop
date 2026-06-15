# DigionTop Website

Official website for **DigionTop** — India's Remote-First Digital Marketing Agency.

> Reach More. Grow Faster. Stay On Top.

**Live:** https://www.digiontop.com

---

## 🧱 Tech Stack

| Layer | Technology | Hosting |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite + React Router | Vercel |
| **Admin Panel** | PHP + MySQL (PDO) | Hostinger / cPanel |

---

## 📁 Project Structure

```
Digiontop/
├── frontend/                 # React Vite app → deploy to Vercel
│   ├── public/
│   │   ├── images/           # logo-header.png, logo-footer.png
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/       # Navbar, Footer
│   │   ├── pages/            # Home, About, service pages, etc.
│   │   ├── styles/           # CSS for each page/component
│   │   ├── App.jsx           # Routes
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles + brand variables
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json           # SPA rewrite config
│   └── .env.example
├── admin/                    # PHP admin panel → Hostinger/cPanel
│   ├── api/contact.php       # Endpoint the frontend contact form posts to
│   ├── config/              # database.php + auth.php
│   ├── setup/install.sql    # Run this once to create all tables
│   ├── blog/                # Blog post management
│   ├── dashboard.php
│   ├── leads.php            # Contact form submissions
│   ├── testimonials.php
│   ├── portfolio.php
│   └── login.php
├── .gitignore
└── README.md
```

---

## 🚀 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173  (development)
npm run build      # production build → frontend/dist
npm run preview    # preview the production build
```

### Environment variable

Create `frontend/.env` (copy from `.env.example`):

```
VITE_API_URL=https://admin.digiontop.com/api
```

This is the URL of the PHP admin API. The contact form posts to `${VITE_API_URL}/contact.php`.

### Deploy to Vercel

1. Push this repo to GitHub (already done).
2. In Vercel → **New Project** → import this repo.
3. Set **Root Directory** to `frontend`.
4. Framework preset: **Vite** (auto-detected).
5. Add Environment Variable `VITE_API_URL` = your admin API URL.
6. Deploy. `vercel.json` handles SPA routing so deep links don't 404.

---

## 🛠️ Admin Panel Setup (PHP + MySQL)

1. Upload the `admin/` folder to your PHP host (Hostinger / cPanel), e.g. `admin.digiontop.com`.
2. Create a MySQL database in cPanel.
3. Import `admin/setup/install.sql` (via phpMyAdmin) — creates all tables + default admin user.
4. Edit `admin/config/database.php` with your real DB host, name, user, and password.
5. In `admin/api/contact.php`, add your Vercel domain to the `$allowedOrigins` CORS whitelist and set your notification email.
6. Visit `https://admin.digiontop.com/login.php`.

**Default admin login:** `digiontop_admin` / `DigiOnTop@2025!`
⚠️ **Change this password immediately after first login.**

### Admin features
- **Dashboard** — stats overview
- **Leads** — view/manage contact form submissions
- **Blog Posts** — create, edit, publish/unpublish posts
- **Testimonials** — manage client reviews
- **Portfolio** — manage case studies

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Yellow | `#F5A800` | CTA buttons, accents, hover |
| Dark Yellow | `#C78700` | Hover state, section labels |
| Brand Black | `#1A1A1A` | Headings, navbar, footer |
| Mid Gray | `#555555` | Body text |
| White | `#FFFFFF` | Page background |

**Font:** Inter (Google Fonts)

- **Navbar:** white background, black text, yellow hover
- **Footer:** black background, white text, yellow accents

---

## 📞 Contact

- **Email:** digiontop.agency@gmail.com
- **Phone:** +91 9217594664 | +91 7303769921
- **Hours:** Mon–Sat, 10:00 AM – 7:00 PM IST

---

© 2025 DigionTop. All Rights Reserved.
