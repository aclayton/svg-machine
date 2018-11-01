import Vue from 'vue'
import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

function initialState () {
  return {
    icons: [],
    counter: 0
  }
}

export const icons = {

  state: initialState,

  mutations: {

    ICONS_RESET (state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },

    REPLACE_ICONS (state, icons) {
      state.icons = icons
    },

    CREATE_ICON (state, icon) {
      state.counter ++
      icon._id = state.counter
      icon.active = false
      state.icons.push(icon)
    },

    UPDATE_ICON (state, icon) {
      state.icons.forEach((current, i) => {
        if (current._id === icon._id) {
          state.icons.splice(i, 1)
          state.icons.push(icon)
        }
      })
    },

    DELETE_ICON (state, icon) {
      state.icons.forEach((current, i) => {
        if (current._id === icon._id) {
          state.icons.splice(i, 1)
        }
      })
    }
  },

  actions: {

    clearActive (state) {
      let iconsClone = Vue._.cloneDeep(state.state.icons)
      iconsClone.forEach(icon => {
        icon.active = false
      })
      state.commit('REPLACE_ICONS', iconsClone)
    }
  },

  getters: {

    icons: state => {
      return Vue._.orderBy(state.icons, '_id')
    },

    iconByName: state => {
      return name => {
        return state.icons.find(icon => icon.name === name)
      }
    },

    iconCloneById: state => {
      return _id => {
        return Vue._.cloneDeep(state.icons.find(icon => icon._id === _id))
      }
    },

    isDuplicate: state => {
      return name => {
        return Boolean(state.icons.find(icon => icon.name === name))
      }
    },

    activeIcon: state => {
      return state.icons.find(icon => icon.active === true)
    },

    activeIconClone: state => {
      return Vue._.cloneDeep(state.icons.find(icon => icon.active === true))
    },

    hasActive: state => {
      return Boolean(state.icons.find(icon => icon.active === true))
    },
    
    hasIcons: state => {
      return Boolean(state.icons.length > 0)
    }
  }
}
