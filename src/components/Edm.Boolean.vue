<template>
  <div>
    <div :class="['app-input-toggle']" @click="valueUpdate(!value)">
      <div class="app-input-toggle__label">
        {{label}}
      </div>
      <transition name="zoom" mode="out-in">
        <AppIcon class="app-input-toggle__button" v-if="value" icon="check-mark-circle-thin-svg" key="on"></AppIcon>
        <AppIcon class="app-input-toggle__button" v-if="!value" icon="circle-6-svg" key="off"></AppIcon>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .app-input-toggle { overflow-x: hidden; border-radius: 5px; height: inherit; box-sizing: border-box; justify-content: space-between; align-items: center; width: 100%; display: flex; padding: 10px; }
  .app-input-toggle:active { background: rgb(255, 253, 112); color: rgb(43, 32, 0); }

  .zoom-enter-active, .zoom-leave-active { transition: all .15s }
  .zoom-enter, .zoom-leave-to { transform: scale(.9); }
  .zoom-enter-to, .zoom-leave { transform: scale(1); }

  .app-input-toggle__button { transition: transform .15s; }
  .app-input-toggle__button:active { transform: scale(.9); }
</style>


<script>
  import AppIcon from "./AppIcon.vue"

  export default {
    components: {
      AppIcon,
    },
    props: [ 'value', 'label', ],
    data: function() {
      return {
        expanded: null,
      }
    },
    methods: {
      valueUpdate(e) {
        this.$emit('input', e);
      },
    },
  }
</script>