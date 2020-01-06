import { tempDir } from '../src/utils/tempDir';

describe('utils/tempDir', () => {
  test('tempDir is a function', () => {
    expect(typeof tempDir).toBe('function');
  });
});
