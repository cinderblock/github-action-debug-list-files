import * as core from '@actions/core';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

interface Options {
  debug?: typeof core.debug;
  name: string;
}

/** Where a named list is kept between calls in the same job. Keyed by `name`
 *  only: every call with the same name diffs against the previous one. (It
 *  used to include GITHUB_ACTION, which differs for every step, so a second
 *  call never found the first's list and no diff was ever printed.) */
export function tempDir({ debug = core.debug, name }: Options): string {
  const fileName = name ? `list-${encodeURIComponent(name)}` : 'list';
  const out = join(tmpdir(), 'debug-list-files', fileName);
  debug(`Temp file: ${out}`);
  return out;
}
