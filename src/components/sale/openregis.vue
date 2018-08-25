<template>
   <v-container grid-list-xl text-xs-left>
    <v-layout v-bind="binding">
      <v-flex lg6>
          <v-card class="mt-3">
            <v-date-picker v-model="date" full-width color="primary" landscape="landscape" reactive :date-format="onChangeDate()" readonly :locale="localize" ></v-date-picker>
          </v-card>
      </v-flex>
      <v-flex lg6 >
          <v-card class="mt-3">
            <v-card-media
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          height="45px"
        ></v-card-media>

        <v-card-title primary-title>
        <div >
                  <v-text-field
            slot="activator"
            v-model="date2"
           :label="$t(titlename.docdate)"
            persistent-hint
            readonly
            mask
            @eventFoo="doFuncFoo"
          ></v-text-field>

           <v-text-field
            slot="activator"
            v-model="cashdraw"
           :label="$t(titlename.cashdraw)"
           v-validate="'required'"
            persistent-hint
            solo-inverted
            clearable
            @eventFoo="doFuncFoo"
          ></v-text-field>
            </div>
        </v-card-title>

        <v-card-actions >
          <div class="pl-1 pb-4" >
          <v-btn
          large
         :loading="loading"
        :disabled="loading"
        color="success"
        @click.native="loader = 'loading'"
    >
      {{ this.$t('button.save') }}
      <span slot="loader">{{ this.$t('button.save') }}</span>
    </v-btn>
          <v-btn large color="warning"
          >{{ this.$t('button.cancel') }}</v-btn>
          </div>
        </v-card-actions>
         </v-card>
      </v-flex>

    </v-layout>
    </v-container>
</template>

<script>
import VWidget from '@/components/VWidget';

import util from '../../util';
export default {
  name: 'openregis-app',
  components: {

  },

  data () {
    return {
      selectedDate: this.$moment().format('MMM D, YYYY'),
      title: '',
      date: this.$moment().format('YYYY-MM-D'),
      date2: this.$moment().locale(this.$i18n.locale()).format('D MMMM YYYY'),
      dateFormatted: 'dd/mm/yyyy',
      menu1: false,
      menu2: false,
      localize: 'th',
      cashdraw: '',
      loader: null,
      loading: false
    };
  },
  computed: {
    titlename: function () {
      let title = '';

      let menu = JSON.parse(JSON.stringify(this.$t('menu.submenu')));
      menu.forEach(item => {

        if (item.items) {
          let child =  item.items.find(i => {
            return i.link === this.$route.name;
          });

          if (child) {
            title = child.name;
          } else {
            title = 'Dashboard';
          }

        } else {
          if (item.link === this.$route.name) {
            title = item.title;
          }

        }
      });

      return {
        'title': title,
        'docdate': this.$route.name + '.docdate',
        'cashdraw': this.$route.name + '.cashdraw',
      };
    },
    computedDateFormatted () {

      return this.formatDate(this.date);
    },
    currentLanguage () {
      return this.$i18n.locale();
    },
    binding () {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;
      return binding;
    }

  },
  watch: {
    loader () {
      const l = this.loader;

      this[l] = !this[l];

      setTimeout(() => { this[l] = false }, 3000);

      this.loader = null;
    }
  },

  methods: {
    formatDate (date, prefix) {
      if (!date) return null;

      // let ddate = this.$moment().locale(this.localize);
      let [day, month, year] = date.split(' ');

      //  util.getMonthByCode(month);
      // console.log(year);

      return `${day}${prefix}${month}${prefix}${this.localize === 'th' ? parseInt(year, 0) + 543 : year}`;
    },
    parseDate (date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    },
    onChangeDate () {
      this.formattedLocalDate = this.$moment(this.selectedDate).format('LL');
      // this.formattedLocalDateTime = this.$moment(this.selectedDate).format('LLL');
      // this.formattedUTCDateTime = this.$moment(this.selectedDate).tz('UTC').format('LLL');
      this.localize = this.localize !== this.$i18n.locale() ? this.$i18n.locale() : this.localize;
      // console.log(this.formatDate(this.date2));
      const ddate = this.localize === 'th' ? this.$moment().locale(this.localize).format('D MMMM YYYY') : this.$moment().locale(this.localize).format('D MM YYYY');
      this.date2 = this.formatDate(ddate, '-');
    },
    doFuncFoo (val) {

      this.date2 = val;
    },

  }
};
</script>
<style>
.v-card__actions > *, .v-card__actions .btn10 .v-btn  {
     margin: 0 10px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
