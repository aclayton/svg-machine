<template>
  <div class="icon-detail" v-if="hasActive" :style="iconPaneStyle">

    <split-pane v-on:resize="resizeCanvas" :min-percent='20' :default-percent='prefs.canvasHeight' split="horizontal">
      <template slot="paneL">
          <div ref="canvas" class="icon-rendered" v-html="currentIcon.code"></div>
          <div class="canvas-bg" :style="prefs.canvasBGStyle"></div>
      </template>
      <template slot="paneR">
          <codemirror ref="editor"  v-model="currentIcon.code" :options="cmOptions"></codemirror>
      </template>
    </split-pane>

    <div class="pane-footer">

      <b-button-group size="sm">
        <b-btn @click="saveIcon" class="btn-save" ><icon name="save"></icon>&nbsp;&nbsp;&nbsp;Save&nbsp;</b-btn>
        <b-btn @click="downloadIcon" class="btn-download"><icon name="file-download"></icon>&nbsp;&nbsp;&nbsp;Download&nbsp;</b-btn>
        <b-btn @click="closeIcon" class="btn-close"><icon name="times"></icon>&nbsp;&nbsp;&nbsp;Close&nbsp;</b-btn>
      </b-button-group>

      <b-input-group size="sm">
        <b-form-input type="color" v-on:change="updateCanvasPrefs" v-model="localCanvasBGStyle.backgroundColor"></b-form-input>
      </b-input-group>

      <b-input-group size="sm">
        &nbsp;&nbsp;&nbsp;&nbsp;<b-form-input v-on:change="updateCanvasPrefs" right type="range" min="0" max="1" step="0.01" v-model="localCanvasBGStyle.opacity"></b-form-input>
      </b-input-group>

    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { codemirror } from 'vue-codemirror'

export default {
  components: {
    codemirror
  },
  name: 'iconDetail',
  data () {
    return {
      iconPaneStyle: {
        height: 0
      },
      localCanvasBGStyle: {
        opacity: '',
        backgroundColor: ''
      },
      currentIcon: {},
      value: 0,
      cmOptions: {
        mode: 'text/xml',
        theme: 'svg-machine',
        lineNumbers: false,
        lineWrapping: true
      }
    }
  },
  watch: {
    activeIconClone: function () {
      this.currentIcon = this.activeIconClone
    }
  },
  mounted() {
    this.localCanvasBGStyle = this.prefs.canvasBGStyle
    this.currentIcon = this.activeIconClone
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters([
      'hasActive',
      'activeIcon',
      'activeIconClone',
      'prefs'
    ])
  },
  methods: {
    handleResize() {
      this.iconPaneStyle.height = `calc(${window.innerHeight}px - 61px)`
    },
    closeIcon() {
      this.$store.dispatch('clearActive')
    },
    saveIcon() {
      this.$store.commit('UPDATE_ICON', this.currentIcon)
    },
    downloadIcon() {
      const url = window.URL.createObjectURL(new Blob([this.currentIcon.code]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${this.currentIcon.name}.svg`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    resizeCanvas() {
      let tempcanvasHeight = ((this.$refs.canvas.clientHeight + 27.5) / window.innerHeight) * 100
      this.$store.commit('UPDATE_PREFS_CANVAS', tempcanvasHeight)
    },
    updateCanvasPrefs() {
      this.$nextTick(() => {
        this.$store.commit('UPDATE_PREFS_CANVASSTYLE', this.localCanvasBGStyle)
      })
    }
  }
}
</script>
<style>
/*

    Name:       Base16 Default Dark
    Author:     Chris Kempson (http://chriskempson.com)

    CodeMirror template by Jan T. Sott (https://github.com/idleberg/base16-codemirror)
    Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)

*/

.cm-s-svg-machine.CodeMirror { background: #1D252C; color: #B7C5D3; }
.cm-s-svg-machine div.CodeMirror-selected { background: #303030; }
.cm-s-svg-machine .CodeMirror-line::selection, .cm-s-svg-machine .CodeMirror-line > span::selection, .cm-s-svg-machine .CodeMirror-line > span > span::selection { background: rgba(48, 48, 48, .99); }
.cm-s-svg-machine .CodeMirror-line::-moz-selection, .cm-s-svg-machine .CodeMirror-line > span::-moz-selection, .cm-s-svg-machine .CodeMirror-line > span > span::-moz-selection { background: rgba(48, 48, 48, .99); }
.cm-s-svg-machine .CodeMirror-gutters { background: #151515; border-right: 0px; }
.cm-s-svg-machine .CodeMirror-guttermarker { color: #008B94; }
.cm-s-svg-machine .CodeMirror-guttermarker-subtle { color: #505050; }
.cm-s-svg-machine .CodeMirror-linenumber { color: #505050; }
.cm-s-svg-machine .CodeMirror-cursor { border-left: 1px solid #b0b0b0; }

.cm-s-svg-machine span.cm-comment { color: #41505E; }
.cm-s-svg-machine span.cm-atom { color: #B62D65; }
.cm-s-svg-machine span.cm-number { color: #B62D65; }

.cm-s-svg-machine span.cm-property, .cm-s-svg-machine span.cm-attribute { color: #8BD49C; }
.cm-s-svg-machine span.cm-keyword { color: #008B94; }
.cm-s-svg-machine span.cm-string { color: #68A1F0; }

.cm-s-svg-machine span.cm-variable { color: #8BD49C; }
.cm-s-svg-machine span.cm-variable-2 { color: #6a9fb5; }
.cm-s-svg-machine span.cm-def { color: #D98E48; }
.cm-s-svg-machine span.cm-bracket { color: #e0e0e0; }
.cm-s-svg-machine span.cm-tag { color: #008B94; }
.cm-s-svg-machine span.cm-link { color: #aa759f; }
.cm-s-svg-machine span.cm-error { background: #008B94; color: #b0b0b0; }

.cm-s-svg-machine .CodeMirror-activeline-background { background: #202020; }
.cm-s-svg-machine .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }
</style>
