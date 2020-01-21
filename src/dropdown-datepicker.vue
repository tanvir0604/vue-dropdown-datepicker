<template>
  <div v-bind:class="wrapperClass">
    <Select v-if="displayFormat == 'dmy'" name="day" id-name="day" v-bind:class="dropdownClass" v-bind:values="days" v-bind:options='dayOptions' v-bind:on-change='dayChangeCallback' v-bind:value="day" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'dmy'" name="month" id-name="month" v-bind:class="dropdownClass" v-bind:values="months" v-bind:options="monthOptions" v-bind:on-change='monthChangeCallback' v-bind:value="month" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'dmy'" name="year" id-name="year" v-bind:class="dropdownClass" v-bind:values="years" v-bind:options='yearOptions' v-bind:on-change='yearChangeCallback' v-bind:value="year" v-bind:required="required"></Select>
  
    <Select v-if="displayFormat == 'ymd'" name="year" id-name="year" v-bind:class="dropdownClass" v-bind:values="years" v-bind:options='yearOptions' v-bind:on-change='yearChangeCallback' v-bind:value="year" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'ymd'" name="month" id-name="month" v-bind:class="dropdownClass" v-bind:values="months" v-bind:options="monthOptions" v-bind:on-change='monthChangeCallback' v-bind:value="month" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'ymd'" name="day" id-name="day" v-bind:class="dropdownClass" v-bind:values="days" v-bind:options='dayOptions' v-bind:on-change='dayChangeCallback' v-bind:value="day" v-bind:required="required"></Select>

    <Select v-if="displayFormat == 'mdy'" name="month" id-name="month" v-bind:class="dropdownClass" v-bind:values="months" v-bind:options="monthOptions" v-bind:on-change='monthChangeCallback' v-bind:value="month" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'mdy'" name="day" id-name="day" v-bind:class="dropdownClass" v-bind:values="days" v-bind:options='dayOptions' v-bind:on-change='dayChangeCallback' v-bind:value="day" v-bind:required="required"></Select>
    <Select v-if="displayFormat == 'mdy'" name="year" id-name="year" v-bind:class="dropdownClass" v-bind:values="years" v-bind:options='yearOptions' v-bind:on-change='yearChangeCallback' v-bind:value="year" v-bind:required="required"></Select>
  
  </div>
  
</template>

<script>

import Select from './select.vue';

export default {
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
    monthLongValues: {type: Array, default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']},
    monthShortValues: {type: Array, default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']},
    initialDayMonthYearValues: {type: Array, default: () => ['Day', 'Month', 'Year']},
    daySuffixValues: {type: Array, default: () => ['st', 'nd', 'rd', 'th']},
    onDayChange: {type: Function, default:null},
    onMonthChange: {type: Function, default:null},
    onYearChange: {type: Function, default:null},
    onChange: {type: Function, default: null},
    value: {type: String, default:null}
  },
  components: {
    Select
  },
  data () {
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
  
  created(){
    this.init();
  },
  
  methods: {

    init(){
        this.populateYear();
        this.populateMonth();
        this.populateDay();
        this.populateDefaultDate();
    },

    populateDefaultDate() {
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
    populateYear() {
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
    populateMonth(){
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
    populateDay(){
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
      

      
      if(start2 < start1){
          start2 = start1;
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
      for (var j = start2; j <= end2; j++) {
          day = j;

          if (this.daySuffixes) {
              day = j + this.getSuffix(j);
          }
          this.days.push(j);
          this.dayOptions.push(day);
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
    yearChangeCallback(value) {
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
    monthChangeCallback(value) {
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
    dayChangeCallback(value){
      this.day = value;
      if(this.onDayChange != null){
        this.onDayChange(value);
      }
      this.changeCallback();
    },
    changeCallback(){
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
  }
</script>

<style>
</style>