<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
    >
    <v-toolbar color="primary darken-1" dark>
      <img v-bind:src="computeLogo" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3" @click.stop="handleMiniDrawerToggle">
        <span class="hidden-sm-and-down">Saletral System</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
       <v-list-tile @click.stop="godash()">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            {{ $t(`dashboard`) | translate }}
          </v-list-tile-content>
        </v-list-tile>
          <v-list-group
            v-for="item in JSON.parse(JSON.stringify($t('menu.submenu'))) "
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action

          >
            <v-list-tile slot="activator">
               <v-list-tile-avatar>
              <v-icon medium>{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ $t(`${item.title}`) | translate }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              @click.stop="gotoPage(subItem)"
              >
              <!-- :to="{ name: subItem.link }"
            > -->

              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import router from '../router';

export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160,
    },
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/m.png';
    },

    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    },
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  methods: {
    // genChildTarget(item, subItem) {
    //   if (subItem.href) return;
    //   if (subItem.component) {
    //     { name: subItem.component; }
    //   } else {
    //     { name: `${item.group}/${(subItem.name)}`; }
    //   }
    // },
    handleMiniDrawerToggle () {
      this.mini = !this.mini;
    },
    godash () {
      router.name = 'Dashboard';
      router.push({ name: 'Dashboard' });
    },
    gotoPage (item) {
      router.name = item.name;
      router.push({ name: item.link });
    },
  },
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>
