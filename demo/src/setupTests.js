import '@testing-library/jest-dom/extend-expect';
import { jestPreviewConfigure } from 'jest-preview';
import './global.css';
import './assets/_scss/global-style.scss';

jestPreviewConfigure({
  publicFolder: 'src/public',
  autoPreview: true,
  sassLoadPaths: ['src/assets/_scss/loadPathsExample'],
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
