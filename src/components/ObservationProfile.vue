<template>
  <div>
    <div class="observation-profile" v-if="observation && patient">
      <div class="observation-profile__h1">
        <router-link style="color: rgba(0,122,255,1);" tag="div" :to="`/patient/${patient['__PrimaryKey']}`">
          {{patient['ФИО']}}
        </router-link>
      </div>
      <div class="observation-profile__h2">
        Обследование
      </div>
      <div style="margin: 0 10px">
        <app-input-date label="Дата" v-model="patient['ДатаРождения']"/>
        <app-input-inline v-model="patient['Комментарий']" label="Комментарий"/>
      </div>
      <div class="patient-profile__h2">
        <div>
          Показатели
        </div>
      </div>
      <div>
        <div v-for="indicator in indicatorAttributeListValues" :key="indicator.primaryKey" style="margin: 0 20px; border-bottom: 1px solid rgba(0,0,0,.25);">
          <app-input-select-indicator :label="indicator['Наименование']"
                                      :options="indicator['Характеристики']"
                                      key-field='Описание'
                                      v-model="indicator['ЗначениеПоказателя']"
                                      value-field='primaryKey'
                                      placeholder="Выбрать"/>
          <div v-for="attribute in indicator['Характеристики']" :key="attribute['primaryKey']">
          </div>
        </div>
      </div>
      <submit-button :visible="modified" @click="submit"/>
    </div>
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
  /* .patient-profile__h2__icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 3px 3px 5px; border-radius: 1000px; }
  .patient-profile__h2__icon:active { transform: scale(.9); } */
</style>

<script>
  import { filter, forEach, maxBy } from "lodash"
  import axios from "axios"
  import AppInputInline from "./AppInputInline.vue";
  import AppInputDate from "./AppInputDate.vue";
  import AppInputSelectIndicator from "./AppInputSelectIndicator.vue";
  import SubmitButton from "./SubmitButton.vue";

  export default {
    components: {
      AppInputSelectIndicator,
      AppInputInline,
      AppInputDate,
      SubmitButton,
    },
    data: function() {
      return {
        remote: null,
        local: null,
        patient: null,
        observation: null,
        indicatorList: null,
        attributeList: null,
        modified: true,
        evaluationList: null,
        indicatorAttributeListValues: null,
      }
    },
    watch: {
      patient: {
        handler(newValue, oldValue) {
          if (oldValue) this.modified = true
          if (oldValue != newValue) this.modified = false
        },
        deep: true,
      },
    },
    mounted() {
      Promise.all([
        this.$store.dispatch("observationGet", this.$route.params.observation_id),
        this.$store.dispatch("patientGet", this.$route.params.patient_id),
        this.$store.dispatch("indicatorListGet", {observation_id: this.$route.params.observation_id, specialist_id: this.$store.state.specialist}),
        this.$store.dispatch("attibuteListGet", this.$route.params.observation_id),
        this.$store.dispatch("evaluationGet", this.$route.params.observation_id)
      ]).then(values => {
        [
          this.observation,
          this.patient,
          this.indicatorList,
          this.attributeList
        ] = values.map(({data}) => data.data)
        this.observation = values[0].data
        this.patient = values[1].data
        this.evaluationList = values[4].data.data
        this.indicatorAttributeListValues = (() => {
          let indicatorAttributeList = this.indicatorList.map((indicator) => {
            let a = this.attributeList.filter((attribute) => {
              return attribute['ИнтегральныйПоказатель'] == indicator['primaryKey']
            })
            indicator['Характеристики'] = a
            return indicator
          })
          return indicatorAttributeList.map(indicator => {
            let evaluation = maxBy(filter(this.evaluationList, (ev) => {
              return ev['ИнтегральныйПоказатель'] == indicator['primaryKey']
            }), 'CreateTime')
            indicator['ЗначениеПоказателя'] = evaluation ? evaluation['Характеристика'] : ''
            return Object.assign({}, indicator)
          })
        })()
      })
    },
    methods: {
      submit() {
        forEach(this.indicatorAttributeListChanged, (object) => {
          let body = {
            observation_id: this.$route.params.observation_id,
            indicator_id: object['primaryKey'],
            attribute_id: object['ЗначениеПоказателя'],
          }
          console.log(body)
          axios.post(`http://localhost:3000/evaluation`, body)
        })
      },
    },
  }
</script>
