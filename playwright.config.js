// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Serves this repo directly (not the private-preview copy at :8802, which
// goes stale — see the session handoff notes). Point everything at the real
// source so a passing test actually means the source is good.
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // python -m http.server can't keep up with 7 projects fully parallel: at
  // default workers it drops requests and produces phantom console-error and
  // timing failures. 2 workers was measured clean on 2026-09-22.
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:8850',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python -m http.server 8850',
    url: 'http://127.0.0.1:8850/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
  projects: [
    {
      name: 'desktop-1440',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'laptop-1024',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 800 } },
    },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      // Real device presets default to WebKit; forced to Chromium here since
      // that's what's actually installed, and it matches how this project's
      // own QA has been run (Chrome only — Edge's screenshot compositor was
      // unreliable per design-qa.md's Build 003 notes).
      name: 'mobile-430-touch',
      use: { ...devices['iPhone 14 Plus'], viewport: { width: 430, height: 932 }, defaultBrowserType: 'chromium' },
    },
    {
      name: 'mobile-390-touch',
      use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, defaultBrowserType: 'chromium' },
    },
    {
      name: 'mobile-320-touch',
      use: {
        viewport: { width: 320, height: 640 },
        userAgent: devices['iPhone SE (3rd gen)'].userAgent,
        hasTouch: true,
        isMobile: true,
        defaultBrowserType: 'chromium',
      },
    },
    {
      name: 'mobile-390-reduced-motion',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
        reducedMotion: 'reduce',
        defaultBrowserType: 'chromium',
      },
    },
  ],
});
