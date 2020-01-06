// Other packages https://github.com/actions/toolkit/blob/master/README.md#packages
import * as core from '@actions/core';

import { readInputs } from './utils/inputs';
import { listFiles } from './utils/listFiles';
import { loadList } from './utils/loadList';
import { saveList } from './utils/saveList';
import { printList } from './utils/printList';

async function run(): Promise<void> {
  try {
    const { name, printFull, printDiff, exclude } = readInputs();

    core.debug(`Get File List${name ? ` - list-name: ${name}` : ''}`);

    core.startGroup('Get File List');
    const list = await listFiles({ exclude });
    core.endGroup();

    core.startGroup('Load Previous List');
    const lastList = await loadList({ name });
    core.endGroup();

    core.startGroup('Save List');
    await saveList({ name, list });
    core.endGroup();

    core.startGroup('Print List');
    if (printFull) await printList({ list });
    core.endGroup();

    core.startGroup('Print Diff');
    if (printDiff) await printList({ list, diffFrom: lastList });
    core.endGroup();

    core.debug(`Done`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
