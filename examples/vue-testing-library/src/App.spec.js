import { render, fireEvent } from '@testing-library/vue';
import App from './App.vue';
import preview from 'jest-preview';

test('increments value on click', async () => {
  // The render method returns a collection of utilities to query your component.
  const { getByText } = render(App);
  preview.debug();
  // // getByText returns the first matching node for the provided text, and
  // // throws an error if no elements match or if more than one match is found.
  // getByText('Times clicked: 0')

  // const button = getByText('increment')

  // // Dispatch a native click event to our button element.
  // await fireEvent.click(button)
  // await fireEvent.click(button)

  // getByText('Times clicked: 2')
});
