import { defineConfig } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'wide', width: 1920, height: 1080 },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : '50%',
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  snapshotPathTemplate:
    '{testDir}/visual/__screenshots__/{platform}/{projectName}/{arg}{ext}',
  updateSnapshots: 'none',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixels: 0,
    },
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: ['e2e', 'visual'].flatMap((suite) =>
    viewports.map(({ name, width, height }) => ({
      name: `${suite}-${name}`,
      testMatch:
        suite === 'visual' ? '**/*.visual.spec.ts' : '**/*.e2e.spec.ts',
      use: { viewport: { width, height } },
    })),
  ),
  webServer: {
    command:
      'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
