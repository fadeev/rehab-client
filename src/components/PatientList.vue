<template>
  <div>
    <div class="patient-list">
      <router-link class="app-list__item" v-for="patient in patientListFilteredShown" :key="patient.primaryKey" tag="div" :to="`/patient/${patient.primaryKey}`">
        {{patient["ФИО"]}}
        <div style="font-size: .75em; color: #aaa;">{{patient["ДатаРождения"].substring(0,4)}}</div>
      </router-link>
      <div class="patient-list__show-more" v-if="!patientShowAll && patientListFiltered.length > 0" @click="patientShowAll = true">
        Показать всех пациентов
      </div>
      <div class="patient-list__not-found" v-if="patientListFilteredShown.length <= 0 && patientSearch">
        <AppIcon :size='150' class="patient-list__not-found__icon" icon="user-circle-thin-svg"></AppIcon>
        <div class="patient-list__not-found__text">
          Пациент с именем
          <br>
          «{{patientSearch}}» не найден.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-list { width: 100%; }
  .patient-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .patient-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }

  .patient-list__show-more { transition: transform .25s; margin: 10px; padding: 15px 10px; text-align: center; background: rgba(0,0,0,.2); border-radius: 4px; }
  .patient-list__show-more:active { transform: scale(.8); }

  .patient-list__not-found { display: flex; flex-direction: column; width: 100%; align-items: center; margin: 50px 0; }
  .patient-list__not-found__icon { fill: black; width: 100px; height: 100px; }
  .patient-list__not-found__text { margin: 20px 20px; text-align: center; }
</style>

<script>
  import { mapState } from 'vuex'
  import store from "../store.js"
  import AppIcon from "./AppIcon.vue"
  import AppButtonFloating from "./AppButtonFloating.vue"

  export default {
    components: {
      AppIcon,
      AppButtonFloating,
    },
    data: function() {
      return {
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
  }
</script>
