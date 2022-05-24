# Contributing

## Welcome

Welcome to CONTRIBUTING zone. If you are reading this, you probably want to contribute to Open Source projects. That's great! Contributing to an open source project is a great opportunity to learn, sharpen your skills and help others. Luckily, Jest Preview is a free and open source project and we always welcome new contributors. Its mission is to help front end developers' lives easier and more enjoyable, also improve the standard of front end applications by encouraging them to write more high-quality tests, by providing an ability to view the actual UI in Jest in an external browser like Chrome.

Jest Preview aims to be a community-driven project. So we hope to see your contributions to make Jest Preview a favorite library for front end developers when it comes to testing.

## What can I contribute?

We appreciated any help. There is not a thing as a small contribution. If you see a typo, send us a PR. If you experience a bug, please open an issue. If you have a suggestion, let us know. Below are some ways you can contribute to Jest Preview:

- **Submit bugs or issues**: Software is full of bugs. Jest Preview is no exception. If you use Jest Preview and find a bug, please open an issue at [Jest Preview's issues](https://github.com/nvh95/jest-preview/issues)
- **Docs**: We have a documentation site at [www.jest-preview.com](https://www.jest-preview.com/docs/getting-started/intro), it's very easier to contribute to the documentation by using `Edit this page` button at the bottom of each page. If you see a typo, an unclear page or incorrect grammar, please send us a PR.
- **Fix bugs**: We are tracking bugs at [Issues](https://github.com/nvh95/jest-preview/issues). Please [claim an issue](#claim-issues) then open a PR to fix a bug.
- **Add new features**: Do you use Jest Preview for your projects and find out Jest Preview is missing a feature? Please open an issue to discuss it. And it's great if you can help to implement that feature.
- **Answer questions and issues on GitHub and Discord**: [GitHub issues](https://github.com/nvh95/jest-preview/issues) and [Discord](https://discord.gg/X5PyPUfemh)

If not sure what to contribute, but you still want to contribute something, let us know in [Discord](https://discord.gg/X5PyPUfemh) (channel #contributors)

## Claim issues

There are some labels worth looking at for a new contributor:

- [good first issue](https://github.com/nvh95/jest-preview/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22): Some issues to help you get your feet wet with Jest Preview
- [help wanted](https://github.com/nvh95/jest-preview/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22): If you have specific knowledge in one domain, working on these issues can make your expertise shine.

If you want to work on any of these issues, just drop a message such as "I'd like to work on this". Depending on the difficulty of the issue, it can take a few days or a week to implement the feature/ bug fix. It's great if you can send a PR within seven days. If you need more time on a specific issue, please let us know. After that, we can delegate the issue to someone else if you are not available.

## npm scripts

Jest Preview repository has some npm scripts to help you develop efficiently.

- `npm install`: install all dependencies
- `npm run build:watch`: build `jest-preview` and rebuild it when changes are made
- `npm run types`: emit types, usually only need to run only once
- `npm run server`: start Jest Preview Server
- `npm run test:dev`: run Jest at `/demo/__tests__/App.test.tsx` (you will work with this file most of the time)

## Run locally

Install dependencies:

```bash
npm install
```

Run the real demo app:

```bash
npm run dev
```

Run jest tests and Jest Preview server simultaneously:

```bash
npm run test
```

Open chrome at <http://localhost:3336> to see the preview

However, it's recommended to run jest tests and Jest Preview server separately:

```bash
npm run server # Run jest-preview server
npm run test:dev # Run jest
```

Whenever `preview.debug()` is triggered, or whenever a test fails, you will see the changes reflected on the browser immediately.

## How jest-preview works

- See [HOW_JEST_PREVIEW_WORKS.md](https://github.com/nvh95/jest-preview/tree/main/HOW_JEST_PREVIEW_WORKS.md)

## Repository architecture

Following are brief descriptions of the repository architecture:

- [src](https://github.com/nvh95/jest-preview/tree/main/src/): contains most of the code of Jest Preview such as `debug` function, `jestPreviewConfigure`, all Jest Transformations, pre-configured presets, adapters, etc.
- [cli/server](https://github.com/nvh95/jest-preview/tree/main/cli/server): contains Jest Preview server code, which is a web server that serves the preview page (Jest Preview Dashboard).
- [demo](https://github.com/nvh95/jest-preview/tree/main/demo/): contains the demo app. You will work with this app most of the time when developing Jest Preview.
- [config/jest](https://github.com/nvh95/jest-preview/tree/main/config/jest/): jest configuration files for the demo app.
- [dist](https://github.com/nvh95/jest-preview/tree/main/dist/): Distribution code, which is bundled and processed by Rollup (previously: Vite Library Mode).
- [examples](https://github.com/nvh95/jest-preview/tree/main/examples/): contains examples of how to integrate Jest Preview with various libraries and frameworks.
- [website](https://github.com/nvh95/jest-preview/tree/main/website/): contains code for [www.jest-preview.com](https://www.jest-preview.com/)

## Submit a PR

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

There are a few things when you open a PR:

1. Make sure CI passes
2. Prefer atomic commits
3. Prefer rebase over merge: If you create a new branch from `main` and work on it for a while. There is a chance that `main` will be updated and there will be a conflict between `main` and your branch. We would love to have you rebase your branch on top of `main` instead of merging it when your PR is ready.

## Closing

We would love to have you on the list of contributors and thank you for your contribution. Happy coding!
