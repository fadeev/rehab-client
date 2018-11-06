<template>
  <div>
    <PatientSearchInput></PatientSearchInput>
    <TransitionPage>
      <router-view></router-view>
    </TransitionPage>
  </div>
</template>

<script>
  import PatientSearchInput from "./PatientSearchInput.vue"
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: {
      PatientSearchInput,
      TransitionPage,
    },
  }
</script>
