import { describe, it, expect } from 'bun:test';
import { filterList } from './filterList.js';
import { printList } from './printList.js';

describe('filterList', () => {
  it('returns list unchanged when filter is empty', () => {
    const list = ['a.js', 'b.ts', 'c.md'];
    expect(filterList({ list, filter: '' })).toEqual(list);
  });

  it('drops entries that match the filter regex', () => {
    const list = ['src/main.ts', 'node_modules/foo.js', '.git/HEAD', 'README.md'];
    expect(filterList({ list, filter: 'node_modules|\\.git' })).toEqual([
      'src/main.ts',
      'README.md',
    ]);
  });
});

describe('printList', () => {
  it('runs without throwing in the basic case', () => {
    const list = ['a', 'b'];
    expect(() => printList({ list, debug: () => {} })).not.toThrow();
  });

  it('runs without throwing in the diff case', () => {
    const list = ['a', 'b', 'c'];
    const diffFrom = ['a', 'b'];
    expect(() => printList({ list, diffFrom, debug: () => {} })).not.toThrow();
  });
});
