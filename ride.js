(() => {
  'use strict';

  const BOOKING_URL = 'https://calendly.com/edassa-dassasolutions/30min';
  const MATH_KEY = 'dassa-ride-one-call-math';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
  // The catalog is intentionally honest: do not invent a gym journey. Auto Repair and the med-spa reference have built rides; other types lead to an audit until their source-backed journey is approved.
  const BUSINESSES = ["Accounting", "Apartment Communities", "Auto Body", "Auto Repair", "Auto Salvage", "Med Spa & Aesthetic Clinic", "Boutiques", "Charter Schools", "Chiropractors", "Churches", "Commercial Property Mgmt", "Daycares", "Dealerships", "Dental", "Electrical", "Event Venues", "Facilities Management", "Florists", "General Contractors", "HOA / Condo Associations", "HVAC", "Hearing / Audiology", "High-end Salons", "Hotels", "Insurance Agencies", "Law Firms", "Logistics / 3PL", "Manufacturing", "Mental Health/Counseling", "Municipal / City Government", "Music / Instrument Retail", "Nonprofits", "Occupational Therapy", "Pavers", "Physical Therapy", "Plumbing", "Pool Maintenance & Hot-Tub Service", "Print Shops", "Private/Religious Schools", "Public Works & Utilities", "Real Estate", "Restaurants", "Roofing", "Sign Shops", "Small Practices", "Speech Therapy", "Tire Shops", "Towing", "Urgent Care", "Veterinary", "Warehouses", "Window Tint"];
  const BUILT = {
    'Gyms & Fitness Studios': {
      photo: 'assets/pi-hero/desk-phone-dusk.jpg',
      role: 'Virtual Membership Desk',
      beats: [
        { tag: '5:45 PM', photo: 'assets/pi-hero/service-counter.jpg', top: ['The after-work rush hits the front desk.', 'Members checking in, a guest pass, a billing question, a new member signing up.'],
          bottom: ['The phone rings. Nobody picks up.', 'The line at the desk comes first.'] },
        { tag: '5:47 PM', top: ['Every trainer is on the floor.', 'One is running a class. One is mid-session with a client. The music is up.'],
          bottom: ['Nobody even hears it.', 'The phone is behind the desk, not on the floor.'] },
        { tag: '5:48 PM', top: ['That caller wanted to join this week.', 'They just moved nearby and asked about rates and a free trial.'],
          bottom: ['Voicemail. They hang up.', 'People shopping for a gym call the next one on the map.'] },
        { tag: '9:00 PM', top: ['You never knew it happened.', 'No message. No trial booked. No tour scheduled.'],
          bottom: ['The gym down the street signed them up.', 'And the evening rush is every weekday.'] }
      ],
      reasons: [
        { tag: 'Reason 1 of 2', top: ['New-member calls come in during your busiest hours.', 'Rate, trial and tour questions arrive right when the desk is slammed and trainers are on the floor.'],
          fixTitle: 'Your desk answers first. Behind them, the Virtual Membership Desk catches what nobody could reach.',
          fix: ['Answers hours and location questions right away', 'Takes the caller\'s name, what they want, and a callback number for a tour or trial', 'Rings the desk and the manager\'s phone together, and screens spam before it rings'] },
        { tag: 'Reason 2 of 2', top: ['Freeze, cancel and billing calls tie up the desk.', 'The same few member questions all day, while the people standing at the desk wait.'],
          fixTitle: 'Routine member requests are taken down and passed on, so the desk serves the people in front of it.',
          fix: ['Takes freeze, cancel and billing requests for staff to handle', 'Class reminders and schedule changes go out by text from your gym\'s number', 'Real sales calls reach a person by what the caller says, with no phone-tree menus'] }
      ],
      meet: { top: ['Your front desk answers first, like always.', 'The Virtual Membership Desk sits behind them as a safety net for the calls nobody could reach.'],
              bottom: ['It takes the name, what they want, and a callback number.', 'It takes requests your staff confirm. It does not sign anyone up or change a membership on its own.'] },
      calc: { opportunity: 0.5, close: 0.25, recovery: 0.5, callsHint: '60', ticketHint: '600', place: 'gym', ticketLabel: 'Average first-year membership value', need: 'wanted to join' },
      auditLabel: 'Book a Gym Communication Audit',
      auditFocus: 'We map what happens during the evening rush, who owns tour and trial callbacks, and where member requests land after close.'
    }
  };
  const LAST = 9;
  const REVEAL_MS = 1300;
  const $ = (s) => document.querySelector(s);
  const ride = $('#ride');
  const stage = $('#ride-stage');
  const photo = $('#ride-photo');
  const backBtn = $('#ride-back');
  const exitBtn = $('#ride-exit');
  const siteRest = $('#site-rest');
  const stepList = $('#ride-steps');
  stepList.replaceChildren(...Array.from({ length: 10 }, () => document.createElement('li')));
  const dots = [...stepList.children];
  const state = { step: 0, business: null, calc: null };
  const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  // Build 069: the approved five-step flow (hook, two problems, two solutions, the virtual role, summary).
  // Text is the copy Eric approved on 2026-10-06. Businesses listed here use it; the rest keep the older ride.
  const NUMBERS_LINE = 'We keep your numbers, install the system and train your staff, and one local contact stays with you.';
  // Build 083: each business's guided-ride copy lives in flow/<name>.js and loads when that business is picked.
  const FLOW = (window.DASSA_FLOW = window.DASSA_FLOW || {});
  const FLOW_NAMES = ['Auto Repair', 'Dental', 'Roofing', 'Auto Body', 'Plumbing', 'Electrical', 'Chiropractors', 'Law Firms', 'Restaurants', 'Hotels', 'Pool Maintenance & Hot-Tub Service', 'Accounting', 'Apartment Communities', 'Auto Salvage', 'Boutiques', 'Charter Schools', 'Churches', 'Commercial Property Mgmt', 'Daycares', 'Dealerships', 'Event Venues', 'Facilities Management', 'Florists', 'General Contractors', 'HOA / Condo Associations', 'Hearing / Audiology', 'High-end Salons', 'Insurance Agencies', 'Logistics / 3PL', 'Manufacturing', 'Mental Health/Counseling', 'Municipal / City Government', 'Music / Instrument Retail', 'Nonprofits', 'Occupational Therapy', 'Pavers', 'Physical Therapy', 'Print Shops', 'Private/Religious Schools', 'Public Works & Utilities', 'Real Estate', 'Sign Shops', 'Small Practices', 'Speech Therapy', 'Towing', 'Urgent Care', 'Veterinary', 'Warehouses', 'Window Tint', 'HVAC', 'Tire Shops', 'Med Spa & Aesthetic Clinic'];
  const flowFile = (n) => 'flow/' + n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.js?v=20261007090';
  const flowLoading = {};
  function loadFlow(name) {
    if (FLOW[name]) return Promise.resolve();
    if (!flowLoading[name]) {
      flowLoading[name] = new Promise((resolve, reject) => {
        const sc = document.createElement('script');
        sc.src = flowFile(name);
        sc.onload = () => (FLOW[name] ? resolve() : reject(new Error('empty')));
        sc.onerror = () => { delete flowLoading[name]; reject(new Error('load')); };
        document.head.appendChild(sc);
      });
    }
    return flowLoading[name];
  }
  const flowFor = () => (state.business && FLOW[state.business]) || null;
  const lastStep = () => (flowFor() ? 5 : LAST);


  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    kids.flat().forEach((c) => { if (c != null) node.append(c); });
    return node;
  }
  const title = (t) => el('h1', { class: 'ride-title', id: 'ride-title', tabindex: '-1', text: t });
  const bizTitle = () => el('h1', { class: 'ride-title ride-title-home', id: 'ride-title', tabindex: '-1' }, 'Let\u2019s set up a phone system specifically for the needs of ', el('span', { class: 'ride-underline', text: 'your business' }), '.');
  const eyebrow = (t) => el('p', { class: 'ride-eyebrow', text: t });
  const lead = (t) => el('p', { class: 'ride-lead', text: t });
  const note = (t) => el('p', { class: 'ride-note', text: t });
  const btn = (label, cls, fn) => el('button', { type: 'button', class: 'ride-btn ' + cls, onclick: fn, text: label });
  const actions = (...b) => el('div', { class: 'ride-actions' }, b);

  function setHeaderHeight() {
    const h = $('.site-header');
    if (h) document.documentElement.style.setProperty('--header-h', h.offsetHeight + 'px');
  }

  function go(step) {
    state.step = step;
    ride.dataset.step = step;
    backBtn.disabled = step === 0;
    const total = lastStep() + 1;
    dots.forEach((d, i) => {
      d.hidden = i >= total;
      d.classList.toggle('is-current', i === step);
      d.classList.toggle('is-done', i < step);
    });
    if (!flowFor()) ride.dataset.wide = 'no';
    render();
  }

  let revealTimer = null;
  function mount(...nodes) {
    window.clearTimeout(revealTimer);
    stage.replaceChildren(...nodes.filter((n) => n != null));
    const copyBox = stage.parentElement;
    if (copyBox) copyBox.scrollTop = 0;
    stage.classList.remove('is-in');
    if (!REDUCED.matches) { void stage.offsetWidth; stage.classList.add('is-in'); }
    const t = $('#ride-title');
    if (t) t.focus({ preventScroll: true });
  }
  // Top part materializes, then after a beat the bottom part pops in and answers it.
  // A tap or key press anywhere on the stage skips the wait. Reduced motion shows both at once.
  function mountReveal(top, bottom, dense) {
    ride.dataset.dense = dense ? 'true' : 'false';
    const topBox = el('div', { class: 'ride-top' }, top);
    const botBox = el('div', { class: 'ride-bottom' }, bottom);
    if (REDUCED.matches) botBox.classList.add('is-shown');
    mount(topBox, botBox);
    if (REDUCED.matches) return;
    const show = () => { window.clearTimeout(revealTimer); botBox.classList.add('is-shown'); stage.removeEventListener('pointerdown', show); stage.removeEventListener('keydown', show); };
    stage.addEventListener('pointerdown', show);
    stage.addEventListener('keydown', show);
    revealTimer = window.setTimeout(show, REVEAL_MS);
  }

  function pick(name) {
    if (FLOW_NAMES.includes(name) && !FLOW[name]) {
      loadFlow(name).then(() => pick(name)).catch(() => renderOther(name));
      return;
    }
    state.business = name;
    state.calc = null;
    const built = BUILT[name] || FLOW[name];
    if (built) {
      go(1);
    } else {
      renderOther(name);
    }
  }

  // A beat can carry its own photo; a business can set one for its other steps; otherwise the default ride photo shows.
  const photoSource = photo.parentElement.querySelector('source');
  const defaultPhoto = { img: photo.getAttribute('src'), small: photoSource ? photoSource.getAttribute('srcset') : null };
  function setPhoto(src) {
    const img = src || defaultPhoto.img;
    if (photo.getAttribute('src') === img) return;
    photo.setAttribute('src', img);
    if (photoSource) photoSource.setAttribute('srcset', src || defaultPhoto.small);
  }

  function render() {
    const name = state.business;
    const b = BUILT[name];
    ride.dataset.dense = 'false';
    const st = state.step;
    const flow = flowFor();
    if (flow && st >= 1) return renderFlow(flow, st);
    setPhoto(b ? ((st >= 1 && st <= 4 && b.beats[st - 1].photo) || b.photo) : null);
    if (st === 0) return renderPick();
    if (st >= 1 && st <= 4) {
      const beat = b.beats[st - 1];
      const last = st === 4;
      mountReveal(
        [eyebrow('Is this familiar? \u00b7 ' + beat.tag + ' \u00b7 ' + st + ' of 4'), title(beat.top[0]), lead(beat.top[1])],
        [el('p', { class: 'ride-answer', text: beat.bottom[0] }), note(beat.bottom[1]),
         actions(btn(last ? 'Why it costs you' : 'Next', 'ride-btn-primary', () => go(st + 1)))]);
    } else if (st === 5 || st === 6) {
      const r = b.reasons[st - 5];
      mountReveal(
        [eyebrow('Why it costs you \u00b7 ' + r.tag), title(r.top[0]), lead(r.top[1])],
        [el('p', { class: 'ride-fix-label', text: 'The Dassa Solutions fix' }), el('p', { class: 'ride-answer', text: r.fixTitle }),
         el('ul', { class: 'ride-fixlist' }, r.fix.map((t) => el('li', { text: t }))),
         actions(btn(st === 5 ? 'Next reason' : 'Meet the ' + b.role, 'ride-btn-primary', () => go(st + 1)))], true);
    } else if (st === 7) {
      mountReveal(
        [eyebrow('Meet your ' + b.role), title(b.meet.top[0]), lead(b.meet.top[1])],
        [el('p', { class: 'ride-answer', text: b.meet.bottom[0] }), note(b.meet.bottom[1]),
         actions(btn('See what it is worth', 'ride-btn-primary', () => go(8)))]);
    } else if (st === 8) {
      renderChoice(b);
    } else {
      renderWrap(b);
    }
  }

  function renderPick() {
    const input = el('input', { id: 'ride-q', type: 'text', role: 'combobox', 'aria-expanded': 'false', 'aria-controls': 'ride-list', 'aria-autocomplete': 'list', autocomplete: 'off', placeholder: 'Start typing, like dental or plumbing' });
    const list = el('ul', { class: 'ride-results', id: 'ride-list', role: 'listbox', hidden: '' });
    const refresh = () => {
      const q = input.value.trim().toLowerCase();
      const hits = BUSINESSES.filter((n) => n.toLowerCase().includes(q));
      list.replaceChildren(...(hits.length
        ? hits.map((n) => el('li', { role: 'option' }, el('button', { type: 'button', onclick: () => pick(n), text: n })))
        : [el('li', { class: 'ride-empty', text: 'No match. Try another word, or explore the website.' })]));
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    };
    input.addEventListener('input', refresh);
    input.addEventListener('focus', refresh);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { list.hidden = true; input.setAttribute('aria-expanded', 'false'); }
      if (e.key === 'Enter') {
        const q = input.value.trim().toLowerCase();
        const hit = BUSINESSES.find((n) => n.toLowerCase() === q) || (BUSINESSES.filter((n) => n.toLowerCase().includes(q)).length === 1 && BUSINESSES.find((n) => n.toLowerCase().includes(q)));
        if (hit) pick(hit);
      }
    });
    const chips = ['Auto Repair', 'Tire Shops', 'Med Spa & Aesthetic Clinic', 'HVAC', 'Dental', 'Restaurants'].filter((n) => BUSINESSES.includes(n));
    mount(eyebrow('Dassa Solutions · Central Florida'),
      bizTitle(),
      lead('Dassa Solutions maps your call workflow, replaces the business phone system, and helps qualified multi-location businesses simplify phone, internet, equipment, and support billing.'),
      el('div', { class: 'ride-search' }, el('label', { for: 'ride-q', text: 'What kind of business do you run?' }), input, list,
        el('div', { class: 'ride-chips' }, chips.map((n) => el('button', { type: 'button', class: 'ride-chip', onclick: () => pick(n), text: n })))),
      el('p', { class: 'ride-count', text: BUSINESSES.length + ' business types in the catalog. Search yours or choose one.' }));
  }

  function renderOther(name) {
    ride.dataset.step = '0';
    mount(eyebrow(name), bizTitle(),
      lead('This business-specific walkthrough is still being prepared. The communication audit identifies who should answer, how calls should route, and what a replacement system needs to handle.'),
      actions(
        el('a', { class: 'ride-btn ride-btn-primary', href: BOOKING_URL, target: '_blank', rel: 'noopener noreferrer', text: 'Book a Communication Audit' }),
        btn('Pick another business', 'ride-btn-secondary', () => { state.business = null; go(0); }),
        btn('Explore website', 'ride-btn-secondary', exitRide)));
  }

  function renderChoice(b) {
    mount(eyebrow('Optional · ' + state.business), title('Want to put numbers on it?'),
      lead('A quick estimate of what missed calls could cost your ' + BUILT[state.business].calc.place + '. Skip it and you still get a summary.'),
      actions(btn('Run the one-call math', 'ride-btn-primary', renderCalc), btn('Skip to summary', 'ride-btn-secondary', () => go(LAST))));
  }

  // Eric's ROI calculator (roi-app, build 2026-07-10), ported to the ride. Presets live in roi-presets.js.
  const ROI_PRESET_FOR = { 'Auto Repair': 'Auto Repair', 'Tire Shops': 'Tire Shops', 'Med Spa & Aesthetic Clinic': 'Spas', 'HVAC': 'HVAC', 'Dental': 'Dental', 'Roofing': 'Roofing', 'Auto Body': 'Auto Body', 'Plumbing': 'Plumbing', 'Electrical': 'Electrical', 'Chiropractors': 'Chiropractors', 'Law Firms': 'Law Firms', 'Restaurants': 'Restaurants', 'Hotels': 'Hotels', 'Pool Maintenance & Hot-Tub Service': 'Pool & Spa Services', 'Accounting': 'Accounting', 'Apartment Communities': 'Apartment Communities', 'Auto Salvage': 'Auto Salvage', 'Boutiques': 'Boutiques', 'Charter Schools': 'Charter Schools', 'Churches': 'Nonprofits', 'Commercial Property Mgmt': 'Commercial Property Mgmt', 'Daycares': 'Daycares', 'Dealerships': 'Dealerships', 'Event Venues': 'Event Venues', 'Facilities Management': 'Facilities Management', 'Florists': 'Florists', 'General Contractors': 'General Contractors', 'HOA / Condo Associations': 'HOA / Condo Associations', 'Hearing / Audiology': 'Hearing/Audiology', 'High-end Salons': 'High-End Salons', 'Insurance Agencies': 'Insurance Agencies', 'Logistics / 3PL': 'Logistics/3PL', 'Manufacturing': 'Manufacturing', 'Mental Health/Counseling': 'Mental Health/Counseling', 'Municipal / City Government': 'Municipal / City Government', 'Music / Instrument Retail': 'Music / Instrument Retail', 'Nonprofits': 'Nonprofits', 'Occupational Therapy': 'Occupational Therapy', 'Pavers': 'Pavers', 'Physical Therapy': 'Physical Therapy', 'Print Shops': 'Print Shops', 'Private/Religious Schools': 'Private/Religious Schools', 'Public Works & Utilities': 'Public Works & Utilities', 'Sign Shops': 'Sign Shops', 'Small Practices': 'Small Practices', 'Speech Therapy': 'Speech Therapy', 'Towing': 'Towing', 'Urgent Care': 'Urgent Care', 'Veterinary': 'Veterinary', 'Warehouses': 'Warehouses', 'Window Tint': 'Window Tint' };
  const ROI_DEFAULT = { m: 4, r: 50, c: 25, t: 180, n: 'Standard missed-call defaults. Change any number to match your business. Ticket = the average dollar value of one new customer.' };

  // One ROI tool, two places: the guided ride (renderCalc) and the regular site (mountSiteRoi). Eric's calculator logic.
  const ROI_REAL = [25, 50, 75];
  const ROI_CLOSE = [15, 25, 40, 60];
  const roiOptions = (base, val, word) => {
    const v = Number(val);
    const list = base.includes(v) ? base.slice() : base.concat(v).sort((a, b) => a - b);
    return list.map((n) => [String(n), n + '% - ' + (base.includes(n) ? word[base.indexOf(n)] : 'set for this business')]);
  };
  const REAL_WORDS = ['mostly junk calls', 'typical', 'mostly customers'];
  const CLOSE_WORDS = ['competitive market', 'typical', 'strong reputation', 'caller is ready to buy'];

  function buildRoi(presetKey, opts) {
    const o = opts || {};
    const presets = window.DASSA_ROI_PRESETS || {};
    let preset = presets[presetKey] || ROI_DEFAULT;
    let saved = {};
    if (o.persist) { try { saved = JSON.parse(sessionStorage.getItem(MATH_KEY) || '{}'); } catch { /* start empty */ } }
    const num = (id, val, attrs) => el('input', Object.assign({ id, type: 'number', inputmode: 'decimal', value: String(val) }, attrs));
    const fillSel = (s, options, val) => { s.replaceChildren(...options.map(([v, t]) => el('option', Object.assign({ value: v, text: t }, String(v) === String(val) ? { selected: '' } : {})))); s.value = String(val); };
    const p = o.prefix || 'calc';
    const missed = num(p + '-missed', saved.missed != null ? saved.missed : preset.m, { min: '0', step: '1' });
    const real = el('select', { id: p + '-real' });
    const close = el('select', { id: p + '-close' });
    fillSel(real, roiOptions(ROI_REAL, saved.real || preset.r, REAL_WORDS), saved.real || preset.r);
    fillSel(close, roiOptions(ROI_CLOSE, saved.close || preset.c, CLOSE_WORDS), saved.close || preset.c);
    const ticket = num(p + '-ticket', saved.ticket != null ? saved.ticket : preset.t, { min: '0', step: '10' });
    const days = num(p + '-days', saved.days != null ? saved.days : 22, { min: '1', max: '31', step: '1' });
    const cover = el('select', { id: p + '-cover' });
    fillSel(cover, [['0', 'Nothing - voicemail'], ['537', 'Answering service (about $537 a month, typical)'], ['3750', 'Full-time receptionist (about $3,750 a month)'], ['custom', 'Custom amount']], saved.cover || '0');
    const custom = num(p + '-custom', saved.custom != null ? saved.custom : 0, { min: '0', step: '10' });
    const customWrap = el('div', {}, el('label', { for: p + '-custom', text: 'Monthly cost ($)' }), custom);
    const field = (id, label, hint, ctl) => el('div', {}, el('label', { for: id, text: label }), hint ? el('small', { text: hint }) : null, ctl);
    const err = el('p', { class: 'ride-err', role: 'alert' });
    const lossV = el('strong', { class: 'ride-big', text: '$0' });
    const lossS = el('span', { class: 'ride-sub' });
    const covV = el('strong', { class: 'ride-big', text: '$0' });
    const totalV = el('strong', { class: 'ride-big', text: '$0' });
    const totalS = el('span', { class: 'ride-sub' });
    const box = (label, v, s) => el('div', { class: 'ride-box' }, el('span', { class: 'ride-boxlabel', text: label }), v, s || null);
    const out = el('div', { class: 'ride-roi', 'aria-live': 'polite' },
      box('Revenue at risk each month', lossV, lossS),
      box('What you pay for coverage today', covV),
      box('Cost of the current setup', totalV, totalS));
    const noteEl = note('');
    const setNote = () => { noteEl.textContent = preset.n + ' A planning estimate, not measured revenue. Your actual results depend on your call volume and how you take bookings.'; };
    const update = () => {
      const bad = [[missed, 0, 2000], [ticket, 0, 50000], [days, 1, 31]].some(([i, lo, hi]) => { const v = Number(i.value); return i.value.trim() === '' || !(Number.isFinite(v) && v >= lo && v <= hi); });
      [missed, ticket, days].forEach((i) => i.setAttribute('aria-invalid', String(i.value.trim() === '' || !Number.isFinite(Number(i.value)))));
      err.textContent = bad ? 'Check the numbers: missed calls 0 to 2,000 a day, ticket $0 to $50,000, days 1 to 31.' : '';
      customWrap.hidden = cover.value !== 'custom';
      if (o.persist) { try { sessionStorage.setItem(MATH_KEY, JSON.stringify({ missed: missed.value, real: real.value, close: close.value, ticket: ticket.value, days: days.value, cover: cover.value, custom: custom.value })); } catch { /* inputs keep working */ } }
      if (bad) { if (o.persist) state.calc = null; lossV.textContent = covV.textContent = totalV.textContent = '-'; lossS.textContent = totalS.textContent = ''; return; }
      const calls = Number(missed.value) * Number(days.value);
      const realCalls = calls * Number(real.value) / 100;
      const jobs = realCalls * Number(close.value) / 100;
      const loss = jobs * Number(ticket.value);
      const cov = cover.value === 'custom' ? (Number(custom.value) || 0) : Number(cover.value);
      if (o.persist) state.calc = loss;
      lossV.textContent = money(loss);
      lossS.textContent = Math.round(calls) + ' missed calls, ' + Math.round(realCalls) + ' real customers, ' + (Math.round(jobs * 10) / 10) + ' lost jobs, ' + money(loss * 12) + ' a year';
      covV.textContent = money(cov);
      totalV.textContent = money(loss + cov);
      totalS.textContent = money((loss + cov) * 12) + ' a year';
    };
    const setPreset = (key) => {
      preset = presets[key] || ROI_DEFAULT;
      missed.value = preset.m;
      fillSel(real, roiOptions(ROI_REAL, preset.r, REAL_WORDS), preset.r);
      fillSel(close, roiOptions(ROI_CLOSE, preset.c, CLOSE_WORDS), preset.c);
      ticket.value = preset.t;
      setNote();
      update();
    };
    [missed, real, close, ticket, days, cover, custom].forEach((i) => { i.addEventListener('input', update); i.addEventListener('change', update); });
    setNote();
    update();
    const fields = [
      field(p + '-missed', 'Missed calls per day', 'Ring-outs, voicemail, busy: the rush, lunch, after hours', missed),
      field(p + '-real', '% that are real customers', 'Not spam, vendors or wrong numbers', real),
      field(p + '-close', 'Your close rate', 'Of real callers, how many would book?', close),
      field(p + '-ticket', 'Average sale or ticket ($)', 'First visit value, not lifetime', ticket),
      field(p + '-days', 'Working days per month', '', days),
      field(p + '-cover', 'What do you pay for coverage today?', 'Who catches the calls your team can\'t?', cover),
      customWrap, err];
    return { fields, out, note: noteEl, setPreset, presetKeys: Object.keys(presets) };
  }

  function renderCalc() {
    const b = FLOW[state.business] ? { calc: { place: FLOW[state.business].place } } : BUILT[state.business];
    const r = buildRoi(ROI_PRESET_FOR[state.business], { persist: true, prefix: 'calc' });
    const calcTitle = title('What do missed calls cost your ' + b.calc.place + '?');
    calcTitle.classList.add('ride-title-calc');
    mount(eyebrow('What missed calls cost · ' + state.business), calcTitle,
      el('div', { class: 'ride-calc' }, r.fields),
      r.out,
      el('details', { class: 'ride-about' }, el('summary', { text: 'About these numbers' }), r.note),
      actions(btn('See the summary', 'ride-btn-primary', () => go(lastStep()))));
  }

  // Regular site: the same tool under the ride, with a business-type picker.
  function mountSiteRoi() {
    const host = $('#site-roi');
    if (!host) return;
    const r = buildRoi(null, { persist: false, prefix: 'site' });
    const picker = el('select', { id: 'site-roi-type' }, el('option', { value: '', text: 'Choose your business type' }), r.presetKeys.map((k) => el('option', { value: k, text: k })));
    picker.addEventListener('change', () => r.setPreset(picker.value || null));
    host.replaceChildren(
      el('div', { class: 'math-input-panel site-roi-inputs' },
        el('div', { class: 'site-roi-pick' }, el('label', { for: 'site-roi-type', text: 'Business type' }), el('small', { text: 'Fills in typical numbers for your trade. You can change any of them.' }), picker),
        el('div', { class: 'ride-calc site-roi-fields' }, r.fields)),
      el('div', { class: 'math-result-panel site-roi-results' },
        el('p', { class: 'eyebrow amber-text', text: 'WHAT MISSED CALLS COST' }), r.out,
        el('p', { class: 'math-caveat' }, r.note.textContent)));
    r.note.addEventListener('x', () => {});
    picker.addEventListener('change', () => { const cav = host.querySelector('.math-caveat'); if (cav) cav.textContent = r.note.textContent; });
  }

  // Build 069 renderers for the approved flow.
  const bulletList = (items) => el('ul', { class: 'ride-fixlist' }, items.map((t) => el('li', { text: t })));
  const column = (c) => el('div', { class: 'ride-col' }, el('h2', { class: 'ride-colhead', text: c.head }), c.text ? el('p', { class: 'ride-coltext', text: c.text }) : null, c.bullets ? bulletList(c.bullets) : null);

  function renderFlow(f, st) {
    ride.dataset.dense = 'true';
    ride.dataset.wide = st === 2 || st === 3 ? 'cols' : 'one';
    setPhoto(f.photos[Math.min(st, 4) - 1]);
    if (st === 1) {
      mount(eyebrow(state.business), title('Does this sound familiar to you?'),
        el('h2', { class: 'ride-subhead', text: f.hook.title }),
        el('div', { class: 'ride-prose' }, f.hook.paras.map((t) => el('p', { text: t }))),
        bulletList(f.hook.bullets),
        actions(btn('Next', 'ride-btn-primary', () => go(2))));
    } else if (st === 2) {
      mount(eyebrow('Why it costs you · ' + state.business), title('Two problems, every day'),
        el('div', { class: 'ride-cols' }, f.problems.map(column)),
        actions(btn('See the fix', 'ride-btn-primary', () => go(3))));
    } else if (st === 3) {
      mount(eyebrow('The Dassa Solutions fix · ' + state.business), title('Two problems, two answers'),
        el('div', { class: 'ride-cols' }, f.solutions.map(column)),
        note(NUMBERS_LINE),
        actions(btn('Meet the ' + f.role, 'ride-btn-primary', () => go(4))));
    } else if (st === 4) {
      mount(eyebrow('Meet your ' + f.role), title(f.meet.title), lead(f.meet.intro),
        el('div', { class: 'ride-cols ride-cols1' }, column({ head: 'What it does for you', bullets: f.meet.benefits })),
        el('div', { class: 'ride-cols' }, f.meet.ways.map(column)),
        f.meet.stakes ? el('p', { class: 'ride-stakes', text: f.meet.stakes }) : null,
        note(NUMBERS_LINE),
        actions(btn('See what missed calls could cost you', 'ride-btn-primary', renderCalc), btn('Not now, give me the summary', 'ride-btn-secondary', () => go(5))));
    } else {
      const parts = [eyebrow('Your summary · ' + state.business), title('Here is what we covered.'),
        el('div', { class: 'ride-cols ride-cols3' },
          column({ head: 'What we heard', bullets: f.hook.bullets }),
          column({ head: 'The answers', bullets: f.solutions.map((x) => x.head + '.') }),
          column({ head: 'Your ' + f.role, bullets: f.meet.benefits }))];
      if (state.calc != null) parts.push(el('p', { class: 'ride-stakes', text: 'Your estimate: about ' + money(state.calc) + ' a month in missed-call revenue. It is a planning figure, not a promise.' }));
      parts.push(lead(f.summary));
      parts.push(actions(
        el('a', { class: 'ride-btn ride-btn-primary', href: BOOKING_URL, target: '_blank', rel: 'noopener noreferrer', text: f.auditLabel + ' ↗' }),
        btn('Explore website', 'ride-btn-secondary', exitRide)));
      mount(...parts);
    }
  }

  function renderWrap(b) {
    const parts = [eyebrow('Your summary · ' + state.business), title('Here is what Dassa Solutions maps before replacing your phone system.'), lead(b.auditFocus)];
    if (state.calc != null) parts.push(note('Your estimate: about ' + money(state.calc) + ' a month in missed-call revenue. It is a planning figure, not a promise.'));
    parts.push(actions(
      el('a', { class: 'ride-btn ride-btn-primary', href: BOOKING_URL, target: '_blank', rel: 'noopener noreferrer', text: b.auditLabel + ' ↗' }),
      btn('Explore website', 'ride-btn-secondary', exitRide)));
    mount(...parts);
  }

  function exitRide() {
    ride.hidden = true;
    siteRest.hidden = false;
    siteRest.removeAttribute('inert');
    document.body.classList.remove('ride-active');
    window.scrollTo(0, 0);
    const first = $('#blueprint-title');
    if (first) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
  }

  function restartRide(event) {
    if (event) event.preventDefault();
    ride.hidden = false;
    siteRest.hidden = true;
    siteRest.setAttribute('inert', '');
    document.body.classList.add('ride-active');
    window.scrollTo(0, 0);
    state.business = null;
    state.calc = null;
    go(0);
  }

  backBtn.addEventListener('click', () => { if (state.step > 0) { state.step === 1 ? (state.business = null, go(0)) : go(state.step - 1); } });
  exitBtn.addEventListener('click', exitRide);
  document.querySelectorAll('[data-restart-ride]').forEach((a) => a.addEventListener('click', (e) => { restartRide(e); const m = $('.mobile-menu'); if (m) m.open = false; }));
  window.addEventListener('resize', setHeaderHeight);

  // Regular site: mobile menu and one-call math (unchanged behavior from the earlier build).
  const mobileMenu = $('.mobile-menu');
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mobileMenu.open = false; }));
  document.addEventListener('click', (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
  mountSiteRoi();

  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    document.title = 'Dassa Solutions | Build DS-2026.10.07-086 | Private preview';
  }
  setHeaderHeight();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHeaderHeight);
  // Flyer QR codes link here as ?vertical=<slug>; open that business's ride directly.
  const slug = (n) => n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const wanted = new URLSearchParams(location.search).get('vertical');
  const match = wanted && BUSINESSES.find((n) => slug(n) === slug(wanted));
  if (match) pick(match); else go(0);
})();
