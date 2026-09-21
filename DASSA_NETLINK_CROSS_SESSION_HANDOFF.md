# Dassa Solutions + NetLink Voice — Cross-Session Strategy Handoff

**Prepared:** 2026-09-20  
**Purpose:** Give a new session the current Dassa strategy, the NetLink Voice findings, the website's real working state, known guardrails, and the recommended next work.  
**Important:** This is a strategy and recovery document. It does **not** authorize publishing, deployment, vendor claims, or a rewrite of the existing website.

---

## 1. Executive summary

Dassa Solutions must not look like a generic VoIP reseller, a generic AI company, or a lead-generation agency.

The core Dassa proposition is:

> Dassa helps a business find communication leaks, build the right response path, and make sure important customer conversations reach a clear next step.

Those leaks affect three things at once:

1. **Opportunity and marketing investment** — a high-value roofing inquiry, service request, reservation, or new-client call can be lost before a conversation happens.
2. **Customer/patient/guest retention and service** — an existing patient, customer, hotel guest, or client still needs timely help and a clear response path.
3. **Employee workflow and operational continuity** — teams need calls, handoffs, scheduling, routing, follow-up, and coverage to keep moving during busy periods.

A phone system is therefore a **business investment**, not merely a technical purchase or a marketing tool.

Dassa's unique differentiator is the vertical-specific translation of a generic "virtual agent" into a familiar job title for each business type, for example:

- Auto repair → **Virtual Service Advisor**
- Dental practice → **Virtual Patient Coordinator**
- Hotel → **Virtual Guest Services Desk**
- Roofing → **Virtual Project Estimating Desk**

NetLink Voice should be presented as a technology, connectivity, and billing foundation for selected Dassa solutions—not as a co-equal brand in Dassa's hero or vertical diagnostic experience.

---

## 2. Non-negotiable Dassa positioning

### The business problem comes before products

Dassa starts with:

> What happens when someone tries to reach your business?

Products should follow the diagnosis. The narrative is:

```text
Marketing / customer need
        ↓
Incoming call or request
        ↓
Coverage, routing, ownership, and follow-up
        ↓
Customer experience + staff workflow
        ↓
Revenue, retention, and operational outcome
```

### Dassa is not only about new leads

Never frame Dassa as only a marketing/lead-generation product. The system also exists to:

- Serve existing customers, clients, patients, and guests
- Support appointment and rescheduling requests
- Keep service teams and front desks from falling behind
- Route important calls intelligently
- Give missed calls ownership and follow-up visibility
- Let the business—not an employee's personal cell phone—own the number and customer relationship

### Cell-phone-only businesses

Useful future section title:

> **What Your Business May Be Missing When Calls Rely Only on Cell Phones**

Core explanation: a cell phone is useful, but a business that relies solely on individual phones can lack shared coverage, intelligent routing, missed-call visibility, follow-up ownership, consistent customer service, and continuity when someone is busy or unavailable.

---

## 3. Current Dassa public identity and confirmed contact details

- **Brand:** Dassa Solutions
- **Domain:** `dassasolutions.com`
- **Phone:** `(407) 369-2856`
- **Email:** `edassa@dassasolutions.com`
- **Dassa Calendly:** `https://calendly.com/edassa-dassasolutions/30min`
- **Brand character:** light, professional, blue/navy/charcoal, business-first; no sci-fi, robot, or generic telecom-stock aesthetic.
- **Logo direction:** the large Dassa logo is intentional. Eric requested it be a visual star; do not shrink it casually.

Dassa remains a standalone brand. Do not blend Strategy Partners or NetLink Voice into the Dassa hero, virtual-role diagnosis, flyer identity, or first-contact message.

---

## 4. Current website state: inspect before changing anything

### Repository and preview

- **Repository:** `D:\Dev\onecloud-sales\dassa-solutions-site`
- **Audited local preview:** `http://127.0.0.1:8802/`
- **Current page title:** `Dassa Solutions — Protect the Opportunity Behind Every Call`
- **Current build identifier in source:** `DS-2026.09.20-003`

The working tree is **not clean** as of this handoff. Preserve existing work and inspect `git status`, `git diff`, `BUILD_HISTORY.md`, and `design-qa.md` before making edits.

Known current working-tree items:

- Modified: `HANDOFF.md`
- Modified: `index.html`
- Untracked: `BUILD_HISTORY.md`
- Untracked: `agent-catalog.js`
- Untracked: `assets/virtual-role-hero-ds-2026-09-20-003.png`
- Untracked: `build.json`
- Untracked: `design-qa.md`

