<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">

     <v-toolbar
   color="green lighten-3"
  >
     <div class="page-header-left">

    </div>
    <v-breadcrumbs divider="-">
      <v-breadcrumbs-item>
      <v-icon large>home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-for="(item,key) in breadcrumbs" :key="key">
      {{ item }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

      <v-menu :nudge-width="100" class="hidden-md-and-up" >
        <v-toolbar-title slot="activator">

          <v-icon>more_vert</v-icon>
        </v-toolbar-title>

        <v-list >
          <v-list-tile
            v-for="(it,key) in menubtn" :key="key" >
            <v-list-tile-title> {{ it | translate }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-md-and-down">
      <v-btn flat
      v-for="(item,key) in menubtn" :key="key" @click.stop="gotoPage(item)"
      > {{ item.name | translate }}</v-btn>

    </v-toolbar-items>
  </v-toolbar>
  </v-layout>
</template>

<script>
// import menu from '@/api/menu';
import router from '../router';

export default {
  props: {
  },
  data () {
    return {
      title: '',
    };
  },
  computed: {
    breadcrumbs: () => {
      const breadcrumbs = [];
      const menu = JSON.parse(JSON.stringify(this.$t('menu.submenu')));
      menu.forEach((item) => {
        if (item.items) {
          const child = item.items.find(i => i.link === this.$route.name);
          if (child) {
            breadcrumbs.push(item.title);
            breadcrumbs.push(child.name);
            this.title = child.name;
          } else {
            item.items.find((x) => {
              let subchild = null;
              if (x.menu) {
                subchild = x.menu.find(u => u.link === this.$route.name);
              }
              if (subchild) {
                breadcrumbs.push(item.title);
                breadcrumbs.push(x.name);
                breadcrumbs.push(subchild.name);
                this.title = subchild.name;
              }
              return null;
            });
          }
        } else if (item.link === this.$route.name) {
          this.title = item.title;
          breadcrumbs.push(item.title);
        }
      });
      if (breadcrumbs.length === 0) {
        this.title = 'Dashboard';
        breadcrumbs.push('Dashboard');
      }

      return breadcrumbs;
    },
    menubtn: () => {
      const menubtn = [];
      const menu = JSON.parse(JSON.stringify(this.$t('menu.submenu')));
      menu.forEach((item) => {
        if (item.items) {
          const child = item.items.find(i =>
            (i.link === this.$route.name || i.link === this.$route.meta.root));
          if (child) {
            if (child.menu) {
              child.menu.forEach((ch) => {
                if (child.root === this.$route.root) {
                  menubtn.push(ch);
                }
              });
            }
          }
        }
      });
      return menubtn; // JSON.parse(JSON.stringify(child)).menu;
    },
    binding () {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;
      return binding;
    },
  },
  methods: {
    gotoPage (item) {
      router.name = item.name;
      router.push({ name: item.link });
    },
  },
};
</script>
