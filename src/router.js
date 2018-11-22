import Vue from "vue"
import VueRouter from "vue-router"

import PatientProfile from "./components/PatientProfile.vue"
import ObservationProfile from "./components/ObservationProfile.vue"
import PatientIndex from "./components/PatientIndex.vue"
import PatientList from "./components/PatientList.vue"
import HomeScreen from "./components/HomeScreen.vue"
import SpecialistIndex from "./components/SpecialistIndex.vue"
import SpecialistList from "./components/SpecialistList.vue"
import SpecialistProfile from "./components/SpecialistProfile.vue"
import JobIndex from "./components/JobIndex.vue"
import JobList from "./components/JobList.vue"
import JobProfile from "./components/JobProfile.vue"
import IndicatorProfile from "./components/IndicatorProfile.vue"
import IndicatorIndex from "./components/IndicatorIndex.vue"
import PatientListMenu from "./components/PatientListMenu.vue"
import EntityList from "./components/EntityList.vue"
import EntityPage from "./components/EntityPage.vue"
import EntityProfile from "./components/EntityProfile.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/entity',
      component: EntityList,
    },
    {
      path: '/entity/:entity',
      component: EntityPage,
      props: true,
    },
    {
      path: '/entity/:entity/:id',
      component: EntityProfile,
      props: true,
    },
    {
      path: '/',
      component: HomeScreen,
      meta: { transitionName: 'slide-left' },
    },
    {
      path: '/patient',
      component: PatientIndex,
      meta: { transitionName: 'slide-left' },
      children: [
        {
          path: '',
          component: PatientList,
          meta: { transitionName: 'slide-right' },
          children: [
            {
              path: '',
              menu: PatientListMenu,
            },
          ],
        },
        {
          path: ':patient_id',
          component: PatientProfile,
          meta: { transitionName: 'slide' },
        },
      ],
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
        },
      ],
    },
    {
      path: '/job',
      component: JobIndex,
      meta: { transitionName: 'slide' },
      children: [
        {
          path: '',
          component: JobList,
          meta: { transitionName: 'slide' },
        },
        {
          path: ':job_id',
          component: JobProfile,
          meta: { transitionName: 'slide' },
        }
      ],
    },
    {
      path: '/indicator',
      component: IndicatorIndex,
      meta: { transitionName: 'slide' },
      children: [
        {
          path: ':indicator_id',
          component: IndicatorProfile,
          meta: { transitionName: 'slide' },
        },
      ],
    },
  ],
  mode: "history",
})