import * as core from '@actions/core';

import { readInputs } from './utils/readInputs.js';
import { findFiles } from './utils/findFiles.js';
import { loadList } from './utils/loadList.js';
import { saveList } from './utils/saveList.js';
import { printList } from './utils/printList.js';
import { filterList } from './utils/filterList.js';

async function run(): Promise<void> {
  try {
    const { name, search, filter, workingDirectory } = readInputs();

    core.debug(`Get File List${name ? ` - list-name: ${name}` : ''}`);

    const list = await findFiles({
      search,
      workingDirectory,
      ignore: [filter],
    });

    core.startGroup('Current File List');
    printList({ list });
    core.endGroup();

    const lastList = await loadList({ name });

    const filtered = filterList({ list, filter });

    await saveList({ name, list: filtered });

    if (filter) {
      // TODO: Notify if filter doesn't match anything.
      core.startGroup('Filtered File List');
      printList({ list: filtered });
      core.endGroup();
    }

    if (lastList) {
      core.startGroup('File List Diff');
      printList({ list: filtered, diffFrom: lastList });
      core.endGroup();
    }

    core.debug('Done');
  } catch (err) {
    core.setFailed(err instanceof Error ? err.message : String(err));
  }
}

void run();
