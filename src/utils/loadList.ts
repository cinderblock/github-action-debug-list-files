import * as core from '@actions/core';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tempDir } from './tempDir.js';
import type { FileList } from './Types.js';

interface Options {
  debug?: typeof core.debug;
  name: string;
}

export async function loadList({
  debug = core.debug,
  name,
}: Options): Promise<FileList | undefined> {
  const file = join(tempDir({ name }), 'file-list');
  debug(`Trying to load ${file}`);
  try {
    const buf = await readFile(file);
    return buf.toString().split('\n');
  } catch {
    debug('No previous file list — first run for this name in this workflow');
    return undefined;
  }
}
