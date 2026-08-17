import { describe, it, expect, vi } from 'vitest';
import DropdownDatepicker from '../src/dropdown-datepicker.vue';
import { mountCompat, toArray } from './helpers.js';

function selects(wrapper) {
  return toArray(wrapper.findAll('select'));
}

async function selectByName(wrapper, name, value) {
  const select = selects(wrapper).filter((s) => s.attributes('name') === name)[0];
  await select.setValue(value);
  return select;
}

describe('DropdownDatepicker', () => {
  it('renders 3 selects in year/month/day order for the default (ymd) displayFormat', () => {
    const wrapper = mountCompat(DropdownDatepicker);
    const names = selects(wrapper).map((s) => s.attributes('name'));
    expect(names).toEqual(['year', 'month', 'day']);
  });

  it('renders selects in day/month/year order for displayFormat="dmy"', () => {
    const wrapper = mountCompat(DropdownDatepicker, { props: { displayFormat: 'dmy' } });
    const names = selects(wrapper).map((s) => s.attributes('name'));
    expect(names).toEqual(['day', 'month', 'year']);
  });

  it('renders selects in month/day/year order for displayFormat="mdy"', () => {
    const wrapper = mountCompat(DropdownDatepicker, { props: { displayFormat: 'mdy' } });
    const names = selects(wrapper).map((s) => s.attributes('name'));
    expect(names).toEqual(['month', 'day', 'year']);
  });

  it('emits both the legacy "input" event and the Vue 3 "update:modelValue" event once a full date is selected', async () => {
    const wrapper = mountCompat(DropdownDatepicker, { props: { submitFormat: 'yyyy-mm-dd' } });
    await selectByName(wrapper, 'year', '2020');
    await selectByName(wrapper, 'month', '5');
    await selectByName(wrapper, 'day', '10');

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const lastInput = wrapper.emitted('input').at(-1)[0];
    const lastModelValue = wrapper.emitted('update:modelValue').at(-1)[0];
    expect(lastInput).toBe('2020-05-10');
    expect(lastModelValue).toBe('2020-05-10');
  });

  it('invokes the legacy onDayChange/onMonthChange/onYearChange/onChange callback props', async () => {
    const onDayChange = vi.fn();
    const onMonthChange = vi.fn();
    const onYearChange = vi.fn();
    const onChange = vi.fn();
    const wrapper = mountCompat(DropdownDatepicker, {
      props: { onDayChange, onMonthChange, onYearChange, onChange },
    });

    await selectByName(wrapper, 'year', '2021');
    expect(onYearChange).toHaveBeenCalledWith(2021);

    await selectByName(wrapper, 'month', '3');
    expect(onMonthChange).toHaveBeenCalledWith(3);

    await selectByName(wrapper, 'day', '15');
    expect(onDayChange).toHaveBeenCalledWith(15);

    expect(onChange).toHaveBeenLastCalledWith('15', '03', 2021);
  });

  it('constrains selectable years using minAge/maxAge', () => {
    const currentYear = new Date().getFullYear();
    const wrapper = mountCompat(DropdownDatepicker, { props: { minAge: 18, maxAge: 65 } });
    const yearSelect = selects(wrapper).filter((s) => s.attributes('name') === 'year')[0];
    // First option is the placeholder label (yearLabel) with a null bound
    // value, which renders without a `value` attribute - skip it.
    const optionValues = toArray(yearSelect.findAll('option'))
      .slice(1)
      .map((o) => o.element.value);

    expect(Number(optionValues[0])).toBe(currentYear - 18);
    expect(Number(optionValues.at(-1))).toBe(currentYear - 65);
  });

  it('populates day/month/year from defaultDate (default yyyy-mm-dd format)', () => {
    const wrapper = mountCompat(DropdownDatepicker, { props: { defaultDate: '1990-07-04' } });
    expect(wrapper.vm.year).toBe(1990);
    expect(wrapper.vm.month).toBe(7);
    expect(wrapper.vm.day).toBe(4);
  });

  it('populates day/month/year from a unix timestamp defaultDate', () => {
    const date = new Date(2000, 0, 15); // Jan 15 2000, local time
    const unixSeconds = Math.round(date.getTime() / 1000);
    const wrapper = mountCompat(DropdownDatepicker, {
      props: { defaultDate: String(unixSeconds), defaultDateFormat: 'unix' },
    });
    expect(wrapper.vm.year).toBe(2000);
    expect(wrapper.vm.month).toBe(1);
    expect(wrapper.vm.day).toBe(15);
  });
});
