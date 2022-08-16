import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';
import 'zone.js/plugins/zone-error';

// Global styles loaded by the app via `angular.json`
import './styles/index.css';
import './styles/scss/global-style.scss';

jestPreviewConfigure({
  autoPreview: true,
  publicFolder: 'src',
});
