### Preview DOM when using jest

### Setup project

- npm i
- npm run dev (to see real UI)
- npm run test (full command: nodemon server/previewServer.ts && NODE_ENV=test jest --watch)
  - Open chrome http://localhost:3006 (see server/previewServer.ts)
    - You can see `UI will be updated to here`
  - Execute the test (type `a`)
  - Revisit http://localhost:3006 => see UI of the app!!
    - However, no CSS. Need a way to display css
