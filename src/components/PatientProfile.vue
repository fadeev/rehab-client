<template>
  <div>
    <div v-if="patient" class="patient-profile">
      <router-view></router-view>
      <AppInputInline label="ФИО" large style="margin: 0 10px 20px;" v-model="patient['ФИО']"></AppInputInline>
      <AppTabGroup>
        <AppIcon slot="tab" icon="profile"></AppIcon>
        <AppIcon slot="tab" icon="document"></AppIcon>
        <AppIcon slot="tab" icon="map"></AppIcon>
        <AppIcon slot="tab" icon="doctor"></AppIcon>
        <div slot="item" style="margin: 0 10px">
          <app-input-date label="Год рождения" v-model="patient['ДатаРождения']"/>
          <app-input label="Телефон" placeholder="+7 123 4567890" v-model="patient['Телефон']"/>
          <app-input-select label="Пол"
                            key-field="value"
                            value-field="value"
                            placeholder="Выбрать"
                            v-model="patient['Пол']"
                            :options="[{value: 'Мужской'}, {value: 'Женский'}]"/>
        </div>
        <div slot="item">
          <app-input style="margin: 0 10px" label="Паспорт" placeholder="Номер" v-model="patient['Паспорт']"/>
        </div>
        <div slot="item">
          <app-input style="margin: 0 10px" label="Адрес" v-model="patient['АдресПроп']"/>
          <app-input style="margin: 0 10px" label="Квартира" v-model="patient['Квартира']"/>
        </div>
      </AppTabGroup>
      <SubmitButton @click="submit" :visible="patientModified"></SubmitButton>
      <div class="patient-profile__h2">
        <div>
          Обследования
        </div>
        <div @click="observationAdd">
          <AppIcon class="patient-profile__h2__icon" icon='plus'></AppIcon>
        </div>
      </div>
      <div class="app-list__item" v-for="observation in observationList" :key="observation['__PrimaryKey']">
        <router-link tag="div" :to="`/patient/${patient['__PrimaryKey']}/observation/${observation['__PrimaryKey']}`">
          № {{observation['Номер']}} от {{observation['Дата'].substring(0,10)}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .patient-profile__h2 { display: flex; justify-content: space-between; align-items: center; margin: 30px 20px 15px; font-weight: 600; }
  .patient-profile__h2__icon { transition: all .25s; fill: white; background: linear-gradient(45deg, rgb(52, 150, 255), rgb(0, 27, 182)); padding: 5px 4px 4px 5px; border-radius: 1000px; }
  .patient-profile__h2__icon:active { transform: scale(.9); }
</style>


<script>
  import AppTabGroup from "./AppTabGroup.vue"
  import AppIcon from "./AppIcon.vue"
  import AppInputInline from "./AppInputInline.vue"
  import AppInput from "./AppInput.vue";
  import AppInputDate from "./AppInputDate.vue"
  import SubmitButton from "./SubmitButton.vue"
  import TransitionPage from "./TransitionPage.vue"
  import AppInputSelect from "./AppInputSelect.vue";

  export default {
    components: {
      AppTabGroup,
      AppIcon,
      AppInputInline,
      SubmitButton,
      TransitionPage,
      AppInput,
      AppInputSelect,
      AppInputDate,
    },
    data: function() {
      return {
        patient: {},
        observationList: null,
        patientModified: null,
        new: null,
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
    async created() {
      this.patientGet()
      this.patientObservationListGet()
    },
    methods: {
      patientGet() {
        this.$store.dispatch("patientGet", this.$route.params.patient_id)
          .then(({data}) => {
            this.patient = Object.assign({}, data)
          }, () => {
            this.new = true
          })
      },
      patientObservationListGet() {
        this.$store.dispatch("patientObservationListGet", this.$route.params.patient_id).then(({data}) => {
          this.observationList = Object.assign({}, data.value)
        }).catch(error => {
        })
      },
      submit() {
        this.$store.dispatch((this.new ? "patientCreate" : 'patientUpdate'), this.patient).then(data => {
          if (this.new) {
            this.$router.push(`/patient/${data['__PrimaryKey']}`)
          } else {
            this.patientGet()
          }
        })
      },
      observationAdd() {
        this.$store.dispatch("observationAdd", this.patient.primaryKey).then((data) => {
          this.patientObservationListGet()
          this.$router.push(`/patient/${this.patient['__PrimaryKey']}/observation/${data['__PrimaryKey']}`)
        })
      },
    },
  }
</script>
