<template>
  <div>
    <transition-page>
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    </transition-page>
  </div>
</template>

<script>
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: { TransitionPage, },
  }
</script>
