import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  externalCss: [
    'styles/globals.css',
  ],
});
