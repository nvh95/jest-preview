import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: 'build',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
  {
    input: 'src/preconfig/cssTransform.ts',
    output: {
      dir: 'build',
      format: 'cjs',
    },
    plugins: [typescript()],
  },
]);
