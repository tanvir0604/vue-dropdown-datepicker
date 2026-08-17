import { describe, it, expect, vi } from 'vitest';
import Select from '../src/select.vue';
import { mountCompat, toArray } from './helpers.js';

describe('Select', () => {
  it('renders one option per values/options pair', () => {
    const wrapper = mountCompat(Select, {
      props: { values: [1, 2, 3], options: ['One', 'Two', 'Three'] },
    });
    const options = toArray(wrapper.findAll('option'));
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.text())).toEqual(['One', 'Two', 'Three']);
  });

  it('syncs the native select value via v-model and invokes onChange with the new value', async () => {
    const onChange = vi.fn();
    const wrapper = mountCompat(Select, {
      props: { values: [1, 2, 3], options: ['One', 'Two', 'Three'], onChange },
    });

    await wrapper.find('select').setValue('2');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('re-syncs fieldValue when the value prop changes from the parent', async () => {
    const wrapper = mountCompat(Select, {
      props: { values: [1, 2, 3], options: ['One', 'Two', 'Three'], value: 1 },
    });
    expect(wrapper.vm.fieldValue).toBe(1);

    await wrapper.setProps({ value: 3 });
    expect(wrapper.vm.fieldValue).toBe(3);
  });
});
