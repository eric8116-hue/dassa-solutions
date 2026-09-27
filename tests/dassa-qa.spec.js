// @ts-check
const { test, expect } = require('@playwright/test');

// Build DS-2026.09.22-015: the ride in the hero. Choose a business type and the
// hero itself becomes page 1; four pages crossfade in place (The problem, Why it
// matters, Your Virtual helper, Wrap up) with no document scroll at any point.
// Earlier builds' checks that still apply (band, mobile stacking, keyboard order,
// press feedback) are kept.

const TOUCH_PROJECTS = ['mobile-430-touch', 'mobile-390-touch', 'mobile-320-touch', 'mobile-390-reduced-motion'];
const MOBILE_STACK_PROJECTS = [...TOUCH_PROJECTS, 'tablet-768'];

function isProject(testInfo, names) {
  return names.includes(testInfo.project.name);
}
function isReduced(testInfo) {
  return testInfo.project.name.includes('reduced-motion');
}

// Choose a business through the search and wait for the diagnosis stage to land.
async function chooseBusiness(page, query, expectedLabel) {
  await page.fill('#agentSearch', query);
  const first = page.locator('#agentSearchResults .agent-search-result').first();
  await expect(first).toContainText(expectedLabel);
  await first.click({ force: true });
  await expect(page.locator('.hero')).toHaveClass(/is-riding/, { timeout: 4000 });
  await expect(page.locator('#diagnosis')).toBeVisible();
  await expect(page.locator('#diagnosisBusiness')).toHaveText(expectedLabel);
}

// Open the browse-only carousel panel. Below 860px the nav is a hamburger, so open it first.
async function openRolesPanel(page) {
  const toggle = page.locator('#navToggle');
  if (await toggle.isVisible()) await toggle.click();
  await page.locator('#navLinks a[href="#virtual-roles"]').click();
  await expect(page.locator('#virtual-roles')).toBeVisible();
}

test.describe('Core funnel regression', () => {
  test('search resolves a fuzzy match', async ({ page }) => {
    await page.goto('/');
    await page.fill('#agentSearch', 'mechanic');
    const firstResult = page.locator('#agentSearchResults .agent-search-result').first();
    await expect(firstResult).toBeVisible();
    await expect(firstResult).toContainText('Auto Repair');
  });

  test('industry tabs switch the carousel content (panel opens from the nav tab)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#virtual-roles')).toBeHidden();
    await openRolesPanel(page);
    const tabs = page.locator('.agent-industry-tab');
    await expect(tabs.first()).toBeVisible();
    const titleBefore = await page.locator('#agentFamilyTitle').innerText();
    await tabs.nth(1).click();
    await expect(page.locator('#agentFamilyTitle')).not.toHaveText(titleBefore);
  });

  test('no console errors on load, and no library rejections for reviewed entries', async ({ page }) => {
    const errors = [];
    const rejections = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
      if (msg.type() === 'warning' && msg.text().includes('[dassa-library] rejected')) rejections.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, `Console errors: ${errors.join(' | ')}`).toEqual([]);
    expect(rejections, `Library rejected entries: ${rejections.join(' | ')}`).toEqual([]);
  });

  test('the response library loads with the reviewed batch', async ({ page }) => {
    await page.goto('/');
    const status = await page.evaluate(async () => {
      const ids = await window.DASSA_RESPONSE_LIBRARY_READY;
      return { status: window.DASSA_RESPONSE_LIBRARY_STATUS, ids };
    });
    expect(status.status).toBe('loaded');
    expect(status.ids).toEqual(expect.arrayContaining(['auto-repair', 'towing', 'spas']));
  });
});

