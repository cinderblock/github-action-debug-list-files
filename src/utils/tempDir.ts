import * as core from '@actions/core';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

interface Options {
  debug?: typeof core.debug;
  name: string;
}

/** Build a unique-per-workflow-step temp directory path for the action's
 *  cached file list. Includes GITHUB_ACTION so multiple uses of this action
 *  within the same workflow don't collide. */
export function tempDir({ debug = core.debug, name }: Options): string {
  let fileName = 'cache';
  const append = (q: string | undefined) => {
    if (q) fileName += `-${q}`;
  };
  append(process.env.GITHUB_ACTION);
  append(name);
  const out = join(tmpdir(), 'debug-list-files', fileName);
  debug(`Temp file: ${out}`);
  return out;
}
