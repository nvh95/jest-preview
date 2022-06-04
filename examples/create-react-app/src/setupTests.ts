// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';
import './index.css';
import './assets/_scss/global-style.scss';

jestPreviewConfigure({
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
