<template>
  <div>
    <div class="base-input">
      <div class="base-input__label">
        <div class="base-input__label__text">
          <transition name="appear">
            <div v-if="value">{{label}} &nbsp;</div>
          </transition>
        </div>
      </div>
      <input :placeholder="label" class="base-input__input" type="text" :value="value" @input="$emit('input', $event.target.value)">
    </div>
  </div>
</template>

<style scoped>
  .base-input__label { color: rgba(0,0,0,.35); font-size: .65em; position: relative; overflow: hidden; }
  .base-input__label__text { display: inline-block; }
  .base-input__label:after { content: ''; top: 45%; position: absolute; background: rgba(0,0,0,.15); height: 1px; width: 100%; }
  .base-input__input { background: transparent; padding: .35em 0 .5em; margin: 0; border: none; width: 100%; }

  .appear-enter-active { transition: all 5s; }
  .appear-enter { color: black; }
  .appear-enter-to { color: rgba(0,0,0,.35); }
</style>

<script>
  export default {
    props: ['value', 'label'],
  }
</script>
