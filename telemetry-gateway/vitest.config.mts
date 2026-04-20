import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  plugins: [
    // This is required to compile NestJS decorators correctly
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
