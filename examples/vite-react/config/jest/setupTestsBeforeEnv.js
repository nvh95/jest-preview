import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  externalCss: ['src/index.css', 'src/global-style.scss'],
  sassLoadPaths: ['src'], // Root for @use, @import
});
