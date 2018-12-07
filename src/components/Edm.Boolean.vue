<template>
  <div>
    <div class="base-input" @click="$emit('input', !value)">
      <div class="base-input__label">
        <div class="base-input__label__text">
          <!-- <transition name="appear">
            <div v-if="value">{{label}} &nbsp;</div>
          </transition> -->
        </div>
      </div>
      <div class="base-input__input">
        <div>{{label.replace(/([а-я](?=[А-Я]))/g, '$1 ')}}</div>
        <app-icon v-if="value" class="base-input__input__checkbox" :size="25" style="fill: rgba(0,0,0,1);" icon="checkbox-9-svg"/>
        <app-icon v-else class="base-input__input__checkbox" :size="25" style="fill: rgba(0,0,0,.15);" icon="checkbox-11-svg"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .base-input { overflow-x: hidden; position: relative; }
  .base-input__label { color: rgba(0,0,0,.35); font-size: .65em; position: relative; overflow: hidden; }
  .base-input__label__text { background: white; display: inline-block; }
  .base-input__label:after { content: ''; top: 45%; position: absolute; background: rgba(0,0,0,.15); height: 1px; width: 100%; }
  .base-input__input { display: flex; align-content: center; background: transparent; padding: .35em 0 .5em; margin: 0; border: none; justify-content: space-between; }
  .base-input__input__checkbox { background: white; box-shadow: 0 0 0 5px white; flex-shrink: 0; }
  /* .base-input__input { position: relative; display: flex; align-content: center; background: transparent; padding: .35em 0 .5em; margin: 0; border: none; width: 100%; }
  .base-input__input__checkbox { position: absolute; right: 0; top: 0; background: white; box-shadow: 0 0 0 5px white; } */

  .appear-enter-active { transition: all 5s; }
  .appear-enter { color: black; }
  .appear-enter-to { color: rgba(0,0,0,.35); }
</style>

<script>
  export default {
    props: ['value', 'label'],
  }
</script>
