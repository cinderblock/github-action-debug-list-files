import * as core from '@actions/core';
import { FileList } from './Types';
import globby from 'globby';

type Options = {
  debug?: typeof core.debug;
  search: string;
  workingDirectory?: string;
  ignore?: string[];
};

export async function findFiles({
  debug,
  search,
  workingDirectory,
  ignore,
}: Options): Promise<FileList> {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  return globby(search, { cwd: workingDirectory, ignore });
}
