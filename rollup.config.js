import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

import packageJson from './package.json';
function makeBundle({ filePath, dir = 'dist' }) {
  return {
    input: filePath,
    output: {
      dir,
      format: 'cjs',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
      }),
      resolve(),
    ],
    external: [
      ...Object.keys(packageJson.dependencies),
      ...Object.keys(packageJson.devDependencies),
    ],
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
]);
