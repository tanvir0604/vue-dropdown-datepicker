import * as testUtils from '@vue/test-utils';

const { mount } = testUtils;

// @vue/test-utils v1 (Vue 2) doesn't recognize a `props` mount option as
// inert - unlike v2, which quietly accepts and ignores keys it doesn't use.
// v1's createInstance() merges *any* unrecognized mount option straight into
// the component's own options via Vue.extend(), so passing `props` there
// overwrites the component's real prop *definitions* (type/validator) with
// whatever object you passed as prop *values*, producing bogus "Invalid
// prop type" warnings. `createLocalVue` only exists on v1 (removed in v2),
// so use it to build the right options shape for whichever major is
// installed.
const isV1 = 'createLocalVue' in testUtils;

export function mountCompat(Component, options = {}) {
  const { props, ...rest } = options;
  return mount(Component, isV1 ? { ...rest, propsData: props } : { ...rest, props });
}

// v2's findAll() returns a plain Array; v1's returns a WrapperArray that
// doesn't support .map/.filter/bracket access, only `.wrappers` (a real
// array) and `.at(index)`. Normalize to a real array either way.
export function toArray(wrapperArrayOrArray) {
  return wrapperArrayOrArray.wrappers ? wrapperArrayOrArray.wrappers : wrapperArrayOrArray;
}
