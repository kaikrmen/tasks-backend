import type { Config } from '@jest/types';
const { defaults: tsjPreset } = require('ts-jest/presets')


const config: Config.InitialOptions = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: tsjPreset.transform,

};
export default config;
