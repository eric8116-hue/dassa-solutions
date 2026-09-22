# Dassa Solutions Website Build History

Build numbers use `DS-YYYY.MM.DD-NNN`. Build numbers identify revisions; approval is recorded separately.

| Build | Status | Approved change |
|---|---|---|
| DS-2026.09.20-001 | Superseded | Role-family carousel introduced for the 52-agent catalog. |
| DS-2026.09.20-002 | Superseded | Eight-industry explorer and fuzzy business-type search introduced. |
| DS-2026.09.20-003 | Last approved preview | Cinematic Virtual Roles Section Hero, custom dashboard visual, and visible build identification. |
| DS-2026.09.20-004 | Superseded by 011 | Unified business summaries, sourced Auto Repair + Spas pilots, context-aware audit booking, 32/32 browser QA. |
| DS-2026.09.22-005 | Approved by Eric 2026-09-22 | Layout only: hero trimmed, Virtual Role search moved into its own section under the hero. |
| DS-2026.09.22-006 | Approved by Eric 2026-09-22 | Summary card fade/rise entrance, and its reveal deferred until the smooth scroll lands. |
| DS-2026.09.22-007 | Approved by Eric 2026-09-22 | Press feedback on every button, and the hover lift gated so it no longer sticks after a tap. |
| DS-2026.09.22-008 | Approved by Eric 2026-09-22 | Motion pass: carousel crossfade, dropdown entrances, mobile nav slide, call-flow auto-play. |
| DS-2026.09.22-009 | Approved by Eric 2026-09-22 | Impeccable pass: kickers, side-tab borders, card accent bars and resting glows removed. |
| DS-2026.09.22-010 | Approved by Eric 2026-09-22 | Schibsted Grotesk replaces Inter; "Example call flow"; one business-finder label. |
| DS-2026.09.22-011 | Approved by Eric 2026-09-22 | Search ghost text "Choose your business type"; placeholder contrast fixed. |
| DS-2026.09.22-012 | Draft, awaiting review | The "car wash" funnel: staged progressive reveal, drifting band, schema v2, batch-1 content (8 real, 44 honest fallback). |

The current build is also recorded in `build.json` and displayed on the website as a fixed preview badge.

## DS-2026.09.20-004 — tested, approved by Eric 2026-09-22

- Reviewed Auto Repair and Spas scenarios loaded from approved-vertical-response-library.json; Gyms remains source-needed.
- Unified 52-role selection, ten unchanged legacy calculator presets, and business-specific Calendly preparation context.
- Fixed search/URL divergence, stale cleared-search results, role keyboard focus, mobile menu Escape/position, and text contrast.
- 32/32 browser QA checks passed on 2026-09-20, with desktop/tablet/mobile screenshots. Mobile build badge moved below the footer to avoid obscuring buttons.
- Private preview is a loopback-only local snapshot at http://127.0.0.1:8802/. No GitHub push or public deployment.
- Approved by Eric on 2026-09-22 as reviewed live in the Site Preview Screen tool.

## DS-2026.09.22-005 — draft, untested, awaiting Eric review

Layout-only follow-on requested by Eric right after approving 004. No business content, calculator, or JS logic changed.

- Hero trimmed: removed the three-pill "New opportunities / Customer relationships / Staff workflow" list and the "No telecom lecture" note line, so the hero reads headline, lede, and two CTAs only.
- The Virtual Role search ("Not a Generic Bot. A Virtual Role." + business search + Popular industry links) moved out of the dark Virtual Roles section and into its own section directly under the hero, so visitors reach it without scrolling past the calculator and proof sections first.
- The Virtual Roles section (`#virtual-roles`) now starts at "Or browse all eight industries" — the search itself lives in the new section above it. Section given `aria-label` directly since its heading moved with the search block.
- Not yet browser-tested. Needs the same QA pass as 004 (search still functions, industry tabs, keyboard nav, mobile stacking) before this can be marked approved.

