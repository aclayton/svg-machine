<template>
  <div id="reader">
      <div
        class="dropzone"
        v-on:drop="dropTrigger($event)"
        v-on:dragover="dragEnterTrigger($event)"
        v-on:dragenter="dragEnterTrigger($event)"
        v-on:dragleave="dragLeaveTrigger($event)"
        :class="dropClasses"
      >
        <slot></slot>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'reader',
  data() {
    return {
      dropClasses: {
        dropActive: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'isDuplicate'
    ])
  },
  methods: {
    dragEnterTrigger (e) {
      e.preventDefault();
      this.dropClasses.dropActive = true;
    },

    dragLeaveTrigger (e) {
      e.preventDefault();
      this.dropClasses.dropActive = false;
    },

    dropTrigger (e) {
      e.preventDefault()
      this.dropClasses.dropActive = false

      const theFile = e.dataTransfer.files[0]
      const theName = theFile.name.replace(/\.[^/.]+$/, '')
      const theExtension = theFile.name.split('.').pop();

      if (theExtension === 'svg') {
        const reader = new FileReader()
        reader.onload = ev => {
          let icon = {
            name: theName,
            code: ev.target.result
          }
          if (this.isDuplicate(icon.name)) {
            const theAlert = {
              name: 'duplicate' + theName,
              variant: 'danger',
              message: `${theFile.name} is a duplicate!`
            }
            this.$store.commit('CREATE_ALERT', theAlert)
          } else {
            this.$store.commit('CREATE_ICON', icon)
          }
        };
        reader.readAsText(theFile)
      } else {
        const theAlert = {
          name: 'notsvg' + theName,
          variant: 'info',
          message: `${theFile.name} is not an SVG file!`
        }
        this.$store.commit('CREATE_ALERT', theAlert)
      }

    }
  }
}
</script>
