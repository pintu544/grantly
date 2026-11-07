# Grantly — Unified Scholarship Discovery & Management Platform

Built for **The Outpost — Frontend Arena** (Unstop), Round 1 "Frontend Mission", 7 Nov 2026.
The brief: **GRANTLY — Rethinking the Scholarship Experience**. Students struggle to find
relevant opportunities, understand their options, navigate applications, and track important
information. Grantly turns that into one seamless journey: **Discover → Understand → Apply → Track**.

## What it does

- **Discover** — 20 sample scholarships with search, category/level/state filters, sorting
  (best match, closing soonest, highest amount) and a "strong matches only" toggle.
- **Eligibility matcher** — an editable student profile (level, marks, family income, category,
  gender, state, disability, sports, minority) scores every scholarship and shows a
  criterion-by-criterion checklist of what you meet and what you miss.
- **Scholarship detail** — award, deadline countdown, benefits, required documents and a
  step-by-step application guide.
- **Application tracker** — move applications through Saved → Documents → Applied → Under review
  → Shortlisted → Awarded/Rejected, with a per-application document checklist, notes and live
  deadline countdowns.
- **Compare** — line up to three scholarships side by side; the best amount, nearest deadline
  and top match are highlighted.
- **Dashboard** — strong matches, potential award value, saved and in-flight counts, and a
  "closing soon" timeline for everything you are tracking.

All state (profile, saved items, applications, documents, notes) persists in `localStorage`.
No backend, no accounts.

## Tech

React 19 + Vite + TypeScript + Tailwind CSS 4. Icons: lucide-react. UI built following the
Impeccable design skill (detector pass clean).

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build (tsc + vite)
npm run preview  # serve the production build
```

## Data note

Scholarship listings are **sample data created for this hackathon demo** — names, amounts,
seats and deadlines are illustrative. Real applicants should always verify eligibility,
amounts and deadlines on each scheme's official portal.
