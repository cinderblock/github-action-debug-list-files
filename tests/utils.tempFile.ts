import { tempFile } from '../src/utils/tempFile';

describe('utils/tempFile', () => {
  test('tempFile is a function', () => {
    expect(typeof tempFile).toBe('function');
  });
});
