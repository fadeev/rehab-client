<template>
  <div>
    <div v-if="job" class="job-profile">
      <app-input-inline style="margin: 0 10px" large v-model="job['Наименование']" />
      <div class="job-profile__h2">
        Показатели
      </div>
      <router-link tag="div"
                   :to="`/indicator/${indicator['__PrimaryKey']}`"
                   :key="indicator['__PrimaryKey']"
                   class="app-list__item"
                   v-for="indicator in indicatorList">
        {{indicator['Наименование']}}
      </router-link>
      <submit-button :visible="modified" @click="submit"></submit-button>
    </div>
  </div>
</template>

<style scoped>
  .job-profile__h2 { font-weight: 600; margin: 0 20px; }
  .job-profile__indicator { margin: 10px 20px; }
</style>

<script>
  import AppInputInline from "./AppInputInline.vue"
  import SubmitButton from "./SubmitButton.vue";

  export default {
    components: {
      AppInputInline,
      SubmitButton,
    },
    data: function() {
      return {
        job: null,
        indicatorList: null,
        modified: null,
      }
    },
    async created() {
      this.jobGet()
      this.indicatorAllListGet()
    },
    methods: {
      jobGet() {
        this.$store.dispatch("jobGet", this.$route.params.job_id).then(({data}) => {
          this.job = data
        })
      },
      indicatorAllListGet() {
        this.$store.dispatch("indicatorAllListGet").then(({data}) => {
          this.indicatorList = data.value.filter(object => {
            if (object['Сотрудник']) {
              return object['Сотрудник']['__PrimaryKey'] == this.$route.params.job_id
            }
          })
        })
      },
      submit() {
        this.$store.dispatch("jobUpdate", this.job).then(data => {
          this.modified = null
        })
      },
    },
    watch: {
      job: {
        handler(newValue, oldValue) {
          if (oldValue) this.modified = true
          if (oldValue != newValue) this.modified = false
        },
        deep: true,
      },
    },
  }
</script>
