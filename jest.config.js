module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/client/src/$1', 
    },
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for additional setup
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  };