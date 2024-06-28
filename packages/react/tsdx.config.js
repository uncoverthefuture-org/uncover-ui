const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const copy = require('rollup-plugin-copy');
const scss = require('rollup-plugin-scss');
const sass = require('rollup-plugin-sass');
const replace = require('@rollup/plugin-replace');


// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  outDir: 'lib',
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(
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
        extract: !!options.writeMeta,
      }),
      // scss(),
      sass(),
    );
    return config;
  },

};