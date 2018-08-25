<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Sale Central System</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="users.user"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="users.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import auth from './../../api/login';
import { get, sync, call } from 'vuex-pathify';


export default {

  name: 'authlogin',

  data: () => ({
    loading: false,
    users: {
      user: '',
      password: ''
    }
  }),

  computed: {
    ...get('authstatus'),

    // user: sync('palette/primary'),
    // password: sync('palette/danger'),
  },
  watch: {

  },
  created () {
    // reset login status
    // this.logout();

  },
  methods: {
    login () {

      this.$store.dispatch('logIN', this.users);
      // console.log(this.$store);
    },
    logout () {

      this.$store.dispatch('logOUT');
    }

  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