The build-history file labels `DS-2026.09.20-003` as the latest approved preview, but a future session should still confirm whether Eric wants those uncommitted changes committed or revised before doing so.

### Current rendered page order

1. Sticky header: Call Flow, Revenue Math, Virtual Roles, Find Your Fit, What We Examine, Calendly CTA
2. Hero: opportunity command center / missed-call value proposition
3. Dark live call-flow split: missed vs. covered/routed/followed up
4. Revenue Leakage Estimator with preloaded non-zero values
5. Anonymized real-world proof cards
6. Dark cinematic **Virtual Roles Section Hero** and 52-role explorer
7. Separate Dassa Business Fit Finder for the initial ten business types
8. Three outcome cards: Coverage & Routing, Visibility & Follow-Up, Mobility & Infrastructure
9. Final audit CTA and contact links

### Current Virtual Roles implementation

The current uncommitted build added a substantial visual treatment:

- A dark slate, two-column section hero
- Label: `MEET THE TECHNOLOGY`
- Headline: `Not a Generic Bot. A Virtual Role.`
- Fuzzy business search and quick industry links
- Custom generated dashboard visual at `assets/virtual-role-hero-ds-2026-09-20-003.png`
- Existing industry explorer and role carousel below the hero
- Mobile stack intended to show copy/search first, then visual
- Public-safe operational badges, including `Overflow coverage ready` and `Follow-up path connected`

The build notes say the interaction was verified for eight industries and 52 roles, fuzzy match for `teeth` → Dental Practices / Virtual Patient Coordinator, keyboard-related behavior, no horizontal overflow at desktop or 430px mobile, and no JS console errors. Re-test after any edits.

### Important current-state discrepancy

Older `HANDOFF.md` statements describe a ten-type Fit Finder, a distinct Hotel & Motel Phone Suite, and related historical page features. The current `index.html` must be treated as the actual implementation source. In the currently inspected page structure, Hotels & Motels is represented in the role and fit data, but there is not yet a clearly independent, navigable Hotel & Motel Phone Suite section. Reconcile documentation with code before claiming it is live.

Likewise, the current header does not yet have a dedicated `Phone + Internet / One Bill`, `Hotel`, or `Cameras` destination.

---

## 5. What is working well on the current site

- The large Dassa logo gives the brand real presence.
- The dark live-call-flow visual is effective: one incoming call, two outcomes.
- The calculator is no longer blank; `$21,600` displays as a planning example from the default values.
- The virtual-role naming system is the strongest and most differentiated part of the experience.
- The site looks like a communications consultancy rather than a commodity phone catalog.
- The mobile audit at 430px showed no horizontal clipping.
- The named-role treatment translates a cold `AI agent` concept into a familiar business function.

---

## 6. Main strategic issue and required information architecture

The site currently asks a visitor to discover two related systems:

1. The eight-industry / 52-role Virtual Roles search and explorer
2. The separate ten-type Dassa Business Fit Finder

That is powerful internally but can feel like two unrelated products externally. The visitor should not have to search twice.

### Target visitor journey

```text
Choose or search for business type
        ↓
Tailored Business Communication Summary
        ↓
The likely communication pressure in that business
        ↓
Two reasons a stronger phone/VoIP system matters
  1. Customer service / retention
  2. Workflow / staff coverage
        ↓
Meet your Virtual [familiar role name]
        ↓
Failover / overflow / defined response path
        ↓
Voice + internet foundation / one coordinated bill where appropriate
        ↓
Outcome: protect marketing spend, customers, staff, and workflow
        ↓
Book a business-specific communication audit
```

### Recommended implementation model

Use a **single reusable, data-driven summary template**, not 52 independently designed pages. Each business record can provide:

- Business name and matching keywords
- Operating-pressure moment
- Likely communication breakdown
- Customer/business consequence
- Two valid VoIP reasons
- Named Virtual Role
- Failover / coverage explanation
- What Dassa would examine
- Optional calculator preset
- Hotel/camera/multi-location relevance
- Specific audit CTA

Keep `Virtual Roles` as a distinct navigation destination for people who want to explore immediately. But in the primary conversion path, it should be the powerful reveal within the business summary—not a disconnected product-first detour.

### Assessment of the cinematic Virtual Roles proposal

The visual direction is good and the custom image is appropriate. However, do not blindly adopt the statement that Virtual Roles are the only or first product Dassa sells. The agreed Dassa journey is business-first:

