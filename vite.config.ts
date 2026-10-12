import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Icon and logo SVGs ship as separate, cacheable files instead of being
    // inlined into the JavaScript bundle; other small assets keep the default.
    assetsInlineLimit: (filePath) =>
      filePath.endsWith('.svg') ? false : undefined,
    // The scroll libraries ship as their own cacheable chunk; together with
    // the app they would exceed the 500 kB chunk warning.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'motion', test: /node_modules[\\/](gsap|lenis)[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