test.describe('The ride in the hero (Build 015)', () => {
  test('choosing a business materializes page 1 in the hero, with no document scroll', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.locator('#ride')).toBeHidden();
    await chooseBusiness(page, 'mechanic', 'Auto Repair');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator('#heroSign')).toBeHidden();
    await expect(page.locator('#agentSearchResults')).toBeHidden();
    await expect(page.locator('#diagnosisApproved')).toBeVisible();
    await expect(page.locator('#diagnosisFallback')).toBeHidden();
    await expect(page.locator('#diagnosisParagraph')).not.toBeEmpty();
    await expect(page.locator('#reasons')).toBeHidden();
    await expect(page.locator('#virtual-role')).toBeHidden();
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'diagnosis');
    if (!isReduced(testInfo)) await expect(page.locator('#diagnosis')).toHaveClass(/is-settled/, { timeout: 6000 });
    expect(await page.evaluate(() => window.scrollY), 'the ride must never scroll the document').toBe(0);
  });

  test('page 1 fits the viewport on every project', async ({ page }, testInfo) => {
    await page.goto('/?vertical=towing');
    await expect(page.locator('#diagnosis')).toBeVisible();
    if (!isReduced(testInfo)) await expect(page.locator('#diagnosis')).toHaveClass(/is-settled/, { timeout: 6000 });
    const m = await page.evaluate(() => {
      const s = document.getElementById('diagnosis'); const r = s.getBoundingClientRect();
      const h = document.querySelector('.site-header').getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, inner: innerHeight, headerBottom: h.bottom, scrollH: s.scrollHeight, clientH: s.clientHeight, scrollY: window.scrollY };
    });
    expect(m.scrollY).toBe(0);
    expect(m.top, 'page must start below the sticky header').toBeGreaterThanOrEqual(m.headerBottom - 1);
    expect(m.bottom, 'page frame must end inside the viewport').toBeLessThanOrEqual(m.inner + 1);
    // Eric's rule: the DOCUMENT never scrolls; a page's own content may scroll inside its frame on a phone.
    // On desktop and tablet the full page must fit with no internal scroll.
    if (!isProject(testInfo, TOUCH_PROJECTS)) {
      expect(m.scrollH, 'page 1 content must not overflow its frame').toBeLessThanOrEqual(m.clientH + 1);
    }
  });

  test('Next walks The problem -> Why it matters -> Your Virtual helper -> Wrap up, focus on each heading', async ({ page }, testInfo) => {
    await page.goto('/');
    await chooseBusiness(page, 'towing', 'Towing');
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 400);
    await expect(page.locator('#diagnosisTitle')).toBeFocused();

    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#reasons')).toBeVisible();
    await expect(page.locator('#diagnosisReasons .reason-card')).toHaveCount(2);
    const helps = page.locator('#diagnosisReasons .reason-help');
    await expect(helps).toHaveCount(2);
    for (const t of await helps.allTextContents()) expect(t.trim().length).toBeGreaterThan(10);
    // Build 047: exactly one audit action is visible on page 2 at any width: the header button on
    // desktop, or a quiet link on the page when the header button is tucked into the phone menu.
    const audit = page.locator('.nav-actions [data-booking], #reasons [data-booking]').filter({ visible: true });
    await expect(audit).toHaveCount(1);
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 500);
    await expect(page.locator('#reasonsTitle')).toBeFocused();

    await page.locator('#reasons .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await expect(page.locator('#roleLead')).not.toBeEmpty();
    await expect(page.locator('#roleName')).toHaveText('Virtual Dispatch Coordinator');
    await expect(page.locator('#roleCatches li')).toHaveCount(3);
    await expect(page.locator('#roleOverflow')).toContainText('answer first');
    await expect(page.locator('#roleHipaa')).toBeHidden();
    await expect(page.locator('#doorCalculator')).toBeVisible();
    await expect(page.locator('#doorContact')).toBeVisible();
    await expect(page.locator('#railRoleLabel')).toHaveText('Virtual Dispatch Coordinator');
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 500);
    await expect(page.locator('#roleTitle')).toBeFocused();

    await page.locator('#doorCalculator').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#presetNote')).toHaveAttribute('data-preset', 'business');
    await expect(page.locator('#calcMissed')).toHaveValue('132');
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 500);
    await expect(page.locator('#calcTitle')).toBeFocused();
    expect(page.url()).toContain('vertical=towing');
    expect(page.url()).toContain('#calculator');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('page 3 has two doors: skip to the wrap-up, or the calculator then the wrap-up', async ({ page }) => {
    await page.goto('/?vertical=towing#virtual-role');
    await expect(page.locator('#virtual-role')).toBeVisible();
    await page.locator('#doorContact').click();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#calculator')).toBeHidden();
    await expect(page.locator('#contactBusiness')).toHaveText('Towing');
    await expect(page.locator('#stageStatus')).toContainText('Page 4 of 4');
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'wrap');
    expect(page.url()).toContain('#contact');

    await page.goto('/?vertical=towing#virtual-role');
    await page.locator('#doorCalculator').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#stageStatus')).toContainText('Page 4 of 4');
    await page.locator('#calculator .stage-next').click();
    await expect(page.locator('#contact')).toBeVisible();
    // Back from the wrap-up returns to wherever the visitor came from.
    await page.locator('#contact .stage-back').click();
    await expect(page.locator('#calculator')).toBeVisible();
  });

  test('an unapproved business gets the honest fallback and still walks through Why it matters', async ({ page }) => {
    await page.goto('/?vertical=dental');
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#diagnosisFallback')).toBeVisible();
    await expect(page.locator('#diagnosisApproved')).toBeHidden();
    await expect(page.locator('#diagnosisFallback')).toContainText('rather ask');
    await expect(page.locator('#fallbackRole')).toHaveText('Virtual Patient Coordinator');
    await expect(page.locator('#diagnosisFallback [data-booking]')).toBeVisible();
    await page.locator('#diagnosisFallback .stage-next').click();
    // Unapproved businesses still land on Why it matters -- the fallback replaces the skip.
    await expect(page.locator('#reasons')).toBeVisible();
    await expect(page.locator('#reasonsFallback')).toBeVisible();
    await expect(page.locator('#reasonsApproved')).toBeHidden();
    await expect(page.locator('#reasonsFallbackBusiness')).toHaveText('Dental Practices');
    await expect(page.locator('#reasonsFallbackRole')).toHaveText('Virtual Patient Coordinator');
    await page.locator('#reasons .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    // No reviewed entry means no HIPAA flag is known, so the note stays hidden rather than guessing.
    await expect(page.locator('#roleHipaa')).toBeHidden();
    await page.locator('#doorCalculator').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#presetNote')).toHaveAttribute('data-preset', 'none');
    await expect(page.locator('#usePreset')).toBeHidden();
    await expect(page.locator('#calcAnnual')).not.toHaveText('$0');
    // Back from the helper now returns to reasons, not past it.
    await page.locator('#calculator .stage-back').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await page.locator('#virtual-role .stage-back').click();
    await expect(page.locator('#reasons')).toBeVisible();
    await page.locator('#reasons .stage-back').click();
    await expect(page.locator('#diagnosis')).toBeVisible();
  });

  test('deep links land on the right page with no scroll; the rail marks earlier pages done', async ({ page }) => {
    await page.goto('/?vertical=auto-repair');
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#diagnosisBusiness')).toHaveText('Auto Repair');
    await expect(page.locator('#agentSearch')).toHaveValue('Auto Repair');
    await expect(page.locator('#heroSign')).toBeHidden();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    await page.goto('/?vertical=towing#reasons');
    await expect(page.locator('#reasons')).toBeVisible();
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'reasons');
    await expect(page.locator('#stageRail li[data-stage="diagnosis"]')).toHaveAttribute('data-done', 'true');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#diagnosis')).toBeHidden();
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'wrap');
    await expect(page.locator('#stageRail li[data-stage="virtual-role"]')).toHaveAttribute('data-done', 'true');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });


  test('browser back walks the pages back and the rail follows', async ({ page }) => {
    await page.goto('/');
    await chooseBusiness(page, 'tire', 'Tire Shops');
    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#reasons')).toBeVisible();
    await page.locator('#reasons .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/#reasons$/);
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'reasons');
    await page.goBack();
    await expect(page).toHaveURL(/#diagnosis$/);
    await expect(page.locator('#diagnosis')).toBeVisible();
  });

  test('changing business restarts the ride at page 1', async ({ page }) => {
    await page.goto('/?vertical=towing#virtual-role');
    await expect(page.locator('#virtual-role')).toBeVisible();
    await page.locator('#virtual-role .stage-escape').click();
    await expect(page.locator('.hero')).not.toHaveClass(/is-riding/, { timeout: 3000 });
    await chooseBusiness(page, 'auto-repair', 'Auto Repair');
    await expect(page.locator('#virtual-role')).toBeHidden();
    await expect(page.locator('#roleName')).toHaveText('Virtual Service Advisor');
  });

  test('escape returns the hero to its sign state, no scroll', async ({ page }, testInfo) => {
    await page.goto('/?vertical=towing#reasons');
    await expect(page.locator('#reasons')).toBeVisible();
    await page.locator('#reasons .stage-escape').click();
    await expect(page.locator('.hero')).not.toHaveClass(/is-riding/, { timeout: 3000 });
    await expect(page.locator('#ride')).toBeHidden();
    await expect(page.locator('#heroSign')).toBeVisible();
    await expect(page.locator('#heroSignTitle')).toBeVisible();
    await expect(page.locator('#agentSearch')).toHaveValue('');
    expect(page.url()).not.toContain('vertical=');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    if (!isReduced(testInfo)) await expect(page.locator('.hero')).toHaveClass(/is-signing/);
    if (!isProject(testInfo, TOUCH_PROJECTS)) await expect(page.locator('#agentSearch')).toBeFocused();
  });

  // Build 047: "Get off the ride" was merged into "Choose a different business", the one exit on page 4.
  test('the wrap-up has one exit: "Choose a different business" restores the hero with an empty search', async ({ page }) => {
    await page.goto('/?vertical=towing#contact');
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#rideExit')).toHaveCount(0);
    await page.locator('#startOver').click();
    await expect(page.locator('.hero')).not.toHaveClass(/is-riding/, { timeout: 3000 });
    await expect(page.locator('#heroSign')).toBeVisible();
    await expect(page.locator('#agentSearch')).toHaveValue('');
    await page.waitForTimeout(200);
    await expect(page.locator('#agentSearchResults')).toBeHidden();
  });

  test('the rail has exactly the four page labels', async ({ page }) => {
    await page.goto('/?vertical=towing');
    const labels = (await page.locator('#stageRail li').allTextContents()).map((t) => t.trim());
    expect(labels).toEqual(['The problem', 'Why it matters', 'Your Virtual helper', 'Wrap up']);
  });

  test('booking links carry the business into the Calendly prefill', async ({ page }) => {
    await page.goto('/?vertical=auto-body#reasons');
    await expect(page.locator('#reasons')).toBeVisible();
    const booking = page.locator('.nav-actions [data-booking], #reasons [data-booking]').filter({ visible: true });
    const href = await booking.getAttribute('href');
    expect(href).toContain('calendly.com');
    const prefill = new URL(href || '').searchParams.get('a1') || '';
    expect(prefill).toContain('Business type: Auto Body');
    expect(prefill).toContain('Audit focus:');
    await expect(booking).toHaveText('Book an Auto Body Communication Audit');
  });

  test('carousel browsing never starts the ride; its CTA scrolls to the top then rides', async ({ page }) => {
    await page.goto('/');
    await openRolesPanel(page);
    const before = page.url();
    await page.locator('#agentNext').click();
    await page.locator('.agent-industry-tab').nth(2).click();
    await expect(page.locator('#ride')).toBeHidden();
    expect(page.url()).toBe(before);
    const cta = page.locator('#agentRoleCta');
    await expect(cta).toContainText('Start with');
    // Build 036: Virtual Roles is its own page, so the CTA returns to the home page and then rides.
    await cta.scrollIntoViewIfNeeded();
    await cta.click();
    await expect(page.locator('body')).toHaveAttribute('data-view', 'home');
    await expect(page.locator('.hero')).toHaveClass(/is-riding/, { timeout: 5000 });
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 }).toBe(0);
    await expect(page.locator('#diagnosis')).toBeVisible();
  });

  test('the sign layer is inert while riding', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'keyboard concern');
    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    const landed = [];
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      landed.push(await page.evaluate(() => { const a = document.activeElement; return (a && (a.id || a.className)) || ''; }));
    }
    expect(landed.some((x) => x === 'agentSearch' || /biz-chip/.test(x))).toBe(false);
  });

  test('the hero has no old SHOW ME prompt or animated arrows', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.show-me')).toHaveCount(0);
    await expect(page.locator('.sign-arrows')).toHaveCount(0);
    await expect(page.locator('#tradeLine')).toHaveCount(0);
  });

  test('the diagnosis choreography is wired and settles', async ({ page }, testInfo) => {
    await page.goto('/');
    await chooseBusiness(page, 'mechanic', 'Auto Repair');
    if (isReduced(testInfo)) {
      const delays = await page.$$eval('#diagnosis .wash-item', (els) => els.map((el) => getComputedStyle(el).animationDelay));
      expect(delays.every((d) => d === '0s')).toBe(true);
      await expect(page.locator('#diagnosisParagraph')).toBeVisible({ timeout: 500 });
      return;
    }
    await expect(page.locator('#diagnosis')).toHaveClass(/is-revealing/);
    const anim = await page.locator('#diagnosisParagraph').evaluate((el) => getComputedStyle(el).animationName);
    expect(anim).toBe('washRise');
    await expect(page.locator('#diagnosis')).toHaveClass(/is-settled/, { timeout: 6000 });
    await expect(page.locator('#diagnosisParagraph')).toHaveCSS('opacity', '1');
  });
});

