<template>
  <div>
    <div :class="['app-input-inline', {'app-input-inline--large': large}]">
      <textarea :placeholder="label" ref="textarea" class="text input" rows="2" :value="value" @input="valueUpdate"></textarea>
    </div>
  </div>
</template>

<style scoped>
  .app-input-inline  { margin: 0 10px; padding: 0 0; }
  .app-input-inline.app-input-inline--large .input { font-size: 1.5em; font-weight: 600; }
  .app-input-inline .input { font-size: 1em; background: none; border: none; border-radius: 5px;  padding: 10px 10px; font-family: 'Roboto'; transition: background-color .25s, color .25s; box-sizing: border-box; line-height: 1em; width: 100%; resize: none; }
  .app-input-inline .input::placeholder { color: black; opacity: 1; }
  .app-input-inline .input:focus { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }
</style>

<script>
  export default {
    props: {
      value: {
        type: String,
      },
      large: {
        type: Boolean,
      },
      label: {
        type: String,
      },
    },
    mounted() {
      this.textareaGrow();
    },
    computed: {
      textareaStyle() {
        return getComputedStyle(this.$refs.textarea);
      },
    },
    methods: {
      valueUpdate(e) {
        this.textareaGrow();
        this.$emit('input', e.target.value);
      },
      textareaGrow() {
        const paddingTop = parseInt(this.textareaStyle.getPropertyValue(`padding-top`), 10);
        const paddingBottom = parseInt(this.textareaStyle.getPropertyValue(`padding-bottom`), 10);
        const lineHeight = parseInt(this.textareaStyle.getPropertyValue(`line-height`), 10);
        // Resetting the row count to `1` is necessary for
        // recalculating the `scrollHeight` of the textarea.
        this.$refs.textarea.rows = 1;
        // We're calculating the inner height of the textare
        // and take this value to also calculate the number
        // of rows needed to fit the currently entered text.
        const innerHeight = this.$refs.textarea.scrollHeight - paddingTop - paddingBottom;
        this.$refs.textarea.rows = innerHeight / lineHeight;
      },
    },
  }
</script>
