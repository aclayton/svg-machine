<template>
  <div class="app container-fluid">

<!-- TITLE BAR -->
      <b-navbar variant="dark" type="dark" class="navbar-expand-sm">
        <b-navbar-brand href="#">svg machine</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="http://github.com" title="About">
            <icon name="info-circle"/> <span class="sr-only">About</span>
          </b-nav-item>
          <b-nav-item href="http://github.com" title="View on GitHub">
            <icon name="brands/github"/> <span class="sr-only">View on GitHub</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>

<!-- EMPTY VIEW -->
      <div v-if="!hasIcons" class="text-center no-list">
        <reader @load="text = $event">
          <alerts v-if="hasAlerts"></alerts>
          <div class="starter">
            <img alt="" class="bouncer" src="/img/svg.svg" />
            <h1><span class="hide">SVG </span>Machine</h1>
            <p class="description" style="color: #fff;">
              A little app to help make libraries of svg files, and export definition files for use anywhere you like.
            </p>

            <h2>drop an svg or</h2>
            <icon-new></icon-new>
            <h2>to start</h2>
          </div>
        </reader>
      </div>

<!-- LOADED VIEW -->
      <split-pane v-if="hasIcons" v-on:resize="resizeSidebar" :min-percent='30.5' :default-percent='prefs.sidebarWidth' split="vertical">
        <template slot="paneL">

          <div class="pane-list" ref="sidebar">
            <icon-list></icon-list>
          </div>

        </template>
        <template slot="paneR">

          <div v-if="hasActive" class="pane-detail">
            <alerts v-if="hasAlerts"></alerts>
            <icon-detail></icon-detail>
          </div>

          <reader v-if="!hasActive" @load="text = $event" :style="paneRightStyle">
            <div class="text-center">
              <alerts v-if="hasAlerts"></alerts>
              <h1>Drop More Files to Build Your Library</h1>
            </div>
          </reader>

        </template>
      </split-pane>

  </div>
</template>

<script>
import Reader from './components/reader.vue'
import Alerts from './components/alerts.vue'
import IconNew from './components/iconNew.vue'
const IconList = () => import('./components/iconList.vue')
const IconDetail = () => import('./components/iconDetail.vue')

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Reader,
    Alerts,
    IconNew,
    IconList,
    IconDetail
  },
  data() {
    return {
      text: null,
      icon: null,
      paneRightStyle: {
        height: 0,
        overflow: 'hidden'
      }
    }
  },
  computed: {
    ...mapGetters([
      'icons',
      'hasActive',
      'hasAlerts',
      'hasIcons',
      'prefs'
    ])
  },
  watch: {
    text: function () {
      const parser = new DOMParser();
      this.icon = parser.parseFromString(this.text, "text/html").getElementsByTagName('svg')[0].innerHTML;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.paneRightStyle.height = `calc(${window.innerHeight}px - 61px)`;
    },
    resizeSidebar() {
      let tempSidebarWidth = ((this.$refs.sidebar.clientWidth - 2.5) / window.innerWidth) *100
      this.$store.commit('UPDATE_PREFS_SIDEBAR', tempSidebarWidth)
    }
  }
}
</script>
<style lang="scss">
  @import 'styles/index.scss';

  .starter .btn-new-icon {
    background-color: transparent;
    border-color: transparent;
  }
</style>
