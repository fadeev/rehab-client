import Vue from "vue"
import VueRouter from "vue-router"

import PatientProfile from "./components/PatientProfile.vue"
import ObservationProfile from "./components/ObservationProfile.vue"
import PatientSearch from "./components/PatientSearch.vue"
import PatientList from "./components/PatientList.vue"
import HomeScreen from "./components/HomeScreen.vue"
import SpecialistIndex from "./components/SpecialistIndex.vue"
import SpecialistList from "./components/SpecialistList.vue"
import SpecialistProfile from "./components/SpecialistProfile.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: HomeScreen,
    },
    {
      path: '/patient',
      component: PatientSearch,
      meta: { transitionName: 'slide' },
      children: [
        {
          path: '',
          component: PatientList,
          meta: { transitionName: 'slide' },
        },
        {
          path: ':patient_id',
          component: PatientProfile,
          meta: { transitionName: 'slide' },
        },
      ]
    },
    {
      path: '/patient/:patient_id/observation/:observation_id',
      component: ObservationProfile,
      meta: { transitionName: 'slide' },
    },
    {
      path: '/specialist',
      component: SpecialistIndex,
      meta: { transitionName: 'slide' },
      children: [
        {
          path: '',
          component: SpecialistList,
          meta: { transitionName: 'slide' },
        },
        {
          path: ':specialist_id',
          component: SpecialistProfile,
          meta: { transitionName: 'slide' },
        }
      ],
    },
  ],
  mode: "history",
})