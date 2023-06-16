module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
