<template>
  <div>
    <div class="patient-search">
      <input @click="$router.push('/')" placeholder="Поиск пациента по имени" class="patient-search__input" type="text" v-model="patientSearch">
    </div>
  </div>
</template>

<style scoped>
  .patient-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .patient-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }
</style>

<script>
  export default {
    data: function() {
      return {
        patientSearch: this.$store.state.patientSearch,
      }
    },
    watch: {
      patientSearch() {
        this.$store.dispatch("patientSearchUpdate", this.patientSearch)
      },
    },
  }
</script>