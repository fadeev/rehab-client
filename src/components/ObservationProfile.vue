<template>
  <div>
    <div v-if="observation && patient">
      <router-link tag="div" :to="'/'" class="app-topbar">
        Вернуться в список пациентов
      </router-link>
      <div class="observation-profile__h1">
        <router-link tag="div" :to="`/patient/${patient.primaryKey}`">
          {{patient['ФИО']}}
        </router-link>
      </div>
      <div class="observation-profile__h2">
        Обследование
      </div>
      <div class="app-form">
        <AppInput class="app-form__item" label="Дата" v-model="observation['Дата']"></AppInput>
        <AppInput class="app-form__item" label="Комментарий" v-model="observation['Комментарий']"></AppInput>
      </div>
      <div class="observation-profile__h2">
        Показатели
      </div>
      <div style="margin: 0 10px">
        <div class="patient-profile__button" @click="indicatorAdd">
          Новый показатель
        </div>
      </div>
      <div class="app-form">
        <div class="app-form__item" v-for="indicator in indicatorList" :key="indicator.primaryKey">
          <div>{{indicator["Наименование"]}}</div>
          <div>{{indicator["Описание"]}}</div>
        </div>
      </div>
    </div>
    <div :class="['sheet', {'sheet_not-visible': !sheet}]">
      <div style="position: relative; padding: 10px;">
        <input ref="attribute-search" class="sheet__input" v-model="search" type="text" placeholder="Поиск показателя">
      </div>
      <div class="app-list" v-if="!indicatorCurrent">
        <div class="app-list__item" @click="indicatorCurrentSet(indicator)" v-if="isMatched(indicator)" v-for="indicator in indicatorAllList" :key="indicator.primaryKey">
          {{indicator["Наименование"]}}
        </div>
      </div>
      <div class="app-list" v-if="indicatorCurrent">
        <div @click="attributeAdd(attribute)" style="display: flex; justify-content: space-between; align-items: center;" class="app-list__item" v-if="attribute['ИнтегральныйПоказатель'] == indicatorCurrent.primaryKey" v-for="attribute in attributeList" :key="attribute.primaryKey">
          <div>
            {{attribute["Описание"]}}
          </div>
          <div>
            <input @click.stop="" size="1" type="text" :value="attribute['Значение']">
          </div>
        </div>
        <!-- Добавление новой характеристики -->
        <!-- <div class="app-list__item">
          <div style="display: flex; justify-content: space-between">
            <div>
              <input type="text">
            </div>
            <div>
              <input size="1" type="text">
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  .observation-profile__h1 { margin: 20px; font-size: 1.25em;}
  .observation-profile__h2 { margin: 20px; font-weight: 600; }
  .patient-profile__button { color: rgba(0,122,255,1); border-radius: 3px; margin: 10px; padding: .5em 1em; text-align: center; border: 1px solid rgba(0,122,255,1); }
  .patient-profile__button:active { opacity: .75; }
  .sheet { overflow-y: scroll; transition: all .5s; position: fixed; bottom: 0; top: 100px; width: 100%; background: white; }
  .sheet_not-visible { transform: translateY(100vh); }
  .sheet__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.15); }
</style>


<script>
  import AppInput from "./AppInput.vue"
  import AppButton from "./AppButton.vue"
  import { filter } from "lodash"

  export default {
    components: { AppInput, AppButton, },
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
    mounted() {
      this.$store.dispatch("observationGet", this.$route.params.observation_id).then(data => {
        this.observation = data
      })
      this.$store.dispatch("patientGet", this.$route.params.patient_id).then(data => {
        this.patient = data
      })
      this.$store.dispatch("indicatorListGet", this.$route.params.observation_id).then(data => {
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
        this.$refs['attribute-search'].focus()
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
    },
  }
</script>