test.describe('The lit sign hero (Build 016)', () => {
  // Build 046: the pitch became a one-line prompt directly above the field.
  test('the quick-pick chips are gone and a one-line prompt sits above the field', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.biz-chip')).toHaveCount(0);
    await expect(page.locator('.hero-pitch')).toBeVisible();
    const fieldBox = await page.locator('#agentSearch').boundingBox();
    const pitchBox = await page.locator('.hero-pitch').boundingBox();
    expect(pitchBox.y).toBeLessThan(fieldBox.y);
    expect((await page.locator('.hero-pitch').textContent()).trim().split(/\s+/).length).toBeLessThanOrEqual(20);
  });

  // Build 021 (Eric): the field is rounded now, still slim.
  test('the field is rounded and slim', async ({ page }) => {
    await page.goto('/');
    const radius = await page.locator('.hero .agent-search').evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius));
    expect(radius).toBeGreaterThanOrEqual(20);
    const box = await page.locator('.hero .agent-search').boundingBox();
    expect(box.height).toBeLessThanOrEqual(52);
  });

  test('exactly five fixed scenes pair the active image and the active message', async ({ page }) => {
    await page.goto('/');
    const state = await page.evaluate(() => {
      const activeImage = document.querySelector('#heroScenes .hero-scene.is-current');
      const activeText = document.querySelector('#heroSignTitle .hl-saying.is-current');
      const scene = window.DASSA_HERO_SCENES.find((item) => getComputedStyle(activeImage).backgroundImage.includes(item.src));
      return {
        count: window.DASSA_HERO_SCENES.length,
        sceneText: scene && scene.saying,
        text: activeText && activeText.textContent.replace(/\s+/g, ' ').trim(),
        imageTransition: getComputedStyle(activeImage).transition,
        textTransition: getComputedStyle(activeText).transition
      };
    });
    expect(state.count).toBe(5);
    expect(state.sceneText).toBeTruthy();
    expect(state.text).toContain(state.sceneText.split('|')[0]);
    expect(state.text).toContain(state.sceneText.split('|')[1]);
    expect(state.imageTransition).toBe(state.textTransition);
  });

  test('two scene layers exist and exactly one is current', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#heroScenes .hero-scene')).toHaveCount(2);
    await expect(page.locator('#heroScenes .hero-scene.is-current')).toHaveCount(1);
    const img = await page.locator('#heroScenes .hero-scene.is-current').evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(img).toContain('assets/scenes/');
  });

  test('the scenes rotate, and stop while riding and under reduced motion', async ({ page }, testInfo) => {
    await page.goto('/');
    const current = () => page.locator('#heroScenes .hero-scene.is-current')
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    const first = await current();

    if (isReduced(testInfo)) {
      await page.waitForTimeout(7000);
      expect(await current(), 'reduced motion must not hard-cut the photo').toBe(first);
      return;
    }
    // Scenes hold for 8.5s since Build 045, so allow a little more than one scene.
    await expect.poll(current, { timeout: 12000 }).not.toBe(first);

    // Riding must silence the rotation, or it burns cycles behind an opaque layer.
    await chooseBusiness(page, 'mechanic', 'Auto Repair');
    const during = await page.locator('#heroScenes .hero-scene.is-current')
      .evaluate((el) => getComputedStyle(el).backgroundImage);
    await page.waitForTimeout(7000);
    expect(await page.locator('#heroScenes .hero-scene.is-current')
      .evaluate((el) => getComputedStyle(el).backgroundImage)).toBe(during);
  });

  test('the results box is dark, not a white slab', async ({ page }) => {
    await page.goto('/');
    await page.locator('#agentSearch').fill('tow');
    await expect(page.locator('#agentSearchResults')).toBeVisible();
    const bg = await page.locator('#agentSearchResults').evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe('rgb(255, 255, 255)');
    // Still in the root stacking context — the scroll-anchoring fix from 015 must survive.
    const onBody = await page.evaluate(() => document.getElementById('agentSearchResults').parentElement === document.body);
    expect(onBody).toBe(true);
    expect(await page.locator('#agentSearchResults').evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
  });
});

