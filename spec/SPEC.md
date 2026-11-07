# SPEC — Grantly: Unified Scholarship Discovery & Management Platform

## Event
The Outpost — Frontend Arena (Unstop), Round 1 "Frontend Mission".
7 Nov 2026, 12:00–19:00 IST. Individual, online, React mandatory.
Submission: live deployment URL + source repo (Unstop form currently shows a single
500-char placeholder textbox "not yet *"; Frontend Arena page describes live URL + repo).
AI tools permitted. Mock data + localStorage allowed. No backend required.

## Brief (verbatim essence)
"GRANTLY — Rethinking the Scholarship Experience." Students struggle to find relevant
opportunities, understand options, navigate applications, and track important information.
Build a modern digital solution that makes the journey simpler, more intuitive, accessible.
Approach, interpretation, design and implementation entirely up to the builder. No mandatory
feature list published — so the app must cover the whole journey convincingly:
**Discover → Understand → Apply → Track.**

## Users
Indian students (Class 11–12, UG, PG) seeking financial assistance; first-generation
applicants with low awareness of schemes; parents helping a child apply.

## Features (must-have)
1. **Discover** — catalogue of ~20 realistic scholarships (merit, need-based, girls,
   minority, STEM, state, disability, sports) with search, filters (level, category,
   amount, deadline, state), sort (deadline, amount, match), and cards showing award,
   deadline countdown, eligibility summary.
2. **Eligibility matcher** — editable student profile (level, course/stream, marks %,
   family income, category, gender, state, disability, sports) → per-scholarship match
   score + criterion-by-criterion checklist (met / not met / unknown).
3. **Scholarship detail** — full view: about, award & benefits, eligibility, required
   documents, key dates, application steps, FAQs; actions: Save, Start application,
   Compare.
4. **Application tracker** — pipeline Saved → Documents → Applied → Under Review →
   Shortlisted → Awarded / Rejected; per-application document checklist with tick-off;
   notes; deadline reminders; status changes persist.
5. **Dashboard** — at-a-glance: saved count, applications in flight, deadlines in next
   14 days, total potential award value of saved+applied, upcoming-deadline timeline,
   "next best action" prompts.
6. **Compare** — side-by-side comparison of up to 3 scholarships (award, deadline,
   eligibility, documents, match score).
7. **Deadline calendar strip** — upcoming deadlines across saved/applied items.
8. **Persistence** — all state (profile, saved, applications, documents, notes) in
   localStorage; seed data is clearly mock/sample.

## Non-goals
No real backend, no real applications submitted, no real scholarship data (sample data
labelled as sample), no accounts/auth, no payments.

## Quality bars
- Production build passes; runs on Vercel.
- Responsive: 360px mobile → 1440px desktop; no horizontal overflow.
- Accessible: keyboard-navigable filters/dialogs, aria labels, focus states, contrast.
- Fast: no heavy deps beyond React + Tailwind; fonts via Google Fonts with system fallback.
