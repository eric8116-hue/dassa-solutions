# Batch 1 review notes — funnel-1 library (8 entries)

Reviewed 2026-09-22. Source: public VBRs only (never the INTERNAL twins). All eight are `_Build 4_`.
Global scrub applied to every entry: dropped the `## OneCloud Fit` block entirely (brand, "99.999%", "no setup fee", "OneCloud also offers internet", every named software), dropped the "phone and internet bill keeps creeping up" bullet, dropped every internet-outage / POS / card-terminal / failover bullet, reframed "AI Agent" as the Virtual Role, removed "from the shop's number", automatic texting, reminders, recordings. No "replace" anywhere; positioning is overflow-only.

Validation: JSON parses; all paragraphs 100-108 words; 2 reasons each (customer, workflow); 3 catches each; no empty strings; forbidden-term regex hits only the 8 mandated `sourceRef` filenames (zero hits elsewhere).

---

## auto-repair — `OneCloud Valid Business Reason - Auto Repair.md`
Original bullets:
1. The opening rush hits while the writer is moving cars. **CHOSEN — workflow**
2. A missed call is usually a job booked somewhere else. **CHOSEN — customer**
3. No-shows leave an expensive lift sitting empty. (not chosen; customer alternate)
4. Estimate approvals crawl through phone tag. (not chosen; workflow alternate — used in paragraph)
5. An internet outage takes down the POS, card terminal, and shop software. (skipped — out of scope)
6. The phone and internet bill keeps creeping up. (skipped — out of scope)

Scrub removed: Tekmetric, Shop-Ware, Mitchell 1, AutoLeap; "appointment reminders" (catch 2 reframed as taking the reschedule call); "estimate approvals by text from the shop's number" (catch 3 reframed as logging + routing the approval call).
Paragraph: 102 words.

## window-tint — `OneCloud Valid Business Reason - Window Tint.md` (YAML front matter stripped)
Original bullets:
1. Quote and "how long" calls come in all day while the installer is heads-down in a car. **CHOSEN — workflow**
2. A missed "how much to tint" call is usually a job booked at the next shop. (not chosen; overlaps 3)
3. Price-shoppers book wherever a human answers first. **CHOSEN — customer**
4. No-shows leave an installer and a bay sitting idle. (not chosen; used in paragraph)
5. An internet outage takes down scheduling and the card terminal. (skipped)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: Tint Wiz, Square; "confirmations and reminders by text from the shop's number" (catch 2 reframed as taking booking/reschedule requests); "AI Agent" (now Virtual Scheduling Desk).
Paragraph: 108 words.

## auto-body — `OneCloud Valid Business Reason - Auto Body.md`
Original bullets:
1. Status-check calls flood the desk and pull estimators off cars. **CHOSEN — workflow**
2. After-hours tow-ins hit voicemail and the tow goes to a competitor. **CHOSEN — customer**
3. A disputed supplement comes down to memory, not a recorded call. (not chosen — recordings out of scope; mentioned as a problem in paragraph only)
4. Insurance supplements still fax over an aging, unsecured line. (skipped — fax)
5. An internet drop kills estimating and DRP uploads mid-job. (skipped)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: CCC ONE, Mitchell, Audatex, Tekmetric, DRP-upload references; "recorded business line" (catch 2 reframed as capturing + routing the tow-in); "calls, texts, photos, adjuster records in one job thread" (catch 3 reframed as a clear call record).
Paragraph: 103 words.

## dealerships — `OneCloud Valid Business Reason - Dealerships.md`
Original bullets:
1. Sales calls land on whoever picks up — with no lead history. **CHOSEN — workflow**
2. The service drive jams at opening and callers give up. **CHOSEN — customer**
3. Each store runs its own phones — no shared reporting. (not chosen — infrastructure/reporting; touched in paragraph)
4. Recorded calls exist for some teams, not all. (not chosen — recordings out of scope)
5. An internet or phone outage halts F&I and the DMS. (skipped)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: CDK, Reynolds & Reynolds, VinSolutions, Elead, DMS/F&I; "screen-pop from the CRM" (catch 1 is plain routing); "every rooftop on one system with one report" (catch 3 reframed as a clear record the manager can see).
Paragraph: 100 words.

