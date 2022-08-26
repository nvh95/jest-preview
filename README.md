<p align="center">
 <!-- <img align="center" alt="Jest Preview Logo" src="https://user-images.githubusercontent.com/8603085/161993303-e904a087-78a1-4abd-bb8d-3ef2cc6db442.svg" width="250"/> -->
 <a href="https://www.jest-preview.com/docs/getting-started/intro" target="_blank" >
  <img align="center" alt="Jest Preview Logo" src="https://user-images.githubusercontent.com/8603085/174035788-32d93169-f2d8-4076-a189-a1fd6ac615eb.png" />
 </a>
</p>

<h1 align="center">
<a href="https://www.jest-preview.com/docs/getting-started/intro" target="_blank" >Jest Preview</a>
</h1>

<p align="center">
Debug your Jest tests. Effortlessly. 🛠🖼
</p>

<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/162563155-7e18c9ef-4fe3-45f2-9065-7fcea8ddb18e.gif" alt="Jest Preview Demo" />
</p>

<p align="center">
  <a href="https://stackblitz.com/edit/jest-preview?file=src%2FApp.test.tsx,README.md" title="Try Jest Preview Now" target="_blank">Try Jest Preview Online</a>. No downloads needed!
</p>

<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-27-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

[![npm version](https://img.shields.io/npm/v/jest-preview)](https://www.npmjs.com/package/jest-preview)
[![npm total downloads](https://img.shields.io/npm/dt/jest-preview)](https://www.npmjs.com/package/jest-preview)
![total GitHub stars](https://img.shields.io/github/stars/nvh95/jest-preview)
[![Mentioned in Awesome Jest](https://awesome.re/mentioned-badge.svg)](https://github.com/jest-community/awesome-jest#debug)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](./CONTRIBUTING.md)
[![Best of JS](https://img.shields.io/endpoint?url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=nvh95%2Fjest-preview%26since=weekly)](https://bestofjs.org/projects/jest-preview)
[![Discord](https://img.shields.io/discord/967456149735637002?logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/z4DRBmk7vx)

[![Try Jest Preview now](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/jest-preview?file=src%2FApp.test.tsx,README.md)

## Why **jest-preview**

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes, the HTML is too complicated to visualize the UI in our head. `jest-preview` previews your Jest tests right in a browser, then you can see your actual UI visually, which helps you write and debug Jest tests faster.

`jest-preview` is initially designed to work with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). The package is framework-agnostic, and you can use it with any frontend frameworks and testing libraries. For examples:

- [Vite React](https://www.jest-preview.com/docs/examples/vite-react)
- [Create React App](https://www.jest-preview.com/docs/examples/create-react-app)
- [Nextjs](https://www.jest-preview.com/docs/examples/nextjs)
- [Svelte](https://www.jest-preview.com/docs/examples/svelte)
- [Angular](https://www.jest-preview.com/docs/examples/angular)
- [Vue](https://www.jest-preview.com/docs/examples/vue)

## Features

- 👀 Preview your actual app's HTML in a browser in milliseconds.
- 🔄 Auto reload browser when executing `preview.`debug()`.
- 💅 Support CSS:
  - ✅ [Direct CSS import](#3-configure-jests-transform-to-intercept-css-and-files)
  - ✅ Number of CSS-in-JS libraries, such as:
    - ✅ [Styled-components](https://styled-components.com/)
    - ✅ [Emotion](https://emotion.sh/)
  - ✅ [Global CSS](https://www.jest-preview.com/docs/getting-started/installation#4-optional-configure-global-css)
  - ✅ [CSS Modules](https://github.com/css-modules/css-modules)
  - ✅ [Sass](https://sass-lang.com/)
- 🌄 Support viewing images.

## How to use `jest-preview` in 2 lines of code

```diff
+import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    preview.debug();
  });
});
```

Or:

```diff
+import { debug } from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    debug();
  });
});
```

You also need to start the Jest Preview Server by running the CLI `jest-preview`. Please continue to read [Usage](https://www.jest-preview.com/docs/getting-started/usage) for the details instructions.

## Feedback

Your feedback is very important to us. Please help `jest-preview` becomes a better software by submitting feedback [here](https://forms.gle/PJFH5oEzi7gsb7Ac6).

## Installation

See the [Installation Guide](https://www.jest-preview.com/docs/getting-started/installation) on Jest Preview official website.

## Usage

See the [Usage Guide](https://www.jest-preview.com/docs/getting-started/usage) on Jest Preview official website.

## Advanced configurations

Jest Preview comes with [Pre-configured transformation](https://www.jest-preview.com/docs/getting-started/installation#2-configure-jests-transform-to-transform-css-and-files). However, in more advanced use cases where you have custom code transformation, check out the [Code Transformation Guide](https://www.jest-preview.com/docs/advanced-guides/code-transform).

## Upcoming features

- Support more `css-in-js` libraries.
- Multiple previews.
- [You name it](https://github.com/nvh95/jest-preview/labels/feature_request).

## Support

Please [file an issue](https://github.com/nvh95/jest-preview/issues), or [add a new discussion](https://github.com/nvh95/jest-preview/discussions) if you encounter any issues.

You can also mention [@JestPreview](https://twitter.com/JestPreview) or [@hung_dev](https://twitter.com/hung_dev) on Twitter if you want to have some more discussions or suggestions.

We also have a Discord server: [![Discord](https://img.shields.io/discord/967456149735637002?logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/z4DRBmk7vx)

## Contributing

We can't wait to see your contributions. See the Contribution Guide at [CONTRIBUTING.md](/CONTRIBUTING.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://hung.dev"><img src="https://avatars.githubusercontent.com/u/8603085?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hung Viet Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Documentation">📖</a> <a href="#example-nvh95" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/ntt261298"><img src="https://avatars.githubusercontent.com/u/36792554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Truong Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Documentation">📖</a> <a href="#example-ntt261298" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/viet-doan-830061a0/"><img src="https://avatars.githubusercontent.com/u/103036586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viet Huu Doan</b></sub></a><br /><a href="#design-doanhuuviet" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/ntbinh-Harvey"><img src="https://avatars.githubusercontent.com/u/57211574?v=4?s=100" width="100px;" alt=""/><br /><sub><b>HarveyNguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntbinh-Harvey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mattmurph9"><img src="https://avatars.githubusercontent.com/u/63432827?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Murphy</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=mattmurph9" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/traitanit-huangsri-8701b291/"><img src="https://avatars.githubusercontent.com/u/8110002?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Traitanit Huangsri</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nottyo" title="Code">💻</a></td>
    <td align="center"><a href="http://linkedin.com/in/thanhsonng"><img src="https://avatars.githubusercontent.com/u/28614996?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thanh Son Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=thanhsonng" title="Code">💻</a> <a href="#example-thanhsonng" title="Examples">💡</a> <a href="https://github.com/nvh95/jest-preview/commits?author=thanhsonng" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/minhmo1620"><img src="https://avatars.githubusercontent.com/u/44143370?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Minh Nguyen </b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=minhmo1620" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tinhvqbk"><img src="https://avatars.githubusercontent.com/u/26925018?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle(Tình Vũ)</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3Atinhvqbk" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/makotot"><img src="https://avatars.githubusercontent.com/u/1129027?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Makoto Tateno</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=makotot" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.wrongabhishek.com"><img src="https://avatars.githubusercontent.com/u/47311875?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abhishek Rawat</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=AbePlays" title="Documentation">📖</a></td>
    <td align="center"><a href="https://huynhducduy.me"><img src="https://avatars.githubusercontent.com/u/12293622?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Huynh Duc Duy</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=huynhducduy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/nunocasteleira"><img src="https://avatars.githubusercontent.com/u/1749112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nuno Casteleira</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3Anunocasteleira" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/sundaycrafts"><img src="https://avatars.githubusercontent.com/u/4732821?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sundaycrafts</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=sundaycrafts" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cainull"><img src="https://avatars.githubusercontent.com/u/45328460?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LunduoCai</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3Acainull" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/huyenuet"><img src="https://avatars.githubusercontent.com/u/31855858?v=4?s=100" width="100px;" alt=""/><br /><sub><b>huyenuet</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=huyenuet" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/bennettdams"><img src="https://avatars.githubusercontent.com/u/29319414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bennett Dams</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=bennettdams" title="Documentation">📖</a></td>
    <td align="center"><a href="http://majisti.com"><img src="https://avatars.githubusercontent.com/u/650192?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steven Rosato</b></sub></a><br /><a href="#example-srosato" title="Examples">💡</a> <a href="https://github.com/nvh95/jest-preview/issues?q=author%3Asrosato" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nhducit"><img src="https://avatars.githubusercontent.com/u/4246176?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nhducit</b></sub></a><br /><a href="#ideas-nhducit" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/benoitgrasset-alma"><img src="https://avatars.githubusercontent.com/u/104012464?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benoit GRASSET</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3Abenoitgrasset-alma" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/skirianov"><img src="https://avatars.githubusercontent.com/u/74229951?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergii Kirianov</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=skirianov" title="Documentation">📖</a> <a href="#content-skirianov" title="Content">🖋</a> <a href="https://github.com/nvh95/jest-preview/commits?author=skirianov" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://harimkim.netlify.app/"><img src="https://avatars.githubusercontent.com/u/4951716?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kim, Harim</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=iicdii" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dev.to/layzee"><img src="https://avatars.githubusercontent.com/u/6364586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=LayZeeDK" title="Documentation">📖</a> <a href="#example-LayZeeDK" title="Examples">💡</a></td>
    <td align="center"><a href="https://deploysentinel.com"><img src="https://avatars.githubusercontent.com/u/2781687?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Shi</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=MikeShi42" title="Documentation">📖</a></td>
    <td align="center"><a href="http://vkrol.dev"><img src="https://avatars.githubusercontent.com/u/153412?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Veniamin Krol</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=vkrol" title="Documentation">📖</a></td>
    <td align="center"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=eltociear" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SpadarShut"><img src="https://avatars.githubusercontent.com/u/738710?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pavel Shut</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/issues?q=author%3ASpadarShut" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

## Star history

[![Star History Chart](https://api.star-history.com/svg?repos=nvh95/jest-preview&type=Date)](https://star-history.com/#nvh95/jest-preview&Date)

## License

![This is open source software](https://user-images.githubusercontent.com/8603085/161439058-98faea42-c6e6-46f4-9ce6-218fad5f3b9a.gif)

MIT

## Sponsors

Your financial support helps the project alive and in a development mode. Make an impact by sponsoring us **$1** via [Open Collective](https://opencollective.com/jest-preview).

- Bronze Sponsor 🥉:
  - Your company's logo/ profile picture on **README.md** and [www.jest-preview.com](https://www.jest-preview.com)
- Silver Sponsor 🥈:
  - All of these above
  - Your requests will be prioritized.
- Gold Sponsor 🥇:
  - All of these above
  - Let's discuss your benefits for this tier, please contact [the author](https://twitter.com/hung_dev)
- Diamond Sponsor 💎:
  - All of these above
  - Let's discuss your benefits for this tier, please contact [the author](https://twitter.com/hung_dev)

### Bronze Sponsor 🥉

<a href="https://webuild.community/">
  <img src="https://user-images.githubusercontent.com/8603085/170883918-8b9f111d-f3c6-4647-9cc1-de56dd98ea60.png" width="94" height="94" />
</a>
<a href="https://www.deploysentinel.com/">
  <img src="https://github.com/DeploySentinel.png" width="94" height="94" />
</a>
