<template>
  <div>
    <div class="patient-search">
      <router-link :to="`/`">
        <app-icon icon="home-thin-svg"></app-icon>
      </router-link>
      <input @click="$router.push('/patient')"
             placeholder="Поиск пациента"
             class="patient-search__input"
             type="text"
             @input="search($event.target.value)"
             :value="patientSearch">
      <app-icon icon="angel-down-circle-thin-svg"></app-icon>
    </div>
  </div>
</template>

<style scoped>
  .patient-search { display: flex; align-items: center; padding: 10px; margin: 10px; position: relative; border-radius: 3px; border: 1px solid rgba(0,0,0,0); }
  .patient-search__input { margin: 0 15px; box-sizing: border-box; width: 100%; border: none; text-align: center; padding: 10px 0; border-radius: 5px; }
  .patient-search__input:focus { background: rgb(255, 253, 112); }
</style>

<script>
  import AppIcon from "./AppIcon.vue"

  export default {
    components: {
      AppIcon,
    },
    computed: {
      patientSearch() {
        return this.$store.state.patientSearch
      },
    },
    methods: {
      search(x) {
        this.$store.dispatch("patientSearchUpdate", x)
      }
    }
  }
</script>