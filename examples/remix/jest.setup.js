import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  // An array of relative path from the root of your project
  externalCss: [
    'app/styles/global.css',
  ],
  // (Optional) Enable autoPreview so you get previewing for free,
  // automatically without having to call debug(), whenever your test fails.
  // autoPreview: true,
});
