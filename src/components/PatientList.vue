<template>
  <div>
    <div class="patient-list">
      <!-- <div class="patient-search" @click="goHome">
        <input placeholder="Поиск пациента по имени" class="patient-search__input" type="text" v-model="search">
      </div> -->
      <transition name="fade">
        <div v-if="patientList">
          <router-link class="app-list__item" v-for="patient in patientList" :key="patient.primaryKey" tag="div" v-if="isMatched(patient)" :to="`/patient/${patient.primaryKey}`">
            {{patient["ФИО"]}}
            <div style="font-size: .75em; color: #aaa;">{{patient["ДатаРождения"].substring(0,4)}}</div>
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .patient-search { padding-top: 10px; margin: 0 10px 10px 10px; position: relative; }
  .patient-search__input { box-sizing: border-box; width: 100%; padding: 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2); }
</style>


<script>
  export default {
    data: function() {
      return {
        search: null,
        patientList: null
      }
    },
    mounted() {
      this.patientListGet()
    },
    methods: {
      patientListGet() {
        this.$store.dispatch("patientListGet").then(data => {
          this.patientList = data
        })
      },
      isMatched(patient) {
        if (!this.search) return true
        return (new RegExp(this.search.toLowerCase())).test(patient['ФИО'].toLowerCase())
      },
      goHome() {
        this.$router.push('/')
      },
    },
  }
</script>
