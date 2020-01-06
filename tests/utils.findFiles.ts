import { findFiles } from '../src/utils/findFiles';

describe('utils/findFiles', () => {
  test('findFiles is a function', () => {
    expect(typeof findFiles).toBe('function');
  });
});
