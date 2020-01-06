import * as core from '@actions/core';
import { FileList } from './Types';
import { tempDir } from './tempDir';
import { promises } from 'fs';
import { join } from 'path';

const { writeFile, mkdir } = promises;

type Options = {
  debug?: typeof core.debug;
  name: string;
  list: FileList;
};

export async function saveList({ debug, name, list }: Options): Promise<void> {
  const dbg = debug ?? core.debug;

  const dir = tempDir({ name });

  dbg(`Creating directory ${dir}`);

  const dirCreated = mkdir(dir, { recursive: true }).catch(() => {});

  const file = join(dir, 'file-list');

  // TODO: Handle filenames with newlines

  const data = Buffer.from(list.join('\n'));

  await dirCreated;

  dbg(`Directory created. Writing ${data.length} bytes to file ${file}`);

  return writeFile(file, data);
}
