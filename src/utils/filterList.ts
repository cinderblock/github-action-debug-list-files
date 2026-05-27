import type { FileList, Filter } from './Types.js';

interface Options {
  list: FileList;
  filter: Filter;
}

/** Apply the regex-style `filter` (pipe-separated alternates) to drop matches
 *  from the list. Empty filter means no filtering. */
export function filterList({ list, filter }: Options): FileList {
  if (!filter) return list;
  const re = new RegExp(filter);
  return list.filter(p => !re.test(p));
}
