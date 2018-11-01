import Vue from "vue"
import VueRouter from "vue-router"

import PatientProfile from "./components/PatientProfile.vue"
import ObservationProfile from "./components/ObservationProfile.vue"
import PatientSearch from "./components/PatientSearch.vue"
import PatientList from "./components/PatientList.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: PatientSearch,
      meta: { transitionName: 'slide' },
      children: [
        {
          path: '',
          component: PatientList,
          meta: { transitionName: 'slide' },
        },
        {
          path: 'patient/:patient_id',
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
  ],
  mode: "history",
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
})