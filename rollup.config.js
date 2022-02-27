import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import brotli from "rollup-plugin-brotli";
import pkg from './package.json';

export default [{
  input: 'dist/index.js',
  output: {
    name: "FastMap",
    file: pkg.browser,
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [
    resolve(),
    commonjs(),
    brotli(),
  ],
}];