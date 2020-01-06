import * as core from '@actions/core';
import { tmpdir } from 'os';
import { join } from 'path';

type Options = {
  debug?: typeof core.debug;
  name: string;
};

export function tempFile({ debug, name }: Options): string {
  if (debug === undefined) {
    debug = core.debug;
  }

  let fileName = 'file-list';

  function append(qualifier: string | undefined): void {
    if (qualifier === undefined) return;
    fileName += `-${qualifier}`;
  }

  append(process.env.GITHUB_ACTION);
  append(name);

  const ret = join(tmpdir(), 'debug-list-files', fileName);

  debug(`Temp file: ${ret}`);

  return ret;
}
