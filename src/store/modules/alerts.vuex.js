function initialState () {
  return {
    alerts: []
  }
}

export const alerts = {
  state: initialState,
  mutations: {
    ALERTS_RESET (state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    CREATE_ALERT (state, alert) {
      state.alerts.push(alert)
    },
    UPDATE_ALERT (state, alert) {
      state.alerts.forEach((current, i) => {
        if (current.name === alert.name) {
          state.alerts.splice(i, 1)
          state.alerts.push(alert)
        }
      })
    },
    DELETE_ALERT (state, alert) {
      state.alerts.forEach((current, i) => {
        if (current.name === alert.name) {
          state.alerts.splice(i, 1)
        }
      })
    }
  },
  actions: {},
  getters: {
    alerts: state => state.alerts,
    hasAlerts: state => {
      return Boolean(state.alerts.length > 0)
    }
  }
}
