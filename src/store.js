import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as parser from 'xml-js'
import { find } from "lodash"

Vue.use(Vuex)

const url = "http://localhost:3000"
const odata = "http://ru:3103/odata"

axios.get(`${odata}/$metadata`)

export default new Vuex.Store({
  strict: true,
  state: {
    patientList: [],
    specialistList: [],
    specialist: "BF553903-9FFA-465F-8888-A53CC78D76CA",
    metadata: null,
  },
  getters: {
    entityTypes(state) {
      if (state.metadata) {
        return Array.prototype.map.call(state.metadata.querySelectorAll("[Namespace*='Rehab'] EntityType"), object => {
          return {
            type: object.getAttribute('Name'),
            properties: Array.prototype.map.call(object.querySelectorAll('Property'), (prop) => {
              return {name: prop.getAttribute('Name'), type: prop.getAttribute('Type')}
            }),
            navigation: Array.prototype.map.call(object.querySelectorAll('NavigationProperty'), (prop) => {
              return {name: prop.getAttribute('Name')}
            })
          }
        })
      }
    },
    entity: (state, getters) => (type) => {
      return find(getters.entityTypes, ['type', type])
    },
    enumTypes(state) {
      let result = []
      if (state.metadata) {
        state.metadata.querySelectorAll("[Namespace*='Rehab'] EnumType").forEach(object => {
          let type = object.getAttribute('Name')
          let options = []
          object.querySelectorAll('Member').forEach(prop => {
            options = [...options, {name: prop.getAttribute('Name'), value: prop.getAttribute('Value')}]
          })
          result = [...result, {type, options}]
        })
      }
      return result
    },
  },
  actions: {
    metadataFetch({commit, state}) {
      return axios.get(`${odata}/$metadata`).then(({data}) => {
        commit('metadataUpdate', data)
      })
    },
    observationGet({commit, state}, id) {
      return axios.get(`${odata}/IISRehabОбследованиеs(${id})`)
    },
    observationAdd({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/observation`, {id}).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    patientGet({commit, state}, id) {
      return axios.get(`${odata}/IISRehabПациентs(${id})`)
    },
    patientListGet({commit, state}) {
      return axios.get(`${odata}/IISRehabПациентs?$select=__PrimaryKey,ФИО,ДатаРождения`).then(({data}) => {
        commit("patientListUpdate", data.value)
      })
    },
    patientObservationListGet({commit, state}, id) {
      return axios.get(`${odata}/IISRehabОбследованиеs?$filter=Пациент/__PrimaryKey eq ${id}`)
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
      return axios.get(`${odata}/IISRehabДолжностьs(${id})`)
    },
    jobUpdate({commit, state}, job) {
      return new Promise((resolve, reject) => {
        axios.patch(`${url}/job/${job.primaryKey}`, job).then(({data}) => {
          resolve(data.data)
        })
      })
    },
    jobListGet({commit, state}) {
      return axios.get(`${odata}/IISRehabДолжностьs`)
    },
    indicatorListGet({commit, state}, {observation_id, specialist_id}) {
      return axios.get(`${odata}/IISRehabИнтегральныйПоказательs?$filter=Сотрудник/__PrimaryKey eq ${specialist_id}&$expand=ХарактеристикаИнтегральногоПоказателя`)
      // return axios.get(`${url}/observation/${observation_id}/indicator?specialist=${specialist_id}`)
    },
    indicatorAllListGet({commit, state}, id) {
      return axios.get(`${odata}/IISRehabИнтегральныйПоказательs?$expand=Сотрудник`)
      // return new Promise((resolve, reject) => {
      //   axios.get(`${url}/indicator`).then(({data}) => {
      //     resolve(data.data)
      //   })
      // })
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
    attributeListGet({commit, state}, id) {
      return axios.get(`${odata}/IISRehabХарактеристикаИнтегральногоПоказателяs?$expand=ИнтегральныйПоказатель`)
      // return axios.get(`${url}/attribute`)
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
      return axios.get(`${odata}/IISRehabСотрудникs`).then(({data}) => {
        commit("specialistListUpdate", data.value)
      })
      // return new Promise((resolve, reject) => {
      //   axios.get(`${url}/specialist`).then(({data}) => {
      //     commit("specialistListUpdate", data.data)
      //     resolve(data.data)
      //   })
      // })
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
    metadataUpdate(state, data) {
      let doc = new DOMParser().parseFromString(data, 'application/xml')
      state.metadata = doc
    },
  },
})