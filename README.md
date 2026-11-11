## GitHub Action Debug Helper - List Files

List (with diff) files in a working directory on action runner. Designed for debugging purposes.

[![CI](https://github.com/cinderblock/github-action-debug-list-files/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/cinderblock/github-action-debug-list-files/actions/workflows/ci.yml?query=branch%3Amaster)

## How It Works

Each call prints the files in a directory, dotfiles included. It also keeps the list until the end of the
job, under its `name`. The next call with the same `name` prints a diff: what was added (`+`) and removed (`-`)
since then.

## Usage

```yml
jobs:
  build:
    runs-on: ubuntu-latest # Anything should work
    steps:
      - uses: actions/checkout@v7

      - name: List Working Directory Contents
        uses: cinderblock/github-action-debug-list-files@v1

      # Make whatever changes you like
      - run: date >> run.log

      # Prints the list again, and a diff against the previous call
      - name: List Working Directory Contents
        uses: cinderblock/github-action-debug-list-files@v1
```

Use a different `name` to keep separate lists, for example one per directory:

```yml
- uses: cinderblock/github-action-debug-list-files@v1
  with:
    name: build-output
    working-directory: dist
```

### Inputs

| Input               | Default                                          | Description                                                                        |
| ------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `name`              |                                                  | Which list this call belongs to. Calls with the same name diff against each other. |
| `working-directory` | `.`                                              | Directory to list.                                                                 |
| `search`            | `**/*`                                           | Glob of files to list.                                                             |
| `filter`            | `(^\|/)(node_modules\|\.git\|__pycache__)(/\|$)` | Regular expression; matching paths are left out. Empty lists everything.           |

Lists are kept in the runner's temp directory, so on GitHub-hosted runners they last for one job. A self-hosted runner may keep them longer.

## Development

```bash
bun install
bun run lint   # tsc --noEmit
bun run test   # bun test
bun run build  # bundles dist/index.js (committed: GitHub runs it directly)
```

CI also runs the committed bundle twice and checks that the second call prints the diff.
