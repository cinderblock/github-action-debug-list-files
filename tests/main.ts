import { existsSync } from 'fs';
import { posix } from 'path';

const { join } = posix;

describe('GitHub Actions Format', () => {
  test('action.yml exists', () => {
    expect(existsSync(join(__dirname, '..', 'dist', 'action.yml'))).toBe(true);
  });

  // TODO: Read action.yml and run main/post on dummy repo/dir
});
