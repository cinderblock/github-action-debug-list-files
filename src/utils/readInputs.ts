import * as core from '@actions/core';
import { Filter } from './Types';

type Inputs = {
  name: string;
  search: string;
  filter: Filter;
  workingDirectory: string;
};

export function readInputs(): Inputs {
  core.debug('Reading inputs');

  const name = core.getInput('name');
  const search = core.getInput('search');
  const filter = core.getInput('filter');
  const workingDirectory = core.getInput('working-directory');

  const inputs: Inputs = {
    name,
    search,
    filter,
    workingDirectory,
  };

  return inputs;
}
