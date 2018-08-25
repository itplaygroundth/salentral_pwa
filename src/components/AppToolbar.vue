<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
      <v-text-field
      :loading="loading"
      :search-input.sync="search"
      v-model="search"
      cache-items
      class="hidden-sm-and-down"
      flat
      hide-no-data
      hide-details
      label=""
      solo-inverted
      prepend-icon="search"
    ></v-text-field>

      <v-spacer></v-spacer>
     <v-menu offset-y origin="left center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
       <v-btn icon flat slot="activator">
         <v-icon>language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(option, id) in options"
            :key="id"
            @click="setLanguage(option.code)"
          ><span style="width:20px"></span>
          <v-list-tile-action>
          <span class="flag-icon flag-icon-large" :class="flagIconClass(option.flag)"></span>
          </v-list-tile-action>
            <v-list-tile-content> {{ `language.${option.name}` | translate }} </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import { get } from 'vuex-pathify';
import store from '@/store';

export default {
  name: 'app-toolbar',
  components: {
    NotificationList,
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          code: 'th',
          flag: 'th',
          name: 'thai',
        },
        {
          code: 'en',
          flag: 'gb',
          name: 'english',
        }],

    },
  },
  data: () => ({
    loading: false,
    select: {},
    search: '',
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: () => {
          // console.log(e);
        },
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: () => {
          // console.log(e);
        },
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: () => {
          // logout().then(
          // auth.logout();
          // window.getApp.$emit('APP_LOGOUT');
          // this.logout();
          store.dispatch('logOUT');
        },
      },
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    globalsearch: {
      get () {
        return this.$store.getters['global-search'];
      },
      set (val) {
        this.$store.set('global-search', val);
      },
    },

  },
  watch: {
    search () {
      // console.log(this.search);
      this.$store.set('global-search', this.search);
      return this;
    },
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    setLanguage (locale) {
      this.$i18n.set(locale);
      this.$emit('change-locale:locale', this.$i18n.set(locale));
    },
    currentLanguage () {
      return this.$i18n.locale() === 'en' ? 'gb' : this.$i18n.locale();
    },
    flagIconClass (code) {
      return `flag-icon  flag-icon-${code}`;
    },
    logout () {
      get('logOUT', this.users);
    },
  },
};
</script>
<style lang="stylus" scoped>
 .flag-icon-large {
      width: 31px;
      height: 23px;
    }

    .flag-icon-small {
      min-width: 22px;
      height: 17px;
    }

</style>
