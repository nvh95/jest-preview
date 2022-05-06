# Contribute to Jest Preview

## Welcome

Welcome to CONTRIBUTING zone. If you are reading this, you are probably want to contribute to Open Source projects. That's great! Contributing to an open source project is a great opportunity to learn, sharpen your skills and help others. Luckily, Jest Preview is a free and open source project and we always wecome new contributors. Its mission is to help front end developers' life easier and more enjoyable, also improve the standard of front end applications by encourgaging them to write more high-quality tests, by providng an ability to view the actual UI in Jest in an external browser like Chrome.

Jest Preview aims to be a community-driven project. So we hope to see your contributions to make Jest Preview a favourite library for front end developers when it comes to testing.

## What can I contribute?

We appreciated any helps. There are not a thing as small contribution. If you see a typo, send us a PR. If you experience a bug, please open an issue. If you have a suggestion, let us know. Bellow are some ways to contribute to Jest Preview:

- **Submit bugs or issues:**: Software are full of bugs. If you use Jest Preview and find a bug, please open an issue at [Jest Preview's issues](https://github.com/nvh95/jest-preview/issues)
- **Docs**: We have a documentation site at [www.jest-preview.com](https://www.jest-preview.com/docs/getting-started/intro), (draft) it's very easier to contribute to the documentation by using `Edit this page` feature (insert image)
- Fix bugs
- Add new features
- Grammar: not native English speakers.
- Answer questions and issues on GitHub and Discord

If not sure what to contribute, Join Discord

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
