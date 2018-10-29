import Vue from "vue"
import VueRouter from "vue-router"

import PatientProfile from "./components/PatientProfile.vue"
import ObservationProfile from "./components/ObservationProfile.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/patient/:patient_id',
      component: PatientProfile,
    },
    {
      path: '/patient/:patient_id/observation/:observation_id',
      component: ObservationProfile,
    },
  ],
  mode: "history",
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})