import { describe, it, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import { filterList } from './filterList.js';
import { printList } from './printList.js';
import { tempDir } from './tempDir.js';

const defaultFilter: string = (
  Bun.YAML.parse(
    readFileSync(new URL('../../action.yml', import.meta.url), 'utf8'),
  ) as {
    inputs: { filter: { default: string } };
  }
).inputs.filter.default;

describe('filterList', () => {
  it('returns list unchanged when filter is empty', () => {
    const list = ['a.js', 'b.ts', 'c.md'];
    expect(filterList({ list, filter: '' })).toEqual(list);
  });

  it('drops entries that match the filter regex', () => {
    const list = [
      'src/main.ts',
      'node_modules/foo.js',
      '.git/HEAD',
      'README.md',
    ];
    expect(filterList({ list, filter: 'node_modules|\.git' })).toEqual([
      'src/main.ts',
      'README.md',
    ]);
  });

  it('default filter skips noise directories but not .github or .gitignore', () => {
    const list = [
      '.git/HEAD',
      '.github/workflows/ci.yml',
      '.gitignore',
      'a/node_modules/x.js',
      'pkg/__pycache__/m.pyc',
      'src/node_modules_util.ts',
    ];
    expect(filterList({ list, filter: defaultFilter })).toEqual([
      '.github/workflows/ci.yml',
      '.gitignore',
      'src/node_modules_util.ts',
    ]);
  });
});

describe('tempDir', () => {
  it('is the same for every call with the same name, so calls can diff', () => {
    const saved = process.env.GITHUB_ACTION;
    process.env.GITHUB_ACTION = '__self';
    const a = tempDir({ name: 'x', debug: () => {} });
    process.env.GITHUB_ACTION = '__self_2';
    const b = tempDir({ name: 'x', debug: () => {} });
    if (saved === undefined) delete process.env.GITHUB_ACTION;
    else process.env.GITHUB_ACTION = saved;
    expect(a).toBe(b);
    expect(tempDir({ name: 'y', debug: () => {} })).not.toBe(a);
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
