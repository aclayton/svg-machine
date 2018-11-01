<template>
  <div>

    <b-list-group v-if="prefs.listView === 'list'" flush class="list-icon">
      <b-list-group-item v-for="icon in icons" :key="icon._id" :active="icon.active">
        <edit :icon="icon">
          <div class="icon-rendered" v-html="icon.code"></div>
          <p class="icon-name pl-2">{{ icon.name }}</p>
          <b-button @click="deleteIcon(icon)" variant="link" class="trash"><icon name="trash"></icon></b-button>
        </edit>
      </b-list-group-item>
    </b-list-group>

    <div class="grid-icon" v-if="prefs.listView === 'grid'">
      <span v-for="icon in icons" :key="icon._id">
        <edit :icon="icon">
          <div class="icon-rendered" v-html="icon.code"></div>
        </edit>
      </span>
    </div>

    <div class="list-footer">
      <b-button-group size="sm" class="mr-2">
        <b-btn @click="listView" v-if="prefs.listView === 'grid'"><icon name="list-ul"></icon></b-btn>
        <b-btn v-if="prefs.listView === 'list'" variant="primary"><icon name="list-ul"></icon></b-btn>
        <b-btn @click="gridView" v-if="prefs.listView === 'list'"><icon name="th-large"></icon></b-btn>
        <b-btn v-if="prefs.listView === 'grid'" variant="primary"><icon name="th-large"></icon></b-btn>
      </b-button-group>
      <b-button-group size="sm" class="mr-2">
        <icon-new></icon-new>
      </b-button-group>
      <b-button-group size="sm">
        <defs-generator></defs-generator>
      </b-button-group>
    </div>

  </div>
</template>
<script>
import Edit from "./edit.vue";
import DefsGenerator from "./defs.vue";
import iconNew from "./iconNew.vue";
import { mapGetters } from 'vuex';
export default {
  components: {
    Edit,
    DefsGenerator,
    iconNew
  },
  name: 'iconList',
  computed: {
    ...mapGetters([
      'icons',
      'prefs'
    ])
  },
  methods: {
    deleteIcon(theIcon) {
      this.$store.commit('DELETE_ICON', theIcon)
    },
    listView() {
      this.$store.commit('UPDATE_PREFS_LISTVIEW', 'list')
    },
    gridView() {
      this.$store.commit('UPDATE_PREFS_LISTVIEW', 'grid')
    },
    newIcon() {
      console.log('TODO: new blank icon')
    }
  }
}
</script>
