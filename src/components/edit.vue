<template>
    <a @click="setActive(icon)">
      <slot></slot>
    </a>
</template>
<script>
export default {
  name: 'edit',
  props: ['icon'],
  methods: {
    setActive(icon) {
      icon.active = true
      this.$store.dispatch('clearActive')
      this.$store.commit('UPDATE_ICON', icon)
    }
  }
}
</script>
