<template>
  <div>
    <div v-if="patient" class="patient-profile">
      <PatientInputName style="margin-bottom: 20px;" v-model="patient['ФИО']"></PatientInputName>
      <AppTabGroup style="margin: 0 20px">
        <AppIcon slot="tab" icon="profile"></AppIcon>
        <AppIcon slot="tab" icon="document"></AppIcon>
        <AppIcon slot="tab" icon="map"></AppIcon>
        <AppIcon slot="tab" icon="doctor"></AppIcon>
        <div slot="item">
          <PatientInputDate style="margin: 15px 0;" label="Год рождения" v-model="patient['ДатаРождения']"></PatientInputDate>
          <PatientInputGender style="margin: 15px 0;" label="Пол" v-model="patient['Пол']"></PatientInputGender>
          <PatientInputPhone style="margin: 15px 0;" label="Телефон" v-model="patient['Телефон']"></PatientInputPhone>
        </div>
      </AppTabGroup>
      <PatientButton v-if="patientModified"></PatientButton>
      <!-- <div class="red patient-profile__h2">Обследования</div>
      <div class="patient-profile__button" @click="observationAdd">
        Добавить обследование
      </div> -->
      <!-- <div class="app-list__item" v-for="observation in observationList" :key="observation.primaryKey">
        <router-link tag="div" :to="`/patient/${patient.primaryKey}/observation/${observation.primaryKey}`">
          № {{observation['Номер']}} от {{observation['Дата'].substring(0,10)}}
        </router-link>
      </div> -->
    </div>
  </div>
  <!-- <div>
    <div v-if="patient" class="patient-profile">
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
  </div> -->
</template>

<style scoped>
  .patient-profile { padding-top: 10px; }
  .patient-profile__h1 { margin-bottom: 20px; padding-top: 20px; margin: 0 20px 20px 20px; font-size: 1.25em;}
  .patient-profile__h2 { padding-top: 20px; margin: 0 20px 20px 20px; font-weight: 600; }
  .patient-profile__button { color: rgba(0,122,255,1); border-radius: 3px; margin: 10px; padding: .5em 1em; text-align: center; border: 1px solid rgba(0,122,255,1); }
  .patient-profile__button:active { opacity: .75; }
</style>


<script>
  import AppTabGroup from "./AppTabGroup.vue"
  import AppInput from "./AppInput.vue"
  import AppIcon from "./AppIcon.vue"
  import PatientInputName from "./PatientInputName.vue"
  import PatientInputDate from "./PatientInputDate.vue"
  import PatientInputGender from "./PatientInputGender.vue"
  import PatientInputPhone from "./PatientInputPhone.vue"
  import PatientButton from "./PatientButton.vue"
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: {
      AppInput,
      AppTabGroup,
      AppIcon,
      PatientInputDate,
      PatientInputGender,
      PatientInputName,
      PatientInputPhone,
      PatientButton,
      TransitionPage,
    },
    data: function() {
      return {
        patient: null,
        observationList: null,
        patientModified: null,
      }
    },
    watch: {
      patient: {
        handler(oldValue, newValue) {
          if (newValue) this.patientModified = true
        },
        deep: true,
      },
    },
    async mounted() {
      this.patientGet()
      this.$store.dispatch("patientObservationListGet", this.$route.params.patient_id).then(data => {
        this.observationList = data
      })
    },
    methods: {
      patientGet() {
        this.$store.dispatch("patientGet", this.$route.params.patient_id).then(data => {
          this.patient = Object.assign({}, data)
        })
      },
      submit() {
        this.$store.dispatch("patientUpdate", this.patient).then(() => {
          this.patientGet()
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
