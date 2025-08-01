import { pathsToModuleNameMapper } from 'ts-jest';
import tsConfig from './tsconfig.json';

interface TSConfig {
  compilerOptions: {
    paths?: Record<string, string[]>;
  };
}

const config = tsConfig as TSConfig;

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    config.compilerOptions.paths ?? {},
    {
      prefix: '<rootDir>/',
    },
  ),
};
