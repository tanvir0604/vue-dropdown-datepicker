// Import vue component
import component from './dropdown-datepicker.vue';

// Declare install function executed by Vue.use() (Vue 2) / app.use() (Vue 3).
// Both pass an object exposing .component(name, def) as the first argument,
// so a single implementation works for both. Vue's own use()/app.use()
// already dedupe repeated installs, so no manual "installed" guard is kept
// here (a shared module-level guard would incorrectly block installing into
// a second, separate app instance).
export function install(app) {
	app.component('DropdownDatepicker', component);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when a classic Vue 2 global is found (eg. via <script> tag).
// Vue 3's CDN global is a namespace object (createApp/h/ref/...), not a
// single installable instance, so there is no equivalent auto-install target
// for it — Vue 3 CDN users call app.use(DropdownDatepicker) themselves.
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue && typeof GlobalVue.version === 'string' && GlobalVue.version.charAt(0) === '2') {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default component;