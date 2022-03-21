### Preview DOM when using jest

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
