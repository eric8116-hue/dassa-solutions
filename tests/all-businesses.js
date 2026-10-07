// Walks every business through the ride (desktop + phone): no errors, no overflow, photo loads, role named, summary complete, no stray 'null'.
// Run from the site folder: node tests/all-businesses.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const SITE = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const src = fs.readFileSync(path.join(__dirname, '..', 'ride.js'), 'utf8');
const all = JSON.parse(src.match(/const BUSINESSES = (\[.*?\]);/)[1]);
const done = ['Auto Repair','Auto Body','HVAC','Dental','Roofing','Plumbing','Electrical','Chiropractors','Law Firms','Restaurants','Hotels','Pool Maintenance & Hot-Tub Service'];
const skip = new Set([]);
const list = all.filter((n) => !skip.has(n));
(async () => {
  const br = await chromium.launch({ headless: true });
  const bad = [];
  const calc = {};
  for (const biz of list) {
    for (const [w, h, name] of [[1440, 900, 'd'], [390, 844, 'p']]) {
      const pg = await br.newPage({ viewport: { width: w, height: h } });
      const errs = [];
      pg.on('pageerror', (e) => errs.push(String(e)));
      pg.on('console', (m) => { if (m.type() === 'error' && !/CORS|preload|fonts\.woff2|net::ERR_FAILED/.test(m.text())) errs.push(m.text()); });
      try {
        await pg.goto(SITE);
        await pg.waitForSelector('#ride-q');
        await pg.fill('#ride-q', biz);
        const btn = pg.locator('#ride-list button', { hasText: new RegExp('^\\s*' + biz.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&') + '\\s*$') }).first();
        await btn.click();
        const notes = [];
        for (let i = 0; i < 3; i++) {
          await pg.locator('.ride-btn-primary').first().click(); await pg.waitForTimeout(150);
        }
        const ov = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        const photoOk = await pg.evaluate(() => { const i = document.getElementById('ride-photo'); return i && i.complete && i.naturalWidth > 0; });
        const eyebrow = await pg.locator('#ride-stage').innerText();
        await pg.getByRole('button', { name: /missed calls could cost/i }).click();
        await pg.waitForSelector('#calc-missed');
        const loss = await pg.locator('.ride-roi .ride-big').first().innerText();
        calc[biz] = loss;
        await pg.getByRole('button', { name: /see the summary/i }).click();
        await pg.waitForTimeout(150);
        const sum = await pg.locator('#ride-stage').innerText();
        const okSum = /What we heard/.test(sum) && /20-minute/.test(sum) && /Your estimate/.test(sum);
        if (ov) errs.push('horizontal overflow');
        if (!photoOk) errs.push('photo failed');
        if (!okSum) errs.push('summary incomplete');
        if (!/Virtual /.test(eyebrow)) errs.push('no role on slide 4');
        if (/null|undefined/.test(eyebrow + sum)) errs.push('stray null/undefined text');
      } catch (e) { errs.push('FLOW: ' + String(e).split('\n')[0]); }
      if (errs.length) bad.push(biz + ' ' + name + ': ' + errs.join(' | '));
      await pg.close();
    }
  }
  console.log('tested', list.length, 'businesses x2 viewports; problems:', bad.length);
  bad.forEach((b) => console.log(' ', b.slice(0, 220)));
  console.log(JSON.stringify(calc));
  await br.close();
})();
