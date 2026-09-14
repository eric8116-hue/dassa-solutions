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

- `index.html` — full homepage replacement, followed by focused visual refinement.
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
- Hero uses a large communication journey: Marketing → Customer Calls → Your Business, then a blue success path and restrained amber failure path.
- Real-World Proof and the missed-opportunity calculator are the strongest sections and should remain largely intact.
- The calculator is a two-panel layout with tightened navy results spacing.
- The five-stage model appears once as a connected process rather than a duplicated process graphic.
- The diagnostic section groups approved questions into business-diagnosis themes rather than a questionnaire-like list.
- Solutions use a substantial 3-column desktop / 2-column tablet / 1-column mobile grid with large round icons and outcome-first hierarchy.
- Call Visibility is a larger, generic business-performance view—not a copied CallRail interface—and communicates Visibility → Accountability → Opportunity.
- Desktop content uses a 1200px standard width and 1440px wide width where appropriate; lower sections have been enlarged to avoid undersized content floating in whitespace.
- One restrained blue hero pulse honors `prefers-reduced-motion`.

## Already built

1. Header and responsive navigation
2. Hero communication-flow graphic
3. “You Paid to Make the Phone Ring” bridge section
4. Real-World Proof section using the approved anonymous data
5. Functional missed-opportunity calculator
6. Connected five-stage Marketing → Communication → Workflow → Customer Experience → Revenue model
7. “We Don't Start With the Product” diagnosis section
8. Nine outcome-led solutions cards
9. Call Visibility example and questions
10. Industries grid
11. Five-step “How Dassa Works” section
12. “Why Dassa,” final business question, final CTA, and footer
13. Basic accessibility: skip link, semantic landmarks, labelled calculator controls, live result/error regions, focus styles, mobile navigation state, and reduced-motion support

## Exact next task: visual-refinement review only

Do **not** rebuild the page or change content. First inspect the current file, then report a concise visual-review plan and wait for approval.

The next approved focus is to assess the current rendered page at roughly 1440–1700px desktop, tablet, and mobile, looking specifically for:

- visual scale, rhythm, and readability in the lower half relative to the proof/calculator area;
- excessive repetition of thin-border white cards;
- overly small text, labels, cards, tables, diagrams, or desktop content widths;
- any remaining unused vertical space in the calculator results panel;
- legibility and hierarchy of the Solutions and Call Visibility sections;
- overflow, responsive breakpoints, anchor navigation, calculator behavior, and reduced-motion behavior.

If Eric approves edits, make only the smallest local visual refinements necessary. Preserve the locked positioning, proof, formulas, copy, section order, and functionality. Then verify desktop/tablet/mobile, no horizontal overflow, calculator behavior, basic syntax, and `git diff --check`; stop and report the exact files changed plus any remaining visual imperfections.

## Local preview

```powershell
Set-Location "D:\Dev\onecloud-sales\dassa-solutions-site"
py -m http.server 8123 --bind 127.0.0.1
```

Open `http://127.0.0.1:8123/index.html` locally. Do not treat a local preview as authorization to publish.
