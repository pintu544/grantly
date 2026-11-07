# DESIGN — Grantly

## Mode
Operate (dashboard/tool) with a Persuade landing moment: the home view earns trust fast,
then the product gets out of the way.

## Visual world
"Scholarship office, redesigned." Warm paper, deep ink-green authority, gold award accent.
Calm, trustworthy, a little celebratory — money for education should feel hopeful, not
bureaucratic.

- **Palette**
  - Ink green (primary): #0C3B2E — headers, primary buttons, active nav.
  - Deep green hover: #0A2E24.
  - Paper: #F7F5EF warm off-white page background; cards pure white #FFFFFF.
  - Gold (award/money): #C79A2B / #B8860B accents, used sparingly for amounts, badges.
  - Mint tint: #E6F2EC for selected/filter chips and success states.
  - Danger/urgent deadline: #B42318; amber warning: #B54708.
  - Text: #1A1F1C primary, #5B6360 secondary.
- **Typography**
  - Display: "Fraunces", serif — hero headline, scholarship names, big numbers.
  - UI: "Inter", sans — everything else. System fallback stack.
  - Scale: hero 40–56px, section titles 24–28px, card titles 17–18px, body 14–15px.
- **Shape & space**
  - Radius: 14px cards, 10px inputs, full-round pills/chips.
  - Borders: 1px #E5E1D8 on cards; soft shadows only on hover/elevated panels.
  - Generous whitespace; 24px section gaps; max content width 1200px.

## Layout
- Top nav: Grantly wordmark (graduation-cap mark), Discover / My Applications / Compare /
  Deadlines, profile avatar button, mobile hamburger.
- Home = Dashboard hero (greeting, match summary, stats strip) + "Deadlines near you"
  timeline + recommended scholarships (top matches) + quick actions.
- Discover: left filter rail (collapses to a drawer on mobile) + results grid, 3 cols
  desktop / 1 col mobile; each card: provider, name, award, deadline chip (days left,
  red < 7 days), match % ring, category tag, Save button.
- Detail: modal-style full page (route-less view) with sticky header, eligibility
  checklist, documents, steps timeline, Apply CTA.
- Tracker: kanban-ish status columns on desktop, stacked grouped list on mobile;
  each application card shows documents progress bar and next deadline.
- Compare: table, max 3 columns, sticky first column, highlight best value per row.

## Motion
Subtle only: 150–200ms ease on hover lifts, chip toggles, modal fade/slide; deadline
countdown chips pulse gently when < 3 days. No scroll-jacking, no heavy animation libs.

## Accessibility
- All interactive elements keyboard-focusable with visible focus ring (green outline).
- Colour never the only signal (deadline chips also carry text "3 days left").
- aria-labels on icon buttons; modal traps focus and closes on Esc.
- Contrast: body text ≥ 4.5:1 on paper/white.

## Impeccable
Detector pass runs before calling the UI done (see TASKS.md).
