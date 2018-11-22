import Vue from 'vue'

import store from "./store.js"
import router from "./router.js"

import App from './App.vue'

Vue.config.productionTip = false

store.dispatch("metadataFetch")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')