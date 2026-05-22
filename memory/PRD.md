# Gomes Webdesign — Portfolio Website

## Original Problem Statement
Premium responsive Portfolio Website for "Gomes Webdesign" (Ivan Vilar Gomes).
Premium agency-style design with dark theme + yellow/beige accents, smooth animations,
3D elements (Three.js), glassmorphism, smooth scroll, responsive design.

## Architecture

### Backend (FastAPI + MongoDB)
- `/api/contact` — POST contact form, saves to MongoDB + sends email via Resend
- `/api/contact` — GET list contact messages (for owner)
- `/api/health` — health check
- `/api/` — root status
- Email integration: **Resend** (RESEND_API_KEY in .env, SENDER_EMAIL=onboarding@resend.dev)
- Email recipient: ivanvilargomes@gmail.com

### Frontend (React 19 + Tailwind)
**Libraries installed:**
- `three`, `@react-three/fiber`, `@react-three/drei` — 3D (used imperatively)
- `framer-motion` — animations
- `lenis` — smooth scroll
- `lucide-react` — icons
- `sonner` — toast notifications

**File structure:**
- `src/App.js` — root with Toaster
- `src/pages/Landing.jsx` — main page composition (sets up Lenis smooth scroll)
- `src/components/Navigation.jsx` — sticky glassmorphism nav (mobile + desktop)
- `src/components/CustomCursor.jsx` — custom magnetic cursor (desktop only)
- `src/components/ProjectCard.jsx` — 3D tilt card
- `src/components/three/HeroScene.jsx` — Imperative Three.js scene (floating gold/beige geometries with mouse-following accent light)
- `src/components/sections/Hero.jsx` — title with parallax + CTA
- `src/components/sections/Marquee.jsx` — infinite scrolling banner
- `src/components/sections/About.jsx` — über mich with portrait + stats
- `src/components/sections/Projects.jsx` — 3 projects (El Pollo Loco, Pokédex, Join CRM)
- `src/components/sections/Skills.jsx` — 5 skills with animated progress bars
- `src/components/sections/Contact.jsx` — form (name/email/message) with validation + toast
- `src/components/sections/Footer.jsx` — watermark + social placeholders

### Design Tokens
- Background: #050505 / #0A0A0A / #111111
- Accent yellow: #E6C229
- Accent beige: #D4C5B9
- Text: #FAFAFA / #A3A3A3
- Fonts: Clash Display (heading) + Manrope (body)

## What's Implemented (Date: 2025-12)
- ✅ Premium dark UI with Clash Display + Manrope typography
- ✅ Hero section with imperative Three.js scene (torus knot, icosahedron, sphere, ring) + mouse-tracking accent light
- ✅ Custom cursor with magnetic hover states
- ✅ Lenis smooth scroll
- ✅ Sticky glassmorphism navigation (desktop + mobile menu)
- ✅ Animated marquee strip
- ✅ About section with portrait, stats grid
- ✅ Projects section with 3D tilt hover cards (El Pollo Loco, Pokédex, Join CRM)
- ✅ Skills section with animated progress bars (HTML, CSS, JavaScript, Responsive Design, UI/UX)
- ✅ Toolbox chips
- ✅ Contact form (name/email/message) with client-side validation + sonner toast
- ✅ Backend POST /api/contact with Resend email + MongoDB persistence
- ✅ Backend GET /api/contact list endpoint
- ✅ Footer with massive watermark text + social icon placeholders
- ✅ SEO meta tags in index.html
- ✅ All data-testid added to interactive elements

## Test Credentials / Configuration
- Resend API key: configured in /app/backend/.env (RESEND_API_KEY)
- Contact recipient: ivanvilargomes@gmail.com
- Sender: onboarding@resend.dev (Resend default — domain must be verified to send to non-verified recipients)

## Verified Functionality
- POST /api/contact returns 200 with email_status="sent" (Resend provider_id returned)
- Frontend loads cleanly without runtime errors
- 3D scene animates with floating + mouse tracking

## P0 / P1 / P2 Backlog
**P1:**
- Replace social media placeholders with real URLs (GitHub, LinkedIn)
- Verify Resend custom domain so emails can be sent from gomeswebdesign.com
- Add Open Graph image for richer link previews
- Add CMS-style projects list (currently hardcoded array)

**P2:**
- Add language switcher (DE/EN)
- Add page transitions
- Add case study sub-pages per project
- Add blog/insights section
