import * as core from '@actions/core';
import { FileList } from './Types';

type Options = {
  debug?: typeof core.debug;
  name: string;
};

export async function loadList({ debug }: Options): Promise<FileList> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Loading saved file list`);

  return [];
}
