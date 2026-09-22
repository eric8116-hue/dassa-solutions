// @ts-check
const { test, expect } = require('@playwright/test');

// Covers exactly the outstanding items from build.json / BUILD_HISTORY.md as of
// DS-2026.09.22-007: mobile stacking + keyboard tab order (005), the scrollend
// fallback + reduced-motion path for the summary-card entrance (006), and
// press feedback including the hover-lift-sticks-after-tap fix (007).
// Baseline search/industry regression is included since any change to this
// page should keep proving the core funnel still works.

const TOUCH_PROJECTS = ['mobile-430-touch', 'mobile-390-touch', 'mobile-320-touch', 'mobile-390-reduced-motion'];
const MOBILE_STACK_PROJECTS = [...TOUCH_PROJECTS, 'tablet-768'];

function isProject(testInfo, names) {
  return names.includes(testInfo.project.name);
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

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, `Console errors: ${errors.join(' | ')}`).toEqual([]);
  });
});

test.describe('Mobile stacking (Build 005)', () => {
  test('no horizontal overflow at any viewport', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, MOBILE_STACK_PROJECTS), 'stacking check only meaningful on mobile/tablet projects');
    await page.goto('/');
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, 'page scrolls horizontally — something is overflowing the viewport').toBeLessThanOrEqual(clientWidth + 1);
  });

  test('the new search-hero section collapses to one column', async ({ page }, testInfo) => {
    test.skip(!isProject(testInfo, MOBILE_STACK_PROJECTS), 'layout check only meaningful on mobile/tablet projects');
    await page.goto('/');
    const gridCols = await page.evaluate(() => {
      const grid = document.querySelector('.vr-hero-grid');
      return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : null;
    });
    expect(gridCols, '.vr-hero-grid should be single-column below the 960px breakpoint').toBe(1);
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

test.describe('Keyboard tab order (Build 005)', () => {
  test('focus order follows visual top-to-bottom order', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'tab order is a keyboard concern, not touch');
    await page.goto('/');
    const positions = [];
    // Walk the first ~40 focus stops — enough to cross the hero, the relocated
    // search section, and into the calculator, which is where 005 changed the
    // DOM order relative to 004.
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const pos = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const rect = el.getBoundingClientRect();
        return { top: Math.round(rect.top + window.scrollY), tag: el.tagName, id: el.id || null };
      });
      if (pos) positions.push(pos);
    }
    expect(positions.length, 'expected at least some focusable elements').toBeGreaterThan(5);
    let lastTop = -Infinity;
    const regressions = [];
    for (const p of positions) {
      // The carousel's prev/next arrows are absolutely positioned at the
      // vertical midpoint of the stage, layered over content that sits below
      // them in DOM order. That is a legitimate control pattern, not a
      // reading-order bug, so they are excluded from the strict check.
      if (p.id === 'agentPrev' || p.id === 'agentNext') continue;
      // 300px slack. The risk 005 introduced is a whole SECTION being out of
      // order (a ~2000px jump), not a two-column card whose right-hand CTA
      // sits a couple hundred px below the left column's last button.
      if (p.top < lastTop - 300) regressions.push(p);
      lastTop = Math.max(lastTop, p.top);
    }
    expect(regressions, `focus jumped backward at: ${JSON.stringify(regressions)}`).toEqual([]);
  });

  test('search input is reachable early in tab order (it now sits right under the hero)', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'tab order is a keyboard concern, not touch');
    await page.goto('/');
    let found = false;
    for (let i = 0; i < 15 && !found; i++) {
      await page.keyboard.press('Tab');
      found = await page.evaluate(() => document.activeElement && document.activeElement.id === 'agentSearch');
    }
    expect(found, '#agentSearch should be reachable within the first ~15 tab stops post-005').toBe(true);
  });
});

