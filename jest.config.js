module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/.utils$1'
  }
};
