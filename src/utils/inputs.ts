import * as core from '@actions/core';
import { ExcludeList } from './Types';

type Inputs = {
  name: string;
  printFull: boolean;
  printDiff: boolean;
  exclude: ExcludeList;
};

export function readInputs(): Inputs {
  core.debug('Reading inputs');

  const name = core.getInput('name');

  const falsy = /(no|false|off)/gi;

  const printFull = !!core.getInput('print-full').replace(falsy, '');
  const printDiff = !core.getInput('hide-diff').replace(falsy, '');

  const exclude = core.getInput('exclude-list').split(',');

  const inputs: Inputs = {
    name,
    printFull,
    printDiff,
    exclude,
  };

  return inputs;
}
