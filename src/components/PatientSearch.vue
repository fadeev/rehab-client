<template>
  <div>
    <!-- <app-header></app-header> -->
    <PatientSearchInput ref="search"></PatientSearchInput>
    <TransitionPage>
      <router-view></router-view>
    </TransitionPage>
  </div>
</template>

<script>
  import PatientSearchInput from "./PatientSearchInput.vue"
  import TransitionPage from "./TransitionPage.vue"
  import AppHeader from "./AppHeader.vue"

  export default {
    components: {
      PatientSearchInput,
      TransitionPage,
      AppHeader,
    },
  }
</script>
