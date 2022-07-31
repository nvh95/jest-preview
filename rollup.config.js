import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';

let pkg = JSON.parse(fs.readFileSync('./package.json'));
const external = Object.keys(pkg.dependencies || {});
console.log('external', external);
/**
 *
 * @returns {import('rollup').RollupOptions}
 */
function makeBundle({ filePath, dir = 'dist', banner }) {
  return {
    input: filePath,
    output: {
      dir: dir,
      format: 'cjs',
      banner,
      chunkFileNames: '[name].js',
    },
    plugins: [
      typescript(),
      // terser({
      //   compress: false,
      // }),
    ],
    external: [...external, 'child_process', 'fs', 'path', 'http'],
  };
}

export default defineConfig([
  makeBundle({ filePath: 'src/index.ts' }),
  makeBundle({ filePath: 'src/preconfigTransform/css.ts', dir: 'transforms' }),
  makeBundle({ filePath: 'src/preconfigTransform/file.ts', dir: 'transforms' }),
  makeBundle({
    filePath: 'src/preconfigTransform/fileCRA.ts',
    dir: 'transforms',
  }),
  makeBundle({
    filePath: 'src/cli/index.ts',
    dir: 'cli',
    banner: '#!/usr/bin/env node',
  }),
]);
