import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  treeshake: true,
  output: [
    {
      file: pkg.main,
      exports: 'named',
      sourcemap: true,
      format: 'cjs',
    },
    { file: pkg.module, sourcemap: true, format: 'esm' },
  ],
  plugins: [
    resolve({ preferBuiltins: true, browser: true }),
    babel(),
    commonjs(),
    json(),
    terser(),
  ],
};
