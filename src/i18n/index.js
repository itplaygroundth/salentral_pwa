import Vue from 'vue';

// add translations directly to the application
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'th-TH': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
};
// Vue.i18n.add('br', require('./pt_br.json'));
 
Vue.i18n.add('en', require('./en.json'));
// Vue.i18n.add('es', require('./es.json'));
Vue.i18n.add('th', require('./th.json'));

// set the start locale to use
Vue.i18n.set('th');
// Vue.i18n.set(dateTimeFormats);
// set fallback for non-translated strings
Vue.i18n.fallback('en');
