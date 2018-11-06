<template>
  <div>
    <div class="observation-profile" v-if="observation && patient">
      <div class="observation-profile__h1">
        <router-link style="color: rgba(0,122,255,1);" tag="div" :to="`/patient/${patient.primaryKey}`">
          {{patient['ФИО']}}
        </router-link>
      </div>
      <div class="observation-profile__h2">
        Обследование
      </div>
      <div style="margin: 0 20px">
        <PatientInputDate style="margin: 10px 0;" label="Дата" v-model="patient['ДатаРождения']"></PatientInputDate>
        <AppInputText style="margin: 10px 0;" label="Комментарий" v-model="patient['Комментарий']"></AppInputText>
      </div>
      <div class="patient-profile__h2">
        <div>
          Показатели
        </div>
        <!-- <div @click="indicatorAdd">
          <AppIcon class="patient-profile__h2__icon" icon='plus'></AppIcon>
        </div> -->
      </div>
      <div class="app-form">
        <div class="app-form__item" v-for="indicator in indicatorAttributeList" :key="indicator.primaryKey">
          <div>{{indicator["Наименование"]}}</div>
          <div v-for="attribute in indicator['Характеристики']" :key="attribute['primaryKey']">
            {{attribute['Описание']}}
          </div>
        </div>
      </div>
    </div>
    <!-- <div :class="['sheet', {'sheet_not-visible': !sheet}]">
      <div style="position: relative; padding: 10px;">
        <div style="display: flex; align-items: center;">
          <input ref="attribute-search" class="sheet__input" v-model="search" type="text" placeholder="Поиск показателя">
          <div @click="sheetClose" style="width: 20px; padding: 0 10px;">✕</div>
        </div>
      </div>
      <div class="app-list" v-if="!indicatorCurrent">
        <div class="app-list__item" @click="indicatorCurrentSet(indicator)" v-if="isMatched(indicator)" v-for="indicator in indicatorAllList" :key="indicator.primaryKey">
          {{indicator["Наименование"]}}
        </div>
      </div>
      <div class="app-list attribute" v-if="indicatorCurrent">
        <div class="app-list__item" v-if="attribute['ИнтегральныйПоказатель'] == indicatorCurrent.primaryKey" v-for="attribute in attributeList" :key="attribute.primaryKey">
          {{attribute['Описание']}} {{attribute['Значение']}}
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
  .observation-profile { min-height: 100vh; }
  .observation-profile__h1 { line-height: 1em; padding-top: 20px; margin: 0 20px 20px 20px; font-size: 1.5em; font-weight: 600; }
  .observation-profile__h2 { margin: 20px; font-weight: 600; }
  .patient-profile__button { color: rgba(0,122,255,1); border-radius: 3px; margin: 10px; padding: .5em 1em; text-align: center; border: 1px solid rgba(0,122,255,1); }
  .patient-profile__button:active { opacity: .75; }
  .sheet { background: white; overflow-y: scroll; transition: all .5s; position: absolute; left: 0; right: 0; bottom: 0; top: 0; }
  .sheet_not-visible { opacity: 0; transform: translateY(100vh); }
  .sheet__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }

  .patient-profile__h2 { display: flex; justify-content: space-between; align-items: center; margin: 30px 20px 15px; font-weight: 600; }
  .patient-profile__h2__icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 3px 3px 5px; border-radius: 1000px; }
  .patient-profile__h2__icon:active { transform: scale(.9); }
</style>


<script>
  import AppIcon from "./AppIcon.vue"
  import PatientInputDate from "./PatientInputDate.vue"
  import AppInputText from "./AppInputText.vue"
  import { filter } from "lodash"

  export default {
    components: {
      AppIcon,
      PatientInputDate,
      AppInputText,
    },
    data: function() {
      return {
        patient: null,
        observation: null,
        indicatorList: null,
        indicatorAllList: null,
        attributeList: null,
        sheet: null,
        search: null,
        indicatorCurrent: null,
      }
    },
    computed: {
      indicatorAttributeList() {
        if (this.indicatorList && this.attributeList) {
          return this.indicatorList.map((indicator) => {
            let a = this.attributeList.filter((attribute) => {
              return attribute['ИнтегральныйПоказатель'] == indicator['primaryKey']
            })
            indicator['Характеристики'] = a
            return indicator
          })
        }
      },
    },
    mounted() {
      this.$store.dispatch("observationGet", this.$route.params.observation_id).then(data => {
        this.observation = data
      })
      this.$store.dispatch("patientGet", this.$route.params.patient_id).then(data => {
        this.patient = data
      })
      this.$store.dispatch("indicatorListGet", {observation_id: this.$route.params.observation_id, specialist_id: this.$store.state.specialist}).then(data => {
        this.indicatorList = data
      })
      this.$store.dispatch("indicatorAllListGet", this.$route.params.observation_id).then(data => {
        this.indicatorAllList = data
      })
      this.$store.dispatch("attibuteListGet", this.$route.params.observation_id).then(data => {
        this.attributeList = data
      })
    },
    methods: {
      filter(list, id) {
        return filter(list, (o) => {
          return o['ИнтегральныйПоказатель'] == id
        })
      },
      indicatorAdd() {
        this.sheet = true
        // this.$refs['attribute-search'].focus()
      },
      isMatched(indicator) {
        if (!this.search) return true
        return (new RegExp(this.search.toLowerCase())).test(indicator['Наименование'].toLowerCase())
      },
      indicatorCurrentSet(indicator) {
        this.search = indicator["Наименование"]
        this.indicatorCurrent = indicator
      },
      attributeAdd(attribute) {
        this.$store.dispatch("attributeAdd", {observation: this.$route.params.observation_id, attribute: attribute.primaryKey, indicator: attribute['ИнтегральныйПоказатель']}).then(data => {
          this.sheet = null
          this.indicatorCurrent = null
          this.search = null
          this.$store.dispatch("indicatorListGet", this.$route.params.observation_id).then(data => {
            this.indicatorList = data
          })
        })
      },
      sheetClose() {
        if (!this.indicatorCurrent) {
          this.sheet = null
        }
        if (this.indicatorCurrent) {
          this.indicatorCurrent = null
          this.search = null
        }
      },
    },
  }
</script>
