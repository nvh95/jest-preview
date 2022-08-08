import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  autoPreview: true,
});

const $ = require('jquery');

window.$ = $;
