import * as core from '@actions/core';

type Options = {
  debug?: typeof core.debug;
  name: string;
};

export async function loadList({ debug }: Options): Promise<string[]> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Loading saved file list`);

  return [];
}
