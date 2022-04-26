'use strict';
const babelJest = require('babel-jest').default || require('babel-jest');

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

export default babelJest.createTransformer({
  presets: [
    [
      require.resolve('babel-preset-react-app', {
        // Find `babel-preset-react-app` in user's node_modules
        paths: [process.cwd()],
      }),
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});
