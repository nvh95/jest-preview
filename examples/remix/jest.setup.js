import { jestPreviewConfigure } from 'jest-preview';
// Import your global CSS here
import './app/styles/global.css';

jestPreviewConfigure({
  // Enable autoPreview to automatically preview the UI whenever your test fails.
  autoPreview: true,
});
