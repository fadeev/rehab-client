<template>
  <div>
    <div :class="['app-input-inline', {'app-input-inline--large': large}]">
      <textarea :placeholder="label" ref="textarea" class="text input" rows="1" :value="value" @input="valueUpdate"></textarea>
    </div>
  </div>
</template>

<style scoped>
  .app-input-inline.app-input-inline--large .input { font-size: 1.5em; font-weight: 600; }
  .app-input-inline .input { resize: none; line-height: 1em; width: 100%; padding: 10px; box-sizing: border-box; font-size: 1em; border: none; border-radius: 5px; font-family: 'Roboto'; transition: background-color .25s, color .25s; }
  .app-input-inline .input:focus { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }
  /* .app-input-inline  { padding: 0; }
  .app-input-inline.app-input-inline--large .input { font-size: 1.5em; font-weight: 600; }
  .app-input-inline .input { font-size: 1em; display: block; resize: none; position: relative; background: none; border: none; border-radius: 5px;  padding: 10px 10px; font-family: 'Roboto'; transition: background-color .25s, color .25s; box-sizing: border-box; line-height: 1em; width: 100%; resize: none; }
  .app-input-inline .input::placeholder { color: black; opacity: 1; }
  .app-input-inline .input:focus { background: rgb(255, 253, 112); color: rgb(43, 32, 0); } */
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
        default: 'Текст',
      },
    },
    mounted() {
      this.textareaGrow();
      setTimeout(() => {
        this.textareaGrow();
      }, 100)
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
        this.$refs.textarea.rows = 1;
        const innerHeight = this.$refs.textarea.scrollHeight - paddingTop - paddingBottom;
        this.$refs.textarea.rows = innerHeight / lineHeight;
      },
    },
  }
</script>
