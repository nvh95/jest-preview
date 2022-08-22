// https://github.com/nvh95/jest-preview/issues/230
import cssTransform from '../../preconfigTransform/css';
import fs from 'fs';
import path from 'path';

const filename = path.join(__dirname, 'index.css');
const cssSrc = fs.readFileSync(filename, 'utf8');

describe(`Tailwind CSS doesn't get compiled in @import'ed files`, () => {
  it('should inline @import', () => {
    expect(cssTransform.process(cssSrc, filename).code).toContain(
      'https://tailwindcss.com',
    );
  });
});
