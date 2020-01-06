import * as core from '@actions/core';

type Inputs = {
  name: string;
};

export function readInputs(): Inputs {
  core.debug('Reading inputs');

  const name = core.getInput('name');

  const inputs: Inputs = {
    name,
  };

  return inputs;
}
