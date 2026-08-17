# Vue Dropdown Datepicker

[![npm version](https://img.shields.io/npm/v/vue-dropdown-datepicker.svg)](https://www.npmjs.com/package/vue-dropdown-datepicker)
[![CI](https://github.com/tanvir0604/vue-dropdown-datepicker/actions/workflows/ci.yml/badge.svg)](https://github.com/tanvir0604/vue-dropdown-datepicker/actions/workflows/ci.yml)

A simple and customizable dropdown datepicker vue component. Works with **Vue 2.7+** and **Vue 3** from the same package.

## Check [Examples](https://tanvir0604.github.io/vue-dropdown-datepicker/)

## Requirements

- Vue **2.7.0** or later, or Vue **3.0.0** or later.
- Projects still on Vue 2.6 or below (Vue 2.7 is the last 2.x release) should stay on
  [`vue-dropdown-datepicker@1.x`](https://www.npmjs.com/package/vue-dropdown-datepicker/v/1.3.1),
  which remains published on npm and is unaffected by this release.

## Installation

### Package manager
#### Using [npm](https://www.npmjs.com)

```bash
npm i vue-dropdown-datepicker
```

#### Using [yarn](https://yarnpkg.com)

```bash
yarn add vue-dropdown-datepicker
```

#### Using CDN

Pick the build matching your Vue major version:

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/vue-dropdown-datepicker@2/dist/v3/dropdown-datepicker.iife.js"></script>
```
```html
<!-- Vue 2.7 -->
<script src="https://unpkg.com/vue-dropdown-datepicker@2/dist/v2/dropdown-datepicker.iife.js"></script>
```

jsDelivr works the same way, substituting `unpkg.com` for `cdn.jsdelivr.net/npm`.

## Usage

### ES module bundlers (Vite, webpack, etc.)

The package resolves to the right build automatically for `import`. If your bundler/toolchain
needs one Vue major explicitly, use the `/v2` or `/v3` subpath import instead of the bare
package name.

```javascript
// Vue 3
import { createApp } from 'vue';
import DropdownDatepicker from 'vue-dropdown-datepicker';

createApp({
  components: { DropdownDatepicker },
}).mount('#app');
```

```javascript
// Vue 2.7
import Vue from 'vue';
import DropdownDatepicker from 'vue-dropdown-datepicker';

new Vue({
  el: '#app',
  components: { DropdownDatepicker },
});
```

### Plugin install (registers `<DropdownDatepicker>` globally)

```javascript
// Vue 3
import { createApp } from 'vue';
import DropdownDatepicker from 'vue-dropdown-datepicker';

const app = createApp({ /* ... */ });
app.use(DropdownDatepicker);
app.mount('#app');
```

```javascript
// Vue 2.7
import Vue from 'vue';
import DropdownDatepicker from 'vue-dropdown-datepicker';

Vue.use(DropdownDatepicker);
```

### Browser (`<script>` tag, Vue 2.7 only)

Loading Vue 2.7 globally via `<script>` before this package's Vue-2 build auto-installs
`<DropdownDatepicker>` as a global component (same as versions 1.x). Vue 3's CDN global does not
support this auto-install pattern - call `app.use(DropdownDatepicker)` yourself instead, as shown
above.

```javascript
new Vue({
  el: '#app',
});
```

## v-model

`<DropdownDatepicker v-model="date">` works the same way regardless of which Vue major is
installed - the component emits both the Vue 2 (`value`/`input`) and Vue 3
(`modelValue`/`update:modelValue`) v-model contracts together, so consumers never need to know
which one applies:

```html
<dropdown-datepicker v-model="date"></dropdown-datepicker>
```

## Localized month names

Pass a `locale` prop (a BCP 47 tag, eg. `'en'`, `'fr'`, `'de-DE'`) to have month names come from
the browser's built-in `Intl.DateTimeFormat` instead of the English `monthLongValues`/
`monthShortValues` defaults - no extra dependency needed:

```html
<dropdown-datepicker locale="fr"></dropdown-datepicker>
```

If `locale` is unset, or set to an invalid/unsupported tag, the component falls back to
`monthLongValues`/`monthShortValues` as before. Day/month/year field labels (`dayLabel`,
`monthLabel`, `yearLabel`, etc.) are separate props and aren't affected by `locale` - set those
yourself if you need them translated too.

## Options
| Option                   | Type          | Default          |Comment |
| -------------            | ------------- | ----------      |--------|
| defaultDate              | string        | null            |        |
| defaultDateFormat        | string        | 'yyyy-mm-dd'    | also supports 'dd/mm/yyyy', 'mm/dd/yyyy', 'unix' |
| displayFormat            | string        | 'ymd'           | 'ymd', 'dmy', or 'mdy' |
| submitFormat             | string        | 'yyyy-mm-dd'    |        |
| submitId                 | string        | null            |        |
| minAge                   | int           | null            |        |
| maxAge                   | int           | null            |        |
| minYear                  | int           | null            |        |
| maxYear                  | int           | null            |        |
| minDate                  | string        | null            | yyyy-mm-dd |
| maxDate                  | string        | null            | yyyy-mm-dd |
| allowPast                | boolean       | true            |        |
| allowFuture              | boolean       | true            |        |
| wrapperClass             | string        | 'date-dropdowns'|        |
| dropdownClass            | string        | null            |        |
| daySuffixes              | boolean       | true            |        |
| monthSuffixes            | boolean       | true            |        |
| monthFormat              | string        | 'long'          |        |
| locale                   | string        | null            | BCP 47 locale tag, eg. 'en', 'fr', 'de-DE'. When set, month names come from `Intl.DateTimeFormat` for that locale, overriding monthLongValues/monthShortValues. Falls back to monthLongValues/monthShortValues if unset or if the locale tag is invalid. |
| required                 | boolean       | false           |        |
| dayLabel                 | string        | 'Day'           |        |
| monthLabel               | string        | 'Month'         |        |
| yearLabel                | string        | 'Year'          |        |
| sortYear                 | string        | 'desc'          |        |
| monthLongValues          | array         | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']|   |
| monthShortValues         | array         | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] |    |
| initialDayMonthYearValues| array         | ['Day', 'Month', 'Year'] |      |
| daySuffixValues          | array         | ['st', 'nd', 'rd', 'th'] |      |


## Events

### v-model / onChange
See the [v-model](#v-model) section above for two-way binding. Alternatively, pass an `onChange`
callback prop to receive the selected day/month/year directly:
```javascript
<dropdown-datepicker v-bind:on-change="yourFunctionName"></dropdown-datepicker>
```

### onDayChange
Call on any change of day dropdown
```javascript
<dropdown-datepicker v-bind:on-day-change="yourFunctionName"></dropdown-datepicker>
```

### onMonthChange
Call on any change of month dropdown
```javascript
<dropdown-datepicker v-bind:on-month-change="yourFunctionName"></dropdown-datepicker>
```

### onYearChange
Call on any change of year dropdown
```javascript
<dropdown-datepicker v-bind:on-year-change="yourFunctionName"></dropdown-datepicker>
```

## Contributing
Feel free to submit any fixes or propose any additional functionality via pull request or issue,
making sure any changes take place in `/src`.

Run `npm install`, then:
- `npm run build` builds both the Vue 2.7 (`dist/v2`) and Vue 3 (`dist/v3`) targets. Building the
  Vue 2.7 target requires the Vue 2.7 toolchain, installed via `npm run setup:v2-toolchain`
  (see `CLAUDE.md` for why this can't be a normal devDependency).
- `npm run test:v3` / `npm run test:v2` run the test suite against each Vue major.
- `npm run lint` runs ESLint.

## License
[ISC](https://choosealicense.com/licenses/isc/)
