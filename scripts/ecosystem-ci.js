#!/usr/bin/env node
// @ts-check
// [ACKNOWLEDGEMENT]
// This script is inspired by https://github.com/vitejs/vite-ecosystem-ci
// Special thanks to @patak_dev for introducing it
// https://twitter.com/patak_dev/status/1547291224457056259

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

// Make sure simulate CI environment when run in local
if (!process.env.CI) {
  process.env.CI = 'true';
}

const exampleDirectory = path.join(__dirname, '..', 'examples');

// Pick some important examples to run. Running all of them takes too long.
const examplesToRunCIs = [
  'create-react-app',
  'vite-react',
  'angular',
  'svelte',
  'vue',
  'nextjs',
];

// BEGIN-WORKAROUND
// TODO: Fix me
// Remove 'postcss.config.js' and tailwind.config.js to workaround to make sure examples do not inherit postcss.config.js
// We will address this at https://github.com/nvh95/jest-preview/issues/183
const postcssConfigPath = path.join(__dirname, '..', 'postcss.config.js');
if (fs.existsSync(postcssConfigPath)) {
  fs.unlink(postcssConfigPath, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');
if (fs.existsSync(tailwindConfigPath)) {
  fs.unlink(tailwindConfigPath, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
// END-WORKAROUND

// On Windows, we need to `pnpm.cmd`
const pnpmCommand = /^win/.test(process.platform) ? 'pnpm.cmd' : 'pnpm';
// Run CI for each example
examplesToRunCIs.forEach((example) => {
  process.chdir(path.join(exampleDirectory, example));
  console.log(process.cwd());
  try {
    spawnSync(pnpmCommand, ['install']);
  } catch (error) {
    console.error(error);
    throw error;
  }

  // Run each test synchronously. We can try to run it asynchronously to speedup but Jest encounter some issues when doing so
  const result = spawnSync(pnpmCommand, ['run', 'test:ci'], {
    stdio: 'inherit',
  });

  if (result.status) {
    console.error(
      `[jest-preview-ecosystem-ci] [${example}] FAILED: ${
        result?.stderr?.toString() || ''
      }`,
      result.error,
    );
    // Notify CI that this failed
    process.exit(result.status);
  }
});
