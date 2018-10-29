<template>
  <div>
    <div :class="['app-layout', {content: hasContent, 'is-home': isHome}]">
      <div class="app-sidebar">
        <PatientList></PatientList>
      </div>
      <div class="app-content">
        <router-view :key="$route.name + ($route.params.patient_id || '')"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-layout { position: relative; overflow-x: hidden; }
  .app-sidebar { width: 30vw; }
  .app-content { background: white; position: absolute; width: 70%; right: 0; top: 0; }

  @media (max-width: 500px) {
    .app-layout { }
    .app-sidebar { width: 100vw; }
    .app-content { width: 100vw; }
    .app-layout.content { }
    .app-layout.content .app-sidebar { visibility: hidden; }
    .app-layout.content .app-content { }
  }

  /* .slide-enter-active { transition: all 1s; }
  .slide-enter-from { left: 100vw; }
  .slide-enter-to { left: 0; } */

  /* .app-layout { transition: left 1s; left: 0; position: absolute; display: flex; overflow-x: hidden; box-sizing: border-box; }
  .app-sidebar { width: 30vw; flex-shrink: 0; }
  .app-content { width: 70; flex-shrink: 0; }

  @media (max-width: 500px) {
    .app-layout { }
    .app-sidebar { width: 100vw; }
    .app-content { width: 100vw; }
    .app-layout.content { left: -100vw; }
    .app-layout.content .app-sidebar { }
    .app-layout.content .app-content { }
  } */

  /* .app-layout { display: flex; position: relative; }
  .app-sidebar { transition: left .5s; width: 30%; }
  .app-content { transition: left .5s; background: white; position: absolute; left: 30%; width: 70%; }

  @media (max-width: 500px) {
    .app-sidebar { width: 100vw; }
    .app-layout.content .app-sidebar { left: -30%; opacity: 0; }
    .app-layout.content .app-content { left: 0; width: 100%; }
  } */
</style>

<script>
  import PatientList from "./PatientList.vue"

  export default {
    components: { PatientList, },
    computed: {
      hasContent() {
        return (this.$route.params.patient_id || this.$route.params.observation_id)
      },
      isHome() {
        return this.$route.path === "/"
      },
    },
  }
</script>
