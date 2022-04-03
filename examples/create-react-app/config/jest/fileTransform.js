const path = require('path');
const camelcase = require('camelcase');
const { generateAssetFile } = require('jest-preview');

module.exports = {
  process(src, filename) {
    const hashedFilename = JSON.stringify(generateAssetFile(src, filename));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camelcase(path.parse(filename).name, {
        pascalCase: true,
      });
      const componentName = `Svg${pascalCaseFilename}`;
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${hashedFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${hashedFilename}
            })
          };
        }),
      };`;
    }
    return `module.exports = ${hashedFilename};`;
  },
};
