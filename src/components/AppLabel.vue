<template>
  <div>
    <div :class="['app-input', {'app-input_is-expanded': isExpanded}]">
      <div class="app-input__label" @click="click">
        {{label}}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .app-input__input { transition: all .5s; opacity: 0; display: block; border: none; width: 100%; height: 0; line-height: 0; padding: 0; }
  .app-input__label { transition: all .5s; transform-origin: top left; }
  .app-input_is-expanded .app-input__input { opacity: 1; height: 1em; line-height: 1; }
  .app-input_is-expanded .app-input__label { transform: scale(.7); }
</style>

<script>
  export default {
    props: [ "value", "label", ],
    data: function() {
      return {
        isExpanded: null,
      }
    },
    watch: {
      value: {
        handler() {
          if (this.value) this.isExpanded = true
        },
        immediate: true,
      },
    },
    methods: {
      click() {
        this.isExpanded = true;
        this.$refs.input.focus()
      },
      blur() {
        if (!this.value) this.isExpanded = null
      },
    },
  }
</script>
