# Dassa Solutions — Current Website Handoff

**Last updated:** 2026-09-14  
**Repository:** `D:\Dev\onecloud-sales\dassa-solutions-site`

## Scope and safety

This handoff is for the **Dassa Solutions website only**. Dassa must remain visually distinct from other work: it is a predominantly light, professional business-communications site, not a dark or cinematic site.

Before doing anything:

1. Inspect `index.html` in full and read this file.
2. Inspect the current local state before proposing edits; do not assume an older screenshot or prompt reflects the current implementation.
3. Report the specific visual changes you intend to make and **wait for Eric's approval before editing**.

Do **not** deploy, push, merge, change branches, overwrite unrelated files, or introduce a build system, framework, dependency, stock photography, or external data collection. Work locally only. If the current file appears incomplete or mid-edit, stop and report that fact rather than rebuilding it.

## Files changed in the current Dassa work

- `index.html` — public Dassa homepage, including the Fit Finder, dynamic diagnostic results, calculator presets, and booking-link-safe CTAs.
- `verticals.js` — the public-safe source of truth for the first ten Dassa business-type experiences.
- `dassa-audit-flyer.html` — one print-friendly flyer template driven by `verticals.js` and a `?vertical=<slug>` query string.
- `assets/qr/*.svg` — QR assets for the ten launch business types; each opens the matching Dassa Fit Finder URL.
- `HANDOFF.md` — this current project handoff.

Leave these untouched unless Eric expressly asks otherwise:

- `deploy.ps1`
- `robots.txt`
- `sitemap.xml`
- `_headers`
- `favicon.svg`

The surrounding parent workspace has unrelated changes. Do not interpret its broad Git status as Dassa work and do not clean, revert, stage, or alter those files.

## Locked positioning

Dassa Solutions helps businesses find and fix communication gaps that turn marketing spend and customer intent into missed opportunities, poor customer experience, workflow breakdowns, and lost revenue.

Primary question:

> What happens when someone tries to reach your business?

Core chain:

> Marketing → Communication → Workflow → Customer Experience → Revenue

Key idea:

> You paid to make the phone ring. What happens next?

Products follow the business problem; they do not lead the story. Keep the approved copy, section order, industries content, CTA language, product truth, proof data, and calculator logic unchanged during visual work.

### Vertical-first extension

The Fit Finder is now the primary Dassa differentiator. It begins with the visitor's business type, then presents the operating moment, communication breakdown, business consequence, the Dassa communication focus, and a familiar named Virtual Role.

The initial public list is: Auto Repair, Auto Body, HVAC, Plumbing, Electrical, Pool & Spa Services, Roofing, Hotels & Motels, Restaurants & Bars, and Accounting. This list intentionally contains public-safe summaries only; it must never expose private playbooks, supplier names, competitor comparisons, pricing, named integrations, or unverified capabilities.

The following labels are locked for the initial experience: Virtual Service Advisor, Virtual Collision Coordinator, Virtual Service Dispatcher, Virtual Route Dispatcher, Virtual Lead Response Desk, Virtual Guest Services Desk, Virtual Digital Order Desk, and Virtual Office Administrator.

Dassa remains its own communications brand. Strategy Partners may receive a quiet final cross-link only after its public URL is supplied; never blend the brands in the hero, Fit Finder, virtual-role copy, or Dassa flyer.

## Approved anonymized proof data

Use these figures exactly. The historical businesses must never be named publicly.

- 789 tracked calls
- 595 tagged **New Lead Received**
- 451 containing **Appointment Scheduled**
- 19 tagged **No One Answered / Missed Lead**
- Separate high-ticket home-improvement example: 5 December calls; 2 missed leads

Never claim the two missed calls were worth $100,000. The page may ask what such opportunities could have been worth.

## Locked calculator

All calculation occurs client-side. Do not transmit values anywhere.

