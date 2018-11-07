<template>
  <div>
    <div class="app-header">
      <router-link :to="`/`" tag="div">
        <app-icon class="app-header__button" icon="home-thin-svg"></app-icon>
      </router-link>
      <app-icon class="app-header__button" icon="angel-down-circle-thin-svg"></app-icon>
    </div>
  </div>
</template>

<style scoped>
  .app-header { margin: 20px 20px 10px; display: flex; justify-content: space-between; align-items: center; }
  .app-header__button { fill: rgba(0,0,0,.5); }
</style>

<script>
  import AppIcon from "./AppIcon.vue"

  export default {
    components: {
      AppIcon,
    },
  }
</script>
