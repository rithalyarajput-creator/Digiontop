# 🚀 DigionTop — Vercel Deployment Guide

Frontend + Admin + Database — sab ek hi Vercel project me. Koi PHP nahi, koi alag hosting nahi.

Follow these steps in order. Total time: ~10 minutes.

---

## Step 1 — Code GitHub pe hai (✅ already done)

Repo: https://github.com/rithalyarajput-creator/Digiontop

---

## Step 2 — Vercel pe project import karo

1. https://vercel.com pe jao, GitHub se sign up/login karo (free).
2. **Add New… → Project** click karo.
3. `Digiontop` repo select karke **Import** karo.
4. Settings me kuch change mat karo — `vercel.json` already sab handle karta hai
   (build command, output directory). Bas **Deploy** mat karo abhi — pehle database aur env vars.

> Agar galti se deploy ho jaye toh koi baat nahi — baad me "Redeploy" kar dena.

---

## Step 3 — Database banao (Vercel Postgres) — ek hi jagah

1. Project khulne ke baad upar **Storage** tab pe jao.
2. **Create Database → Postgres** select karo.
3. Naam kuch bhi do (jaise `digiontop-db`), region India ke paas wala chuno (Singapore/Mumbai).
4. **Create** karo, phir **Connect** karke is project se link kar do.

✅ Yeh automatically `POSTGRES_URL` env variable add kar dega — aapko kuch type nahi karna.

---

## Step 4 — 2 environment variables add karo

Project → **Settings → Environment Variables**. Yeh 2 add karo:

| Name | Value |
|------|-------|
| `JWT_SECRET` | koi bhi lamba random text (jaise `digiontop-secret-9z3kx7q2w8`) |
| `SETUP_KEY` | koi secret key (jaise `setup-digiontop-2025`) — yeh yaad rakhna |

Dono ke liye "Production, Preview, Development" — saare environments tick rehne do. **Save**.

---

## Step 5 — Deploy karo

**Deployments** tab → latest deployment → **Redeploy** (ya Step 2 me Deploy dabaya tha toh woh chal jayega).

Deploy hone ke baad aapko ek URL milega, jaise:
`https://digiontop.vercel.app`

---

## Step 6 — Database ko initialize karo (sirf ek baar)

Browser me yeh URL kholo (apna `SETUP_KEY` daalo jo Step 4 me banaya tha):

```
https://digiontop.vercel.app/api/setup?key=setup-digiontop-2025
```

Agar `{ "success": true, "message": "Database initialized..." }` dikhe — ✅ ho gaya!
Saari tables ban gayi aur admin user create ho gaya.

> Yeh sirf EK baar karna hai. Phir is URL ki zaroorat nahi.

---

## Step 7 — Admin me login karo 🎉

Browser me kholo:

```
https://digiontop.vercel.app/admin
```

Login credentials:

```
Username:  digiontop_admin
Password:  DigiOnTop@2025!
```

Login ke baad milega: Dashboard, Leads, Blog Posts, Testimonials, Portfolio.

---

## Step 8 — Website check karo

- **Main website:** `https://digiontop.vercel.app`
- **Contact form** ab seedha database me leads save karega — woh aapko Admin → Leads me dikhenge.

---

## 🔐 Security — zaroori

- Login karne ke baad password change karna ho toh batao, main bata dunga kaise (naya hash banake).
- `SETUP_KEY` aur `JWT_SECRET` kisi ke saath share mat karna.

---

## 🌐 Apna domain (digiontop.com) lagana ho?

Project → **Settings → Domains** → `digiontop.com` add karo → Vercel jo DNS records bataye
woh apne domain provider (GoDaddy/Hostinger) me daal do. Bas.

---

## How it all works (short)

```
digiontop.vercel.app/            → React website (frontend)
digiontop.vercel.app/admin       → React admin panel
digiontop.vercel.app/api/*       → Serverless functions (Node.js)
                                    talk to Vercel Postgres database
```

Sab kuch ek hi deploy, ek hi domain, ek hi jagah. ✅
