import * as core from '@actions/core';
import type { FileList } from './Types.js';

interface Options {
  debug?: typeof core.debug;
  list: FileList;
  diffFrom?: FileList;
}

/** Print a file list. When `diffFrom` is provided, only added/removed lines
 *  are printed (with a `+`/`-` marker). */
export function printList({ debug = core.debug, list, diffFrom }: Options): void {
  if (!diffFrom) {
    debug(`Listing ${list.length} files`);
    for (const file of list) console.log(file);
    return;
  }

  const before = new Set(diffFrom);
  const after = new Set(list);
  const removed: string[] = [];
  const added: string[] = [];
  for (const f of diffFrom) if (!after.has(f)) removed.push(f);
  for (const f of list) if (!before.has(f)) added.push(f);

  debug(`Diff: ${added.length} added, ${removed.length} removed`);
  for (const f of removed) console.log(`- ${f}`);
  for (const f of added) console.log(`+ ${f}`);
}
