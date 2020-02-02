// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  //An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', './src/settings/', './src/logger/'],

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  testMatch: ['**/src/**/*.test.ts?(x)'],
};
