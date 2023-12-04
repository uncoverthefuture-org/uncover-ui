const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const copy = require('rollup-plugin-copy');
const scss = require('rollup-plugin-scss');
const sass = require('rollup-plugin-sass');

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(
      copy({
        targets: [
          { src: './src/assets/css/*', dest: './dist/assets/css', },
          { src: './src/assets/fonts/plus-jakarta-sans/*', dest: './dist/assets/fonts/plus-jakarta-sans' }
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