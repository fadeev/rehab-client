<template>
  <div>
    <div v-if="patient" class="patient-profile">
      <router-link tag="div" :to="'/'" class="app-topbar">
        Вернуться в список пациентов
      </router-link>
      <div class="patient-profile__h1">
        {{patient["ФИО"]}}
      </div>
      <div class="app-form">
        <AppInput class="app-form__item" label="ФИО" v-model="patient['ФИО']"></AppInput>
        <div class="app-form__item">
          Пол
          <select name="" id="" v-model="patient['Пол']">
            <option value="Женский">Женский</option>
            <option value="Мужской">Мужской</option>
          </select>
        </div>
        <AppInput class="app-form__item" label="Дата рождения" v-model="patient['ДатаРождения']"></AppInput>
      </div>
      <div class="patient-profile__button" @click="submit">
        Сохранить изменения
      </div>
      <div class="red patient-profile__h2">Обследования</div>
      <div class="patient-profile__button" @click="observationAdd">
        Добавить обследование
      </div>
      <AppButton></AppButton>
      <div class="app-list__item" v-for="observation in observationList" :key="observation.primaryKey">
        <router-link tag="div" :to="`/patient/${patient.primaryKey}/observation/${observation.primaryKey}`">
          № {{observation['Номер']}} от {{observation['Дата'].substring(0,10)}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-profile__h1 { margin: 20px; font-size: 1.25em;}
  .patient-profile__h2 { margin: 20px; font-weight: 600; }
  .patient-profile__button { color: rgba(0,122,255,1); border-radius: 3px; margin: 10px; padding: .5em 1em; text-align: center; border: 1px solid rgba(0,122,255,1); }
  .patient-profile__button:active { opacity: .75; }
</style>


<script>
  import AppInput from "./AppInput.vue"
  import AppButton from "./AppButton.vue"

  export default {
    components: { AppInput, AppButton, },
    data: function() {
      return {
        patient: null,
        observationList: null,
      }
    },
    async created() {
      this.patinetGet()
      this.$store.dispatch("patientObservationListGet", this.$route.params.patient_id).then(data => {
        this.observationList = data
      })
    },
    methods: {
      patinetGet() {
        this.$store.dispatch("patientGet", this.$route.params.patient_id).then(data => {
          this.patient = data
        })
      },
      submit() {
        this.$store.dispatch("patientUpdate", this.patient).then(() => {
          this.patinetGet()
        })
      },
      observationAdd() {
        this.$store.dispatch("observationAdd", this.patient.primaryKey).then((data) => {
          this.$store.dispatch("patientObservationListGet", this.$route.params.patient_id).then(data => {
            this.observationList = data
          })
          this.$router.push(`/patient/${this.patient.primaryKey}/observation/${data.primaryKey}`)
        })
      },
    },
  }
</script>
