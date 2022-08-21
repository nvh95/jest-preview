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
// Remove 'postcss.config.js' to workaround to make sure examples do not inherit postcss.config.js
// We will address this at https://github.com/nvh95/jest-preview/issues/183
const postcssConfigPath = path.join(__dirname, '..', 'postcss.config.js');
if (fs.existsSync(postcssConfigPath)) {
  fs.unlink(postcssConfigPath, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
// END-WORKAROUND

// Run CI for each example
examplesToRunCIs.forEach((example) => {
  process.chdir(path.join(exampleDirectory, example));
  console.log(process.cwd());
  try {
    spawnSync('pnpm', ['install']);
  } catch (error) {
    console.error(error);
    throw error;
  }

  // TODO: Use `pnpm` directly
  // Currently, if we use `pnpm` directly, there will be an error "Error: spawn pnpm ENOENT"
  // https://github.com/nvh95/jest-preview/runs/7938196802?check_suite_focus=true
  const testSpawn = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    ['run', 'test:ci'],
    {
      stdio: 'inherit',
    },
  );

  testSpawn.on('exit', (code, signal) => {
    if (code) {
      console.error(`[jest-preview-ecosystem-ci] FAILED: ${example}`, code);
      // Notify CI that this failed
      process.exit(code);
    } else if (signal) {
      console.error('Child was killed with signal', signal);
    }
  });
});
