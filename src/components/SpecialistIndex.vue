<template>
  <div>
    <div class="specialist-index">
      <!-- <app-header></app-header> -->
      <SpecialistSearch></SpecialistSearch>
      <TransitionPage>
        <router-view></router-view>
      </TransitionPage>
    </div>
  </div>
</template>

<style scoped>
  .icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 3px 3px 5px; border-radius: 1000px; }
  .icon:active { transform: scale(.9); }
</style>


<script>
  import { mapState } from 'vuex'
  import store from "../store.js"
  import SpecialistSearch from "./SpecialistSearch.vue"
  import TransitionPage from "./TransitionPage.vue"
  import AppHeader from "./AppHeader.vue"

  export default {
    components: {
      SpecialistSearch,
      TransitionPage,
      AppHeader,
    },
  }
</script>
