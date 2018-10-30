<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import PatientList from "./PatientList.vue"
  import PatientSearch from "./PatientSearch.vue"
  import PatientProfile from "./PatientProfile.vue"
  import AppPage from "./AppPage.vue"

  export default {
    components: { PatientList, PatientSearch, PatientProfile, AppPage, },
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
