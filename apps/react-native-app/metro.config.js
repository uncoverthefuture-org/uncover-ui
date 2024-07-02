const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules: new Proxy({}, {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      }),
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    watchFolders: [
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, '../../packages/react-native'),
    ],
  };
})();