test.describe('Mobile stacking (Build 005)', () => {
  test('no horizontal overflow at any viewport, including with every stage open', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, MOBILE_STACK_PROJECTS), 'stacking check only meaningful on mobile/tablet projects');
    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, 'page scrolls horizontally — something is overflowing the viewport').toBeLessThanOrEqual(clientWidth + 1);
  });

  test('the Virtual Role stage collapses to one column', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, MOBILE_STACK_PROJECTS), 'layout check only meaningful on mobile/tablet projects');
    await page.goto('/?vertical=towing#virtual-role');
    await expect(page.locator('#virtual-role')).toBeVisible();
    const gridCols = await page.evaluate(() => {
      const grid = document.querySelector('#virtual-role .vr-hero-grid');
      return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : null;
    });
    expect(gridCols, '.vr-hero-grid should be single-column below the 960px breakpoint').toBe(1);
  });

  test('reason cards stack on phones', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, TOUCH_PROJECTS), 'phone-only check');
    await page.goto('/?vertical=towing#reasons');
    await expect(page.locator('#diagnosisReasons')).toBeVisible();
    const cols = await page.evaluate(() => getComputedStyle(document.getElementById('diagnosisReasons')).gridTemplateColumns.split(' ').length);
    expect(cols).toBe(1);
  });

  test('mobile nav menu opens and closes', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, MOBILE_STACK_PROJECTS), 'nav toggle is desktop-hidden');
    await page.goto('/');
    const toggle = page.locator('#navToggle');
    const links = page.locator('#navLinks');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(links).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(links).not.toHaveClass(/open/);
  });
});

