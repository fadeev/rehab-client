<template>
  <div>
    <div v-if="patient" class="patient-profile">
      <router-view></router-view>
      <AppInputInline large style="margin-bottom: 20px;" v-model="patient['ФИО']"></AppInputInline>
      <AppTabGroup>
        <AppIcon slot="tab" icon="profile"></AppIcon>
        <AppIcon slot="tab" icon="document"></AppIcon>
        <AppIcon slot="tab" icon="map"></AppIcon>
        <AppIcon slot="tab" icon="doctor"></AppIcon>
        <div slot="item" style="margin: 0 20px">
          <PatientInputDate style="margin: 10px 0;" label="Год рождения" v-model="patient['ДатаРождения']"></PatientInputDate>
          <PatientInputGender style="margin: 10px 0;" label="Пол" v-model="patient['Пол']"></PatientInputGender>
          <PatientInputPhone style="margin: 10px 0;" label="Телефон" v-model="patient['Телефон']"></PatientInputPhone>
        </div>
      </AppTabGroup>
      <PatientButton @click="submit" :visible="patientModified"></PatientButton>
      <div class="patient-profile__h2">
        <div>
          Обследования
        </div>
        <div @click="observationAdd">
          <AppIcon class="patient-profile__h2__icon" icon='plus'></AppIcon>
        </div>
      </div>
      <div class="app-list__item" v-for="observation in observationList" :key="observation.primaryKey">
        <router-link tag="div" :to="`/patient/${patient.primaryKey}/observation/${observation.primaryKey}`">
          № {{observation['Номер']}} от {{observation['Дата'].substring(0,10)}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-profile__h2 { display: flex; justify-content: space-between; align-items: center; margin: 30px 20px 15px; font-weight: 600; }
  .patient-profile__h2__icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 3px 3px 5px; border-radius: 1000px; }
  .patient-profile__h2__icon:active { transform: scale(.9); }
</style>


<script>
  import AppTabGroup from "./AppTabGroup.vue"
  import AppIcon from "./AppIcon.vue"
  import AppInputInline from "./AppInputInline.vue"
  import PatientInputDate from "./PatientInputDate.vue"
  import PatientInputGender from "./PatientInputGender.vue"
  import PatientInputPhone from "./PatientInputPhone.vue"
  import PatientButton from "./PatientButton.vue"
  import TransitionPage from "./TransitionPage.vue"

  export default {
    components: {
      AppTabGroup,
      AppIcon,
      PatientInputDate,
      PatientInputGender,
      AppInputInline,
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
        handler(newValue, oldValue) {
          if (oldValue) this.patientModified = true
          if (oldValue != newValue) this.patientModified = false
        },
        deep: true,
      },
    },
    async mounted() {
      this.patientGet()
      this.patientObservationListGet()
    },
    methods: {
      patientGet() {
        this.$store.dispatch("patientGet", this.$route.params.patient_id).then(data => {
          this.patient = Object.assign({}, data)
        })
      },
      patientObservationListGet() {
        this.$store.dispatch("patientObservationListGet", this.$route.params.patient_id).then(data => {
          this.observationList = Object.assign({}, data)
        })
      },
      submit() {
        this.$store.dispatch("patientUpdate", this.patient).then(() => {
          this.patientGet()
        })
      },
      observationAdd() {
        this.$store.dispatch("observationAdd", this.patient.primaryKey).then((data) => {
          this.patientObservationListGet()
          this.$router.push(`/patient/${this.patient.primaryKey}/observation/${data.primaryKey}`)
        })
      },
    },
  }
</script>
