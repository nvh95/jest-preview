import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // expose .env as process.env instead of import.meta.env
  // Reference: https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  const env = loadEnv(mode, process.cwd(), 'VITE_APP');
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {},
  );

  // Inject NODE_ENV and make sure envWithProcessPrefix is not empty
  envWithProcessPrefix['process.env.NODE_ENV'] = `'${mode}'`;

  return {
    plugins: [react()],
    // If `envWithProcessPrefix` is an empty object, `process.env` will be undefined and the app cannot be loaded
    // Caveat: Cannot access `process.env` in build mode, always use `process.env.VARIABLE_NAME`
    define: envWithProcessPrefix,
    // Support tilde import
    resolve: {
      alias: {
        '~animate-sass': path.resolve(__dirname, 'node_modules/animate-sass'),
        '~animate.css': path.resolve(__dirname, 'node_modules/animate.css'),
      },
    },
    // Support loadPaths for scss
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [
            path.resolve(__dirname, 'src/assets/_scss/loadPathsExample'),
          ],
        },
      },
    },
  };
});
