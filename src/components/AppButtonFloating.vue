<template>
  <div>
    <div class="app-button-floating">
      <div :class="['app-button-floating__button', {expanded}]" @click="expanded = !expanded">
        <app-icon :size="48" :class="['app-button-floating__button__icon']" icon="plus"></app-icon>
      </div>
    </div>
    <!-- <div class="app-button-floating__menu">
      Menu
    </div> -->
  </div>
</template>

<style scoped>
  .app-button-floating { position: fixed; bottom: 20px; right: 20px; }
  .app-button-floating__button { transition: all .25s; display: flex; justify-content: center; align-items: center; fill: white; background: #333 linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 4px; border-radius: 1000px; }
  .expanded { transform: rotate(45deg); background: black; }
  .app-button-floating__button__icon { transition: transform .25s; }
  .app-button-floating__menu { background: rgba(255,255,255,.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0; }
</style>

<script>
  import AppIcon from "./AppIcon.vue";

  export default {
    components: {
      AppIcon,
    },
    data: function() {
      return {
        expanded: null,
      }
    },
  }
</script>
