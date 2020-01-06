import * as core from '@actions/core';

type Options = {
  debug?: typeof core.debug;
};

export async function listFiles({ debug }: Options): Promise<void> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  debug(`Branch checked out`);

  // TODO: Diff
}
