## GitHub Action Debug Helper - List Files

List (with diff) files in a working directory on action runner. Designed for debugging purposes.

[![cinderblock/github-action-debug-list-files status](https://github.com/cinderblock/github-action-debug-list-files/workflows/Main/badge.svg?branch=master)](https://github.com/cinderblock/github-action-debug-list-files/actions?query=branch%3Amaster)

### Other Reporters

- Test Reports:
  [jest-stare](https://cinderblock.github.io/github-action-debug-list-files/jest-stare)
  [jest-html-reporters](https://cinderblock.github.io/github-action-debug-list-files/jest-html-reporters)
  [allure](https://cinderblock.github.io/github-action-debug-list-files/allure-report)
- Coverage Report:
  [lcov](https://cinderblock.github.io/github-action-debug-list-files/coverage/lcov-report)

## How It Works

Prints a list of files in the working directory and creates an artifact of the list

Subsequent calls show a diff from previous calls as well.

## Usage

In your GitHub Actions, add a config like this:

```yml
jobs:
  self-test-and-generate-stats:
    runs-on: ubuntu-latest # Anything should work
    steps:
      - name: List Working Directory Contents
        uses: cinderblock/github-action-debug-list-files@v1
        working-directory: . # Optional
        with:
          name: . # Optional different "named" lists

      # Make whatever changes you like
      - run: date >> run.log

      # Print and log a diff
      - name: List Working Directory Contents
        uses: cinderblock/github-action-debug-list-files@v1
        working-directory: . # Should probably match previous run
        with:
          name: . # Set to something different to maintain multiple lists with separate diffs
```

Multiple concurrent working directories are supported.

## Development

Setup everything

```bash
npm run all
```

Run the tests :heavy_check_mark:

```bash
npm test

 PASS  ./main.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```