> Business type → diagnosis → reasons for voice/VoIP → named Virtual Role → complete communication solution.

Treat Virtual Roles as the primary **differentiator and emotional reveal**, while Dassa's actual solution remains the broader communication system.

---

## 7. Required content that is not yet prominent enough

### A. Phone system as business investment

Future benefits-page message:

> In 2026, a business phone system is an investment in how a company captures opportunity, serves customers, supports employees, and keeps work moving.

### B. One bill / phone plus internet

This is a major value proposition and must appear on the Dassa website. It matters especially to multi-location companies that may otherwise have separate internet, voice, and equipment-finance invoices at every location.

Recommended Dassa-native section:

## One Partner. One Bill. Fewer Moving Parts.

> Instead of juggling separate internet providers, VoIP vendors, and equipment-finance invoices at every location, Dassa can structure qualified business communication solutions around one coordinated relationship and one consolidated bill.

Business reasons to show:

- Less administrative clutter and fewer invoices
- Clearer visibility into total communications spending
- Fewer support handoffs and less vendor finger-pointing
- More consistent setup across locations
- Easier growth as locations or staff are added

Use careful qualification such as `where appropriate` or `qualified solutions` until the exact commercial/billing arrangement is confirmed for every case.

### C. Full Business Phone + Internet benefits page

Create one supporting Dassa page after the primary business-summary flow is settled:

**Suggested page title:** `Business Phone, Internet & One-Bill Solutions`

It should cover:

- Why cell-phone-only communication creates business risk
- Smart call routing, coverage, and visibility
- Business-number ownership
- Confirmed recording/transcription and business SMS/mobile options where NetLink-backed
- Why reliable/right-sized internet matters to voice
- Multi-location vendor and billing complexity
- One coordinated bill and one local contact
- A factual, secondary technology-partner note about NetLink Voice

This page is the right place for full VoIP education. It should not replace the vertical-first homepage journey.

### D. Hotel & Motel Phone Suite

Hotels should have a distinct offering/section, not only an entry in an industry list. Cover:

- Reservation pressure
- Check-in/check-out front-desk peaks
- Guest-request routing
- Departmental handoffs
- Guest-experience risk

### E. Cameras

Dassa offers cameras and should list them as a core service. Suggested public service label:

> **Business Security Camera Systems** — consultation, design, and setup of business camera solutions for visibility across offices, properties, entrances, and multiple locations.

Do not assert that cameras are supplied by NetLink Voice; the NetLink source material only refers to cameras as a business's bandwidth consideration, not as a confirmed NetLink product line. Define the camera supplier, implementation model, and verified capabilities before creating detailed camera claims.

---

## 8. NetLink Voice: role, public-safe facts, and hard claim boundaries

### Strategic role in the Dassa ecosystem

**Dassa:** diagnoses the business, designs the communication path, translates it by vertical, and owns the consultative customer relationship.

**NetLink Voice:** can be the delivery foundation for selected voice, connectivity, and billing solutions.

Recommended public wording after Dassa's diagnosis is established:

> Selected Dassa communication solutions can be supported by NetLink Voice technology and connectivity options when that fit is appropriate.

Do not put raw NetLink collateral, NetLink logos, or a heavy `Dassa chooses NetLink` pitch in the Dassa hero. A modest `Technology Partner` note belongs on the detailed phone/internet page or in a solution-detail section, once relationship wording and logo-use permission are confirmed.

### NetLink's strongest confirmed marketing story

The NetLink material consistently supports these pillars:

1. Right-sized internet plus modern phone service
2. One bill and one local contact
3. Fewer vendors and less finger-pointing
4. Call recording and searchable transcription
5. Mobile app/softphone: staff can take business calls on a cell while the number remains with the business
6. SMS from the business number rather than personal phones
7. A trial is available as a risk reducer

NetLink is explicitly positioned in the supplied materials as **price/consolidation-led**, not feature-led.

### Claims that are unsafe or not yet verified

Do **not** claim these without confirmation:

- A Teams-like unified workspace
- `One place`, `one thread`, `like Teams`, or equivalent channel-unification language
- Named integrations
- Contact-center capabilities
- Admin portals/wallboards
- 5G failover
- Cross-device continuity
- `250+ integrations`
- IP phones in flat pricing
- Camera products as NetLink products

Never use `wholesale` in customer-facing copy. Do not name an underlying carrier such as Spectrum in Dassa/NetLink marketing. Explain the customer outcome instead: current carrier may be retained or another option may be selected when it makes business sense.

