<template>
  <div>
    <div class="patient-list">

      <!-- <transition name="fade"> v-if="isMatched(patient)" -->
      <router-link class="app-list__item" v-for="patient in patientListFilteredShown" :key="patient.primaryKey" tag="div" :to="`/patient/${patient.primaryKey}`">
        {{patient["ФИО"]}}
        <div style="font-size: .75em; color: #aaa;">{{patient["ДатаРождения"].substring(0,4)}}</div>
      </router-link>
      <div class="app-list__item" v-if="!patientShowAll && patientListFiltered.length > 0" @click="patientShowAll = true">
        Показать всех пациентов
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<style scoped>
  .patient-list { width: 100%; }
  .patient-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .patient-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }
</style>

<script>
  import { mapState } from 'vuex'
  import store from "../store.js"

  export default {
    data: function() {
      return {
        search: null,
        patientShowAll: null,
      }
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch("patientListGet")
      next()
    },
    watch: {
      patientListFiltered() {
        this.patientShowAll = (this.patientListFiltered.length < 100)
      },
    },
    computed: {
      patientListFiltered() {
        return this.patientList.filter((patient) => {
          return patient['ФИО'].toLowerCase().indexOf((this.patientSearch || '').toLowerCase()) != -1
        })
      },
      patientListFilteredShown() {
        return (this.patientShowAll ? this.patientListFiltered : this.patientListFiltered.slice(1,100))
      },
      ...mapState([
        'patientSearch', 'patientList',
      ])
    },
    methods: {
      isMatched(patient) {
        if (!this.patientSearch) return true
        return (new RegExp(this.patientSearch.toLowerCase())).test(patient['ФИО'].toLowerCase())
      },
    },
  }
</script>
