<template>
  <div>
    <div class="job-list">
      <router-link tag="div"
                   :to="`/job/${job['primaryKey']}`"
                   class="app-list__item"
                   v-for="job in jobListFiltered"
                   :key="job['primaryKeyFiltered']">
        {{job['Наименование']}}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
  import store from "../store.js"
  import filter from "lodash"

  const filterSearch = function(list, key, search) {
    return (list || []).filter((object) => {
      if (object[key].toLowerCase().indexOf((search || '').toLowerCase()) != -1)
        return object
    })
  }

  export default {
    props: {
      search: {
        type: String,
      },
    },
    data: function() {
      return {
        jobList: null,
      }
    },
    computed: {
      jobListFiltered() {
        return filterSearch(this.jobList, 'Наименование', this.search)
      },
    },
    created() {
      this.$store.dispatch('jobListGet').then(data => {
        this.jobList = [...data]
      })
    }
  }
</script>
