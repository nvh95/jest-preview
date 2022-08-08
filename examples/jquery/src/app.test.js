import { debug } from 'jest-preview';

describe('jquery', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div>
      Count =
      <span id="count">0</span>
    </div>
    <button id="button">Increase</button>`;
    const $ = require('jquery');
    require('./app');
  });

  it('should increase count when clicking on button', () => {
    $('#button').click();
    $('#button').click();
    expect($('#count').text()).toEqual('2');

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    debug();
  });
});
