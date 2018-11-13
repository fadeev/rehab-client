<template>
  <div>
    <app-header simple/>
    <div class="indicator-index">
      <transition-page>
        <router-view></router-view>
      </transition-page>
    </div>
  </div>
</template>

<script>
  import TransitionPage from "./TransitionPage.vue"
  import AppHeader from "./AppHeader.vue";

  export default {
    components: {
      TransitionPage,
      AppHeader,
    },
  }
</script>
