module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src', 'src/options'],
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/.utils$1',
    '^@options(.*)$': '<rootDir>/src/options$1'
  }
};
