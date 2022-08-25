import path from 'path';
import { processLess } from '../../transform';
import less from 'less';
describe('Less', () => {
  it('should compile LESS successfully', () => {
    const result = processLess(path.resolve(__dirname, './style.less'));
    expect(result.replace(/\r\n|\n|\r/g, '\n')).toMatchInlineSnapshot(`
      ".less-p {
        color: blue;
      }
      @media (min-width: 400px) {
        .less-p {
          font-size: 2rem;
        }
      }
      #header {
        color: black;
      }
      #header .navigation {
        font-size: 12px;
      }
      #header .logo {
        width: 300px;
      }

      "
    `);
  });
});
