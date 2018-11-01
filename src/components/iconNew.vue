<template>
  <span class="icon-new">

    <b-btn v-b-modal="'newIconModal'" class="btn-new-icon" size="sm" aria-label="New Icon">
      <icon name="plus"></icon>
    </b-btn>

    <b-modal id="newIconModal" title="Create an SVG" @ok="handleOk" ok-title="Create" ok-variant="success" cancel-variant="danger" ref="newModal">
      <form @submit.stop.prevent="handleOk">
        <b-form-group label="Name" label-for="icon-name">
          <b-form-input id="icon-name" type="text" placeholder="Icon name" v-model="newIcon.name" />
        </b-form-group>
      </form>
    </b-modal>

  </span>
</template>
<script>
export default {
  name: 'iconNew',
  data () {
    return {
        newIcon: {
          name: '',
          code: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="300px" height="200px" viewBox="0 0 300 200" style="enable-background:new 0 0 300 200;" xml:space="preserve">

</svg>`
        }
    }
  },
  methods: {
    handleOk (e) {
      e.preventDefault()
      this.createIcon()
    },
    createIcon () {
      this.$store.commit('CREATE_ICON', this.newIcon)
      this.$refs.newModal.hide()
    }
  }
}
</script>
<style>
#newIconModal form > div{
  text-align: left;
}
</style>
