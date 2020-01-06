// Other packages https://github.com/actions/toolkit/blob/master/README.md#packages
import * as core from '@actions/core';

import { readInputs } from './utils/readInputs';
import { findFiles } from './utils/findFiles';
import { loadList } from './utils/loadList';
import { saveList } from './utils/saveList';
import { printList } from './utils/printList';
import { filterList } from './utils/filterList';

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
    await printList({ list });
    core.endGroup();

    const lastList = await loadList({ name });

    const filtered = filterList({ list, filter });

    await saveList({ name, list: filtered });

    if (filter) {
      // TODO: Notify if exclude doesn't match anything
      core.startGroup('Filtered File List');
      await printList({ list: filtered });
      core.endGroup();
    }

    if (lastList) {
      core.startGroup('File List Diff');
      await printList({ list: filtered, diffFrom: lastList });
      core.endGroup();
    }

    core.debug(`Done`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
