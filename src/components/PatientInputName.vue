<template>
  <div>
    <div class="patient-input-name">
      <textarea ref="textarea" class="text input" rows="2" :value="value" @input="valueUpdate"></textarea>
    </div>
  </div>
</template>

<style scoped>
  .patient-input-name  { margin: 0 10px; padding: 0 0; }
  .patient-input-name .input { background: none; border: none; border-radius: 5px;  padding: 10px 10px; font-size: 1.5em; font-weight: 600; font-family: 'Roboto'; transition: background-color .25s, color .25s; box-sizing: border-box; line-height: 1em; width: 100%; resize: none; }
  .patient-input-name .input:focus { background: rgb(255, 217, 109); color: rgb(43, 32, 0); }
</style>

<script>
  export default {
    props: [ 'value', ],
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
