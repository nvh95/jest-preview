import '@testing-library/jest-dom/extend-expect';
import { jestPreviewConfigure } from '../dist/index';
import './global.css';
import './assets/_scss/global-style.scss';

jestPreviewConfigure({
  publicFolder: 'demo/public',
  autoPreview: true,
  sassLoadPaths: ['demo/assets/_scss/loadPathsExample'],
  sharedSassResources: [
    'demo/assets/_scss/sharedSassResources/color-vars.scss',
    'demo/assets/_scss/sharedSassResources/mixins.scss',
  ],
});

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(),
});
