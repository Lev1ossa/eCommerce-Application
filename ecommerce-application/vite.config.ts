/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom',
  },
});
