'use strict';

// Runtime dispatcher for CommonJS/require() consumers. By the time this
// module is require()'d, the consumer's own `vue` singleton is already
// resolved, so it's safe to inspect Vue.version here and pick the matching
// pre-compiled build. ESM/bundler consumers should use the static subpath
// imports instead (see the "exports" map in package.json: "./v2" / "./v3"),
// since a bare ESM import can't be dispatched this way at static-analysis
// time.
var Vue = require('vue');
var isVue2 = typeof Vue.version === 'string' && Vue.version.charAt(0) === '2';

module.exports = isVue2
	? require('../dist/v2/dropdown-datepicker.cjs')
	: require('../dist/v3/dropdown-datepicker.cjs');
