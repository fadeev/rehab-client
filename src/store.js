import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url = "http://localhost:3000"

export default new Vuex.Store({
  strict: true,
  state: {
    patientList: [],
  },
  getters: {
    patientGetById: (state) => (id) => {
      return 1
    },
  },
  actions: {
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
    indicatorListGet({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${url}/observation/${id}/indicator`).then(({data}) => {
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
  },
  mutations: {
    patientListUpdate(state, patientList) {
      state.patientList = patientList
    },
    patientCreate(state, patient) {

    },
  },
})