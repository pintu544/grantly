# TASKS — Grantly build (7 Nov 2026, ~12:35–18:00 IST)

Approval gate waived by Pintu's 6 Nov go. Deadline 19:00 IST; aim submit by 18:00.

- [x] 1. Fetch brief + submission requirements (browser, done 12:31 IST).
- [x] 2. Report (a) brief received to main chat.
- [x] 3. Spec pass: SPEC.md / DESIGN.md / TASKS.md.
- [x] 4. Scaffold: Vite + React + TS + Tailwind in ~/workspace/outpost-frontend.
- [x] 5. Data: src/data/scholarships.ts (~20 realistic sample scholarships, labelled sample).
- [x] 6. State: profile + saved + applications + documents + notes, localStorage-persisted.
- [x] 7. Views: Dashboard, Discover (search/filter/sort), Detail, Tracker, Compare, Profile.
- [x] 8. Impeccable detector pass (zero findings); visual check at 390px and 1280px (browser QA running).
- [x] 9. Production build passes; smoke-test key flows (browser QA running).
- [x] 10. Deploy to Vercel via ~/workspace/bin/vc; verify live URL serves the app.
  Live: https://outpost-frontend-delta.vercel.app (HTML+JS+CSS 200).
- [x] 11. Push to public GitHub repo under pintu544.
  Repo: https://github.com/pintu544/grantly (commit d8f49f2, main).
- [ ] 12. Report (b) built + live to main chat.
- [ ] 13. Submit on Unstop (form: single 500-char field — live URL + repo URL) and check
        Frontend Arena submission route; confirm wording.
- [ ] 14. Report (c) submission confirmed to main chat; log + close tracked item
        goal_b9e7aa19919f.

## Notes
- Vercel CLI was missing from /usr/bin (VM replacement wiped it); reinstalled via
  `npm install -g vercel` (v65.12.1). Wrapper ~/workspace/bin/vc works again.
- Unstop submission form quirk (verified 12:31 IST): single required textbox labelled
  "not yet *", 500-char limit — no dedicated URL fields. Plan: paste live URL + repo URL
  + one-line description into that field.
- Frontend Arena submission route is behind a Google sign-in at frontendarena.online;
  check after the build; may need Pintu's sign-in.
