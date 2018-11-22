<template>
  <div>
    <div class="specialist-list">
      <router-link class="app-list__item" tag="div" :to="`/specialist/${specialist['__PrimaryKey']}`" v-for="specialist in specialistListFiltered" :key="specialist['__PrimaryKey']">
        {{specialist['ФИО'] || 'n/a'}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from "../store.js"

  export default {
    props: {
      search: {
        type: String,
      },
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch("specialistListGet")
      next()
    },
    computed: {
      ...mapState([
        'specialistList',
      ]),
      specialistListFiltered() {
        return this.specialistList.filter((specialist) => {
          return (specialist['ФИО'] || '').toLowerCase().indexOf((this.search || '').toLowerCase()) != -1
        })
      },
      specialistListFilteredShown() {
        return (this.specialistShowAll ? this.specialistListFiltered : this.specialistListFiltered.slice(1,100))
      },
    }
  }
</script>
