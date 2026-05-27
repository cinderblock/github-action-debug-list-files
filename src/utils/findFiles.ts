import * as core from '@actions/core';
import { globby } from 'globby';
import type { FileList } from './Types.js';

interface Options {
  debug?: typeof core.debug;
  search: string;
  workingDirectory?: string;
  ignore?: string[];
}

export async function findFiles({
  debug = core.debug,
  search,
  workingDirectory,
  ignore,
}: Options): Promise<FileList> {
  debug('Listing files in dir');
  return globby(search, { cwd: workingDirectory, ignore });
}