### Supplied NetLink facts — verify before publishing on Dassa

The NetLink collateral states: founded 2007, 19 years in business, 3,500+ customers, 24/7/365 U.S.-based support, and 99.999% uptime. These are supplier-provided/partner facts, not automatically Dassa claims. Verify current approval and appropriate attribution before putting any of them on Dassa pages.

### NetLink collateral and campaign lessons

- The one-bill story is repeatedly validated in the supplied strategy, flyer, and campaign notes.
- Vertical campaign pattern: first business pain, then two-vendor/two-bill problem, then record/number ownership and local support.
- Law, restaurant, and dealership examples provide useful Dassa vertical insight, but underlying feature claims must remain within the confirmed list above.
- The NetLink campaign system includes internal automation/agent notes and old OneCloud cleanup tasks. Those are operationally useful but must never surface on a public Dassa page.

### Internal sales asset: NetLink Quote Card

Eric created a private **NetLink Quote Card** browser userscript for FiberLookup. It is an internal sales-enablement tool, not a customer-facing web feature.

Its intended workflow is to read availability results for an address, compare available carriers against Eric's verified rate cards, normalize equipment and install costs into an effective monthly cost, and rank quotable options such as lowest cost, a sensible mid-tier upgrade, symmetric service, and 1G+ service. It also identifies carriers shown at an address that Eric cannot quote.

**Strategic significance:** this is the operational proof behind Dassa/NetLink's `right-size the internet` and `one coordinated bill` story. It can make an audit concrete: current connectivity/bills → address-specific viable options → recommended phone-and-internet path.

**Do not put on the public site:** FiberLookup, private rate cards, carrier-specific wholesale mechanics, exact internal carrier order, unpublished pricing, or the script itself. Do not call it a customer calculator.

**Public-safe use:** offer a `Connectivity & Communication Review` during the audit. After reviewing the business's location(s), current bills, required speed, phone needs, and workflow, Dassa can present a tailored recommendation. Use non-binding language until a formal quote is issued.

**Critical operational warning:** the documentation file is only a structural skeleton. It explicitly does not contain the real 328-plan rate-card data. Never overwrite a working Tampermonkey install with it or rebuild pricing from memory. The existing live desktop/mobile scripts are the verified working copies; source rate files must be re-verified before any restoration or update.

---

## 9. Google Business Profile decisions and ready-to-use content

### Business model

Eric works from home but visits businesses for 30-minute audits. Dassa should be configured as a **service-area business**, not a storefront.

- Keep the home address private/remove it from the public profile.
- Add only real cities/areas served.
- Do not invent a storefront or upload fake storefront photos.
- Use real Dassa logo, real professional photo if desired, and authentic branded or process imagery later.

### Categories

Recommended profile categories:

- **Primary:** `Business management consultant` if Google offers it; otherwise `Consultant`
- **Additional:** `Telecommunications service provider`

Do **not** select `Internet service provider` merely because Dassa evaluates ISP choices or can coordinate consolidated billing. Use that category only if Dassa itself is truly the provider/billing entity in a way that makes the category accurate.

Do not add broad/keyword categories such as marketing consultant simply for search terms.

### Google Business Profile description

Use this current version:

> Dassa Solutions helps businesses protect the customer opportunities they pay to create—whether a roofing inquiry, patient call, reservation, service request, or existing-customer concern. We design and set up business phone and VoIP solutions with smart call routing, call prioritization, coverage, visibility, and follow-up paths so important calls reach the right person. We also review internet connectivity and ISP options to help ensure the connection supports voice and business operations; in many cases, services can be simplified onto one bill. Dassa builds practical communication systems around each business’s customers, team workflow, and growth.

This is under Google's 750-character description limit. Do not add URLs, prices, discounts, or promotional language to the description.

### Recommended Google service options

1. Business Communication Audit
2. Business Phone System Setup
3. Smart Call Routing
4. Missed-Call Coverage & Follow-Up
5. Multi-Location Phone Systems
6. Internet Connectivity & ISP Review
7. Voice & Internet Bill Consolidation
8. Virtual Reception & Call Coverage
9. Hotel & Motel Phone Suite
10. Phone System Modernization
11. Business Security Camera Systems
12. Multi-Location Camera Visibility — only if Dassa actually offers it

Do not list `lead generation` as a service. It is an outcome Dassa protects, not the service Dassa delivers.

---

## 10. Headline and positioning bank

