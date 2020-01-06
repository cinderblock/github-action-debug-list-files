import * as core from '@actions/core';

// import chalk from 'chalk';

type Options = {
  debug?: typeof core.debug;
  list: string[];
  diffFrom?: string[];
};

export async function printList({ debug }: Options): Promise<void> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing all files in list`);
}
