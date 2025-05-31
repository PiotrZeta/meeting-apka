export default {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '^@mui/icons-material$': '<rootDir>/__mocks__/@mui/icons-material.js',
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transformIgnorePatterns: ['/node_modules/'],
};