## tire-shops — `OneCloud Valid Business Reason - Tire Shops.md` (YAML front matter stripped)
Original bullets:
1. The opening and Saturday rush hits while the counter is mounting tires and ringing up sales. (not chosen; overlaps 3, used in paragraph)
2. A missed "price for four?" call is usually a sale made at the shop down the road. **CHOSEN — customer**
3. Walk-ins and the phone peak at the same minutes, and one of them gets dropped. **CHOSEN — workflow**
4. "Is my car ready?" and fleet calls interrupt installs all day. (not chosen; workflow alternate — used in catch 2)
5. An internet outage takes down the POS, card terminal, and tire-catalog lookup. (skipped)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: Tire Pros, TireMaster, Shopmonkey, ATD; "ready-for-pickup and quote confirmations by text from the shop's number" (catch 2 reframed as taking the ready/fleet calls); "one thread" reframed as a shared call record.
Paragraph: 105 words.

## towing — `OneCloud Valid Business Reason - Towing.md` (YAML front matter stripped)
Original bullets:
1. After-hours and overnight calls are the most profitable tows and the easiest to miss. (not chosen; workflow alternate — used in paragraph)
2. A missed call is a tow booked by the next company on the rotation list. **CHOSEN — customer**
3. Drivers run tows on personal cells, and the number walks out the door when a driver quits. **CHOSEN — workflow**
4. A missed rotation call drops the company down the motor-club list. (not chosen; alternate — used in paragraph)
5. A disputed tow charge has no recording to settle it. (not chosen — recordings out of scope)
6. The phone and internet bill keeps creeping up. (skipped)

Swap note: if Eric prefers a coverage-only workflow reason, bullet 1 or 4 both work; bullet 3 was picked because it is the only clearly staff-facing one.
Scrub removed: Towbook, TRACaN, Dispatch Anywhere; "AI Agent" (now Virtual Dispatch Coordinator); "recorded business line on every driver's phone" (catch 2 reframed as routing to the driver/dispatcher on duty); "one thread" reframed as a clear record.
Paragraph: 107 words.

## auto-salvage — `OneCloud Valid Business Reason - Auto Salvage.md`
Note: this file's paragraph opens "The problem was never 'the phones.'" instead of the standard "The issue isn't just the phone system." Same slot, handled the same way.
Original bullets:
1. Part-hunters call five yards and buy from the first one that answers. **CHOSEN — customer**
2. Bilingual callers get passed around — and hang up before anyone who can help picks up. (not chosen; customer alternate — used in paragraph + catch 2)
3. Counter staff are pinned to the register at the exact minutes calls peak. **CHOSEN — workflow**
4. After-hours cash buyers don't leave voicemail — they call the next yard. (not chosen; customer alternate — used in paragraph + catch 3)
5. Tow and driver coordination runs on personal cells the yard doesn't own. (not chosen)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: Hollander, DismantlerPRO, Car-Part; "lines the yard owns / recordings"; "after-hours menu" reframed as the Virtual Desk taking the after-hours call. Spanish-speaking routing kept as plain routing (no bilingual-feature promise beyond routing to the right person).
Paragraph: 106 words.

## spas — `OneCloud Valid Business Reason - Spas.md` (batch: healthcare-wellness, hipaa false)
Original bullets:
1. No-shows leave booked treatment slots empty. **CHOSEN — customer** (lost booking)
2. The front desk juggles check-in and phones in a quiet space. **CHOSEN — workflow**
3. Membership and package follow-up slips. (not chosen; workflow alternate — used in paragraph + catch 3)
4. Retail and package revenue depends on timely outreach. (not chosen — outbound, out of scope)
5. An internet outage stops booking and the POS. (skipped)
6. The phone and internet bill keeps creeping up. (skipped)

Scrub removed: Mindbody, Boulevard, Vagaro; "reminder and confirmation cadence" (catch 1 reframed as answering booking/reschedule calls); "keep follow-up on cadence" (catch 3 reframed as leaving a record for the desk to follow up).
Paragraph: 100 words.
