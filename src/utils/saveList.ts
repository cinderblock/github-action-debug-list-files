import * as core from '@actions/core';
import { FileList } from './Types';

type Options = {
  debug?: typeof core.debug;
  name?: string;
  list: FileList;
};

export async function saveList({ debug }: Options): Promise<void> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Saving list for future use`);
}
