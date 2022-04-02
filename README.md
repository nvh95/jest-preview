### Preview DOM when using jest
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

### Setup project

- npm i
- npm run dev (to see real UI)
- npm run test (full command: nodemon server/previewServer.ts && NODE_ENV=test jest --watch)
  - Open chrome http://localhost:3006 (see server/previewServer.ts)
    - You can see `UI will be updated to here`
  - Execute the test (type `a`)
  - Revisit http://localhost:3006 => see UI of the app!!

### To do

- [] Support CSS
  - [x] Intercept .css via cssTransform.js
  - [] How about css-injs
- [] Support image
- [] How to make a great DX
  - [] User just install package and do not need to configure too much

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ntt261298"><img src="https://avatars.githubusercontent.com/u/36792554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Truong Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!