# CLAUDE.md

Guidance for Claude Code (or any future session) working in this repository.

## Project

`vue-dropdown-datepicker` - a small npm package providing a day/month/year dropdown-based date
picker as a Vue component. Originally Vue 2 only; was marked "no longer maintained" in the README
for a period directing users to a separate `vue3-dropdown-datepicker` package. As of **2.0.0** it
is actively maintained again and supports **both Vue 2.7+ and Vue 3** from this one package.

## Architecture

- `src/dropdown-datepicker.vue` - the main component. Options API (`props`/`data`/`created`/
  `methods`), no Composition API. Owns `day`/`month`/`year` state, builds the selectable option
  lists (age/date range constraints, past/future rules), and emits the assembled date string.
- `src/select.vue` - a dumb native-`<select>` wrapper used internally (day/month/year each render
  one). Not v-model'd by the parent; the parent passes `value` as a plain prop and reads changes
  via an `onChange` callback prop instead.
- `src/wrapper.js` - the plugin entry point (`install(app)` for `Vue.use()`/`app.use()`, plus a
  legacy Vue-2-only global-`window.Vue` auto-install for `<script>` tag usage).
- `src/entry.cjs` - CommonJS runtime dispatcher, see below.

## Dual Vue 2.7 / Vue 3 support: how, and why not `vue-demi`

**Do not try to replace this with a single shared build using `vue-demi` or similar** - it was
evaluated and rejected. Vue 2.7's runtime does not export the block-tree compiler helpers
(`openBlock`, `createElementBlock`, `toDisplayString`, etc.) that Vue 3's `@vue/compiler-sfc`
emits into compiled `<template>` output, and Vue 3 never installs the `this._c`/`this._v`
instance methods Vue 2's classic compiled output depends on. There is no import-aliasing trick
that papers over this: the helpers genuinely don't exist on the other runtime. A single compiled
bundle cannot run correctly on both.

Instead, the same unmodified `src/*.vue` files are **compiled twice**:
- `build/vite.config.v3.js` (`@vitejs/plugin-vue` + Vue 3) → `dist/v3/`
- `build/vite.config.v2.js` (`@vitejs/plugin-vue2` + Vue 2.7's own bundled compiler) → `dist/v2/`

Consumers get routed to the right one:
- **CJS/`require()`**: `package.json`'s `"main"` is `src/entry.cjs`, which checks `Vue.version` at
  require-time (safe - the consumer's `vue` singleton is already resolved by then) and requires
  the matching `dist/v2` or `dist/v3` CJS build.
- **ESM/bundlers**: the `"exports"` map exposes `vue-dropdown-datepicker` (bare import → Vue 3
  build, by default for new consumers), `vue-dropdown-datepicker/v2`, and
  `vue-dropdown-datepicker/v3` as explicit static subpaths (this can't be runtime-dispatched
  safely for ESM, since imports are statically analyzed).
- `"./sfc"` also exposes the raw `.vue` source for advanced consumers with their own SFC compiler
  already configured for their specific Vue version.

## The Vue 2.7 toolchain is intentionally *not* a normal devDependency

`@vitejs/plugin-vue2`, `vue@2.7.16`, `@vue/test-utils@1.3.6`, and `vue-template-compiler@2.7.16`
peer-conflict with the Vue 3 toolchain (`@vitejs/plugin-vue`, `vue@^3.5.x`,
`@vue/test-utils@^2`) that lives in `devDependencies` — npm can't satisfy both peer sets from one
`node_modules` tree, and there is no single `@vue/test-utils` version that supports both Vue
majors. Run `npm run setup:v2-toolchain` (an `npm install --no-save --legacy-peer-deps ...`) to
swap in the Vue 2.7 set ephemerally before `npm run build:v2` / `npm run test:v2`, then
`npm run restore:v3-toolchain` (`rm -rf node_modules package-lock.json && npm install`) to get
back to the Vue 3 default. This is exactly what CI does per matrix leg
(`.github/workflows/ci.yml`), and what `npm run build` does internally so it's a single working
command end-to-end (see Commands below) - don't "simplify" `build` back to
`build:v2 && build:v3` without the toolchain swap in between; `build:v3` will fail immediately
after `build:v2` otherwise (`vue/compiler-sfc` isn't resolvable under the Vue 2.7 toolchain).

If you ever see `npm install --no-save` silently *remove* packages that should still be there
(e.g. `vue` itself disappearing from `node_modules`), it's because npm re-resolves the whole tree
on each `--no-save` call - always pass every ephemeral package in **one** combined install command,
never several sequential ones.

## v-model invariant

`dropdown-datepicker.vue`'s `changeCallback()` must always emit **both** `input` (Vue 2 v-model
contract) and `update:modelValue` (Vue 3 v-model contract) together, with the same payload. Don't
let a future edit emit only one of them.

## Commands

- `npm run build` - builds both targets end-to-end as one command: installs the Vue 2.7 toolchain,
  runs `build:v2`, restores the Vue 3 toolchain (full `node_modules` reinstall), then runs
  `build:v3`. Slower than a single Vite build (a full reinstall happens mid-script) but leaves
  `node_modules` back at its normal Vue 3 default state afterward and needs no manual steps.
- `npm run build:v2` / `npm run build:v3` - build just one target with whichever toolchain is
  *currently* installed (you must have run `setup:v2-toolchain` first for `build:v2`).
- `npm run test:v3` / `npm run test:v2` - Vitest against each target. Same spec files
  (`test/*.spec.js`) run against both; `test/helpers.js` has `mountCompat()`/`toArray()` to smooth
  over `@vue/test-utils` v1-vs-v2 API differences (`props` vs `propsData`, `WrapperArray` vs plain
  array from `findAll()`).
- `npm run lint` - ESLint, `eslint-plugin-vue` **essential** tier only (bug-catching rules, not
  style/formatting - deliberately, to avoid a large unrelated reformatting diff across the SFCs).

## Known constraints

- Vue 2.6 and below is not supported by 2.x - those users should stay on the published `1.x` line.
- `changeCallback()` touches `document.getElementById(this.submitId)`, guarded for a missing
  `document` (SSR) and a missing element, but the component has no broader SSR testing.
