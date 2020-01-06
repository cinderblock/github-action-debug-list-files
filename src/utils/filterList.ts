import * as core from '@actions/core';
import { FileList, Filter } from './Types';

type Options = {
  debug?: typeof core.debug;
  list: FileList;
  filter: Filter;
};

export function filterList({ debug, list }: Options): FileList {
  if (debug === undefined) {
    debug = core.debug;
  }

  debug(`Listing files in dir`);

  return list;
}