These are working options for Eric to choose from later. Do not treat all as final live copy.

- **Your Phone System Should Protect the Business—Not Create More Leaks.**
- **Find the leaks. Build the right path. Help every important call reach a clear next step.**
- **We protect the opportunity your marketing creates, the customer relationships you already have, and the workflow your team depends on.**
- **In 2026, a business phone system is an investment in how your company captures opportunity, serves customers, supports employees, and keeps work moving.**
- **When calls are missed, routed poorly, left without ownership, or handled inconsistently, the business leaks money, customers, time, and trust.**
- **Dassa Solutions identifies communication leaks, designs the right response path, and helps put the pieces in place.**
- **One Partner. One Bill. Fewer Moving Parts.**
- **What Your Business May Be Missing When Calls Rely Only on Cell Phones.**
- **Together, these communication paths are designed to help protect the value of your marketing, support your team during busy periods, and give customers a clearer path to timely help.**

Suggested supporting statement:

> Dassa Solutions helps turn individual phones into a connected business communication path—built around how your specific business actually operates.

---

## 11. Recommended implementation sequence

1. **Protect the current work.** Inspect the dirty working tree and reconcile `HANDOFF.md`, `BUILD_HISTORY.md`, `design-qa.md`, `index.html`, `verticals.js`, and `agent-catalog.js`. Do not overwrite uncommitted work.
2. **Lock the unified business-summary data model.** One selected business should supply diagnosis, two VoIP reasons, named role, failover story, and solution focus.
3. **Unify entry points.** Connect the existing Virtual Roles search and Fit Finder so a visitor does not complete two disconnected searches.
4. **Rebalance the top-level copy.** Preserve opportunity/revenue language, but give equal visual weight to customer service, retention, employee workflow, and operational continuity.
5. **Add the Dassa-native one-bill / phone-plus-internet section** to the solution path.
6. **Create the supporting `Business Phone, Internet & One-Bill Solutions` page.** This is where the detailed NetLink-backed benefits belong.
7. **Add a distinct Hotel & Motel Phone Suite section/page.**
8. **Define and then add the Cameras offer.** Do not attach it to NetLink without evidence.
9. **Run full QA.** Test selected verticals, deep links, keyboard search, browser back/forward, mobile/tablet/desktop, reduced motion, visible focus, calculator formula, anchors, and copy-claim safety.
10. **Only then** consider content expansion to 70 verticals, flyers, or additional partner-facing applications of the vertical-role naming system.

---

## 12. Open decisions that need Eric's answer before implementation

1. Is NetLink Voice the exclusive/standard underlying delivery partner for Dassa phone-and-internet solutions, or only one option? This determines exact disclosure wording.
2. When can Dassa truthfully promise a single consolidated bill? Which services, locations, equipment, and contracts qualify?
3. What is the exact camera offer: supplier, sale vs. installation vs. support, remote viewing, monitoring, and commercial restrictions?
4. What is the approved public wording and logo-use permission for referring to NetLink Voice on Dassa?
5. Should the primary Dassa homepage selector immediately show a full summary in place, scroll to it, or open a shareable URL/state? Recommended: update the same page and retain a shareable selected-vertical URL.
6. Which first ten business types should be considered the launch set now that the role catalog is broader?
7. Is `Business management consultant` available in the Google category selector? If not, use `Consultant` as the primary category.

---

## 13. Source material reviewed for NetLink Voice

Reviewed from `D:\Onedrive1\OneDrive\Desktop\House Shared Folder\Netlink Central Florida`:

- `NETLINK_MASTER_BRIEF.md`
- `NetLink Value Proposition.md`
- `ConnectWare — What It Does and Doesn't Do.md`
- `Brand Assets.md`
- `Netlink Voice — July 23 Session Notes.md`
- `Campaign Library.md`
- `VBR — Law Firms.md`
- `VBR — Restaurants & Bars.md`
- `VBR — Auto Dealerships.md`
- `Territory — 7 Counties & 24 Blocks.md`
- `Agent System State.md`
- `Welcome.md`

The `Prompts/` subfolder contains generic text-transformation prompts, not NetLink product or collateral facts, and was not material to the strategy.

---

## 14. Working rule for the next session

Do not rebuild Dassa from scratch.

Preserve the existing strategy, Dassa identity, accessibility work, calculator formula, responsive behavior, approved anonymized proof, and working role catalog. Revise intentionally around the unified, vertical-first summary journey and the newly elevated one-bill / voice-plus-internet foundation.