test.describe('Keyboard (Build 005 + 012)', () => {
  test('focus order follows visual top-to-bottom order across hero and the active stage', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'tab order is a keyboard concern, not touch');
    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    // Start the walk from the very top so the skip link is the first stop, not a mid-page jump.
    await page.evaluate(() => { const a = document.activeElement; if (a && a !== document.body) a.blur(); });
    const positions = [];
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press('Tab');
      const pos = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const rect = el.getBoundingClientRect();
        return { top: Math.round(rect.top + window.scrollY), tag: el.tagName, id: el.id || null, key: (el.id || '') + '|' + (el.textContent || '').trim().slice(0, 40) + '|' + Math.round(rect.top + window.scrollY) };
      });
      if (!pos) break;
      // Tab wraps to the top once the document ends; that wrap is not a reading-order regression.
      if (seen.has(pos.key)) break;
      seen.add(pos.key);
      positions.push(pos);
    }
    expect(positions.length).toBeGreaterThan(5);
    let lastTop = -Infinity;
    const regressions = [];
    for (const p of positions) {
      if (p.id === 'agentPrev' || p.id === 'agentNext') continue;
      // The calculator's copy column (heading, note, Re-apply) is DOM-first but sits left of the
      // taller form; its button lands below the form's first row. Two-column reading order, not a bug.
      if (p.id === 'usePreset') continue;
      if (p.top < lastTop - 300) regressions.push(p);
      lastTop = Math.max(lastTop, p.top);
    }
    expect(regressions, `focus jumped backward at: ${JSON.stringify(regressions)}`).toEqual([]);
  });

  test('search input is reachable early in tab order (band is one stop, search right after)', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'tab order is a keyboard concern, not touch');
    await page.goto('/');
    let found = false;
    for (let i = 0; i < 12 && !found; i++) {
      await page.keyboard.press('Tab');
      found = await page.evaluate(() => document.activeElement && document.activeElement.id === 'agentSearch');
    }
    expect(found, '#agentSearch should be reachable within the first ~12 tab stops').toBe(true);
  });

  test('screen-reader status announces each stage', async ({ page }) => {
    await page.goto('/');
    await chooseBusiness(page, 'dealership', 'Dealerships');
    await expect(page.locator('#stageStatus')).toContainText('Page 1 of 4');
    await expect(page.locator('#stageStatus')).toContainText('Dealerships');
    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#stageStatus')).toContainText('Page 2 of 4');
  });
});

