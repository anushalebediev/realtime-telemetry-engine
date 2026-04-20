import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globalSetup: 'src/support/global-setup.ts',
    teardownTimeout: 10000,
    setupFiles: ['src/support/test-setup.ts'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
