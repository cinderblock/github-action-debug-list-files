import * as core from '@actions/core';

type Options = {
  debug?: typeof core.debug;
  exclude?: string[];
};

export async function listFiles({ debug }: Options): Promise<string[]> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  return [];
}
