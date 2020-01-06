import * as core from '@actions/core';
import { Filter } from './Types';

type Inputs = {
  name: string;
  search: string;
  exclude: Filter;
};

export function readInputs(): Inputs {
  core.debug('Reading inputs');

  const name = core.getInput('name');
  const search = core.getInput('search');
  const exclude = core.getInput('exclude-list').split(',');

  const inputs: Inputs = {
    name,
    search,
    exclude,
  };

  return inputs;
}
