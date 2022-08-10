import '@testing-library/jest-dom';
import { jestPreviewConfigure } from 'jest-preview';
import 'zone.js/plugins/zone-error';

// Global styles loaded by the app
import './styles/index.css';
import './styles/scss/global-style.scss';

// Styles loaded from external files
import './styles/css/app.css';
import './styles/scss/style.scss';

jestPreviewConfigure({
  autoPreview: true,
  publicFolder: 'src',
});
