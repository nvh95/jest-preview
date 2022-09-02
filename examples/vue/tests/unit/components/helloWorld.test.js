import { render } from '@testing-library/vue';
// import { shallowMount } from '@vue/test-utils';
// const render = shallowMount;

import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  const setupWrapper = async function (props) {
    return await render(HelloWorld, { props });
  };

  test('Renders message', async () => {
    const props = {
      message: 'Hello, world'
    };
    const wrapper = await setupWrapper(props);

    expect(2)
      .toEqual(3);

    expect(wrapper.html())
      .toMatchSnapshot();
  });
});
