# TASKS — Grantly build (7 Nov 2026, ~12:35–18:00 IST)

Approval gate waived by Pintu's 6 Nov go. Deadline 19:00 IST; aim submit by 18:00.

- [x] 1. Fetch brief + submission requirements (browser, done 12:31 IST).
- [x] 2. Report (a) brief received to main chat.
- [x] 3. Spec pass: SPEC.md / DESIGN.md / TASKS.md.
- [x] 4. Scaffold: Vite + React + TS + Tailwind in ~/workspace/outpost-frontend.
- [x] 5. Data: src/data/scholarships.ts (~20 realistic sample scholarships, labelled sample).
- [x] 6. State: profile + saved + applications + documents + notes, localStorage-persisted.
- [x] 7. Views: Dashboard, Discover (search/filter/sort), Detail, Tracker, Compare, Profile.
- [x] 8. Impeccable detector pass (zero findings, re-run after fixes); visual check at 390px and 1280px (Playwright headless: no horizontal overflow on any view; all card buttons measured inside cards).
- [x] 9. Production build passes; smoke-test key flows (browser QA 12:43–12:58 IST + Playwright flows: search, save, apply, docs, status, compare all work).
- [x] 10. Deploy to Vercel via ~/workspace/bin/vc; verify live URL serves the app.
  Live: https://outpost-frontend-delta.vercel.app (HTML+JS+CSS 200; redeployed after QA fixes).
- [x] 11. Push to public GitHub repo under pintu544.
  Repo: https://github.com/pintu544/grantly (commits d8f49f2, ce85b83).
- [x] 12. Report (b) built + live to main chat.
- [x] 13. Submit on Unstop (form: single 500-char field — live URL + repo URL) and check
        Frontend Arena submission route; confirm wording.
  Unstop SUBMITTED ~13:12 IST, verified stored: form re-open shows the exact text with
  both links clickable + note "You can view & change your submission below until this
  round is live."; round button now reads "Submission". No confirmation banner wording
  was shown (page showed "100% Please wait", then redirected with ?rstatus=1).
  Frontend Arena: signed in via Google (no password needed), but NO submission option
  exists there — only "Register Now". Did not register (not authorised). Unstop is the
  round's submission channel, so the entry stands.
- [x] 14. Report (c) submission confirmed to main chat; log + close tracked item
        goal_b9e7aa19919f. [done 13:17 IST]

## QA fixes applied (from browser QA 12:58 IST)
- Discover "Details" button clipped at 1280px: tightened action-row padding/gaps,
  flex-wrap, dropped arrow; verified by measurement: zero buttons overflow at 390/1280.
- Detail match ring dark-on-dark: added dark tone (gold ring, white text).
- Amount/date rows wrapping: whitespace-nowrap on chips and amounts.
- Stat labels ("IN FLIGHT" wrapping): shortened to Matches/Potential, nowrap.
- Mobile 390px + desktop 1280px verified via Playwright headless shell (cached
  chromium_headless_shell-1187): no horizontal overflow on any view; all flows work.
  Only console error is Google Fonts failing through the VM proxy in headless shell
  (ERR_TUNNEL_CONNECTION_FAILED) — fonts fall back; loads fine in a real browser.
- Vercel CLI was missing from /usr/bin (VM replacement wiped it); reinstalled via
  `npm install -g vercel` (v65.12.1). Wrapper ~/workspace/bin/vc works again.
- Unstop submission form quirk (verified 12:31 IST): single required textbox labelled
  "not yet *", 500-char limit — no dedicated URL fields. Plan: paste live URL + repo URL
  + one-line description into that field.
- Frontend Arena submission route is behind a Google sign-in at frontendarena.online;
  check after the build; may need Pintu's sign-in.
