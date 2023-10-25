/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['util-test.ts'],
  transform: {
    '\\.ts?$': ['ts-jest', { tsconfig: '<rootDir>/__tests__/tsconfig.json', useESM: true }],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/api/**', '!src/generated/**', '!src/index.ts', '!src/apollo.ts', '!src/config.ts'],
};
