module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@locales': './build/locale/index.js',
          "@redux": "./build/redux",
          "@models": "./build/models",
          "@helpers": "./build/helpers",
          "@img": "./src/img",
          "@colors": "./build/colors/colors",
          "@constants": "./build/constants",
          "@components": "./build/components",
          "@containers": "./build/containers"
        }
      }
    ]
  ]
};
