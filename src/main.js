import Vue from 'vue'
import store from "./store.js"
import App from './App.vue'

import router from "./router.js"

const requireComponent = require.context(
  './components', false, /[\w]+\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  Vue.component(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'), componentConfig.default || componentConfig)
})

Vue.config.productionTip = false

store.dispatch("metadataFetch")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')