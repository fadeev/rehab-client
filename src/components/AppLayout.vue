<template>
  <div>
    <div :class="['app-layout', {content: hasContent, 'is-home': isHome}]">
      <!-- <router-view :key="$route.name + ($route.params.patient_id || '')"></router-view> -->
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
  .app-layout { transition: all 1s; position: relative; width: 100%; }
  .app-sidebar { transition: all 1s; min-height: 100%; width: 30%; }
  .app-content { min-height: 100vh; position: absolute; width: 70%; right: 0; top: 0; }

  @media (max-width: 500px) {
    .app-layout { }
    .app-sidebar { width: 100%; }
    .app-content { min-height: 0; width: 100%; transform: translateX(100vw); }
    .app-layout.content { transform: translateX(-100vw); }
    .app-layout.content .app-sidebar { }
    .app-layout.content .app-content { }
  }
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
