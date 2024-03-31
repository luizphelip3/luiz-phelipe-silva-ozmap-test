import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testTimeout: 9000,
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/main/**',
    '!**/test/**',
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: ['.+\\.test\\.ts$', '.*\\.spec\\.ts$'],
  collectCoverage: true,
};

export default config;
