import * as core from '@actions/core';
import { FileList } from './Types';
import { tempDir } from './tempDir';
import { promises } from 'fs';
import { join } from 'path';

const { readFile } = promises;

type Options = {
  debug?: typeof core.debug;
  name: string;
};

export async function loadList({
  debug,
  name,
}: Options): Promise<FileList | undefined> {
  const dbg = debug ?? core.debug;

  const dir = tempDir({ name });

  const file = join(dir, 'file-list');

  dbg(`Trying to load ${file}`);

  return readFile(file)
    .then(b => b.toString().split('\n'))
    .catch(() => {
      console.log('No file exists');
      return undefined;
    });

  // TODO: Handle filenames with newlines
}
