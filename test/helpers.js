import { mount } from '@vue/test-utils';

// @vue/test-utils v2 (Vue 3) takes props via `props`; v1 (Vue 2) takes them
// via `propsData`. Passing both is harmless (each major ignores the option
// it doesn't recognize) and lets the same spec file run against either.
export function mountCompat(Component, options = {}) {
  const { props, ...rest } = options;
  return mount(Component, { ...rest, props, propsData: props });
}

// v2's findAll() returns a plain Array; v1's returns a WrapperArray that
// doesn't support .map/.filter/bracket access, only `.wrappers` (a real
// array) and `.at(index)`. Normalize to a real array either way.
export function toArray(wrapperArrayOrArray) {
  return wrapperArrayOrArray.wrappers ? wrapperArrayOrArray.wrappers : wrapperArrayOrArray;
}
