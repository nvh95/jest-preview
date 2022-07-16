import { defineConfig, loadEnv } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/node_modules/.cache/jest-preview/**'],
    },
  },
});
