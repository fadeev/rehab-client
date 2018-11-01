<template>
  <div>
    <transition-page>
      <router-view></router-view>
    </transition-page>
  </div>
</template>

<script>
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: { TransitionPage, },
  }
</script>
