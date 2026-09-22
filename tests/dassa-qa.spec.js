// @ts-check
const { test, expect } = require('@playwright/test');

// Build DS-2026.09.22-012: the "car wash" funnel. Choose a business type, and
// the page reveals Diagnosis -> Virtual Role -> Revenue Math -> Book as one
// progressive-reveal scrolling page. Earlier builds' checks that still apply
// (mobile stacking, keyboard order, press feedback) are kept; the retired
// summary-card checks from 006 are replaced by the stage checks below.

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
  await first.click();
  await expect(page.locator('#diagnosis')).toBeVisible({ timeout: 4000 });
  await expect(page.locator('#diagnosisBusiness')).toHaveText(expectedLabel);
}

test.describe('Core funnel regression', () => {
  test('search resolves a fuzzy match', async ({ page }) => {
    await page.goto('/');
    await page.fill('#agentSearch', 'mechanic');
    const firstResult = page.locator('#agentSearchResults .agent-search-result').first();
    await expect(firstResult).toBeVisible();
    await expect(firstResult).toContainText('Auto Repair');
  });

  test('industry tabs switch the carousel content', async ({ page }) => {
    await page.goto('/');
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

test.describe('Stages: the car wash (Build 012)', () => {
  test('choosing a business reveals Diagnosis with that business, and only Diagnosis', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#diagnosis')).toBeHidden();
    await expect(page.locator('#virtual-role')).toBeHidden();
    await expect(page.locator('#calculator')).toBeHidden();
    await chooseBusiness(page, 'mechanic', 'Auto Repair');
    await expect(page.locator('#diagnosisApproved')).toBeVisible();
    await expect(page.locator('#diagnosisFallback')).toBeHidden();
    await expect(page.locator('#diagnosisParagraph')).not.toBeEmpty();
    await expect(page.locator('#diagnosisReasons .reason-card')).toHaveCount(2);
    await expect(page.locator('#virtual-role')).toBeHidden();
    await expect(page.locator('#calculator')).toBeHidden();
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'diagnosis');
  });

  test('Next walks Diagnosis -> Virtual Role -> Revenue Math and lands focus on each heading', async ({ page }, testInfo) => {
    await page.goto('/');
    await chooseBusiness(page, 'towing', 'Towing');
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 400);
    await expect(page.locator('#diagnosisTitle')).toBeFocused();

    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await expect(page.locator('#roleName')).toHaveText('Virtual Dispatch Coordinator');
    await expect(page.locator('#roleCatches li')).toHaveCount(3);
    await expect(page.locator('#roleOverflow')).toContainText('answer first');
    await expect(page.locator('#roleHipaa')).toBeHidden();
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 400);
    await expect(page.locator('#roleTitle')).toBeFocused();

    await page.locator('#virtual-role .stage-next').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#presetNote')).toHaveAttribute('data-preset', 'business');
    await expect(page.locator('#calcMissed')).toHaveValue('132');
    await expect(page.locator('#usePreset')).toBeVisible();
    await page.waitForTimeout(isReduced(testInfo) ? 100 : 400);
    await expect(page.locator('#calcTitle')).toBeFocused();
    expect(page.url()).toContain('vertical=towing');
    expect(page.url()).toContain('#calculator');
  });

  test('an unapproved business gets the honest fallback, never boilerplate', async ({ page }) => {
    await page.goto('/?vertical=dental');
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#diagnosisFallback')).toBeVisible();
    await expect(page.locator('#diagnosisApproved')).toBeHidden();
    await expect(page.locator('#diagnosisFallback')).toContainText('rather ask');
    await expect(page.locator('#fallbackRole')).toHaveText('Virtual Patient Coordinator');
    await expect(page.locator('#diagnosisFallback [data-booking]')).toBeVisible();
    // The fallback's only forward path is the calculator, which reports no preset.
    await page.locator('#diagnosisFallback .stage-next').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#presetNote')).toHaveAttribute('data-preset', 'none');
    await expect(page.locator('#usePreset')).toBeHidden();
    // Defaults are never blanked to $0.
    await expect(page.locator('#calcAnnual')).not.toHaveText('$0');
  });

  test('deep link lands on Diagnosis; a hash deep link reveals every stage up to it', async ({ page }) => {
    await page.goto('/?vertical=auto-repair');
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#diagnosisBusiness')).toHaveText('Auto Repair');
    await expect(page.locator('#agentSearch')).toHaveValue('Auto Repair');
    await expect(page.locator('#virtual-role')).toBeHidden();

    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'calculator');
  });

  test('legacy ?vertical=pool-spa resolves through the single resolver', async ({ page }) => {
    await page.goto('/?vertical=pool-spa');
    await expect(page.locator('#diagnosisBusiness')).toHaveText('Pool & Spa Services');
    await expect(page.locator('#fallbackRole')).toHaveText('Virtual Service Desk');
  });

  test('back button walks the stages back and the rail follows', async ({ page }) => {
    await page.goto('/');
    await chooseBusiness(page, 'tire', 'Tire Shops');
    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await page.locator('#virtual-role .stage-next').click();
    await expect(page.locator('#calculator')).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/#virtual-role$/);
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'virtual-role');
    await page.goBack();
    await expect(page).toHaveURL(/#diagnosis$/);
    await expect(page.locator('#stageRail li[aria-current="step"]')).toHaveAttribute('data-stage', 'diagnosis');
    await expect(page.locator('#diagnosis')).toBeVisible();
  });

  test('changing business resets the downstream stages', async ({ page }) => {
    await page.goto('/');
    await chooseBusiness(page, 'towing', 'Towing');
    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#virtual-role')).toBeVisible();
    await chooseBusiness(page, 'spa', 'Spas');
    await expect(page.locator('#virtual-role')).toBeHidden();
    await expect(page.locator('#calculator')).toBeHidden();
    await expect(page.locator('#roleName')).toHaveText('Virtual Spa Concierge');
  });

  test('booking links carry the business into the Calendly prefill', async ({ page }) => {
    await page.goto('/');
    await chooseBusiness(page, 'body shop', 'Auto Body');
    const href = await page.locator('#diagnosisApproved [data-booking]').getAttribute('href');
    expect(href).toContain('calendly.com');
    const prefill = new URL(href || '').searchParams.get('a1') || '';
    expect(prefill).toContain('Business type: Auto Body');
    expect(prefill).toContain('Audit focus:');
    await expect(page.locator('#diagnosisApproved [data-booking]')).toHaveText('Book an Auto Body Communication Audit');
  });

  test('carousel browsing never starts the wash or pushes history', async ({ page }) => {
    await page.goto('/');
    const before = page.url();
    await page.locator('#agentNext').click();
    await page.locator('.agent-industry-tab').nth(2).click();
    await expect(page.locator('#diagnosis')).toBeHidden();
    expect(page.url()).toBe(before);
    // The carousel CTA is the one path in.
    const cta = page.locator('#agentRoleCta');
    await expect(cta).toContainText('Start with');
    await cta.click();
    await expect(page.locator('#diagnosis')).toBeVisible();
  });

  test('the diagnosis choreography is wired and settles', async ({ page }, testInfo) => {
    await page.goto('/');
    await chooseBusiness(page, 'mechanic', 'Auto Repair');
    if (isReduced(testInfo)) {
      // Reduced motion: everything is visible immediately, no delays survive.
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

test.describe('Hero band (Build 012)', () => {
  test('all 52 businesses are in the band, one tab stop, arrows roam', async ({ page }, testInfo) => {
    await page.goto('/');
    const real = page.locator('#businessBand .biz-track:not([aria-hidden]) .biz-chip');
    await expect(real).toHaveCount(52);
    const tabbable = await page.$$eval('#businessBand .biz-chip', (els) => els.filter((el) => el.tabIndex === 0).length);
    expect(tabbable, 'the band must be a single tab stop').toBe(1);
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'roving focus is a keyboard concern');
    await page.locator('#businessBand .biz-chip[tabindex="0"]').focus();
    const first = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    await page.keyboard.press('ArrowRight');
    const second = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    expect(second).not.toBe(first);
    await page.keyboard.press('End');
    const last = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    expect(last).not.toBe(second);
  });

  test('a band chip enters the funnel', async ({ page }) => {
    await page.goto('/');
    await page.locator('#businessBand .biz-chip[data-business-id="auto-salvage"]').first().evaluate((el) => el.click());
    await expect(page.locator('#diagnosis')).toBeVisible();
    await expect(page.locator('#diagnosisBusiness')).toHaveText('Auto Salvage');
    await expect(page.locator('#agentSearch')).toHaveValue('Auto Salvage');
  });

  test('the band drifts, pauses on hover, and is static under reduced motion', async ({ page }, testInfo) => {
    await page.goto('/');
    const track = page.locator('#businessBand .biz-track').first();
    const name = await track.evaluate((el) => getComputedStyle(el).animationName);
    if (isReduced(testInfo)) {
      expect(name).toBe('none');
      return;
    }
    expect(name).toBe('bandDrift');
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'hover pause is a pointer concern');
    await page.locator('#businessBand').hover();
    const state = await track.evaluate((el) => getComputedStyle(el).animationPlayState);
    expect(state).toBe('paused');
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
    await page.goto('/?vertical=towing');
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
  test('focus order follows visual top-to-bottom order with every stage open', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'tab order is a keyboard concern, not touch');
    await page.goto('/?vertical=towing#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator('body').click({ position: { x: 1, y: 1 } });
    const positions = [];
    for (let i = 0; i < 45; i++) {
      await page.keyboard.press('Tab');
      const pos = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const rect = el.getBoundingClientRect();
        return { top: Math.round(rect.top + window.scrollY), tag: el.tagName, id: el.id || null };
      });
      if (pos) positions.push(pos);
    }
    expect(positions.length).toBeGreaterThan(5);
    let lastTop = -Infinity;
    const regressions = [];
    for (const p of positions) {
      if (p.id === 'agentPrev' || p.id === 'agentNext') continue;
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
    await expect(page.locator('#stageStatus')).toContainText('Stage 2 of 5');
    await expect(page.locator('#stageStatus')).toContainText('Dealerships');
    await page.locator('#diagnosisApproved .stage-next').click();
    await expect(page.locator('#stageStatus')).toContainText('Stage 3 of 5');
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
    await page.goto('/?vertical=towing');
    const button = page.locator('#diagnosisApproved .btn.btn-secondary');
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
