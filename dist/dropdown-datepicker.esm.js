//
//
//
//
//
//

var script = {
    props:{
        name: String,
        idName: String,
        className: String,
        value: Number,
        values: Array,
        options: Array,
        onChange: {type: Function, default: null},
        required: {type: Boolean, default: false}
    },
    data: function data () {
        return {
            items: [],
            fieldValue: this.value
        }
    },
    created: function created (){
        this.processItems();
    },
    watch: { 
        values: function(newVal, oldVal) {
            this.processItems();
        },
        value: function(newVal, oldVal){
            this.fieldValue = this.value;
        }
    },
    methods: {
        processItems: function processItems () {
            this.items = [];
            // console.log(this.values, this.options, this.name);
            for (var index = 0; index < this.values.length; index++) {
                this.items.push({value: this.values[index], text: this.options[index]});
            }
        },
        onChangeCallback: function onChangeCallback () {
            if(this.onChange != null){
                this.onChange(this.fieldValue);
            }
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "select",
    {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.fieldValue,
          expression: "fieldValue"
        }
      ],
      class: _vm.className,
      attrs: { name: _vm.name, id: _vm.idName, required: _vm.required },
      on: {
        change: [
          function($event) {
            var $$selectedVal = Array.prototype.filter
              .call($event.target.options, function(o) {
                return o.selected
              })
              .map(function(o) {
                var val = "_value" in o ? o._value : o.value;
                return val
              });
            _vm.fieldValue = $event.target.multiple
              ? $$selectedVal
              : $$selectedVal[0];
          },
          _vm.onChangeCallback
        ]
      }
    },
    _vm._l(_vm.items, function(item) {
      return _c(
        "option",
        { key: item.value, domProps: { value: item.value } },
        [_vm._v(_vm._s(item.text))]
      )
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-7f3387f4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"select.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Select = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

//

var script$1 = {
  props: {
    defaultDate: {type: String, default: null},
    defaultDateFormat: {type: String, default:'yyyy-mm-dd'},
    displayFormat: {type: String, default:'ymd'},
    submitId: {type: String, default: ''},
    submitFormat: {type: String, default:'yyyy-mm-dd'},
    minAge: {type: Number, default:null},
    maxAge: {type: Number, default:null},
    minYear: {type: Number, default:null},
    maxYear: {type: Number, default:null},
    minDate: {type: String, default:null},
    maxDate: {type: String, default:null},
    allowPast: {type: Boolean, default:true},
    allowFuture: {type: Boolean, default:true},
    wrapperClass: {type: String, default:'date-dropdowns'},
    dropdownClass: {type: String, default:null},
    daySuffixes: {type: Boolean, default:true},
    monthSuffixes: {type: Boolean, default:true},
    monthFormat: {type: String, default:'long'},
    required: {type: Boolean, default:false},
    dayLabel: {type: String, default:'Day'},
    monthLabel: {type: String, default:'Month'},
    yearLabel: {type: String, default:'Year'},
    sortYear: {type: String, default: 'desc'},
    monthLongValues: {type: Array, default: function () { return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; }},
    monthShortValues: {type: Array, default: function () { return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; }},
    initialDayMonthYearValues: {type: Array, default: function () { return ['Day', 'Month', 'Year']; }},
    daySuffixValues: {type: Array, default: function () { return ['st', 'nd', 'rd', 'th']; }},
    onDayChange: {type: Function, default:null},
    onMonthChange: {type: Function, default:null},
    onYearChange: {type: Function, default:null},
    onChange: {type: Function, default: null},
    value: {type: String, default:null}
  },
  components: {
    Select: Select
  },
  data: function data () {
    return {
      day: null,month: null,year: null,
      days: [],
      dayOptions: [],
      months: [],
      monthOptions: [],
      years: [],
      yearOptions: [],
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth()+1,
      currentYear: new Date().getFullYear(),
      minDateValue: this.minDate,
      maxDateValue: this.maxDate
    }
  },

  created: function created(){
    this.init();
  },

  methods: {

    init: function init(){
        this.populateYear();
        this.populateMonth();
        this.populateDay();
        this.populateDefaultDate();
    },

    populateDefaultDate: function populateDefaultDate() {
      // console.log(this.day, this.month, this.year);
      if (isNaN(Date.parse(this.defaultDate)) === true) {
          return;
      }
      if(!this.allowPast && new Date().getTime() > new Date(this.defaultDate).getTime()) {
          return;
      }

      // if future date is disallowed and default is a future date then no default date is selected
      if(!this.allowFuture && new Date().getTime() < new Date(this.defaultDate).getTime()){
          return;
      }
      // console.log(this.day, this.month, this.year);
      var parts = this.processDefaultDate();
      this.day = parseInt(parts[0]);
      this.month = parseInt(parts[1]);
      this.year = parseInt(parts[2]);
    },
    populateYear: function populateYear() {
    //   console.log('populate year');
      var minYear = this.minYear, maxYear = this.maxYear;
      if(this.minAge != null){
          maxYear = this.currentYear - this.minAge;
      }
      if(this.maxAge != null){
          minYear = this.currentYear - this.maxAge;
      }
      if (!minYear) {
          minYear = this.allowPast ? 1970 : this.currentYear;
      }else{
          minYear = this.allowPast ? minYear : this.currentYear;
      }
      if(this.minDateValue !== null){
          minYear = new Date(this.minDateValue).getFullYear();
      }

      if (!maxYear) {
          maxYear = this.currentYear+20;
      }

      if(!this.allowFuture){
          maxYear = this.currentYear;
      }

      if(this.maxDateValue !== null){
          maxYear = new Date(this.maxDateValue).getFullYear();
      }

      this.years = [];
      this.yearOptions = [];
      if(this.yearLabel){
          this.years.push(null);
          this.yearOptions.push(this.yearLabel);
      }
      if(this.sortYear == 'desc'){
        for (var i = maxYear; i >= minYear; i--) {
            this.years.push(i);
            this.yearOptions.push(i);
        }
      }else{
        for (var i = minYear; i <= maxYear; i++) {
            this.years.push(i);
            this.yearOptions.push(i);
        }
      }

      // console.log(this.years);
    },
    populateMonth: function populateMonth(){
    //   console.log('populate month');
      var start = 1,end = 12, year = this.year;
      year = parseInt(year);
      if(!this.allowPast && year === this.currentYear) {
          start = this.currentMonth;
      }
      if(!this.allowFuture && year === this.currentYear) {
          end = this.currentMonth;
      }

      if(this.minAge != null){
          if(year === this.currentYear - this.minAge){
              end = this.currentMonth;
          }
      }

      if(this.maxAge != null){
          if(year === this.currentYear - this.maxAge){
              start = this.currentMonth;
          }
      }

      if(this.minDateValue !== null && new Date(this.minDateValue).getFullYear() === year){
          start = start < new Date(this.minDateValue).getMonth()+1?new Date(this.minDateValue).getMonth()+1:start;
      }
      if(this.maxDateValue !== null && new Date(this.maxDateValue).getFullYear() === year){
          end = end > new Date(this.maxDateValue).getMonth()+1?new Date(this.maxDateValue).getMonth()+1:end;
      }

      this.months = [];
      this.monthOptions = [];
      if(this.monthLabel){
          this.months.push(null);
          this.monthOptions.push(this.monthLabel);
      }
      for (var monthNo = start; monthNo <= end; monthNo++) {
          this.months.push(monthNo);
          this.monthOptions.push(this.monthFormat == 'long'?this.monthLongValues[monthNo-1]:this.monthShortValues[monthNo-1]);
      }
    },
    populateDay: function populateDay(){
    //   console.log('populate day');
      var day,start1=1,start2=10,end1=9,end2=31,
      month = parseInt(this.month),
      year = parseInt(this.year);

      // console.log(this.allowPast , year , this.currentYear , month , this.currentMonth ,start1 , this.currentDay);
      if(!this.allowPast && year === this.currentYear && month === this.currentMonth && start1 < this.currentDay) {
          start1 = this.currentDay;
      }

      if(this.maxAge != null){
          if(year === this.currentYear - this.maxAge && month === this.currentMonth){
              start1 = this.currentDay;
          }
      }

      if(this.minDateValue !== null && new Date(this.minDateValue).getFullYear() === year && new Date(this.minDateValue).getMonth() + 1 === month){
          start1 = start1 < new Date(this.minDateValue).getDate()?new Date(this.minDateValue).getDate():start1;
      }

      if (this.maxDateValue !== null) {
        if (
            (new Date(this.maxDateValue).getDate() <= 9)
            && (year === new Date(this.maxDateValue).getFullYear()
            && (month === (new Date(this.maxDateValue).getMonth() + 1)))
        ) {
          end1 = new Date(this.maxDateValue).getDate();
        }
      }

      if(start2 < start1){
          start2 = start1;
      }

      if (this.maxDateValue !== null) {
        if (new Date(this.maxDateValue).getDate() <= 9) {
          end1 = new Date(this.maxDateValue).getDate();
        }
      }

      var numDaysInMonth = (new Date(year, month, 0).getDate());
      if(end2 > numDaysInMonth) {
          end2 = numDaysInMonth;
      }

      if(!this.allowFuture && year === this.currentYear && month === this.currentMonth && end2 > this.currentDay) {
          end2 = this.currentDay;
      }


      if(this.minAge != null){
          if(year === this.currentYear - this.minAge && month === this.currentMonth){
              end2 = this.currentDay;
          }
      }

      if(this.maxDateValue !== null && new Date(this.maxDateValue).getFullYear() === year && new Date(this.maxDateValue).getMonth() + 1 === month){
          end2 = end2 > new Date(this.maxDateValue).getDate()?new Date(this.maxDateValue).getDate():end2;
      }

      if(end1 > start2){
          start2 = end1;
      }
      if(start2 > end2){
          end2 = start2;
      }

      this.days = [];
      this.dayOptions = [];

      if(this.dayLabel){
          this.dayOptions.push(this.dayLabel);
          this.days.push(null);
      }

      // Days 1-9
      for (var i = start1; i <= end1; i++) {
          if (this.daySuffixes) {
              day = i + this.getSuffix(i);
          } else {
              day = '0' + i;
          }
          this.days.push(i);
          this.dayOptions.push(day);
      }

      // Days 10-31
      if ((this.maxDateValue === null)
              || (year < new Date(this.maxDateValue).getFullYear())
              || (year === new Date(this.maxDateValue).getFullYear() &&
                      month !== new Date(this.maxDateValue).getMonth() + 1)) {
      if (new Date(this.maxDateValue).getDate() > 9) {
          for (var j = start2; j <= end2; j++) {
              day = j;

              if (this.daySuffixes) {
                  day = j + this.getSuffix(j);
              }
              this.days.push(j);
              this.dayOptions.push(day);
          }
        }
      }
    },
    getSuffix: function (number) {
        var suffix = '';
        var st = this.daySuffixValues[0];
        var nd = this.daySuffixValues[1];
        var rd = this.daySuffixValues[2];
        var th = this.daySuffixValues[3];

        switch (number % 10) {
            case 1:
                suffix = (number % 100 === 11) ? th : st;
                break;
            case 2:
                suffix = (number % 100 === 12) ? th : nd;
                break;
            case 3:
                suffix = (number % 100 === 13) ? th : rd;
                break;
            default:
                suffix = th;
                break;
        }

        return suffix;
    },
    processDefaultDate: function(){
        var date = this.defaultDate,
            parts = [],
            day = '',
            month = '',
            year = '';

        switch (this.defaultDateFormat) {
            case 'yyyy-mm-dd':
            default:
                parts = date.split('-');
                day = parts[2];
                month = parts[1];
                year = parts[0];
                break;

            case 'dd/mm/yyyy':
                parts = date.split('/');
                day = parts[0];
                month = parts[1];
                year = parts[2];
                break;

            case 'mm/dd/yyyy':
                parts = date.split('/');
                day = parts[1];
                month = parts[0];
                year = parts[2];
                break;

            case 'unix':
                parts = new Date();
                parts.setTime(date * 1000);
                day = parts.getDate() + '';
                month = (parts.getMonth() + 1) + '';
                year = parts.getFullYear();

                if (day.length < 2) {
                    day = '0' + day;
                }
                if (month.length < 2) {
                    month = '0' + month;
                }
                break;
        }

        return [day, month, year];
    },
    yearChangeCallback: function yearChangeCallback(value) {
      this.year = value;
      this.populateMonth();
      this.populateDay();

      if (this.months.indexOf(this.month) < 0) {
          this.month = null;
      }

      if (this.days.indexOf(this.day) < 0) {
          this.day = null;
      }

      //   console.log(this.year, this.month, this.day);
      if(this.onYearChange != null){
        this.onYearChange(value);
      }
      this.changeCallback();
    },
    monthChangeCallback: function monthChangeCallback(value) {
      this.month = value;
      this.populateDay();
      if (this.days.indexOf(this.day) < 0) {
          this.day = null;
      }
      if(this.onMonthChange != null){
        this.onMonthChange(value);
      }
      this.changeCallback();
    },
    formatSubmitDate: function (day, month, year) {
        var formattedDate,
            _date;

        switch (this.submitFormat) {
            case 'unix':
                _date = new Date();
                _date.setDate(day);
                _date.setMonth(month - 1);
                _date.setYear(year);
                formattedDate = Math.round(_date.getTime() / 1000);
                break;

            default:
                formattedDate = this.submitFormat
                    .replace('dd', ('0' + day).slice(-2))
                    .replace('mm', ('0' + month).slice(-2))
                    .replace('yyyy', year);
                break;
        }

        return formattedDate;
    },
    dayChangeCallback: function dayChangeCallback(value){
      this.day = value;
      if(this.onDayChange != null){
        this.onDayChange(value);
      }
      this.changeCallback();
    },
    changeCallback: function changeCallback(){
        if(this.day != null && this.month != null && this.year != null){
          var formattedDate = this.formatSubmitDate(this.day, this.month, this.year);
          if (this.submitId != '') {
            document.getElementById(this.submitId).value = formattedDate;
          }
          this.$emit('input', formattedDate);
        }
        if(this.onChange != null){
            this.onChange(('0' + this.day).slice(-2), ('0' + this.month).slice(-2), this.year);
        }
    }
  }
  };

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.wrapperClass },
    [
      _vm.displayFormat == "dmy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "day",
              "id-name": "day",
              values: _vm.days,
              options: _vm.dayOptions,
              "on-change": _vm.dayChangeCallback,
              value: _vm.day,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "dmy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "month",
              "id-name": "month",
              values: _vm.months,
              options: _vm.monthOptions,
              "on-change": _vm.monthChangeCallback,
              value: _vm.month,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "dmy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "year",
              "id-name": "year",
              values: _vm.years,
              options: _vm.yearOptions,
              "on-change": _vm.yearChangeCallback,
              value: _vm.year,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "ymd"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "year",
              "id-name": "year",
              values: _vm.years,
              options: _vm.yearOptions,
              "on-change": _vm.yearChangeCallback,
              value: _vm.year,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "ymd"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "month",
              "id-name": "month",
              values: _vm.months,
              options: _vm.monthOptions,
              "on-change": _vm.monthChangeCallback,
              value: _vm.month,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "ymd"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "day",
              "id-name": "day",
              values: _vm.days,
              options: _vm.dayOptions,
              "on-change": _vm.dayChangeCallback,
              value: _vm.day,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "mdy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "month",
              "id-name": "month",
              values: _vm.months,
              options: _vm.monthOptions,
              "on-change": _vm.monthChangeCallback,
              value: _vm.month,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "mdy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "day",
              "id-name": "day",
              values: _vm.days,
              options: _vm.dayOptions,
              "on-change": _vm.dayChangeCallback,
              value: _vm.day,
              required: _vm.required
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.displayFormat == "mdy"
        ? _c("Select", {
            class: _vm.dropdownClass,
            attrs: {
              name: "year",
              "id-name": "year",
              values: _vm.years,
              options: _vm.yearOptions,
              "on-change": _vm.yearChangeCallback,
              value: _vm.year,
              required: _vm.required
            }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-fb2d524e_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"dropdown-datepicker.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var component = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('DropdownDatepicker', component);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default component;
export { install };
