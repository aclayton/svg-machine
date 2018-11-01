<template>
  <div>
    <div>
      <b-btn @click="generateDefs" size="sm">
        <icon name="file-download"></icon> Definitions
      </b-btn>
    </div>
    <b-modal @show="modalOpen" ref="defsModal" id="defsModal" title="SVG Definitions" ok-only size="lg">
      <codemirror ref="editor" v-model="defsCode" :options="cmOptions"></codemirror>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { codemirror } from 'vue-codemirror'
export default {
  name: 'DefsGenerator',
  data() {
    return {
      defsCode: '',
      cmOptions: {
        tabSize: 4,
        mode: 'text/xml',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        viewportMargin: Infinity,
        lineWrapping: true
      }
    }
  },
  components: {
    codemirror
  },
  computed: {
    ...mapGetters([
      'icons'
    ])
  },
  methods: {
    generateDefs () {
      const symbolArray = [];
      this.icons.forEach((icon) => {
        const parser = new DOMParser();
        const paths = parser.parseFromString(icon.code, "text/html").getElementsByTagName('svg')[0].innerHTML;
        symbolArray.push(`<symbol id="sicon-${icon.name}">${paths}</symbol>`);
      });
      this.defsCode = `<!-- SVG SPRITE DEFS -->
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
        <defs>
        ${symbolArray.toString()}
        </defs>
      </svg>
      <!-- END SVG SPRITE DEFS -->`;

      const url = window.URL.createObjectURL(new Blob([this.defsCode]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `my-defs.svg`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    modalOpen () {
      const that = this;
      setTimeout(function() {
          that.$refs.editor.refresh()
      },1)
    }
  }
}
</script>
<style>
.CodeMirror {
  height: auto;
}
</style>
