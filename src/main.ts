// Other packages https://github.com/actions/toolkit/blob/master/README.md#packages
import * as core from '@actions/core';
import { readInputs } from './utils/inputs';
import { listFiles } from './utils/listFiles';

async function run(): Promise<void> {
  try {
    const { name } = readInputs();
    const { debug } = core;

    core.debug(`Listing files${name ? ` - list-name: ${name}` : ''}`);

    listFiles({ debug });

    core.debug(`Done`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
