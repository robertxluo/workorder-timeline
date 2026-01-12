# AGENT.md — Work Order Schedule Timeline

## Spec
See `SPEC.md` for the full take-home prompt and requirements.

## 0) North Star
Build an interactive timeline for manufacturing work orders across work centers:
- View work orders across **Day / Week / Month** zoom levels
- **Create** by clicking empty timeline space
- **Edit/Delete** via actions menu on each work order
- **Prevent overlaps** on the same work center (show error; do not save)

Timebox: 6–8 hours. If anything is incomplete, leave `@upgrade` comments explaining what’s next.

---

## 1) Hard Requirements Checklist (must ship)
### UI + Interaction
- [ ] Split layout: **fixed left column** (Work Centers) + **horizontally scrollable** timeline area
- [ ] Timescale dropdown: Day / Week / Month
- [ ] Current day indicator line
- [ ] Row hover highlight
- [ ] Work order bars: name + status pill + 3-dot actions (Edit/Delete)
- [ ] Slide-out panel (right side): Create + Edit modes
- [ ] Close behaviors: click outside closes; Cancel closes; save closes on success

### Validation (must ship)
- [ ] Required fields: Name, Status, Start Date, End Date
- [ ] End date must be after start date
- [ ] No overlap within the same work center (exclude self on edit)
- [ ] Show overlap error in panel (and block save)

### Tech Stack (must comply)
- [ ] Angular 17+ (standalone preferred)
- [ ] TypeScript strict
- [ ] SCSS styling
- [ ] Reactive Forms
- [ ] `ng-select` for Status dropdown
- [ ] `@ng-bootstrap/ng-bootstrap` for `ngb-datepicker`

### Deliverables (must ship)
- [ ] Hardcoded sample data: 5+ work centers, 8+ work orders, all statuses, at least one center with multiple non-overlapping orders
- [ ] README (run steps, approach, libraries/why)
- [ ] Loom demo (5–10 min): zoom switch, create, edit, delete, overlap error, code tour
- [ ] Public repo with runnable app and clean commits

---

## 2) Architecture (keep it simple, easy to explain)
### Components
- `WorkOrderTimelineComponent`
  - Renders header + rows + bars
  - Handles scroll container and “today” indicator
  - Handles click-to-create mapping (x => date)
- `WorkOrderPanelComponent`
  - Slide-out panel for create/edit using a single form
  - Owns form validation + overlap display
- Optional (only if needed for cleanliness):
  - `WorkOrderBarComponent` (bar UI + actions menu)

### Services / State
- `WorkOrderStoreService`
  - Source of truth: work centers + work orders
  - CRUD methods (create/update/delete)
  - Overlap checker
  - `@upgrade` localStorage persistence

### Utils
- Date-only utilities (avoid timezone bugs; store `YYYY-MM-DD`)
- Timeline math utilities (date => x, x => date, range width)

---

## 3) Timeline Model + Date Math Decisions
### Storage format (non-negotiable)
- Work order `startDate`, `endDate` are date-only ISO strings: `YYYY-MM-DD`.

### Rendering strategy (recommended)
Render a day-based grid for all zoom levels; zoom changes:
1) visible range buffer (how many days shown)
2) `pxPerDay` (scale)

Suggested configs:
- Day: ±14 days, `pxPerDay ≈ 48`
- Week: ±60 days, `pxPerDay ≈ 16`
- Month: ±180 days, `pxPerDay ≈ 8`

Bar positioning:
- `x = diffDays(visibleStart, startDate) * pxPerDay`
- `width = (diffDays(startDate, endDate) + 1) * pxPerDay` (inclusive)

Header labels:
- Day view: label each day
- Week view: group into weeks (label once per 7-day segment)
- Month view: group by month boundaries

`@upgrade`: virtualized rendering for huge ranges (only if performance becomes an issue).

---

## 4) Overlap Rule (single source of truth)
For a given work center, two orders overlap if their date ranges intersect (inclusive):
- overlap unless `(a.end < b.start) OR (a.start > b.end)`
- On edit: exclude the order being edited from the check.

UX:
- Show inline form error: “Overlaps with existing work order on this work center.”
- Block Create/Save.

---

## 5) Sample Data Requirements (hardcoded)
Create:
- 5+ work centers (manufacturing-like names)
- 8+ work orders total
- All 4 statuses represented: `open`, `in-progress`, `complete`, `blocked`
- At least one work center with multiple **non-overlapping** orders
- Multiple date ranges across the visible window (some before/after today)

---

## 6) Build Plan (6 steps, ~1 hour each)
### Hour 1 — Shell + layout
- App shell (title, timescale dropdown placeholder)
- Split layout: left fixed column, right scroll area
- Base SCSS tokens + typography (Circular Std)
Output: UI structure matches design layout; scrolling works.

### Hour 2 — Timeline range + header + today line
- Date-only utils + timeline config
- Day view header with day columns
- Grid background + current day indicator
Output: timeline feels real; today line renders at correct x.

### Hour 3 — Rows + bars (read-only)
- Render work centers
- Render work orders as positioned bars with status pills
- Actions menu button present (no behavior yet)
Output: pixel-aligned bars appear in correct rows with status styling.

### Hour 4 — Delete + actions menu
- Implement dropdown menu (Edit/Delete)
- Delete action updates store and UI
Output: user can delete work orders via menu.

### Hour 5 — Create flow (panel + click-to-create)
- Slide-out panel component
- Reactive form with ng-select (status) + ngb-datepicker (dates)
- Click empty timeline to open create panel; prefill start/end
Output: user can create new work order and see it appear.

### Hour 6 — Edit + overlap validation + polish
- Edit opens same panel prefilled; save updates
- Overlap detection (create + edit)
- Close behaviors (outside click, cancel), hover states, transitions
Output: core feature complete + shippable demo.

`@upgrade` (if time remains): localStorage, keyboard nav (Esc close), tooltips, tests.

---

## 7) Pixel-Perfect Implementation Notes
- Use Sketch to measure:
  - left column width, row height, paddings
  - grid line color and spacing
  - badge radius/height, font sizes/weights
- Keep key layout metrics as SCSS variables or CSS custom properties.
- Use `text-overflow: ellipsis` on bar labels; keep actions aligned.

`@upgrade`: refine datepicker styling to match design system exactly.

---

## 8) Testing (bonus but targeted)
Minimum “high-value” unit tests:
- overlap checker
- date math conversion (diff/add)
- `x <-> date` conversions (click-to-create)

`@upgrade`: Cypress/Playwright e2e for create/edit/delete/overlap.

---

## 10) README Contents (required)
- Run instructions: `npm i`, `ng serve`
- Stack + libraries used (ng-select + ng-bootstrap) and why
- Approach: date-only model, day-grid rendering strategy, overlap rule
- Known gaps + `@upgrade` list (if any)

---

## 11) AI Prompts Log (required for key decisions)
Record prompts and outcomes in `AI_PROMPTS.md` (separate file). Example format:

- **Prompt:** …
- **Decision:** …
- **Why:** …
- **Resulting change:** files touched / snippet

`@upgrade`: include screenshots or short GIFs if useful.