## DS-2026.09.22-006 — draft, untested, awaiting Eric review

Motion follow-on to Build 005. Carries forward all of 005's layout changes; no business content,
calculator, or role-catalog logic touched. First item built from the read-only animation audit.

- **Summary card entrance.** `.fit-result` (`#fitResult` and `#fitEmpty`) now transitions `opacity`
  and `transform` instead of flipping `hidden` instantly: rises 16px and fades in over 960ms on the
  `--ease-out` curve, exits over 600ms. Uses `@starting-style` plus `transition-behavior: allow-discrete`,
  which is what allows a `display:none` element to animate at all. Requires Chrome 117+; older browsers
  fall back to the previous instant toggle with no error.
- **Reveal now waits for the scroll.** `showSummary()` previously fired the card and smooth-scrolled to
  it in the same tick, so the entrance completed off-screen and was never visible. It now scrolls first
  and reveals on the `scrollend` event, with a 1400ms timeout fallback for browsers without `scrollend`.
  If the section is already on screen the reveal stays immediate, so changing business while sitting on
  the card has no added delay.
- **Reduced motion** is unchanged and still handled by the existing site-wide rule, which zeroes all
  transition durations. The scroll path also keeps its original `behavior:'auto'` branch.
- Duration chosen by Eric on 2026-09-22 by comparing 1x/2x/4x/8x presets live in the draft; 4x (960ms /
  16px) selected. The temporary on-page speed tuner used for that comparison has been removed.
- Still needs: the `scrollend` fallback verified in a browser lacking `scrollend`, the reduced-motion
  path checked, and the mobile-stacking and keyboard tab-order checks still outstanding from 005.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## DS-2026.09.22-007 — draft, untested, awaiting Eric review

Second item built from the read-only animation audit. Stacks on 005 (layout) and 006 (summary-card
entrance). No business content, calculator, or role-catalog logic touched.

- **Press feedback added site-wide.** No button anywhere on the site previously had an `:active` state.
  `.btn`, `.quick-pick`, `.role-tab`, `.agent-industry-tab`, `.vr-quick-link`, `.agent-role-cta`,
  `.agent-arrow`, `.nav-toggle` and `.replay-button` now scale to `.97` on press over 120ms;
  `.agent-option` uses `.98` because it is a card rather than a pill and a deeper scale reads wrong at
  that size. Declared last in the stylesheet so `:active` beats `:hover` on source order.
- **Stuck hover lift on touch fixed.** `.btn:hover{transform:translateY(-2px)}` was ungated, so tapping
  a button on a phone left it hovering until the next tap elsewhere. It is now inside
  `@media(hover:hover) and (pointer:fine)`. Colour-only hover rules were deliberately left ungated —
  a lingering hover colour is harmless where a lingering lift is not.
- `.btn`'s transform timing moved from `.18s ease` to `120ms var(--ease-out)`, so the press and the
  hover lift share the site's one easing token instead of the weak built-in `ease`.
- **Deliberately excluded:** `.finder-option` and `.agent-search-result`. Clicking either closes its
  dropdown immediately, so a 120ms press animation would fire on an element that is already unmounting
  and could flicker. Their existing instant background change remains the feedback.
- Verified no control on the list uses `transform` for positioning, so the press scale cannot displace
  anything. Only three `transition` declarations existed in the file beforehand, so nothing was clobbered.
- Still needs: confirmation on a real touch device that press feedback reads correctly and the hover
  lift no longer sticks.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## DS-2026.09.22-008 — draft, untested, awaiting Eric review

Completes the six-item read-only animation audit. The remaining four recipes were built as one build
rather than one each, to keep the history readable. No business content, calculator, or role-catalog
logic touched.

