<template>
  <div>
    <div :class="['app-input', {'app-input--expanded': expanded}]">
      <div style="position: relative">
        <div class="app-input__label" @click="$refs.input.focus()">
          {{label}}
        </div>
        <input :placeholder="placeholder" @focus="expanded = true" ref="input" @blur="expanded = null" class="app-input__input" type="text" :value="value" @input="valueUpdate">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-input { border-radius: 5px; padding: 10px; transition: background-color .25s, color .25s; }
  .app-input__label { overflow-x: hidden; }
  .app-input--expanded { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }
  /* .app-input__label1 { background: green; }
  .app-input__input1 { background: red; } */
  .app-input__input { transition: background-color .25s, color .25s; background: white; text-align: right; max-width: 50%; overflow-x: hidden; right: 0; width: initial; position: absolute; top: 0; padding: 0; border: none; }
  .app-input--expanded .app-input__input { background: rgb(255, 253, 112); }
</style>


<script>
  export default {
    props: {
      value: {
        type: [String, Number],
      },
      label: {
        type: String,
        default: 'Значение',
      },
      placeholder: {
        type: String,
        default: 'Текст',
      }
    },
    data: function() {
      return {
        expanded: null,
      }
    },
    methods: {
      valueUpdate(e) {
        this.$emit('input', e.target.value);
      },
    },
  }
</script>
