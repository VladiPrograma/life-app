import { test as base, expect } from '@playwright/test';

// Both suites fail on unexpected browser diagnostics, including asset failures.
export const test = base.extend<{ browserDiagnostics: undefined }>({
  browserDiagnostics: [
    async ({ page }, use) => {
      const failures: string[] = [];
      page.on('pageerror', (error) =>
        failures.push(`Runtime: ${error.message}`),
      );
      page.on('console', (message) => {
        if (message.type() === 'error' || message.type() === 'warning') {
          failures.push(`Console ${message.type()}: ${message.text()}`);
        }
      });
      page.on('requestfailed', (request) =>
        failures.push(
          `Network: ${request.method()} ${request.url()} (${request.failure()?.errorText})`,
        ),
      );
      page.on('response', (response) => {
        if (response.status() >= 400) {
          failures.push(`HTTP ${response.status()}: ${response.url()}`);
        }
      });

      await use(undefined);
      expect(failures, 'Unexpected browser diagnostics').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
