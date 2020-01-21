# Vue Dropdown Datepicker

A simple and customizable dropdown datepicker vue component.

## Check [Examples](https://tanvir0604.github.io/vue-dropdown-datepicker/)

## Installation

### [vuejs](https://vuejs.org/) is required to use this component

### Package manager 
#### Using [npm](https://www.npmjs.com)

```bash
npm i vue-dropdown-datepicker
```

#### Using [yarn](https://yarnpkg.com)

```bash
yarn add vue-dropdown-datepicker
```

#### Using [bower](https://bower.io)

```bash
bower install vue-dropdown-datepicker
```

#### Using CDN

```code
<script src="https://cdn.jsdelivr.net/npm/vue-dropdown-datepicker@1.3.1/dist/dropdown-datepicker.min.js"></script>
```
OR
```code
<script src="https://unpkg.com/vue-dropdown-datepicker@1.3.1/dist/dropdown-datepicker.min.js"></script>
```
## Usage

### ES6
```javascript
import DropdownDatepicker from '../src/dropdown-datepicker.vue';
new Vue({
    el: '#app',
    components: {
        DropdownDatepicker
    }
});
```

### Browser
```javascript
new Vue({
    el: '#app',
    components: {
        DropdownDatepicker
    }
});
```

## Options
| Option                   | Type          | Defult          |Comment |
| -------------            | ------------- | ----------      |--------|
| defaultDate              | string        | null            |        |
| defaultDateFormat        | string        | 'yyyy-mm-dd'    |        |
| displayFormat            | string        | 'dmy'           |        |
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
| required                 | boolean       | false           |        |
| dayLabel                 | string        | 'Day            |        |
| monthLabel               | string        | 'Month'         |        |
| yearLabel                | string        | 'Year'          |        |
| sortYear                 | string        | 'desc'          |        |
| monthLongValues          | array         | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']|   |
| monthShortValues         | array         | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] |    |
| initialDayMonthYearValues| array         | ['Day', 'Month', 'Year'] |      |
| daySuffixValues          | array         | ['st', 'nd', 'rd', 'th'] |      |


## Events

### onDayChange
Call on any change of day dropdown
```javascript
<dropdown-datepicker v-bind:on-day-change="yourFunctionName"><dropdown-datepicker>
```

### onMonthChange
Call on any change of month dropdown
```javascript
<dropdown-datepicker v-bind:on-month-change="yourFunctionName"><dropdown-datepicker>
```

### onYearChange
Call on any change of year dropdown
```javascript
<dropdown-datepicker v-bind:on-year-change="yourFunctionName"><dropdown-datepicker>
```

## Contributing
Contributing Feel free to submit any fixes or propose any additional functionality via pull request or issue, making sure any changes take place in /src.

Minification and Validation Both are automated via npm command. Run npm install to install the required dependencies, then run npm run build from the root of the project to handle the tasks.

## License
[ISC](https://choosealicense.com/licenses/isc/)