<template>
  <div id="alerts">
    <b-alert
      v-for="alert in alerts"
      :key="alert.name"
      :show="true"
      :variant="alert.variant"
      dismissible
      @dismissed="dismiss(alert)"
    >{{ alert.message }}</b-alert>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'alerts',
  computed: {
    ...mapGetters([
      'alerts'
    ])
  },
  methods: {
    dismiss (theAlert) {
      this.$store.commit('DELETE_ALERT', theAlert)
    }
  }
}
</script>
