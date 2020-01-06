import * as core from '@actions/core';

type Options = {
  debug?: typeof core.debug;
  name?: string;
  list: string[];
};

export async function saveList({ debug }: Options): Promise<void> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Saving list for future use`);
}
