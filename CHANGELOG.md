# Changelog

## 2.0.0

### Added
- **Vue 3 support**, alongside continued Vue 2.7+ support, from the same npm package. The same
  `.vue` source is compiled twice (once against Vue 2.7's own bundled compiler via
  `@vitejs/plugin-vue2`, once against Vue 3's `@vue/compiler-sfc` via `@vitejs/plugin-vue`) into
  `dist/v2/` and `dist/v3/`. A small runtime dispatcher (`src/entry.cjs`) picks the right one for
  CommonJS/`require()` consumers based on the installed `Vue.version`; ESM/bundler consumers use
  the package's `exports` map (bare import defaults to the Vue 3 build; `vue-dropdown-datepicker/v2`
  is available explicitly).
- `v-model` now works transparently on both Vue majors: the component emits both the Vue 2
  (`input`) and Vue 3 (`update:modelValue`) events together, and accepts either the legacy `value`
  prop or the new `modelValue` prop.
- `peerDependencies` (`"vue": "^2.7.0 || ^3.0.0"`) - previously absent entirely.
- A proper `exports` map, plus a `files` field restricting what gets published to npm (previously
  the whole repository, including `docs/`, lockfiles, and build config, was published).
- Test suite (Vitest + `@vue/test-utils`, run against both Vue majors) and GitHub Actions CI -
  previously there was no automated verification of any kind.
- ESLint (flat config, `eslint-plugin-vue` essential rules).
- `CLAUDE.md` project/architecture documentation.
- `locale` prop (BCP 47 tag, eg. `'en'`, `'fr'`, `'de-DE'`): when set, month names come from the
  built-in `Intl.DateTimeFormat` instead of `monthLongValues`/`monthShortValues`, falling back to
  those props if `locale` is unset or invalid.

### Fixed
- `defaultDateFormat="unix"` never actually worked: the initial guard in `populateDefaultDate()`
  used `Date.parse()` on a raw unix-seconds string, which always returns `NaN`, so the method
  returned early every time. Fixed to compute the comparison timestamp correctly per format.
- A duplicate `var i` declaration across an if/else in `populateYear()`.
- Two `watch` handlers in `select.vue` declared unused `newVal`/`oldVal` parameters.
- The plugin's `install()` no longer guards on a module-level `installed` flag, which could
  incorrectly block a legitimate second install into a separate app instance; Vue's own
  `Vue.use()`/`app.use()` already dedupe.
- The global auto-install block (for `<script>`-tag usage) now only fires for an actual Vue 2
  global constructor. Previously it unconditionally called `.use()` on whatever `window.Vue` it
  found, which would misbehave under a Vue 3 CDN global.
- `changeCallback()`'s `document.getElementById(this.submitId)` call is now guarded against a
  missing element and a missing `document` (SSR), instead of throwing.
- Fixed the `vue: ^3.0.0` / `vue-template-compiler: ^2.6.10` contradictory devDependency pair,
  introduced by an unreviewed Dependabot bump (#29) that never came with actual Vue 3 support.
- `populateDefaultDate()`'s `allowPast`/`allowFuture` guards compared full millisecond-precision
  timestamps instead of calendar days, so a `defaultDate` of "right now" (e.g.
  `new Date().toISOString()` or a moment.js equivalent) was always a few milliseconds in the past
  by the time the check ran - with `allowPast="false"` this made the component silently refuse to
  pre-select today's date at all. Comparisons are now done at calendar-day granularity.

### Changed
- **Breaking**: minimum supported Vue 2 version is now 2.7.0 (previously 2.6.10+). Projects on
  Vue 2.6 or below should stay on `1.x`.
- **Breaking**: build tooling switched from Rollup to Vite library mode (two configs, one per Vue
  major); `dist/` layout changed from a flat `dist/*.js` to `dist/v2/*` and `dist/v3/*`.
- Un-deprecated the package: removed the README notice pointing to `vue3-dropdown-datepicker`.

## 1.3.1 and earlier
See git history.
