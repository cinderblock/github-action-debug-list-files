import * as core from '@actions/core';
import { globby } from 'globby';
import type { FileList } from './Types.js';

interface Options {
  debug?: typeof core.debug;
  search: string;
  workingDirectory?: string;
}

/** Every file matching `search`, dotfiles included (it's a debugging aid:
 *  `.github/` and `.env` files matter). `filter` is applied afterwards. */
export async function findFiles({
  debug = core.debug,
  search,
  workingDirectory,
}: Options): Promise<FileList> {
  debug('Listing files in dir');
  const list = await globby(search, { cwd: workingDirectory, dot: true });
  return list.sort();
}
