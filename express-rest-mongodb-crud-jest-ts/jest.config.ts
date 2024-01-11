
import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
	preset: 'ts-jest',
	verbose: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<rootDir>/test/**'
	],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest'
	},
	roots: ['<rootDir>'],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	coverageThreshold: {
		global: {
			lines: 90
		}
	}
};

export default config;