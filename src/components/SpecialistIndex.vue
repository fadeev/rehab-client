<template>
  <div>
    <div class="specialist-index">
      <SpecialistSearch></SpecialistSearch>
      <TransitionPage>
        <router-view></router-view>
      </TransitionPage>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from "../store.js"
  import SpecialistSearch from "./SpecialistSearch.vue"
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: {
      SpecialistSearch,
      TransitionPage,
    },
  }
</script>
