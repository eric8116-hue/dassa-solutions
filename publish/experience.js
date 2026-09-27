(() => {
  'use strict';

  const BOOKING_URL = 'https://calendly.com/edassa-dassasolutions/30min';
  const TRADE_KEY = 'dassa-053-selected-trade';
  const MATH_KEY = 'dassa-053-one-call-math';
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ROTATION_MS = 8500;
  const SCENES = [
    {
      id: 'auto',
      label: 'Auto Repair',
      image: 'assets/auto-repair-bay-bright.webp',
      alt: 'Auto repair service bay',
      headline: 'At 8 a.m., spam owns the line.',
      line: 'A customer who needs a repair today has another shop down the street.',
      observation: "A Florida repair shop's long-used number drew so much spam that the office struggled to answer morning calls. A driver who needs the car fixed today has nearby options.",
      source: "Eric observed the shop's call conditions. The A/C caller is an illustrative scenario, not a documented lost customer.",
      role: 'Virtual Service Advisor',
      blueprint: 'For auto repair, the first minutes of the day can decide whether a real caller reaches the shop.',
      contact: 'For an auto repair shop, that starts with what a real caller hears when the morning line is busy.'
    },
    {
      id: 'field',
      label: 'Field Service',
      image: 'assets/hvac-condenser.webp',
      alt: 'Field technician working on an HVAC condenser',
      headline: 'The technician left. Whose number does your customer have?',
      line: "Keep the customer's way back connected to your business.",
      observation: "When customers use a technician's personal number, they may keep calling it after that technician leaves. The business needs a contact path it can manage.",
      source: 'Based on recurring service-company situations Eric described, not a measured Dassa customer-retention result.',
      role: 'Virtual Service Coordinator',
      blueprint: 'For field service, the call flow must keep the customer connected to the business as people and routes change.',
      contact: 'For field service, we can start with the numbers customers use and who owns the next callback.'
    },
    {
      id: 'medical',
      label: 'Medical Office',
      image: 'assets/medical-front-desk.webp',
      alt: 'Busy medical front desk',
      headline: 'The patient left a message. The appointment stayed on the books.',
      line: "A missed reschedule request can become tomorrow's no-show.",
      observation: "A patient needs to move tomorrow's 10:30 appointment. The message waits while the front desk handles arrivals, calls, and insurance questions.",
      source: "A representative situation drawn from Eric's medical front-desk experience, not a documented patient outcome or Dassa client result.",
      role: 'Virtual Clinic Coordinator',
      blueprint: 'For a medical office, the handoff matters: a reschedule request must reach someone who can update the calendar.',
      contact: 'For a medical office, we can trace a reschedule request from the first call to the calendar update.'
    },
    {
      id: 'towing',
      label: 'Towing',
      image: 'assets/tow-truck-red.webp',
      alt: 'Red towing truck',
      headline: "You're on a tow. The county calls. Who answers?",
      line: 'The next urgent call needs a path while the driver is busy.',
      observation: 'A driver is handling one tow when another dispatch or roadside call reaches the business. A single mobile line may leave the next caller waiting.',
      source: 'A representative operating pattern Eric described, not a documented lost dispatch or a claim about every county.',
      role: 'Virtual Dispatch Coordinator',
      blueprint: 'For towing, the next call may arrive while the driver is occupied and dispatch still needs a clear route.',
      contact: 'For towing, we can map who answers dispatch and roadside calls while a truck is already on a job.'
    },
    {
      id: 'roofing',
      label: 'Roofing',
      image: 'assets/roofing-sunset.webp',
      alt: 'Roofing work at sunset',
      headline: 'Two rings. Gone. What was that call worth?',
      line: 'Without an answer, you may never learn what the caller needed.',
      observation: 'During a tracked magazine-cover campaign, two roofing lead calls went unanswered at separate times. The owner never learned what either caller needed.',
      source: 'Eric observed those calls. Their value and eventual outcome are unknown; a later large roofing deal does not establish what these missed calls were worth.',
      role: 'Virtual Lead Coordinator',
      blueprint: 'For roofing, the first ring, internal handoff, and promised follow-up all affect whether an inquiry stays with the company.',
      contact: 'For roofing, we can follow an inquiry from the first ring through the handoff and promised callback.'
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const sceneImage = $('#scene-image');
  const sourceDisclosure = $('.source-disclosure');
  const tradeButtons = [...document.querySelectorAll('.trade-pill')];
  const roleChip = $('#role-chip');
  const bookingCta = $('#booking-cta');
  const jobInput = $('#job-value');
  const costInput = $('#coverage-cost');
  let activeIndex = 0;
  let requestId = 0;
  let timer = null;
  let paused = REDUCED_MOTION.matches;

  bookingCta.href = BOOKING_URL;

  const imageReady = SCENES.map((scene) => {
    const image = new Image();
    image.src = scene.image;
    if (typeof image.decode === 'function') {
      return image.decode().then(() => true, () => image.complete && image.naturalWidth > 0);
    }
    return new Promise((resolve) => {
      if (image.complete) resolve(image.naturalWidth > 0);
      else {
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
      }
    });
  });

  function readTrade() {
    try {
      const saved = sessionStorage.getItem(TRADE_KEY);
      const index = SCENES.findIndex((scene) => scene.id === saved);
      return index < 0 ? 0 : index;
    } catch {
      return 0;
    }
  }

  function rememberTrade(scene) {
    try { sessionStorage.setItem(TRADE_KEY, scene.id); } catch { /* The page still works without storage. */ }
  }

  function setPaused(next) {
    paused = next;
    const button = $('#scene-pause');
    button.textContent = paused ? 'Play' : 'Pause';
    button.setAttribute('aria-label', paused ? 'Resume story rotation' : 'Pause story rotation');
    clearInterval(timer);
    timer = null;
    if (!paused && !document.hidden) {
      timer = window.setInterval(() => {
        showScene((activeIndex + 1) % SCENES.length, false);
      }, ROTATION_MS);
    }
  }

  async function showScene(index, announce = true) {
    if (index < 0 || index >= SCENES.length) return;
    const currentRequest = ++requestId;
    const ready = await imageReady[index];
    if (!ready || currentRequest !== requestId) return;

    const scene = SCENES[index];
    activeIndex = index;
    sceneImage.src = scene.image;
    sceneImage.alt = scene.alt;
    $('#scene-business').textContent = scene.label + ' / 0' + (index + 1);
    $('#scene-title').textContent = scene.headline;
    $('#scene-line').textContent = scene.line;
    $('#scene-observation').textContent = scene.observation;
    $('#scene-source').textContent = scene.source;
    $('#scene-count').textContent = '0' + (index + 1) + ' / 05';
    $('#report-number').textContent = '0' + (index + 1) + ' / 05';
    $('#blueprint-context').textContent = scene.blueprint;
    roleChip.textContent = scene.role;
    $('#math-trade').textContent = scene.label.toUpperCase() + ' / ONE-CALL CHECK';
    $('#contact-context').textContent = scene.contact;
    bookingCta.textContent = 'Book Your ' + scene.label + ' Communication Audit';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    bookingCta.append(' ', arrow);
    sourceDisclosure.open = false;
    tradeButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.documentElement.dataset.trade = scene.id;
    rememberTrade(scene);
    if (announce) {
      $('#scene-status').textContent = scene.label + '. ' + scene.headline + ' Story ' + (index + 1) + ' of ' + SCENES.length + '.';
    }
    if (!REDUCED_MOTION.matches) {
      sceneImage.animate([{ opacity: .75 }, { opacity: 1 }], { duration: 340, easing: 'ease-out' });
      $('.hero-copy').animate([{ opacity: .72, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
    }
  }

  tradeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      setPaused(true);
      showScene(index);
    });
  });
  $('#scene-prev').addEventListener('click', () => {
    setPaused(true);
    showScene((activeIndex + SCENES.length - 1) % SCENES.length);
  });
  $('#scene-next').addEventListener('click', () => {
    setPaused(true);
    showScene((activeIndex + 1) % SCENES.length);
  });
  $('#scene-pause').addEventListener('click', () => setPaused(!paused));
  document.addEventListener('visibilitychange', () => setPaused(paused));
  REDUCED_MOTION.addEventListener('change', () => setPaused(REDUCED_MOTION.matches));

  const mobileMenu = $('.mobile-menu');
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mobileMenu.open = false; }));
  document.addEventListener('click', (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
  });

  const money = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  function updateMath() {
    const jobRaw = jobInput.value.trim();
    const costRaw = costInput.value.trim();
    const job = Number(jobRaw);
    const cost = Number(costRaw);
    const result = $('#math-result');
    const detail = $('#math-detail');
    const jobBar = $('#job-bar');
    const costBar = $('#cost-bar');
    const validJob = jobRaw !== '' && Number.isFinite(job) && job >= 0 && jobInput.checkValidity();
    const validCost = costRaw !== '' && Number.isFinite(cost) && cost > 0 && costInput.checkValidity();

    jobInput.setAttribute('aria-invalid', String(jobRaw !== '' && !validJob));
    costInput.setAttribute('aria-invalid', String(costRaw !== '' && !validCost));
    if (!validJob || !validCost) {
      result.textContent = 'Could one booked job cover the month?';
      detail.textContent = 'Enter a contribution of $0 or more and a monthly coverage cost above $0 to compare them.';
      jobBar.style.width = '0';
      costBar.style.width = '0';
    } else {
      const max = Math.max(job, cost, 1);
      jobBar.style.width = Math.max(1, job / max * 100) + '%';
      costBar.style.width = Math.max(1, cost / max * 100) + '%';
      if (job >= cost) {
        result.textContent = 'One booked job could cover the month.';
        detail.textContent = money(job) + ' in job contribution compared with ' + money(cost) + ' in monthly coverage cost. This depends on a missed caller becoming a booked job.';
      } else {
        const share = Math.round(job / cost * 100);
        result.textContent = 'One job would cover ' + share + '% of the month.';
        detail.textContent = money(job) + ' in job contribution compared with ' + money(cost) + ' in monthly coverage cost. More than one booked job would be needed to cover it.';
      }
    }
    try { sessionStorage.setItem(MATH_KEY, JSON.stringify({ job: jobRaw, cost: costRaw })); } catch { /* Inputs remain usable. */ }
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem(MATH_KEY) || 'null');
    if (saved && typeof saved.job === 'string' && typeof saved.cost === 'string') {
      jobInput.value = saved.job;
      costInput.value = saved.cost;
    }
  } catch { /* Start with empty inputs. */ }
  jobInput.addEventListener('input', updateMath);
  costInput.addEventListener('input', updateMath);
  updateMath();
  showScene(readTrade(), false);
  setPaused(paused);
})();
