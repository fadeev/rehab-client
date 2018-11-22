<template>
  <div>
    <div class="patient-list">
      <div class="app-list__item patient-list__item"
           v-for="patient in patientListFilteredShown"
           :key="patient.primaryKey"
           @click="click(patient)">
        <transition name="width">
          <div  v-if="selectMode">
            <app-icon v-if="selected(patient)" icon="checkbox-28-svg" :size="14" class="patient-list__item__icon"/>
            <app-icon v-else icon="circle-2-svg" :size="14" class="patient-list__item__icon"/>
          </div>
        </transition>
        <div>
          {{patient["ФИО"]}}
          <div style="font-size: .75em; color: #aaa;">{{patient["ДатаРождения"].substring(0,4)}}</div>
        </div>
      </div>
      <div class="patient-list__show-more" v-if="!patientShowAll && patientListFiltered.length > 0" @click="patientShowAll = true">
        Показать всех пациентов
      </div>
      <div class="patient-list__not-found" v-if="patientListFilteredShown.length <= 0 && search">
        <AppIcon :size='150' class="patient-list__not-found__icon" icon="user-circle-thin-svg"></AppIcon>
        <div class="patient-list__not-found__text">
          Пациент с именем
          <br>
          «{{search}}» не найден.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-list { width: 100%; }
  .patient-list__item { display: flex; }
  .patient-list__item__icon { margin-right: 10px; border-radius: 100%; width: 25px; height: 25px; }
  .patient-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .patient-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }

  .app-list__item:active .patient-list__item__icon { fill: white; }

  .patient-list__show-more { transition: transform .25s; margin: 10px; padding: 15px 10px; text-align: center; background: rgba(0,0,0,.2); border-radius: 4px; }
  .patient-list__show-more:active { transform: scale(.8); }

  .patient-list__not-found { display: flex; flex-direction: column; width: 100%; align-items: center; margin: 50px 0; }
  .patient-list__not-found__icon { fill: black; width: 100px; height: 100px; }
  .patient-list__not-found__text { margin: 20px 20px; text-align: center; }

  .width-enter-active, .width-leave-active { transition: all .5s; }
  .width-enter, .width-leave-to { width: 0; opacity: 0; }
  .width-enter-to, .width-leave { width: 25px; opacity: 1; }
</style>

<script>
  import { mapState } from 'vuex'
  import { union, includes, filter } from 'lodash'
  import store from "../store.js"
  import AppIcon from "./AppIcon.vue"

  export default {
    props: {
      search: {
        type: String,
      },
      selectMode: {
        type: Boolean,
      },
    },
    components: {
      AppIcon,
    },
    data: function() {
      return {
        patientShowAll: null,
        selectedList: null,
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
          return patient['ФИО'].toLowerCase().indexOf((this.search || '').toLowerCase()) != -1
        })
      },
      patientListFilteredShown() {
        return (this.patientShowAll ? this.patientListFiltered : this.patientListFiltered.slice(1,100))
      },
      ...mapState([
        'patientList',
      ])
    },
    methods: {
      click(patient) {
        if (this.selectMode) {
          this.selectedList = this.selectedList || []
          if (includes(this.selectedList, patient['__PrimaryKey'])) {
            this.selectedList = filter(this.selectedList, o => o != patient['__PrimaryKey'])
          } else {
            this.selectedList = union(this.selectedList, [patient['__PrimaryKey']])
          }
          return
        }
        this.$router.push(`/patient/${patient['__PrimaryKey']}`)
      },
      selected(patient) {
        return includes(this.selectedList, patient['__PrimaryKey'])
      },
    },
  }
</script>
