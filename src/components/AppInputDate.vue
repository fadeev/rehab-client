<template>
  <div>
    <div :class="['app-input-date', {'app-input--expanded': expanded}]">
      <div class="app-input__label" @click="dayFocus">
        {{label}}
      </div>
      <div class="app-input" @keyup.capture="updateValue">
        <input class="app-input__input app-input--day"
               v-model="day"
               type="number"
               ref="day"
               @input="updateDay"
               @focus="expanded = true"
               @blur="expanded = false; day = day.padStart(2, 0)"
               placeholder="__">
        <span class="app-input__divider">.</span>
        <input class="app-input__input app-input--month"
               v-model="month"
               type="number"
               ref="month"
               @focus="expanded = true"
               @input="updateMonth"
               @blur="expanded = false; month = month.padStart(2, 0)"
               placeholder="__">
        <span class="app-input__divider">.</span>
        <input class="app-input__input app-input--year"
               v-model="year"
               @focus="expanded = true"
               type="number"
               ref="year"
               @blur="expanded = false; year = year.padStart(4, 0)"
               placeholder="____">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-input-date { border-radius: 5px; box-sizing: border-box; padding: 10px; transition: background-color .25s, color .25s; justify-content: space-between; align-items: center; width: 100%; display: flex; }
  .app-input--expanded { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }
  .app-input__label { flex-grow: 1; }

  .app-input { white-space: nowrap; border-radius: 5px; }
  .app-input__input { border: none; padding: 0; text-align: center; -moz-appearance: textfield; }
  .app-input--day, .app-input--month { width: 1.5em; }
  .app-input--year { width: 2.5em; }
</style>

<script>
  export default {
    // Add default prop value
    props: {
      value: {
        type: [Number, String],
        default: '',
      },
      label: {
        type: String,
      },
    },
    data: function() {
      return {
        day: `${this.value ? new Date(this.value).getDate() : ''}`,
        month: `${this.value ? new Date(this.value).getMonth() + 1 : ''}`,
        year: `${this.value ? new Date(this.value).getFullYear(): ''}`,
        expanded: null,
      }
    },
    watch: {
      year(current, prev) {
        if (current > 9999) this.year = prev;
      },
    },
    methods: {
      click() {
        this.expanded = true;
      },
      updateValue() {
        const timestamp = `${this.year.padStart(4, 0)}-${this.month}-${this.day}`;
        // const timestamp = Date.parse(`${this.year.padStart(4, 0)}-${this.month}-${this.day}`);
        if (Number.isNaN(timestamp)) return;
        this.$emit('input', timestamp);
      },
      dayFocus() {
        this.$refs.day.select();
      },
      updateDay() {
        if (!this.day.length || parseInt(this.day, 10) < 4) return;
        this.$refs.month.select();
      },
      updateMonth() {
        if (!this.month.length || parseInt(this.month, 10) < 2) return;
        this.$refs.year.select();
      },
    },
  }
</script>
