# Design System: Dassa Solutions (phone & internet pages)

Scope: the whole public site. Phone & internet pages (`phone-internet/`, `es/phone-internet/`, `phone-suite.html`,
`es/phone-suite.html`) use `business-phone-internet.css` + `phone-internet/sections.css` + `phone-internet/audit.css`.
The home page (`index.html`, `experience.css`) opens with the Industry Playbooks hub (added 2026-09-29) and keeps
the approved Build 053 story hero, one-call math, and About sections below it.

## 1. Visual Theme & Atmosphere
A commercial audit sheet, not a startup landing page. Flat navy and slate blocks, hard square edges,
hairline and 2px rules, one amber accent. It should feel like a well-run service counter: plain,
exact, trustworthy, a little industrial. Density: balanced (5). Variance: low-to-moderate (3); structure
is predictable on purpose because the reader is a busy owner comparing bills. Motion: restrained (2):
hover underlines and button press only.

## 2. Color Palette & Roles
- **Navy Ink** (#06121F) — hero, dark blocks, table header, primary text on light
- **Navy Deep** (#040C15) — footer
- **Navy Panel** (#0D2235) — closing band, call-handling cells
- **Slate Field** (#E4EAF0) — alternating section background, table header row, dividers between navy cells
- **Paper** (#FFFFFF) — light sections, form surface
- **Ink Text** (#0F2130) — body text on light
- **Muted Steel** (#40566A) — secondary text on light
- **Rule Line** (#B7C5D1) — hairline rules, list dividers
- **Signal Amber** (#F2B544) — the ONLY accent: primary buttons on navy, hero bottom rule, list markers, current-state underline on dark
- **Link Blue** (#005FC5 / #004B9B) — text links, current-tab underline on white header only
- **Audit Red** (#8A1F1F) and **Audit Green** (#0D5A3A on #EEF5F1) — only inside the cost comparison, for "today" vs "right-sized"
No purple, no neon, no gradients, no glows, no pure black.

## 3. Typography Rules
- **Family:** Aptos → Segoe UI → Arial (system stack). Known gap: Aptos exists only on Windows 11, so Mac/phones fall back. Replacing it with one self-hosted face is an open decision for Eric, not a license to swap fonts ad hoc. Do not introduce Inter.
- **Display:** h1 clamp(38px, 4.7vw, 58px), line-height 1.08, tracking -0.04em, weight 800, white on navy.
- **Section h2:** clamp(32px, 3.4vw, 45px), weight 800, tracking -0.03em, directly under a 3px navy rule. No label above it.
- **Body:** 16–18px, line-height 1.6, max ~65ch. Nothing a customer must read goes below 14px.
- **Numbers:** tabular numerals in any table or price.
- **Monospace:** Cascadia Mono / Consolas only for the audit-sheet header strip. Never as decoration elsewhere.

## 4. Component Stylings
- **Header:** white, 2px navy bottom rule. Brand left, nav centered by CSS grid (1fr auto 1fr), action button + EN | ES right. Collapses to the Menu button at 1100px (English) / 1160px (Spanish). The hotel tab is set apart by a 1px divider. EN is blue, ES is red per Eric's rule when the switch is restyled.
- **Buttons:** 4px radius, 14px bold text, arrow glyph after the label. Amber fill on navy, blue fill on white, 1px outline for secondary. Hover lifts 2px; press scales down.
- **Hero:** navy, amber 4px bottom rule. Copy left (h1, lead, one primary + one secondary action, 4 square-bullet facts). Photo right, 4:5, 1px #2A4258 border, square corners. Below 900px the photo drops under the copy at 16:10.
- **Blocks instead of cards:** grids of navy cells separated by 2px slate lines inside a 2px navy frame. No rounded cards, no drop shadows.
- **Cost comparison:** a real `<table>` with a navy header strip, slate column heads, red "today" column, green "right-sized" column, 2px navy total rule, navy savings bar with the figure in amber.
- **Lists:** square 7–10px markers (amber on navy, blue or red on white). No check-mark glyphs.
- **Forms:** label above input in sentence case, 16px inputs, 3px radius, amber top rule on the form panel.

## 4b. Home page: Industry Playbooks hub
- First screen = one headline and three full-bleed photo cards (Car Washes, Automotive Repair, Hotels & Hospitality),
  edge to edge inside a 2px #2A4258 frame, 2px dividers, no gaps, no rounded corners.
- Each card: photo fills the card; a navy gradient from the bottom carries the copy; title in uppercase display type,
  one 2–3 sentence problem statement in the trade's own words, one underlined "Open the … playbook →" link.
  No badges, no numerals, no icons, no stats.
- Hover: photo scales 1.04 over 700ms ease-out; the link's arrow gap widens. Nothing else moves.
- Below 950px the three cards stack. Minimum card height 320px on phones.
- Copy rule for cards: name the physical bottleneck (wet tunnel, advisor under a hood, PBX closet), then the fix,
  in plain trade language. No "seamless", "elevate", "solutions", "empower".
- The one "Not one of these three?" line under the grid is the only escape hatch. Keep it.

## 5. Layout Principles
- Shell max 1140px (header 1440px). Sections alternate Paper / Slate Field.
- One idea per section: heading, then one structure (table, row list, cell grid, or two paragraphs).
- No three-equal-card rows as the default; four-cell and three-cell navy grids are allowed only when the content is genuinely parallel.
- Single column below 800px. No horizontal scroll at 360px, ever. Tap targets 44px.

## 6. Motion & Interaction
Nav underline grows on hover (0.2s). Buttons lift on hover and compress on press (under 200ms, ease-out).
Hover effects only for mouse pointers. Everything off under prefers-reduced-motion. No entrance animations.

## 7. Anti-Patterns (Banned)
- Eyebrow / kicker labels above headings (removed 2026-09-29; do not reintroduce). Exception: the rotating story hero's scene label ("Car Washes / 01") is a live counter, not a kicker.
- 01 / 02 / 03 numerals on cards or steps.
- Emojis, check-mark glyphs, Unicode icons standing in for an icon set.
- Rounded cards, soft shadows, glass, gradients, gradient text, glows.
- A second accent color; purple or neon anything; pure black.
- Pills or badges pinned above headings ("RECOMMENDED", "NEW").
- AI copy: elevate, seamless, unleash, next-gen, revolutionize, game-changer.
- Unbacked claims: invented dollar figures, "zero downtime", "never drop", uptime numbers without "stated".
- Fake names and placeholder brands. Hotel/phone photos may be AI-generated (Eric, 2026-09-29) but must be photorealistic, show no identifiable people, and carry no readable brand or text.
- Blending Strategy Partners copy or styling into these pages.