- **Carousel industry swap (audit #2).** Changing industry now shifts the panel's content 12px in the
  direction of travel and fades it in over 280ms. Deviation from the audit, which named
  `.agent-family-main`: that element is the bordered panel itself, and translating it would slide the
  frame. The two inner panes (`.agent-family-copy`, `.agent-role-demo`) move instead, clipped by the
  panel's existing `overflow:hidden`. Direction is taken from the raw index before wrapping, so
  last-to-first still reads as "next". Built with transitions rather than keyframes so rapid arrow
  clicks retarget instead of restarting.
- **Deliberately excluded from #2:** selecting a different business *within* an industry stays instant.
  It is the higher-frequency action, it already has `is-selected` plus press feedback, and animating the
  whole panel each time would make browsing roles feel slower — the same reasoning the audit used to
  reject animating the industry tab active state.
- **Search dropdowns (audit #3).** Both `.agent-search-results` and `.finder-results` now fade and rise
  from `translateY(-6px) scale(.98)` over 150ms with `transform-origin:top center`. The audit named only
  the first; the second is the same component pattern on the same page and leaving it instant would have
  been an inconsistency.
- **Mobile nav (audit #4).** Slides down 10px and fades over 250ms on `--ease-drawer`. Deviation from the
  audit, which suggested sliding in from the right: the panel is `position:fixed; top:100%; left:0;
  right:0`, a full-width sheet anchored under the header, so it is spatially wrong for it to arrive from
  the right edge. It now comes from the header it belongs to.
- **Call-flow auto-play (audit #6).** An `IntersectionObserver` at a 0.5 threshold adds the existing
  `is-replaying` class once, then disconnects. Reuses the `callPulse` / `recoveredGlow` keyframes already
  in the file; no new animation was written. Skipped entirely under reduced motion and where
  `IntersectionObserver` is unavailable. The auto-play deliberately does **not** write to `flowStatus` —
  the manual Replay announces itself, but an unprompted screen-reader announcement would be noise.
- A second easing token `--ease-drawer: cubic-bezier(0.32,0.72,0,1)` was added alongside `--ease-out`.
- Both inline script blocks pass `node --check`.
- Still needs: carousel direction verified across the last-to-first wrap, dropdown entrance checked
  against its own `overflow:auto` clipping, mobile nav open/close on a real phone, and confirmation the
  call-flow plays exactly once with manual Replay still working after it.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## DS-2026.09.22-009 — draft, untested, awaiting Eric review

Design pass driven by the Impeccable skill's mechanical detector, which found 58 issues before and 39 after.
This is a **refinement**, not a redesign: the incumbent look, all factual copy, and every behaviour were
preserved. This build changes what the page looks like, so it needs an eyes-on review, not just a QA pass.

- **Every kicker/eyebrow above a heading removed (9).** The skill's craft floor treats this as an outright
  ban rather than a default — "the heading carries its own weight". Eight `.eyebrow` labels, the
  "Industry" carousel kicker, and the empty-state label are gone. "Meet your Virtual Role" was the one
  whose words carried real information, so it was folded into its heading as "Your Virtual Role: <name>"
  rather than deleted. The `#fitResultLabel` line was dropped outright as it restated the h3 directly
  below it; its entry in the `renderSummary` fields map was removed with it.
- **Colored side-tab borders removed.** `border-left: 3px/4px` on `.fit-examine`, `.role-pressure` and
  `.summary-role`. The craft floor names this the most recognizable tell of AI-generated UI. Each block
  keeps its background tint and gains a uniform border-radius where it previously had a squared-off edge.
- **Accent bars on rounded cards removed.** `border-top: 4px` clashing with `border-radius: 20px` on
  `.proof-card.primary`, `.proof-card.secondary` and `.system-card`. The primary proof card now carries a
  soft blue elevation shadow instead, so it still reads as the dominant one.
- **Resting colored glows replaced.** Zero-offset halos on `.live-dot`, `.status-live::before` and
  `.incoming-icon` are decoration rather than depth. `.incoming-icon` now uses a real offset elevation
  shadow. The `callPulse` / `recoveredGlow` keyframes were deliberately kept — that animation is the
  page's one authored moment, which the craft floor explicitly allows.
- **Heading order fixed.** `<h1>` was followed by `<h3>Incoming call</h3>`, skipping h2. Now an `<h2>`,
  with its style rule renamed to follow.
- **Text below the 11px floor raised** from `.66rem`/`.67rem` to `.75rem`.
- Both inline script blocks pass `node --check`. Key content verified present on the served preview.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## DS-2026.09.22-010 — draft, untested, awaiting Eric review

Eric's decisions on the four judgment calls surfaced by the 009 Impeccable pass. Unlike 009, this build
changes factual copy, so it was not done without his sign-off.

- **Typeface: Inter to Schibsted Grotesk.** Inter was flagged as an overused face that no longer reads as
  distinctive. Schibsted Grotesk keeps the professional grotesque voice the incumbent design chose but
  carries real character in the heavy weights the headings use. Still loaded from Google Fonts to match
  the existing architecture; all six weights (400-900) confirmed served before the swap. Self-hosting
  remains an option and would remove the third-party request.
- **"Live call flow" is now "Example call flow."** The hero diagram is a planning illustration, but the
  label, the coloured dot and "Coverage ready" together implied a running system, while the page says
  elsewhere these are planning examples. The visible label and the `aria-label` were both corrected. The
  glowing dot was already de-glowed in 009.
- **One label for finding a business type.** "Find my fit", "Find your business" and "Choose or change
  your business" are now all "Find your business type".
- **Deliberately left alone:** the carousel's "See your communication summary". The earlier design-taste
  audit grouped it with the other three, but in context it is the opposite action - the visitor has
  already chosen a business in the carousel and this takes them down to the result. Its JS-set aria-label
  ("Read the communication summary for X") confirms it. Renaming it to a finder label would have been a
  regression.
- **Tabular numerals** added to `.output-value` and `.proof-stat strong` so digits stop shifting width as
  the calculator updates.
- `overused-font` cleared from the detector; 38 mechanical findings remain, all of them ones that need
  rendered output to judge.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## DS-2026.09.22-011 — draft, untested, awaiting Eric review

Eric's answer to the last open Impeccable question: the blank summary card should not be pre-filled with a
default business. Guidance belongs in the search field instead.

- **Search placeholder is now "Choose your business type"**, replacing "e.g. Mechanic, Dentist, Roofing,
  Hotel...". The example business types are still available as the Popular industry chips directly below
  the field, so nothing was lost by dropping them from the placeholder.
- **Placeholder contrast fixed.** `.agent-search input::placeholder` was `#6b7d90`, 4.23:1 on white, below
  the 4.5:1 AA floor for placeholder text. Now `#5f7086` at 5.06:1. The placeholder actually rendered on
  the page sits on the dark `.vr-section-hero` and already passed at 7.24:1; the failing rule was the
  light-background fallback.
- The summary card's empty state itself is unchanged and still explains what will appear there.
- Private preview remains loopback-only at http://127.0.0.1:8802/. No GitHub push or public deployment.

## Approval of 005-011 — Eric, 2026-09-22

Eric approved builds 005 through 011 together, in conversation, after each change was described to him.
DS-2026.09.22-011 supersedes DS-2026.09.20-004 as the approved build.

Recorded precisely, because it differs from how 004 was approved: this approval was **not** preceded by a
live review in the Site Preview Screen tool, and **no browser QA was run** on any of 005-011. It approves
the design and copy decisions. It is not a statement that any check passed.

Everything in `build.json` under `qa.note` is still outstanding, including the visible changes nobody has
looked at yet - the Inter to Schibsted Grotesk swap, eight headings losing their label line, and five
blocks losing their accent bars. Nothing has been pushed or publicly deployed at any point.

## DS-2026.09.22-012 — draft, awaiting Eric review

The "car wash" funnel restructure Eric designed on 2026-09-22 — which turned out to be the
556B4 handoff's own journey (business type → problem + valid business reasons → named Virtual
Role → ROI → audit). Starts from `835a0d7`. A structural rebuild of the top of the page;
everything below the funnel (proof, call flow, carousel, what-we-examine, footer) keeps its
content.

### Page
- **New order:** Hero (band + search) → Diagnosis → Virtual Role → Revenue Math → Book, then
  Proof → Call flow → Browse all industries → What we examine. Stages 2-4 are `hidden` until the
  prior one is completed. The exit (`#contact`) is never hidden.
- **Hero** is single-column: new headline ("Tell me your business. I'll tell you where the calls
  are leaking."), a drifting band of all 52 business types (two rows, opposite directions, seamless
  loop, pauses on hover/focus, static wrap under reduced motion, ONE tab stop with roving arrows),
  the search field as the primary action, and a quiet booking link. The old "Not a Generic Bot"
  dark search section and the three quick-link chips are gone.
- **Diagnosis** renders the reviewed Trigger sentence, a 60-120 word paragraph, and exactly two
  valid business reasons (one customer-facing, one workflow) as cards; *Next* → Virtual Role.
- **Honest fallback** is a distinct DOM branch (`#diagnosisFallback`), never boilerplate. An
  unapproved business gets "We'd rather ask than guess," its real role name, a booking link, and
  "Run the numbers anyway" into the calculator.
- **Virtual Role** reuses the dark hero treatment and PNG: "Meet your Virtual <Role>", the intro,
  three things it catches, and the overflow line ("your people answer first"). The HIPAA note
  renders only when the entry's `hipaa` flag is true (9 of 52). Float badges now read "Your team
  answers first" / "Overflow caught and routed".
- **Revenue Math** moved after the role stage. The preset auto-applies on reveal with three
  honest states on `#presetNote[data-preset]`: `business` (example numbers loaded, Re-apply
  button), `none` (generic defaults, labelled), `unselected` (nav force-reveal with no business).
  Fields are never blanked to $0.
- **Book** is personalised with the business name; the Calendly `a1` prefill carries the Trigger
  and `auditFocus`.
- Progress rail (`#stageRail`, `aria-current="step"`) and a screen-reader status line
  (`#stageStatus`: "Stage 2 of 5. Diagnosis for Towing.") on every reveal.
- **Carousel demoted to browse-only.** Arrows, tabs, dots and swipe no longer start the funnel or
  push history. Its CTA now reads "Start with <business>" and is the one path in.
- **Reveal is visibility-triggered.** `scrollThenReveal` scrolls, then reveals on an
  IntersectionObserver at 50% with a 2500 ms safety that reveals *without* scrolling — so the
  entrance can never complete off-screen, which is exactly what the 006 timer version did on
  laptop and every phone (measured by the 011 test suite).
- **Diagnosis choreography** (the one authored moment): panel rise 32px/960ms → business name
  locks in from the left with an underline → Trigger rises → a soft gradient "wash sweep" crosses
  the paragraph → paragraph rises → the two reason cards stagger 240 ms apart → actions. About
  2.9 s, transform/opacity only, `--ease-out`, `both` fill, then settles to `.is-settled`.
  Stages 3-4 get a lighter three-item stagger. The fallback gets only the panel rise.
- Heading focus lands inside the reveal callback — the 011 suite's `fixme` ("focus set then lost
  ~300 ms later") is now a passing assertion on every stage.

### Data
- `approved-vertical-response-library.json` → **schemaVersion 2**, `libraryVersion funnel-1`.
  Entry: status, batch, sourceRef, sourceBuild, reviewedOn, roleName, hipaa, diagnosis
  {trigger, paragraph}, reasons ×2 {kind, label, text}, role {intro, catches[], overflow},
  calculator, calculatorSource, auditLabel, auditFocus.
- `business-summaries.js` rewritten: the base record carries identity only (no more copied
  `verticals.js` prose, no industry-level boilerplate). Accepts v2 only; validates every entry
  and rejects incomplete ones wholesale with a `console.warn` naming the reason (previously
  silent). Role name must match the catalog (drift guard). Adds `window.DassaResolveBusinessId`,
  the single `?vertical=` resolver both scripts now use.
- **Batch 1 content (8 entries)** drafted from the public OC VBRS files per the plan's checklist:
  auto-repair, window-tint, auto-body, dealerships, tire-shops, towing, auto-salvage, and spas
  (carried over from healthcare so nothing that worked in 011 regresses). Paragraphs 100-108
  words. Calculator presets for all 8 derived from `briefs/<vertical>/roi.md` Inputs
  (missed = per-day × 22; plan/price lines excluded). Banned-term scan clean outside `sourceRef`.
  Status `reviewed-for-dassa-pilot`. **Review notes are in
  `content-review/batch1-automotive-review-notes.md`** — the six original bullets per vertical
  with the two chosen marked, so Eric can swap.
- **Pool & Spa Services role corrected** to "Virtual Service Desk" (the flyer table) in
  `agent-catalog.js` and `verticals.js`; the catalog said "Virtual Route Dispatcher".

### Defects fixed in passing
- Duplicate `var selectedVertical` and two unused vars in Script A.
- `#agentFamilyCounter` hardcoded "1 of 7" (there are 8).
- Dead CSS with zero markup matches removed (`.role-*`, `.conversation`, `.message`,
  `.hotel-note`, `.quick-pick`, `.fit-*`, `.finder-*`, `.summary-role*`, `.vr-quick-link*`).
- Two different `?vertical` resolvers (flash on legacy links) → one.
- Reduced-motion rule now also zeroes `animation-delay` / `transition-delay`, so a stagger
  cannot pop in over ~3 s for users who asked for no motion.
- `.summary-note` no longer uses `!important`.
- Navy-on-navy: retagging the call-flow headings had let the global `h3,h4{color:navy}` paint
  invisible text on the dark diagram; the two selectors now follow the tags.
- Stale `animation-demo.html` removed from the preview copy.

### Tests — `tests/dassa-qa.spec.js` rewritten for the funnel
27 tests × 7 viewport projects. Keeps fuzzy search, industry tabs, console-clean, mobile
stacking, keyboard order, and the 007 press/hover checks (press now targets `#usePreset`, a
same-page button — the previous target had become a live Calendly link and the test was
navigating off-site). Adds: library loads with the reviewed batch and zero rejections;
choose → only Diagnosis; Next walk with focus on each heading; honest fallback for
`?vertical=dental`; deep link and hash deep link; legacy `pool-spa`; back button walks the
rail; business change resets downstream; booking prefill; carousel decoupled; choreography
wired and settles; band has 52 chips / one tab stop / arrows / drifts / pauses on hover / static
under reduced motion; no overflow with every stage open; role stage single-column and reason
cards stacked on phones; screen-reader status per stage.
- desktop-1440: 22 passed, 0 failed, 5 skipped (touch-only). Full matrix: see `build.json`.

### Detector
Impeccable mechanical findings 38 (unchanged from 011 once the navy fix landed). The band's
infinite loop is recorded as a sanctioned `marquee` exception with Eric's reasoning.

### Still needs Eric's eyes
The wash choreography on laptop-1024 and a real phone (this was the whole point of the
visibility trigger); the band's drift speed and chip density at 390; whether the 8 diagnosis
paragraphs read in his voice (the review notes list the alternates); and the Pool & Spa role,
which the site and the printed flyer now agree on only because the catalog changed.
Private preview remains loopback-only at http://127.0.0.1:8802/. Nothing pushed or deployed.
