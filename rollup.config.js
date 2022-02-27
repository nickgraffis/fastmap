import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import brotli from "rollup-plugin-brotli";

export default [{
  input: 'dist/index.js',
  output: {
    file: "dist/index.min.js",
    format: 'cjs',
    sourcemap: 'inline'
  },
  plugins: [
    resolve(),
    commonjs(),
    brotli(),
  ],
}];