```text
Revenue at Risk =
Missed Calls × Opportunity % × Close Rate × Average Sale Value

Potential Recoverable Revenue =
Revenue at Risk × Recovery %
```

`Opportunity %` and `Recovery %` are deliberately separate assumptions. Keep the current instant-recalculation behavior and invalid/out-of-range handling.

## Current visual state

The homepage is a single self-contained `index.html` with semantic HTML, inline CSS, and lightweight vanilla JavaScript. It is responsive and uses a white/light, blue/navy/charcoal palette with restrained amber warning accents.

- Light, professional, business-first direction; no sci-fi or generic telecom stock imagery.
- Hero keeps the approved Dassa statement and adds a search-first Business Fit Finder with quick picks and keyboard-accessible results.
- `?vertical=<slug>` selects a business type directly. This is the approved QR destination for a matching door-knock flyer.
- The selected result personalizes the operating diagnosis, Virtual Role, calculator starting assumptions, and the “What Dassa Would Examine” priorities.
- Hotel & Motel Phone Suite is a distinct public section and is highlighted when Hotels & Motels is selected.
- Real-World Proof and the missed-opportunity calculator are the strongest sections and should remain largely intact.
- The calculator is a two-panel layout with tightened navy results spacing.
- The five-stage model appears once as a connected process rather than a duplicated process graphic.
- The diagnostic section groups approved questions into business-diagnosis themes rather than a questionnaire-like list.
- Solutions use a substantial 3-column desktop / 2-column tablet / 1-column mobile grid with large round icons and outcome-first hierarchy.
- Call Visibility is a larger, generic business-performance view—not a copied CallRail interface—and communicates Visibility → Accountability → Opportunity.
- Desktop content uses a 1200px standard width and 1440px wide width where appropriate; lower sections have been enlarged to avoid undersized content floating in whitespace.
- All dynamic controls preserve keyboard focus, live announcements, and reduced-motion behavior.

## Already built

1. Header and responsive navigation
2. Search-first Business Fit Finder with ten initial business types and QR-compatible deep links
3. “You Paid to Make the Phone Ring” bridge section
4. Real-World Proof section using the approved anonymous data
5. Functional missed-opportunity calculator
6. Connected five-stage Marketing → Communication → Workflow → Customer Experience → Revenue model
7. “We Don't Start With the Product” diagnosis section
8. Nine outcome-led solutions cards
9. Call Visibility example and questions
10. Explore-more-business-types grid
11. Five-step “How Dassa Works” section
12. “Why Dassa,” final business question, final CTA, and footer
13. Virtual Roles and Hotel & Motel Phone Suite sections
14. Print-friendly Dassa audit flyer template plus ten matching local QR assets
15. Basic accessibility: skip link, semantic landmarks, labelled calculator controls, live result/error regions, focus styles, keyboard-accessible type-ahead, mobile navigation state, and reduced-motion support

## Required before flyer distribution

1. The public Dassa booking-calendar URL is now set in `verticals.js` as `window.DASSA_BOOKING_URL`: `https://calendly.com/edassa-dassasolutions/30min`. Generic CTAs say “Book a Communication Audit”; selected vertical CTAs name that business type.
2. Eric must provide the public Strategy Partners URL before the quiet final cross-link is activated.
3. Before printing any flyer, open its matching `dassa-audit-flyer.html?vertical=<slug>` page and scan the QR code to confirm it reaches the same selected Dassa Fit Finder.

## Next review

- Review the Fit Finder at desktop, tablet, and mobile widths, including long vertical text and the keyboard interaction.
- Confirm the tone and role naming for all ten launch types before adding more types.
- Verify every booking CTA and regenerate/reprint flyer QR materials only if the production domain changes.

## Local preview

```powershell
Set-Location "D:\Dev\onecloud-sales\dassa-solutions-site"
py -m http.server 8123 --bind 127.0.0.1
```

Open `http://127.0.0.1:8123/index.html` locally. Do not treat a local preview as authorization to publish.