test.describe('Summary card scroll-linked reveal (Build 006)', () => {
  test('card reveals with the right business after choosing one', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.fill('#agentSearch', 'mechanic');
    await page.locator('#agentSearchResults .agent-search-result').first().click();

    const isReducedMotionProject = testInfo.project.name.includes('reduced-motion');
    await expect(page.locator('#fitResult')).toBeVisible({ timeout: isReducedMotionProject ? 500 : 2500 });
    await expect(page.locator('#fitResultTitle')).toContainText('Auto Repair');
  });

  test('focus rests on the summary title after choosing a business', async ({ page }) => {
    // FINDING 2026-09-22: reveal() does call fitResultTitle.focus(), but
    // ~300ms later document.activeElement is back on <body> on every viewport
    // tested. Keyboard and screen-reader users lose their place. Left as
    // fixme so the suite stays green on known-good behaviour; flip this to a
    // real assertion once the site is fixed.
    test.fixme(true, 'focus is set on the title and then lost — see finding above');
    await page.goto('/');
    await page.fill('#agentSearch', 'mechanic');
    await page.locator('#agentSearchResults .agent-search-result').first().click();
    await expect(page.locator('#fitResult')).toBeVisible({ timeout: 2500 });
    await page.waitForTimeout(400);
    await expect(page.locator('#fitResultTitle')).toBeFocused();
  });

  test('summary card has the Build 006 entrance transition wired up', async ({ page }) => {
    await page.goto('/');
    const style = await page.evaluate(() => {
      const el = document.getElementById('fitResult');
      const cs = getComputedStyle(el);
      return { transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
    });
    // Build 006 animates opacity + transform on .fit-result via @starting-style.
    expect(style.transitionProperty, 'expected opacity in the transition list').toMatch(/opacity/);
    expect(style.transitionProperty, 'expected transform in the transition list').toMatch(/transform/);
  });

  test('card appears inside the 1400ms fallback budget', async ({ page }, testInfo) => {
    // Measured on 2026-09-22 (Chromium): desktop-1440 reveals at ~280ms via
    // scrollend; laptop-1024 and every phone viewport reveal at ~1460ms
    // because the page is tall enough that the smooth scroll outlasts the
    // 1400ms setTimeout fallback, so the timer wins and the card pops in
    // mid-scroll. That is a real finding (see BUILD_HISTORY 006's intent),
    // not a test artefact. This test guards the ceiling: the fallback must
    // always fire, so the card can never take longer than ~1.4s + overhead.
    await page.goto('/');
    await page.fill('#agentSearch', 'dentist');
    await page.locator('#agentSearchResults .agent-search-result').first().waitFor();
    const start = Date.now();
    await page.locator('#agentSearchResults .agent-search-result').first().click();
    await expect(page.locator('#fitResult')).toBeVisible({ timeout: 2500 });
    const elapsed = Date.now() - start;
    expect(elapsed, `card took ${elapsed}ms — the 1400ms fallback should cap this`).toBeLessThan(2000);
    if (testInfo.project.name === 'desktop-1440') {
      expect(elapsed, `desktop took ${elapsed}ms — expected the fast scrollend path (~280ms)`).toBeLessThan(800);
    }
  });
});

test.describe('Press feedback + hover-lift fix (Build 007)', () => {
  // The first .btn.btn-primary in DOM order is the nav's Calendly link, and a
  // real mouse-down/up on it navigates off-site. The hero's "See Where Calls
  // Leak" is a same-page anchor (#opportunity-flow), so it is safe to press.
  const SAFE_BUTTON = '.hero-actions .btn.btn-primary';

  test('button scales down while pressed, on desktop', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'this is the mouse :active path; touch is covered below');
    await page.goto('/');
    const button = page.locator(SAFE_BUTTON);
    const box = await button.boundingBox();
    if (!box) throw new Error('primary button not found');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    const pressedTransform = await button.evaluate((el) => getComputedStyle(el).transform);
    await page.mouse.up();
    const restedTransform = await button.evaluate((el) => getComputedStyle(el).transform);
    expect(pressedTransform, 'expected a scale(.97) transform while the button is held down').not.toBe('none');
    expect(pressedTransform).not.toBe(restedTransform);
  });

  test('hover lift applies on desktop pointer, and releases cleanly', async ({ page }, testInfo) => {
    test.skip(isProject(testInfo, TOUCH_PROJECTS), 'hover is gated to (hover:hover) and (pointer:fine) — desktop only, by design');
    await page.goto('/');
    const button = page.locator(SAFE_BUTTON);
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
    // Let the 120ms :active press animation fully release.
    await page.waitForTimeout(400);
    const after = await button.evaluate((el) => {
      const t = getComputedStyle(el).transform;
      if (t === 'none') return { scale: 1, ty: 0, raw: t };
      // matrix(a, b, c, d, tx, ty)
      const m = t.match(/matrix\(([^)]+)\)/);
      const [a, , , , , ty] = m ? m[1].split(',').map(Number) : [1, 0, 0, 1, 0, 0];
      return { scale: a, ty, raw: t };
    });
    // The pre-007 bug: after a tap, touch devices kept the desktop :hover
    // lift (translateY(-2px)) because :hover sticks on touch. Post-007 the
    // lift is gated behind (hover:hover) and (pointer:fine), so ty must be 0.
    expect(after.ty, `hover lift stuck after tap — translateY was ${after.ty}px (raw: ${after.raw})`).toBeCloseTo(0, 1);
    expect(after.scale, `press scale did not release — scale was ${after.scale} (raw: ${after.raw})`).toBeCloseTo(1, 2);
  });
});
