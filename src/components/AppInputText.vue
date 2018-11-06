<template>
  <div>
    <div :class="['patient-input-text', {focused: focused}]">
      <div class="patient-input-text__label" @click="$refs.text.focus()">
        {{label}}
      </div>
      <div class="patient-input-text__input">
        <input @focus="focused = true" @blur="focused = false" ref="text" class="patient-input-text__input__input" type="text" :value="value" @input="$emit('input', $event.target.value)" placeholder="Текст">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .focused .patient-input-text__label { width: 0; opacity: 0; }
  .focused .patient-input-text__input { width: 100%; margin: 0; }
  .focused .patient-input-text__input__input { width: 100%; }
  .patient-input-text__label { transition: width .25s; }
  .patient-input-text__input { transition: all .5s; }
  .patient-input-text { display: flex; width: 100%; justify-content: space-between; align-items: center; }
  .patient-input-text__input { overflow: hidden; margin-left: 10px; border: 1px solid rgba(0,0,0,.25); border-radius: 4px; }
  .patient-input-text__input__input { padding: 5px 8px; border: none; width: 100%; }
</style>

<script>
  export default {
    props: {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
    },
    data: function() {
      return {
        focused: null,
      }
    },
    methods: {
      focus() {
        this.focused = true
      },
    },
  }
</script>
