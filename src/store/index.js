import Vue from 'vue';
import Vuex from 'vuex';
import VuexI18n from 'vuex-i18n'; // load vuex i18n module
import pathify from './pathify';
import app from './modules/app';
 

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  plugins: [pathify.plugin],
  // getters,
  modules: {
    app
  }
  
});

Vue.use(VuexI18n.plugin, store);

export default store;
