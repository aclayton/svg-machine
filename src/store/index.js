//  LIBRARIES
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

//  MODULES
import { icons } from './modules/icons.vuex'
import { alerts } from './modules/alerts.vuex'
import { prefs } from './modules/prefs.vuex'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  supportCircular: true,
  storage: window.localStorage,
  modules: ['icons', 'alerts', 'prefs']
})

export const store = new Vuex.Store({
  modules: { icons, alerts, prefs },
  plugins: [vuexLocal.plugin]
})
