function initialState () {
  return {
    prefs: {
      sidebarWidth: 30,
      canvasHeight: 30,
      canvasBGStyle: {
        opacity: 1,
        backgroundColor: '#ffffff'
      },
      listView: 'list'
    }
  }
}

export const prefs = {
  state: initialState,
  mutations: {
    PREFS_RESET (state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    UPDATE_PREFS_SIDEBAR (state, sidebarWidth) {
      state.prefs.sidebarWidth = sidebarWidth
    },
    UPDATE_PREFS_CANVAS (state, canvasHeight) {
      state.prefs.canvasHeight = canvasHeight
    },
    UPDATE_PREFS_LISTVIEW (state, listView) {
      state.prefs.listView = listView
    },
    UPDATE_PREFS_CANVASSTYLE (state, canvasBGStyle) {
      state.prefs.canvasBGStyle = canvasBGStyle
    }
  },
  getters: {
    prefs: state => state.prefs
  }
}
