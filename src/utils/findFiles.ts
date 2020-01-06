import * as core from '@actions/core';
import { FileList } from './Types';
import globby from 'globby';

type Options = {
  debug?: typeof core.debug;
  search: string;
};

export async function listFiles({ debug, search }: Options): Promise<FileList> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  return globby(search);
}
