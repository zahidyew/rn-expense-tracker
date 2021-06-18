module.exports = {
  testEnvironment: 'jsdom',
  preset: 'react-native',
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  //testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
};

/*'@locales/*': './src/locales/*',
'@redux/*': './src/redux/*',
'@models/*': './src/models/*',
'@helpers/*': './src/helpers/*',
    '@img/*': './src/img/*',
    '@colors': './src/colors/colors',
    '@constants/*': './src/constants/*',
    '@components/*': './src/components/*',
    '@containers/*': './src/containers/*',
    '@styles/*': './src/styles/*',*/
