module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './build',
          '@locales': './build/locales',
          '@redux': './build/redux',
          '@models': './build/models',
          '@helpers': './build/helpers',
          '@components': './build/components',
          '@containers': './build/containers',
          '@styles': './build/styles',
        },
      },
    ],
  ],
};
