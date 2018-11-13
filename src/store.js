import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = "http://localhost:3000"

export default new Vuex.Store({
  strict: true,
  state: {
    patientList: [],
    specialistList: [],
    specialist: "BF553903-9FFA-465F-8888-A53CC78D76CA",
  },
  getters: {},
  actions: {
    observationGet({commit, state}, id) {
      return axios.get(`${url}/observation/${id}`)
    },
    observationAdd({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/observation`, {id}).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    patientGet({commit, state}, id) {
      return axios.get(`${url}/patient/${id}`)
    },
    patientListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/patient`).then(({data}) => {
          commit("patientListUpdate", data.data)
          resolve(data.data)
        })
      })
    },
    patientObservationListGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/patient/${id}/observation`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    patientCreate({commit, state}, patient) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/patient`, patient).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    patientUpdate({commit, state}, patient) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/patient/${patient.primaryKey}`, patient).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    jobGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/job/${id}`).then(({data}) => {
          resolve(data.data)
        }).catch(error => {
          reject()
        })
      })
    },
    jobListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/job`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    jobUpdate({commit, state}, job) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/job/${job.primaryKey}`, job).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    jobListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/job`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    indicatorListGet({commit, state}, {observation_id, specialist_id}) {
      return axios.get(`${url}/observation/${observation_id}/indicator?specialist=${specialist_id}`)
    },
    indicatorAllListGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/indicator`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    indicatorGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/indicator/${id}`).then(({data}) => {
          resolve(data.data)
        }).catch((error) => {
          reject()
        })
      })
    },
    indicatorUpdate({commit, state}, indicator) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/indicator/${indicator.primaryKey}`, indicator).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    attibuteListGet({commit, state}, id) {
      return axios.get(`${url}/attribute`)
    },
    attributeAdd({commit, state}, body) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/indicator`, body).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    specialistUpdate({commit, state}, specialist) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/specialist/${specialist.primaryKey}`, specialist).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    specialistListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/specialist`).then(({data}) => {
          commit("specialistListUpdate", data.data)
          resolve(data.data)
        })
      })
    },
    specialistGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/specialist/${id}`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    divisionListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/division`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    evaluationGet({commit, state}, observation_id) {
      return axios.get(`${url}/evaluation?observation_id=${observation_id}`)
    },
  },
  mutations: {
    patientListUpdate(state, patientList) {
      state.patientList = patientList
    },
    patientListUpdate(state, patientList) {
      state.patientList = patientList
    },
    specialistListUpdate(state, specialistList) {
      state.specialistList = specialistList
    },
  },
})