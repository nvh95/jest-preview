import { shallowMount } from '@vue/test-utils';

import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  test('Renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { message }
    });

    expect(wrapper.text())
      .toMatch(message);
  })
})
