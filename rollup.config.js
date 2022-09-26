import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

function makeBundle({ filePath, dir = 'dist' }) {
  return {
    input: filePath,
    output: {
      dir: dir,
      format: 'cjs',
    },
    plugins: [typescript()],
    external: ['path', 'camelcase', 'fs', 'child_process'],
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
