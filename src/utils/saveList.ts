import * as core from '@actions/core';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tempDir } from './tempDir.js';
import type { FileList } from './Types.js';

interface Options {
  debug?: typeof core.debug;
  name: string;
  list: FileList;
}

export async function saveList({
  debug = core.debug,
  name,
  list,
}: Options): Promise<void> {
  const dir = tempDir({ name });
  await mkdir(dir, { recursive: true });
  const file = join(dir, 'file-list');
  const data = list.join('\n');
  debug(`Writing ${data.length} bytes to ${file}`);
  await writeFile(file, data);
}
