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
