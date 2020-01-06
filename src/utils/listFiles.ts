import * as core from '@actions/core';
import { ExcludeList, FileList } from './Types';

type Options = {
  debug?: typeof core.debug;
  exclude?: ExcludeList;
};

export async function listFiles({ debug }: Options): Promise<FileList> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  return [];
}
