import * as core from '@actions/core';
import type { Filter } from './Types.js';

interface Inputs {
  name: string;
  search: string;
  filter: Filter;
  workingDirectory: string;
}

export function readInputs(): Inputs {
  core.debug('Reading inputs');
  return {
    name: core.getInput('name'),
    search: core.getInput('search'),
    filter: core.getInput('filter'),
    workingDirectory: core.getInput('working-directory'),
  };
}
