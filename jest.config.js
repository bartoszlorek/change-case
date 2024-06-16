module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
