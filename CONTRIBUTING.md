# Contribute to Jest Preview

## Welcome

TODO: Welcome and appreciate contributors. Jest Preview is a community-driven project.

## What can I contribute?

- Docs
- Fix bugs
- Add new features
- Answer questions and issues on GitHub and Discord

## Claim issue

- See docusaurus's docs: https://github.com/facebook/docusaurus/blob/main/CONTRIBUTING.md#claiming-issues

## Run jest-preview locally (Quick start)

- npm install
- npm run build:watch
- npm run types (optional to emit types, need to run only once)
- npm run server (to start Jest Preview Server)
- npm run test:only (to run Jest tests at `/demo`)

## How jest-preview works

- See [HOW_JEST_PREVIEW_WORKS.md](./HOW_JEST_PREVIEW_WORKS.md)

## Repository architecture

- not use monorepo (yet)
- src
- server
- demo
- config/jest
- dist: build
- examples
- website
  TODO: Add absolute link to each folder.

## Submit a PR

- Make sure CI passes
- prefer atomic commit
- prefer rebase (avoid merge commits)

## Closing

TODO: To remove `Run jest-preview locally` from README.md

draft

Install dependencies

```bash
npm install
```

To see the real demo app

```bash
npm run dev
```

Run `jest` and ` jest-preview` simultaneously

```bash
npm run test
```

Open chrome at http://localhost:3336 to see the preview

However, it's recommend to run `jest` and `jest-preview` separately

```bash
npm run server # Run jest-preview server
npm run test:only # Run jest
```
