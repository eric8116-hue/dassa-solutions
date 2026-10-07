(() => {
  'use strict';

  const BOOKING_URL = 'https://calendly.com/edassa-dassasolutions/30min';
  const MATH_KEY = 'dassa-053-one-call-math';
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
  const TRIGGER_HOLD_MS = 3200;
  const LINE_FADE_MS = 300;
  const CONSEQUENCE_HOLD_MS = 4500;
  const VERTICAL_ACCENTS = {
    'car-wash': '#7dd3fc',
    'auto-repair': '#fbbf24',
    hvac: '#00f2ff',
    towing: '#fbbf24',
    medical: '#38bdf8',
    electrician: '#facc15',
    electrical: '#facc15',
    roofing: '#facc15',
    plumbing: '#4ade80'
  };
  const SCENES = [
    {
      id: 'car-wash', label: 'Car Washes', image: 'assets/playbooks/car-wash.jpg',
      alt: 'A sedan passing through a tunnel car wash at dusk',
      headline: 'The pay station line rings while the whole crew is in the tunnel with the blowers on.',
      line: 'A monthly-membership question goes to voicemail. That customer buys the plan at the wash across the highway.',
      role: 'Virtual Wash Coordinator',
      blueprint: 'For car washes, put a ringing phone where the crew can hear it and answer it wet.',
      contact: 'For car washes, trace a membership call from the pay station to a person who can close it.'
    },
    {
      id: 'auto-repair', label: 'Automotive Repair', image: 'assets/playbooks/auto-repair.jpg',
      alt: 'A service bay with a car on the lift',
      headline: 'At 8 a.m. your advisor is under a hood and three customers with dead cars are on hold.',
      line: 'The second caller hangs up and books at the shop down the road. You never knew they called.',
      role: 'Virtual Service Advisor',
      blueprint: 'For auto repair, give the second and third morning callers a live path while the advisor is in the bay.',
      contact: 'For auto repair, follow a morning call from the first ring to a booked bay.'
    },
  {
      id: 'hvac', label: 'HVAC / Trades', image: 'assets/AdobeStock_1607525625.jpg',
      alt: 'HVAC and trades technician at work',
      headline: "A technician leaves your company — and your long-time clients are still calling his personal cell phone.",
      line: "Have you ever wondered why recurring accounts quietly vanish after an employee walks?",
      role: 'Virtual Service Coordinator',
      blueprint: 'For HVAC and trades, keep the customer contact path with the company when staff change.',
      contact: 'For HVAC and trades, trace which numbers customers use and who owns each callback.'
    },
    {
      id: 'towing', label: 'Towing & Recovery', image: 'assets/AdobeStock_128376104.jpeg',
      alt: 'Tow truck responding to a roadside recovery',
      headline: "You're out on the shoulder hooking up a vehicle when the county dispatch call hits.",
      line: 'One missed ring. Dispatch skips your truck and awards the rotation haul to the next company on the list.',
      role: 'Virtual Dispatch Coordinator',
      blueprint: 'For towing and recovery, route dispatch calls while the driver is on a job.',
      contact: 'For towing and recovery, map who receives dispatch and roadside calls while trucks are occupied.'
    },
    {
      id: 'medical', label: 'Medical & Dental', image: 'assets/AdobeStock_2042561392.jpg',
      alt: 'Medical or dental office receiving patient calls',
      headline: 'A patient calls to reschedule, gets lost in voicemail, and nobody follows up before the schedule locks.',
      line: 'The slot stays empty, your provider sits idle, and that billable appointment revenue is gone forever.',
      role: 'Virtual Clinic Coordinator',
      blueprint: 'For medical and dental offices, connect reschedule calls to the appointment workflow.',
      contact: 'For medical and dental offices, trace reschedule requests from the first call to calendar update.'
    },
    {
      id: 'roofing', label: 'ROOFING & CONTRACTORS', image: 'assets/roofing-sunset.webp',
      alt: 'Roofing contractor at work',
      headline: 'Your front desk is on a call, the second line rolls to a standard voicemail, and no one answers.',
      line: "Homeowners with active leaks don't leave voicemails — they call the next roofer on Google. Thousands of dollars down the drain.",
      role: 'Virtual Lead Coordinator',
      blueprint: 'For roofing and contractors, give a second caller a live path while the front desk is busy.',
      contact: 'For roofing and contractors, follow each inquiry from the first ring through the promised callback.'
    },
    {
      id: 'plumbing', label: 'Plumbing & Mechanical', image: 'assets/AdobeStock_2098710609.jpg',
      alt: 'Plumbing and mechanical emergency service',
      headline: 'A pipe bursts after hours, your on-call number goes to an unmonitored mailbox, and the customer panics.',
      line: 'That emergency re-pipe job went to the contractor whose phones answered live on the first ring.',
      role: 'Virtual Service Coordinator',
      blueprint: 'For plumbing and mechanical work, route after-hours emergencies to available coverage.',
      contact: 'For plumbing and mechanical work, inspect the after-hours path from first ring to response.'
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const sceneImage = $('#scene-image');
  const heroBand = $('.hero-band');
  const pauseButton = $('#scene-pause');
  const roleChip = $('#role-chip');
  const bookingCta = $('#booking-cta');
  const jobInput = $('#job-value');
  const costInput = $('#coverage-cost');
  let requestId = 0;
  const state = {
    isPaused: false,
    currentTimer: null,
    currentSlide: 0,
    currentStage: 1,
    remainingMs: null,
    timerStartedAt: null
  };

  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    document.documentElement.dataset.preview = 'true';
    document.title = 'Dassa Solutions — Build DS-2026.09.27-054 — Private concept';
  }
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

  function clearCurrentTimer(preserveRemaining = false) {
    if (state.currentTimer !== null) {
      if (preserveRemaining && state.timerStartedAt !== null) {
        state.remainingMs = Math.max(0, state.remainingMs - (performance.now() - state.timerStartedAt));
      }
      window.clearTimeout(state.currentTimer);
    }
    state.currentTimer = null;
    state.timerStartedAt = null;
  }

  function setHeroAnimationsPaused(shouldPause) {
    $('.headline-slot').querySelectorAll('.headline-line').forEach((line) => {
      line.getAnimations().forEach((animation) => shouldPause ? animation.pause() : animation.play());
    });
    sceneImage.getAnimations().forEach((animation) => shouldPause ? animation.pause() : animation.play());
  }

  function updatePauseButton() {
    pauseButton.classList.toggle('is-paused', state.isPaused);
    pauseButton.setAttribute('aria-pressed', String(state.isPaused));
    pauseButton.setAttribute('aria-label', state.isPaused ? 'Resume' : 'Pause');
    $('.pause-icon').textContent = state.isPaused ? '▶' : '⏸';
    $('.pause-label').textContent = state.isPaused ? 'Resume' : 'Pause';
  }

  function setPaused() {
    if (!state.isPaused) {
      state.isPaused = true;
      clearCurrentTimer(true);
      setHeroAnimationsPaused(true);
    } else {
      state.isPaused = false;
      setHeroAnimationsPaused(false);
      runCurrentStage(state.remainingMs);
    }
    updatePauseButton();
  }

  function scheduleCurrentStep(callback, delay) {
    clearCurrentTimer();
    const wait = Math.max(0, delay);
    state.remainingMs = wait;
    state.timerStartedAt = performance.now();
    state.currentTimer = window.setTimeout(() => {
      state.currentTimer = null;
      state.timerStartedAt = null;
      state.remainingMs = null;
      if (!state.isPaused) callback();
    }, wait);
  }

  function runCurrentStage(delayOverride = null) {
    if (state.isPaused || document.hidden || REDUCED_MOTION.matches) return;
    const headlineSlot = $('.headline-slot');
    switch (state.currentStage) {
      case 1:
        scheduleCurrentStep(() => {
          state.currentStage = 2;
          headlineSlot.classList.add('is-trigger-fading');
          runCurrentStage();
        }, delayOverride ?? TRIGGER_HOLD_MS);
        break;
      case 2:
        scheduleCurrentStep(() => {
          headlineSlot.classList.remove('is-trigger-visible', 'is-trigger-fading');
          headlineSlot.classList.add('is-consequence-visible');
          state.currentStage = 3;
          runCurrentStage();
        }, delayOverride ?? LINE_FADE_MS);
        break;
      case 3:
        scheduleCurrentStep(() => {
          state.currentStage = 4;
          headlineSlot.classList.add('is-consequence-fading');
          runCurrentStage();
        }, delayOverride ?? CONSEQUENCE_HOLD_MS);
        break;
      case 4:
        scheduleCurrentStep(() => {
          state.currentStage = 5;
          runCurrentStage();
        }, delayOverride ?? LINE_FADE_MS);
        break;
      case 5:
        scheduleCurrentStep(() => {
          showScene((state.currentSlide + 1) % SCENES.length, false);
        }, delayOverride ?? 0);
        break;
      default:
        state.currentStage = 1;
        runCurrentStage();
    }
  }

  function startReveal() {
    const headlineSlot = $('.headline-slot');
    headlineSlot.querySelectorAll('.headline-line').forEach((line) => {
      line.getAnimations().forEach((animation) => animation.cancel());
    });
    headlineSlot.classList.remove('is-trigger-visible', 'is-trigger-fading', 'is-consequence-visible', 'is-consequence-fading');
    void headlineSlot.offsetWidth;
    headlineSlot.classList.add('is-trigger-visible');
    state.currentStage = 1;
    state.remainingMs = null;
    runCurrentStage();
  }

  async function showScene(index, announce = true) {
    if (index < 0 || index >= SCENES.length) return;
    const currentRequest = ++requestId;
    const ready = await imageReady[index];
    if (currentRequest !== requestId) return;

    const scene = SCENES[index];
    state.currentSlide = index;
    state.currentStage = 1;
    state.remainingMs = null;
    clearCurrentTimer();
    heroBand.dataset.scene = scene.id;
    heroBand.style.setProperty('--scene-accent', VERTICAL_ACCENTS[scene.id] || VERTICAL_ACCENTS.hvac);
    sceneImage.getAnimations().forEach((animation) => animation.cancel());
    sceneImage.style.opacity = '';
    sceneImage.src = scene.image;
    sceneImage.alt = ready ? scene.alt : '';
    sceneImage.classList.toggle('is-unavailable', !ready);
    $('.hero-band').classList.add('is-ready');
    $('#scene-business').textContent = scene.label + ' / 0' + (index + 1);
    $('#scene-title').textContent = scene.headline;
    $('#scene-line').textContent = scene.line;
    $('#scene-count').textContent = '0' + (index + 1) + ' / 0' + SCENES.length;
    $('#blueprint-context').textContent = scene.blueprint;
    roleChip.textContent = scene.role;
    $('#math-trade').textContent = scene.label.toUpperCase() + ' / ONE-CALL CHECK';
    $('#contact-context').textContent = scene.contact;
    bookingCta.textContent = 'Book Your ' + scene.label + ' Communication Audit';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    bookingCta.append(' ', arrow);
    if (announce) {
      $('#scene-status').textContent = scene.label + '. ' + scene.headline + ' ' + scene.line +
        ' Story ' + (index + 1) + ' of ' + SCENES.length + '.';
    }
    startReveal();
    if (ready && !REDUCED_MOTION.matches && !state.isPaused) {
      sceneImage.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 650, easing: 'ease-out' });
    }
  }

  $('#scene-prev').addEventListener('click', () => {
    state.isPaused = true;
    clearCurrentTimer();
    setHeroAnimationsPaused(true);
    updatePauseButton();
    showScene((state.currentSlide + SCENES.length - 1) % SCENES.length);
  });
  $('#scene-next').addEventListener('click', () => {
    state.isPaused = true;
    clearCurrentTimer();
    setHeroAnimationsPaused(true);
    updatePauseButton();
    showScene((state.currentSlide + 1) % SCENES.length);
  });
  pauseButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    try { setPaused(); } catch (error) { console.error('Could not toggle the hero slide sequence.', error); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !state.isPaused) setPaused();
    else if (!document.hidden && !state.isPaused) runCurrentStage(state.remainingMs);
  });
  REDUCED_MOTION.addEventListener('change', () => {
    if (REDUCED_MOTION.matches && !state.isPaused) setPaused();
  });

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
  updatePauseButton();
  showScene(0, false);
})();
