import * as core from '@actions/core';
import { FileList } from './Types';
import { tempFile } from './tempFile';
import { promises } from 'fs';

const { readFile } = promises;

type Options = {
  debug?: typeof core.debug;
  name: string;
};

export async function loadList({
  debug,
  name,
}: Options): Promise<FileList | undefined> {
  if (debug === undefined) {
    debug = core.debug;
  }

  const file = tempFile({ name });

  // TODO: Handle filenames with newlines

  return readFile(file)
    .then(b => b.toString().split('\n'))
    .catch(() => undefined);
}
