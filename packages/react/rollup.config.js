const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const pkg = require('./package.json');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const copy = require('rollup-plugin-copy');
const scss = require('rollup-plugin-scss');
const sass = require('rollup-plugin-sass');
const replace = require('@rollup/plugin-replace');

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.node', '.ts', '.tsx']
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
            preventAssignment: true,
        }),
        copy({
            targets: [
                { src: `.${__dirname}/src/assets/css/*`, dest: `.${__dirname}/lib/assets/css`, },
                { src: `.${__dirname}/src/assets/fonts/plus-jakarta-sans/*`, dest: `.${__dirname}/lib/assets/fonts/plus-jakarta-sans` }
            ],
        }),
        postcss({
            modules: true,
            plugins: [
                autoprefixer(),
                cssnano({
                    preset: 'default',
                }),
            ],
            inject: true,
            // only write out CSS for the first bundle (avoids pointless extra files):
            // extract: !!options.writeMeta,
        }),
        // scss(),
        sass(),
    ],
    external: ['react', 'react-dom'],
};