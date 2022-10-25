import { defineConfig } from 'rollup';
import { builtinModules } from 'module';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
];

const plugins = [
  nodeResolve({
    preferBuiltins: true,
  }),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
];

function makeBundle({ filePath, dir = 'dist' }) {
  return {
    input: filePath,
    output: {
      dir: dir,
      format: 'cjs',
    },
    plugins,
    external,
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
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      entryFileNames: `index.d.ts`,
      format: 'esm',
    },
    external,
    plugins: [dts({ respectExternal: true })],
  },
]);