test.describe('Press feedback + hover-lift fix (Build 007)', () => {
  // The search button is a same-page control, so a real press cannot navigate away.
  const SAFE_BUTTON = '#agentSearchButton';

  test('button scales down while pressed, on desktop', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'this is the mouse :active path; touch is covered below');
    // #usePreset is a plain <button> at the calculator stage: pressing it can never navigate away.
    await page.goto('/?vertical=towing#calculator');
    const target = page.locator('#usePreset');
    await expect(target).toBeVisible();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const box = await target.boundingBox();
    if (!box) throw new Error('button not found');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    const pressedTransform = await target.evaluate((el) => getComputedStyle(el).transform);
    await page.mouse.up();
    const restedTransform = await target.evaluate((el) => getComputedStyle(el).transform);
    expect(pressedTransform, 'expected a scale(.97) transform while the button is held down').not.toBe('none');
    expect(pressedTransform).not.toBe(restedTransform);
  });

  test('hover lift applies on desktop pointer, and releases cleanly', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'hover is gated to (hover:hover) and (pointer:fine) — desktop only, by design');
    // The nav CTA is display:none below 860px. Hover (not press) the diagnosis stage's
    // secondary .btn: it exists at every width and hovering a link never navigates.
    await page.goto('/?vertical=towing#reasons');
    const button = page.locator('#reasons .btn.btn-secondary').first();
    await expect(button).toBeVisible();
    await button.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3600);
    const idleTransform = await button.evaluate((el) => getComputedStyle(el).transform);
    await button.hover();
    const hoverTransform = await button.evaluate((el) => getComputedStyle(el).transform);
    expect(hoverTransform, 'expected translateY(-2px) lift on hover for a fine pointer').not.toBe(idleTransform);
  });

  test('tapping a button on a touch device does not leave the hover lift stuck', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, TOUCH_PROJECTS), 'this is specifically the touch-device regression from Build 007');
    await page.goto('/');
    const button = page.locator(SAFE_BUTTON);
    await button.tap();
    await page.waitForTimeout(400);
    const after = await button.evaluate((el) => {
      const t = getComputedStyle(el).transform;
      if (t === 'none') return { scale: 1, ty: 0, raw: t };
      const m = t.match(/matrix\(([^)]+)\)/);
      const [a, , , , , ty] = m ? m[1].split(',').map(Number) : [1, 0, 0, 1, 0, 0];
      return { scale: a, ty, raw: t };
    });
    expect(after.ty, `hover lift stuck after tap — translateY was ${after.ty}px (raw: ${after.raw})`).toBeCloseTo(0, 1);
    expect(after.scale, `press scale did not release — scale was ${after.scale} (raw: ${after.raw})`).toBeCloseTo(1, 2);
  });
});
