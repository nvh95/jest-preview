import { render, fireEvent } from '@testing-library/vue';
import App from './App.vue';
import preview from 'jest-preview';

test('increments value on click', async () => {
  render(App);
  preview.debug();
});
