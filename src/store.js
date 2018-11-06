import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = "http://localhost:3000"

export default new Vuex.Store({
  strict: true,
  state: {
    patientSearch: null,
    specialistSearch: null,
    patientList: [],
    specialistList: [],
    specialist: "452F1FBD-58DB-42C8-B07D-B94E7586DDCA",
  },
  getters: {
    patientGetById: (state) => (id) => {
      return 1
    },
  },
  actions: {
    patientSearchUpdate({commit, state}, patientSearch) {
      commit("patientSearchUpdate", patientSearch)
    },
    specialistSearchUpdate({commit, state}, specialistSearch) {
      commit("specialistSearchUpdate", specialistSearch)
    },
    patientGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/patient/${id}`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    patientListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/patient`).then(({data}) => {
          commit("patientListUpdate", data.data)
          resolve(data.data)
        })
      })
    },
    observationGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/observation/${id}`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    indicatorListGet({commit, state}, {observation_id, specialist_id}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/observation/${observation_id}/indicator?specialist=${specialist_id}`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    indicatorAllListGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/indicator`).then(({data}) => {
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
    patientUpdate({commit, state}, patient) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/patient/${patient.primaryKey}`, patient).then(({data}) => {
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
    attibuteListGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/attribute`).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    attributeAdd({commit, state}, body) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/indicator`, body).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    observationAdd({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/observation`, {id}).then(({data}) => {
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
    jobListGet({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/job`).then(({data}) => {
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
  },
  mutations: {
    patientSearchUpdate(state, patientSearch) {
      state.patientSearch = patientSearch
    },
    specialistSearchUpdate(state, specialistSearch) {
      state.specialistSearch = specialistSearch
    },
    patientListUpdate(state, patientList) {
      state.patientList = patientList
    },
    patientCreate(state, patient) {

    },
    patientListUpdate(state, patientList) {
      state.patientList = patientList
    },
    specialistListUpdate(state, specialistList) {
      state.specialistList = specialistList
    },
  },
})