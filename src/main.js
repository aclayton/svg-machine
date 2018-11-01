import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { store } from './store'
import './registerServiceWorker'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/mode/xml/xml.js'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import splitPane from 'vue-splitpane'

Vue.use(BootstrapVue)
Vue.component('icon', Icon)
Vue.component('split-pane', splitPane)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
