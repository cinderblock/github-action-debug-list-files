import { listFiles } from '../src/utils/listFiles';

describe('listFiles', () => {
  test('readInputs is a function', () => {
    expect(typeof listFiles).toBe('function');
  });
});
