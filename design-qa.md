# B4 QA ? September 20, 2026

Status: tested; awaiting Eric review. Build: DS-2026.09.20-004.

32/32 automated browser checks passed. Coverage: all 52 role selections and eight industries; mechanic/spa/teeth/dentist/hotel/roofing search; one search entry; selected summary and audit CTA; keyboard, Escape, role focus; URLs, pool-spa alias, back/forward and empty state; all ten original calculator mappings, defaults, formula, zero/invalid inputs and no-preset businesses; phone/email/anchor links; assets and alt text; JSON-load failure; reduced motion; no JavaScript exceptions; contrast including calculator errors; logo gap and image ratio; layouts at 320, 390, 430, 768, 1024, 1440 pixels.

Evidence: C:\Users\eric1\AppData\Local\Temp\dassa-b4-full-qa\results.json and PNGs. Functional checks first ran in Edge; final 32-check pass and reliable screenshots used installed Chrome. Edge's screenshot compositor produced blank captures, which were rejected and replaced. Reviewed mobile, tablet, desktop captures. Logo strip gap is 7px; no horizontal overflow.

Audit integration previously verified through the real Calendly preparation form without submitting a booking. Only approved website example/context is sent; visitors can edit it. The event is 30 minutes, so unverified 10-minute CTA wording was removed.

Original calculator IDs preserved: auto-repair, auto-body, hvac, plumbing, electrical, pool-spa-services, roofing, hotels, restaurants, accounting. No Spas or Gyms preset was invented.

Post-QA served-preview smoke check PASSED at http://127.0.0.1:8802/. Build badge is labeled Review, with static mobile placement to avoid covering content. B4 is not approved or publicly deployed.

## Historical B3 QA (retained)

# Dassa Solutions design QA

## Current build

- Build: `DS-2026.09.20-003`
- Status: latest approved preview
- Feature: cinematic Virtual Roles Section Hero
- Desktop capture: `C:\Users\eric1\AppData\Local\Temp\dassa-agent-carousel-qa\build003-desktop.png`
- Mobile capture: `C:\Users\eric1\AppData\Local\Temp\dassa-agent-carousel-qa\build003-mobile.png`
- Generated visual: `assets/virtual-role-hero-ds-2026-09-20-003.png`

## Visual verification

- Dark slate Section Hero clearly separates Virtual Roles as the core product.
- Desktop uses a balanced copy/search and dashboard-visual split.
- Mobile stacks the pitch, search, quick links, visual, eight industry filters, and role explorer without clipping.
- The generated visual contains no people, headset imagery, robots, trademarks, watermarks, or fake readable copy.
- Operational badges remain HTML text for accessibility and future editing.
- The page uses public-safe labels: “Overflow coverage ready” and “Follow-up path connected.”
- A visible fixed badge identifies `DS-2026.09.20-003` as the latest build.

## Functional verification

Automated Edge checks confirmed:

- `application-version` metadata equals `DS-2026.09.20-003`;
- the build badge is present and readable;
- the hero image loads at 1586 × 992 source pixels;
- all 8 industry tabs and 52 agents remain available;
- Automotive, Home Services, and Healthcare quick links change the active industry;
- “teeth” still selects Dental Practices / Virtual Patient Coordinator;
- desktop and 430px mobile layouts have no horizontal overflow;
- the mobile hero collapses to one column and the image remains 384px wide inside the viewport;
- no JavaScript console errors were observed;
- all inline JavaScript and `build.json` pass syntax validation.

## Severity review

- P0 blockers: none.
- P1 high-impact issues: none.
- P2 visible polish issues: none remaining.
- P3 optional future refinement: compress the PNG to WebP if production performance testing shows a meaningful benefit.

final result: passed

## Served-preview verification

- All 26 checked site/dependency/asset files match the project byte-for-byte, including final badge wording.
- Browser verified DS-2026.09.20-004, tested-awaiting-review, Auto Repair and Spas reviewed summaries, and all audit links carrying the correct context.
- At 320px, no horizontal overflow; the Review badge is static below content; no JavaScript exceptions.
- Service remained reachable across independent tool/browser sessions. Startup shortcut exists for the current user; sign-in autostart is configured, not reboot-tested.
- Final screenshot: C:\Users\eric1\AppData\Local\Temp\dassa-b4-full-qa\served-320-audit.png.
