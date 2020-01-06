import * as core from '@actions/core';
import { FileList } from './Types';
import { tempFile } from './tempFile';
import { promises } from 'fs';

const { writeFile } = promises;

type Options = {
  debug?: typeof core.debug;
  name: string;
  list: FileList;
};

export async function saveList({ debug, name, list }: Options): Promise<void> {
  if (debug === undefined) {
    debug = core.debug;
  }

  const file = tempFile({ name });

  // TODO: Handle filenames with newlines

  const data = list.join('\n');

  return writeFile(file, data);
}
