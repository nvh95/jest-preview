import { render, fireEvent } from '@testing-library/vue';
import App from './App.vue';
import { debug } from 'jest-preview';

test('increments value on click', async () => {
  render(App);
  debug();
});
