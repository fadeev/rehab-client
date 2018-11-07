<template>
  <div>
    <div v-if="specialist" class="specialist-profile">
      <AppInputInline label="ФИО" large v-model="specialist['ФИО']"></AppInputInline>
      <AppInput label="Код" v-model="specialist['Код']" style="margin: 0 10px"></AppInput>
      <AppInput label="Логин" v-model="specialist['Логин']" style="margin: 0 10px"></AppInput>
      <AppInputInline label="Примечание" v-model="specialist['Примечание']"></AppInputInline>
      <AppInputSelect label="Должность" placeholder="Выбрать" v-model="specialist['Должность_m0']" :options="jobList" key-field='Наименование' value-field='primaryKey'></AppInputSelect>
      <AppInputSelect label="Подразделение" placeholder="Выбрать" v-model="specialist['Подразделение']" :options="divisionList" key-field='Наименование' value-field='primaryKey'></AppInputSelect>
      <AppInputToogle label="Актуально" v-model="specialist['Актуально']" style="margin: 0 10px"></AppInputToogle>
      <SubmitButton @click="submit" :visible="specialistModified"></SubmitButton>
    </div>
  </div>
</template>

<script>
  import AppInputInline from "./AppInputInline.vue"
  import AppInput from "./AppInput.vue"
  import AppInputToogle from "./AppInputToogle.vue"
  import AppInputSelect from "./AppInputSelect.vue"
  import SubmitButton from "./SubmitButton.vue"

  export default {
    components: {
      AppInputInline,
      AppInput,
      AppInputToogle,
      AppInputSelect,
      SubmitButton,
    },
    data: function() {
      return {
        specialist: null,
        specialistModified: null,
        jobList: null,
        divisionList: null,
      }
    },
    async created() {
      this.specialistGet()
      this.$store.dispatch("jobListGet").then(data => {
        this.jobList = Object.assign({}, data)
      })
      this.$store.dispatch("divisionListGet").then(data => {
        this.divisionList = Object.assign({}, data)
      })
    },
    methods: {
      specialistGet() {
        this.$store.dispatch("specialistGet", this.$route.params.specialist_id).then(data => {
          this.specialist = Object.assign({}, data)
        })
      },
      submit() {
        this.$store.dispatch("specialistUpdate", this.specialist).then(() => {
          this.specialistGet()
        })
      },
    },
    watch: {
      specialist: {
        handler(newValue, oldValue) {
          if (oldValue) this.specialistModified = true
          if (oldValue != newValue) this.specialistModified = false
        },
        deep: true,
      },
    },
  }
</script>
